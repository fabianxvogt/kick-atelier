# Kick Atelier roadmap

State: verification (v1 implemented; reviewed source preview published; paste UI and public Sites demo remain gated)

## Now

- Non-interactive acceptance of export/import, bounded batch rendering, cancellation paths and error guards.
- Browser QA at desktop Chromium is recorded; paste UI and any fresh deployed-user journey await an unlocked, parent-granted browser window.
- Review staged source for secrets, private planning, generated output and recordings.
- Verify the static build and retain the exact source commit for review.

## Next

- Publish the reviewed static build through Sites after the browser gate and release instruction.
- Recheck the deployed fresh-user journey and export path.

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
| Save/reload/export/import | localStorage and v1 JSON contract, with file upload or paste fallback | implemented + decoder-tested; paste UI browser check pending |
| Malformed/oversized input | `decodeProject`, 100 KB import limit | implemented + tested; current patch preservation in paste handler source-reviewed |
| Desktop Chromium + narrow mobile | fresh desktop and 390×844 Chromium journeys; patch-file controls remain available on mobile | verified |

Classification: INCREMENTAL. This is a practical sound-design instrument; it makes no claim of club-translation validation, human-test completion or scientific novelty.
