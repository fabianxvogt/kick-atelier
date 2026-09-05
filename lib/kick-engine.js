export const SAMPLE_RATE = 48000;
export const PROJECT_VERSION = 1;

/** @typedef {{ id: string, name: string, tag: string, pitchStart: number, pitchEnd: number, pitchDecay: number, bodyDecay: number, tail: number, clickAmount: number, clickDecay: number, noiseAmount: number, noiseDecay: number, drive: number, output: number, seed: number, duration: number }} KickPatch */

/** @type {KickPatch} */
export const DEFAULT_PATCH = Object.freeze({
  id: 'clean-room', name: 'Clean Room', tag: 'tight / neutral',
  pitchStart: 190, pitchEnd: 48, pitchDecay: 0.055, bodyDecay: 0.54, tail: 0.9,
  clickAmount: 0.24, clickDecay: 0.018, noiseAmount: 0.12, noiseDecay: 0.055,
  drive: 0.14, output: -4, seed: 8231, duration: 1.1,
});

const source = (id, name, tag, values) => ({ ...DEFAULT_PATCH, id, name, tag, ...values });
export const PRESETS = [
  source('clean-room', 'Clean Room', 'tight / neutral', {}),
  source('warehouse', 'Warehouse', 'wide / heavy', { pitchStart: 148, pitchEnd: 43, pitchDecay: 0.09, bodyDecay: 0.82, tail: 1.38, clickAmount: 0.15, noiseAmount: 0.2, drive: 0.28, output: -3, seed: 1142, duration: 1.65 }),
  source('razor-click', 'Razor Click', 'short / sharp', { pitchStart: 260, pitchEnd: 55, pitchDecay: 0.032, bodyDecay: 0.31, tail: 0.58, clickAmount: 0.82, clickDecay: 0.009, noiseAmount: 0.18, noiseDecay: 0.035, drive: 0.18, output: -5, seed: 9011, duration: 0.8 }),
  source('sub-pressure', 'Sub Pressure', 'round / low', { pitchStart: 120, pitchEnd: 39, pitchDecay: 0.12, bodyDecay: 1.15, tail: 1.95, clickAmount: 0.07, noiseAmount: 0.08, drive: 0.2, output: -2, seed: 441, duration: 2.35 }),
  source('concrete', 'Concrete', 'dense / clipped', { pitchStart: 175, pitchEnd: 45, pitchDecay: 0.058, bodyDecay: 0.63, tail: 1.05, clickAmount: 0.33, noiseAmount: 0.34, noiseDecay: 0.08, drive: 0.76, output: -8, seed: 777, duration: 1.3 }),
  source('rubber-room', 'Rubber Room', 'bouncy / tuned', { pitchStart: 214, pitchEnd: 58, pitchDecay: 0.07, bodyDecay: 0.46, tail: 0.82, clickAmount: 0.4, clickDecay: 0.014, noiseAmount: 0.09, drive: 0.1, output: -4, seed: 2890, duration: 1.02 }),
  source('night-drive', 'Night Drive', 'gloss / long', { pitchStart: 165, pitchEnd: 44, pitchDecay: 0.075, bodyDecay: 0.7, tail: 1.72, clickAmount: 0.28, noiseAmount: 0.14, noiseDecay: 0.075, drive: 0.32, output: -5, seed: 3319, duration: 1.95 }),
  source('broken-dial', 'Broken Dial', 'rough / unstable', { pitchStart: 310, pitchEnd: 52, pitchDecay: 0.022, bodyDecay: 0.4, tail: 0.7, clickAmount: 0.55, clickDecay: 0.032, noiseAmount: 0.5, noiseDecay: 0.11, drive: 0.58, output: -9, seed: 55620, duration: 0.95 }),
];

const numeric = ['pitchStart', 'pitchEnd', 'pitchDecay', 'bodyDecay', 'tail', 'clickAmount', 'clickDecay', 'noiseAmount', 'noiseDecay', 'drive', 'output', 'seed', 'duration'];
const bounds = { pitchStart: [70, 320], pitchEnd: [35, 100], pitchDecay: [0.015, 0.24], bodyDecay: [0.08, 1.8], tail: [0.08, 2.8], clickAmount: [0, 1], clickDecay: [0.003, 0.08], noiseAmount: [0, 1], noiseDecay: [0.008, 0.25], drive: [0, 1], output: [-18, 0], seed: [0, 2147483647], duration: [0.12, 3.2] };
export function clampPatch(input = {}) {
  const patch = { ...DEFAULT_PATCH, ...input };
  numeric.forEach((key) => { const value = Number(patch[key]); const [min, max] = bounds[key]; patch[key] = Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : DEFAULT_PATCH[key]; });
  patch.name = typeof input.name === 'string' ? input.name.slice(0, 80) : DEFAULT_PATCH.name;
  patch.id = typeof input.id === 'string' ? input.id.slice(0, 80) : DEFAULT_PATCH.id;
  patch.tag = typeof input.tag === 'string' ? input.tag.slice(0, 80) : DEFAULT_PATCH.tag;
  // The rendered file length follows the tail control; the small 200 ms
  // cushion preserves the initial transient while keeping the contract exact.
  patch.duration = Math.min(3.2, Math.max(0.12, patch.tail + 0.2));
  return patch;
}

function rng(seed) { let state = (Math.floor(seed) >>> 0) || 1; return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; }; }
function softClip(value, drive) { const amount = 1 + drive * 7; return Math.tanh(value * amount) / Math.tanh(amount); }
/** @param {KickPatch} rawPatch @param {number} sampleRate @returns {Float32Array} */
export function renderKick(rawPatch = DEFAULT_PATCH, sampleRate = SAMPLE_RATE) {
  const patch = clampPatch(rawPatch); const length = Math.max(1, Math.round(patch.duration * sampleRate)); const output = new Float32Array(length); const random = rng(patch.seed); const gain = Math.pow(10, patch.output / 20); let phase = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate; const pitch = patch.pitchEnd + (patch.pitchStart - patch.pitchEnd) * Math.exp(-t / patch.pitchDecay); phase += 2 * Math.PI * pitch / sampleRate; const bodyEnv = Math.exp(-t / Math.max(0.01, patch.bodyDecay)); const attack = Math.min(1, t / 0.0025); const body = Math.sin(phase) * bodyEnv * attack; const harmonic = Math.sin(phase * 2.01 + 0.15) * 0.1 * bodyEnv; const click = (random() * 2 - 1) * Math.exp(-t / patch.clickDecay) * patch.clickAmount * (1 - Math.min(1, t / 0.003)); const noise = (random() * 2 - 1) * Math.exp(-t / patch.noiseDecay) * patch.noiseAmount; const value = softClip((body + harmonic + click + noise * 0.38) * gain, patch.drive); output[i] = Number.isFinite(value) ? Math.max(-0.8912, Math.min(0.8912, value)) : 0;
  }
  return output;
}
function peakOf(samples) { let peak = 0; for (const value of samples) peak = Math.max(peak, Math.abs(value)); return peak; }
export function levelMatch(samples, ceiling = 0.8912) { const peak = peakOf(samples); if (!Number.isFinite(peak) || peak === 0) return samples; const factor = Math.min(1, ceiling / peak); if (factor === 1) return samples; return Float32Array.from(samples, (value) => value * factor); }
export function levelMatchPair(samplesA, samplesB, ceiling = 0.8912) { const peakA = peakOf(samplesA); const peakB = peakOf(samplesB); if (!Number.isFinite(peakA) || !Number.isFinite(peakB) || peakA === 0 || peakB === 0) return [Float32Array.from(samplesA), Float32Array.from(samplesB)]; const target = Math.min(peakA, peakB, ceiling); const match = (samples, peak) => peak === target ? Float32Array.from(samples) : Float32Array.from(samples, (value) => value * target / peak); return [match(samplesA, peakA), match(samplesB, peakB)]; }
/** @param {KickPatch} patch @param {number} amount @returns {KickPatch} */
export function makeVariation(patch, amount = 0.15) { const next = clampPatch(patch); next.id = 'variant'; next.name = 'Suggested lift'; next.pitchStart = Math.min(320, next.pitchStart * (1 + amount * 0.25)); next.pitchDecay = Math.max(0.015, next.pitchDecay * (1 - amount * 0.18)); next.clickAmount = Math.min(1, next.clickAmount + amount * 0.45); next.noiseAmount = Math.max(0, next.noiseAmount - amount * 0.16); next.seed = patch.seed; return next; }
export function renderLoop(patch, bpm = 128, beats = 4, sampleRate = SAMPLE_RATE) { const hit = renderKick(patch, sampleRate); const gap = Math.max(1, Math.round(sampleRate * 60 / Math.min(220, Math.max(60, bpm)))); const total = gap * beats + hit.length; const out = new Float32Array(total); for (let beat = 0; beat < beats; beat += 1) { const offset = beat * gap; for (let i = 0; i < hit.length && offset + i < out.length; i += 1) out[offset + i] += hit[i]; } return levelMatch(out); }
export function writeWav(samples, sampleRate = SAMPLE_RATE) { const buffer = new ArrayBuffer(44 + samples.length * 2); const view = new DataView(buffer); const text = (offset, value) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0))); text(0, 'RIFF'); view.setUint32(4, 36 + samples.length * 2, true); text(8, 'WAVE'); text(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, samples.length * 2, true); for (let i = 0; i < samples.length; i += 1) view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767))), true); return new Blob([buffer], { type: 'audio/wav' }); }
export function encodeProject(name, patch) { return JSON.stringify({ format: 'kick-atelier-project', version: PROJECT_VERSION, name: String(name || 'untitled-kick').slice(0, 80), patch: clampPatch(patch), exportedAt: new Date().toISOString() }, null, 2); }
export function decodeProject(payload) { if (typeof payload !== 'string' || payload.length > 100000) throw new Error('Project is empty or over the 100 KB limit.'); let value; try { value = JSON.parse(payload); } catch { throw new Error('Project JSON could not be parsed.'); } if (!value || value.format !== 'kick-atelier-project' || value.version !== PROJECT_VERSION || !value.patch || typeof value.patch !== 'object') throw new Error('Unsupported project version.'); return { name: typeof value.name === 'string' ? value.name.slice(0, 80) : 'untitled-kick', patch: clampPatch(value.patch) }; }
