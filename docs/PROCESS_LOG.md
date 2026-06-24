# Process Log — Human + AI Collaboration

This is written for the PyCon Singapore 2026 Hackathon judging hint: **50% process / 50% product**.

## Context gathered

- Email confirmed event: PyCon Singapore 2026 Hackathon, Jun 19–24, deadline 6pm SGT on Wed 24 Jun.
- Luma event theme: Architecting the Future of Lifelong Learning.
- Track 1 asks learners: Where can I go next? What skills matter most? What should I do today?
- Judging hint: process matters as much as product; interaction logs mandatory.
- Product criteria surfaced from event pages: relevance, technical execution, transparent/explainable data use, and UX that guides clear next steps without overwhelm.

## AI use

- AI teammate was used to inspect emails, public event pages and hackathon criteria.
- AI proposed several directions, then selected the highest-scoring path: Track 1 explainable career pathway planner.
- AI generated first-pass code, tests, UI copy, judging alignment and submission draft.
- AI was used as a coding accelerator, not as an opaque recommender: the shipped role ranking is deterministic Python math.

## Human accountability checkpoints

Abel should verify before final submission:

1. Personal/team names and contact information.
2. Whether to submit solo or add teammates.
3. Whether the demo should mention optional OpenAI coaching or keep it fully deterministic.
4. Any claims about official dataset import if official spreadsheet has not yet been plugged in.

## Key design decisions

1. **Pick Track 1, not Open Track.** It is closer to the sponsor theme, dataset, and judging rubric.
2. **Avoid generic chatbot.** A chatbot can look impressive but is hard to trust. A transparent pathway planner scores better on explainability.
3. **Show score math.** The score is intentionally visible: 65% technical skill overlap, 20% critical-core overlap, 15% interest fit.
4. **Make actions concrete.** Every recommendation becomes a 4-week plan with portfolio artefacts.
5. **Preserve optional AI.** OpenAI can generate a coaching note if an API key is present, but it cannot alter deterministic scores.

## What changed during build

- The official submission URL in the Luma email returned a GitHub Pages 404 during the build session, so submission assets were prepared locally instead.
- The official SkillsFuture site exposed the Q2 2026 dataset buttons in browser, but direct automated download was not completed in time. The app therefore ships a compact SkillsFuture-style sample schema with explicit source notes and clean replacement points.

## Reproducibility

- Run: `python -m src.skillbridge.server`
- Test: `python -m unittest discover -s tests -v`
- Main engine: `src/skillbridge/engine.py`
- Dataset schema: `src/skillbridge/data.py`
