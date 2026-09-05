import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PATCH, decodeProject, encodeProject, renderKick, renderLoop, writeWav } from '../lib/kick-engine.js';

test('fixed seed reproduces the noise layer exactly', () => {
  const a = renderKick({ ...DEFAULT_PATCH, seed: 99 });
  const b = renderKick({ ...DEFAULT_PATCH, seed: 99 });
  assert.deepEqual(Array.from(a), Array.from(b));
});

test('duration is exact at the declared sample rate', () => {
  const patch = { ...DEFAULT_PATCH, tail: 0.55 };
  assert.equal(renderKick(patch, 48000).length, 36000);
  assert.equal(renderLoop(patch, 120, 4, 48000).length, 4 * 24000 + 36000);
});

test('extreme supported parameters remain finite and bounded', () => {
  const extreme = { ...DEFAULT_PATCH, pitchStart: 1e9, pitchEnd: -1e9, pitchDecay: 0, bodyDecay: 0, tail: 999, clickAmount: 99, clickDecay: 0, noiseAmount: 99, noiseDecay: 0, drive: 99, output: 20, duration: 99 };
  const samples = renderKick(extreme, 12000);
  assert.ok(samples.length <= 12000 * 3.2);
  assert.ok(samples.every((value) => Number.isFinite(value) && Math.abs(value) <= 0.89125));
});

test('portable projects round-trip and malformed versions fail intentionally', () => {
  const payload = encodeProject('test', { ...DEFAULT_PATCH, clickAmount: 0.7 });
  const parsed = decodeProject(payload);
  assert.equal(parsed.name, 'test');
  assert.equal(parsed.patch.clickAmount, 0.7);
  assert.throws(() => decodeProject('{"format":"wrong","version":1}'), /Unsupported project version/);
  assert.throws(() => decodeProject('not json'), /could not be parsed/);
});

test('WAV export declares mono PCM16 and exact payload size', async () => {
  const samples = renderKick(DEFAULT_PATCH, 48000);
  const bytes = new Uint8Array(await writeWav(samples, 48000).arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(0, 4)), 'RIFF');
  assert.equal(new TextDecoder().decode(bytes.slice(8, 12)), 'WAVE');
  assert.equal(new DataView(bytes.buffer).getUint16(22, true), 1);
  assert.equal(new DataView(bytes.buffer).getUint16(34, true), 16);
  assert.equal(bytes.length, 44 + samples.length * 2);
});
