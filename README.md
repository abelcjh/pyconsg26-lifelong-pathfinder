# SkillBridge SG — PyCon Singapore 2026 Hackathon

A Python-first, explainable lifelong-learning navigator for Singapore learners.

Built for PyCon Singapore 2026 Hackathon: **Architecting the Future of Lifelong Learning**, Track 1: Job & Skills.

## Problem statement

Mid-career learners do not need a giant catalogue of jobs and courses. They need a trusted answer to three questions, fast:

1. Where can I go next?
2. What skills matter most?
3. What should I do today?

SkillBridge SG turns SkillsFuture-style role/skill frameworks into an explainable action plan: adjacent roles, missing skills, weekly learning milestones, evidence for every recommendation, and a collaboration log showing how human + AI judgment shaped the result.

## Why this can win

The judging hint is 50% process / 50% product.

Product:
- Directly targets Track 1 and the event's three learner questions.
- Explainable matching: every role recommendation exposes overlap, gaps, score components, and data source notes.
- Concrete next steps: creates a 4-week plan from learner hours/week, not just generic advice.
- Clean demo UX: one screen, sample profiles, instantly editable skills, exportable JSON.

Process:
- `docs/PROCESS_LOG.md` documents the human-AI collaboration decisions.
- `docs/JUDGING_ALIGNMENT.md` maps the build to every known judging criterion.
- The recommendation engine is deterministic and tested; OpenAI use is optional and transparent.

## Run locally

```bash
cd /home/abel/GitHub/pyconsg26-lifelong-pathfinder
python -m src.skillbridge.server
```

Open http://127.0.0.1:8765

## Run tests

```bash
python -m unittest discover -s tests -v
```

## Submission assets

- Product URL for local demo: http://127.0.0.1:8765
- Repo: see GitHub remote after push
- Process log: `docs/PROCESS_LOG.md`
- Judging alignment: `docs/JUDGING_ALIGNMENT.md`
- Suggested submission answers: `docs/SUBMISSION_DRAFT.md`

## Data note

The app ships with a compact curated sample dataset in `src/skillbridge/data.py`, structured to mirror the official SkillsFuture Skills Framework fields: sector, role, key tasks, technical skills, critical core skills, proficiency, and source notes. The code is intentionally separated so the official Q2 2026 spreadsheet can be imported/replaced after download.

## Optional OpenAI integration

The deterministic engine works offline. If `OPENAI_API_KEY` is set, the backend can add a short coaching note using an OpenAI-compatible chat completions call, while keeping all score math and evidence local and auditable.
