# Kick Atelier roadmap

State: released (v1 public; accepted source and browser smoke complete; evidence boundaries retained)

## Now

- Public v1: https://kick-atelier.fabian523417.chatgpt.site
- Accepted behavior `f1848395d891336f48de3cd769bdff37af757b80` is released with docs-only tip `c27ccdfd06e244892292cb03c9959c9ea55b7d8f`.
- Browser smoke passed valid paste, malformed-paste state preservation, save/reload, file import, JSON export, audio-start UI and WAV export paths on the retained production build.
- Public HTTP verification matched 14 served runtime assets byte-for-byte against retained staging; edge HTML and hidden dotfiles were treated as host-managed responses.

## Next

- Keep the released static build and portable project workflow stable.
- If future changes are made, repeat the bounded browser smoke and public runtime-byte check before another release.

## Later

- Optional AudioWorklet render path for longer experimental batches.
- Optional MIDI note trigger and deeper spectral measurement.

## Done

- Eight curated procedural source presets.
- Layered oscillator/noise/click synthesis with editable pitch, body, texture, drive, output and tail controls.
- Waveform/spectrum views, level-matched A/B variant and metronome comparison.
- Single hit, 4-beat loop, and four-variation WAV exports with bounded cancellation.
- Versioned portable JSON save/import/export and localStorage recovery.
- Visible audio lock, mute, reset, unsupported-browser and malformed/oversized-file errors.
- Deterministic engine tests for seed, duration, extremes, loop length, WAV/project serialization.

## Full-v1 acceptance matrix

| Requirement | Evidence | Status |
| --- | --- | --- |
| Layered oscillator/noise engine | `lib/kick-engine.js`, engine tests | implemented + tested |
| Intentional pitch/transient/body envelopes | Pitch/body/texture controls and render model | implemented + tested |
| Click and drive | Click controls and soft clip stage | implemented + tested |
| Waveform/spectrum | Canvas scopes update on patch change | implemented + desktop browser QA |
| Level-matched comparison with metronome | Peak matching over each complete hit window to the -1 dBFS linear ceiling; quiet material stays quiet; 8-beat transport | implemented + tested + desktop browser QA |
| Eight source presets | `PRESETS` array and sidebar | implemented + tested |
| Single hit/test loop/batch WAV | Render Desk actions and RIFF encoder | implemented + tested |
| Fixed seed, duration, finite bounded extremes | `tests/engine.test.mjs` | tested |
| Save/reload/export/import | localStorage and v1 JSON contract, with file upload or paste fallback | implemented + decoder-tested + browser smoke passed |
| Malformed/oversized input | `decodeProject`, 100 KB import limit | implemented + tested; malformed paste state preservation passed in browser smoke |
| Desktop Chromium + narrow mobile | fresh desktop and 390×844 Chromium journeys; patch-file controls remain available on mobile | verified |

Classification: INCREMENTAL. This is a practical sound-design instrument; it makes no claim of club-translation validation, human-test completion, physical-device listening quality, Safari support or scientific novelty. The public runtime is verified by HTTP asset parity; no second public browser journey is claimed here.
