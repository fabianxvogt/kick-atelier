# Kick Atelier

Kick Atelier is a local-first techno kick design lab. Start from one of eight original procedural source presets, shape pitch, body, click, noise, drive and tail, then audition, compare, save, reopen and export.

## Try it locally

```sh
npm install
npm run dev
```

Open the local URL printed by the dev server. Click **Start audio** once, then use **Audition hit**. All synthesis is computed in the browser; no audio or project data is uploaded.

## v1 workflow

- Layered oscillator + click/noise engine with bounded controls and deterministic noise seed.
- Time/amplitude waveform and spectrum glance update as the patch changes.
- A/B level-matched comparison with optional metronome and tempo control.
- Single-hit, 4-beat test-loop, and four-file variation-set WAV exports.
- Local save/restore plus versioned JSON project import/export with malformed-input and size-limit errors.

Supported target: current desktop Chromium and narrow mobile Chromium. Safari is untested. Audio is mono at 48 kHz; supported single-hit duration is 0.12–3.2 seconds and output is bounded at -1 dBFS ceiling.

## Evidence

Run `npm test` for fixed-seed, duration, finite/bounded extremes, loop-length, and project round-trip checks. See [ROADMAP.md](ROADMAP.md) and [docs/README.md](docs/README.md) for the delivery record.

## License

Original source code is MIT licensed. See [LICENSE](LICENSE).
