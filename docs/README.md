# Documentation index

- [Project brief](../../docs/projects/MUSIC.md), section 82, defines the user outcome and acceptance contract.
- [ROADMAP.md](../ROADMAP.md) records the bounded v1 scope, evidence and release state.
- `lib/kick-engine.js` is the portable deterministic synthesis and serialization core.
- `tests/engine.test.mjs` covers seed reproducibility, exact duration, finite bounded extremes, loop length and project errors.

## Design notes

The engine uses a phase-accumulated sine oscillator with exponential pitch fall, exponential body/click/noise envelopes, a deterministic xorshift noise generator, and a bounded tanh soft clip. WAV exports are mono PCM16 at 48 kHz. `output` is gain in dB and samples are clamped just below 0.89125 (−1 dBFS), so extreme user inputs cannot create NaN or unbounded output. Render duration is derived as `tail + 0.2 s` and rounded to an exact sample count. `levelMatchPair(a, b)` measures the peak over each complete rendered hit window, selects the shared target as `min(peakA, peakB, 0.8912)`, and scales each non-silent side to that target; silence is left untouched without division. It is used only for A/B comparison playback/scopes; raw patch renders remain the export source.

Project files are JSON objects with `format: "kick-atelier-project"` and `version: 1`. They contain only patch settings and a user-provided name; browser save is a convenience and JSON export is the recovery path.
