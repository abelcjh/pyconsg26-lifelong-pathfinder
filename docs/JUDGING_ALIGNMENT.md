# Judging Alignment

## Process & Product

The project intentionally splits process and product.

Process evidence:
- Email and event criteria were read before building.
- The problem statement is chosen from the official Track 1 wording.
- This repository includes a process log and submission draft.
- AI use is disclosed and bounded: AI helped code and write; deterministic Python ranks recommendations.

Product evidence:
- Working web app served by Python.
- Clear learner input, ranked recommendations, score explanations and next actions.
- Exportable JSON for judges to inspect.

## Data Quality

Strengths:
- Data schema follows SkillsFuture framework concepts: sector, role, key tasks, technical skills, critical core skills, proficiency, source notes.
- Every recommendation displays source notes and role evidence.
- Ranking uses inspectable skill overlap rather than black-box similarity.

Known limitation:
- Demo dataset is compact and curated. The app is structured so official Q2 2026 spreadsheet import can replace `src/skillbridge/data.py`.

## Overall Experience & Project Value

The UX focuses on the three official learner questions:

1. Where can I go next? Ranked adjacent roles.
2. What skills matter most? Matched skills and missing skills.
3. What should I do today? A specific weekly action based on available hours.

The app avoids overwhelming learners with 100+ skills. It shows the highest-value gaps and converts them into a 4-week plan.

## Technical Execution

- Python stdlib backend with HTTP API endpoints.
- Deterministic recommendation engine covered by unit tests.
- Clean static frontend with no build system required, reducing demo risk.
- Optional OpenAI-compatible coaching note behind `OPENAI_API_KEY`; core scoring remains local and auditable.
- Health endpoint: `/api/health`.

## Sponsor / ecosystem fit

- Uses Python as the implementation language.
- Aligns with OpenAI usage expectations through optional coach note and disclosed AI collaboration process.
- Aligns with AI Singapore / SkillsFuture lifelong learning theme.
- Could be extended with Apify scraping/import for role/course enrichment, matching the hackathon sponsor note about Apify credits.
