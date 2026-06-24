# Submission Draft

Use/adapt these answers in the PyConSG hackathon submission form.

## Project title

SkillBridge SG — Explainable career pathways for lifelong learners

## Track

Track 1: Job & Skills Track

## One-liner

SkillBridge SG helps a learner answer “where can I go next, what skills matter, and what should I do today?” using transparent SkillsFuture-style role/skill matching and a concrete 4-week action plan.

## Problem

Singapore learners face too much career and course information. A mid-career learner does not just need a list of roles; they need a trusted pathway that explains transferable skills, missing skills, and the next small action they can take this week.

## Solution

The learner enters current role, existing skills, interests and weekly learning time. SkillBridge SG ranks adjacent career pathways, explains the score, shows matched and missing skills, and generates a 4-week plan. Each recommendation includes data evidence and source notes so the learner can challenge or trust the result.

## How Python is used

Python powers the backend web server, deterministic recommendation engine, score calculations, JSON API and tests. The product can run locally with `python -m src.skillbridge.server`.

## How OpenAI / AI was used

AI was used as a coding and product strategy teammate: reading event context, drafting judging alignment, generating code and improving UX copy. In the product, OpenAI is optional: if an API key is present, it adds a short coaching note. The actual ranking remains deterministic and explainable so learners can inspect the evidence.

## Data used

The demo uses a compact SkillsFuture-style role/skills dataset structured around sector, role, tasks, technical skills, critical core skills, proficiency and source notes. It is designed to be replaced by the official SkillsFuture Skills Framework Q2 2026 spreadsheet dataset.

## Why it is useful

It gives learners clear next steps instead of overwhelming them. It also gives educators, mentors and career coaches an auditable starting point for conversations.

## Technical execution

- Python stdlib backend, no fragile dependency setup.
- Static frontend for fast demo.
- Transparent scoring model: 65% technical skill overlap, 20% core-skills overlap, 15% interest fit.
- Unit tests for ranking and explainability.
- Exportable JSON recommendation report.

## Demo instructions

1. Clone the repo.
2. Run `python -m src.skillbridge.server`.
3. Open `http://127.0.0.1:8765`.
4. Choose a sample learner or edit the fields.
5. Click “Build my pathway”.
6. Expand evidence and export JSON.

## Links to include

- GitHub repo: <fill after push>
- Demo video: <record if time>
- Process log: `docs/PROCESS_LOG.md`
