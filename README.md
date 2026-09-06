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
- Local save/restore plus versioned JSON project import/export, with file upload or paste fallback and malformed-input/size-limit errors.

Supported target: current desktop Chromium and narrow mobile Chromium. Safari is untested. Audio is mono at 48 kHz; supported single-hit duration is 0.12–3.2 seconds and output is bounded at -1 dBFS ceiling.

## Evidence

Run `npm test` for fixed-seed, duration, finite/bounded extremes, loop-length, and project round-trip checks. See [ROADMAP.md](ROADMAP.md) and [docs/README.md](docs/README.md) for the delivery record.

## Public v1 release

Kick Atelier v1 is live at [kick-atelier.fabian523417.chatgpt.site](https://kick-atelier.fabian523417.chatgpt.site). The released workflow is: choose one of eight source presets, shape pitch/body/texture/drive controls, audition and compare A/B, save locally, export a portable JSON project, reopen it by file or paste, and export a single hit, 4-beat loop, or four-file variation set.

The public release uses accepted behavior `f1848395d891336f48de3cd769bdff37af757b80` with docs-only tip `c27ccdfd06e244892292cb03c9959c9ea55b7d8f`. Browser smoke passed on the retained production build for valid paste, malformed-paste state preservation, save/reload, file import, JSON export, audio-start UI, and WAV outputs. Public HTTP verification matched all 14 served runtime assets against the retained staged payload; host-generated edge HTML and hidden build metadata were checked separately.

This release does not claim Safari support, physical-device playback, listening quality, human sound-design testing, club translation, or scientific novelty. The app remains local-first: synthesis and project data stay in the browser.

## License

Original source code is MIT licensed. See [LICENSE](LICENSE).
