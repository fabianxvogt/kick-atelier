# Public v1 release evidence

Date: 2026-09-06 (Europe/Berlin)
Classification: `INCREMENTAL`

## Released product

- Public URL: <https://kick-atelier.fabian523417.chatgpt.site>
- Product source: `c27ccdfd06e244892292cb03c9959c9ea55b7d8f`
- Accepted app behavior: `f1848395d891336f48de3cd769bdff37af757b80`
- `c27ccdf` is docs-only over the accepted behavior.
- Existing source repository: <https://github.com/fabianxvogt/kick-atelier>, branch `codex/v1`.
- Sites project ID: `appgprj_6a9dc10b351c8191a235808b775b7f42`
- Sites source commit: `ee1209b80c0de1d23629b21030c4f9087aa11483`
- Saved Sites version: `appgprj_6a9dc10b351c8191a235808b775b7f42~appgver_a331be10d4488191b34dfd51a538a2c5`, version 1.
- Deployment ID: `appgdep_6a9dc4731abc8191becae65ea748c494`
- Deployment result: terminal `succeeded`; public audience set explicitly.

## Released workflow

The public app exposes eight source presets; pitch, body, texture and drive controls; waveform/spectrum views; A/B comparison with metronome, BPM and mute; local save/reload; portable JSON export; file import; paste import with malformed-input recovery; and bounded WAV exports for a single hit, a 4-beat loop and four variations.

## Verification

- Browser smoke report verdict: PASS/READY in the release-owner evidence record.
- Browser smoke used the unchanged retained production build and observed valid paste, malformed-paste current-state preservation, local save/reload, file import, JSON export, audio-start UI and WAV output paths in fresh Chromium contexts.
- Prior acceptance remains: 7 tests, build, lint, TypeScript check and CI passed; exact CI run 34022737782 passed.
- Public HTTP probe: 14/14 served application assets matched retained staged payload SHA-256 byte-for-byte, including hashed JS/CSS, favicon, RSC payload, manifest and headers.
- Edge HTML is separate: root response returned HTTP 200, 17,701 bytes, SHA-256 `613f1115a7a6bb8523009e33741913e95bbad13bd457706170c915d3f6d44216`, and title `Kick Atelier — techno drum lab`. It is host-generated and is not compared as a raw retained `index.html` file.
- The packaged retained `404.html` is handled by the host through `/404`; dot-prefixed `.assetsignore` and `.vite/manifest.json` are not publicly served. These are host routing/metadata behaviors, not application runtime defects.
- Runtime package proof is retained separately from the public source and is intentionally not a repository link or runtime asset.

## Boundaries

This release makes no claim of Safari support, physical-device playback, audible quality, listening tests, human sound-design judgment, club translation, native OS chooser behavior, public interactive browser traversal after deployment, or scientific novelty. Synthesis and project data remain browser-local; no audio or project data is uploaded.
