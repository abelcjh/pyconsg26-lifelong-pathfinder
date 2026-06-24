"""Explainable recommendation engine for SkillBridge SG."""

from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Iterable

from .data import LEARNING_RESOURCES, ROLES


def _norm(skill: str) -> str:
    return " ".join(skill.strip().lower().split())


@dataclass(frozen=True)
class Recommendation:
    role_id: str
    title: str
    sector: str
    level: str
    summary: str
    score: int
    match_percent: int
    matched_skills: list[str]
    missing_skills: list[str]
    explanation: str
    evidence: list[str]
    four_week_plan: list[dict]


def score_role(learner_skills: Iterable[str], role: dict, interests: Iterable[str] = ()) -> Recommendation:
    learner_map = {_norm(s): s.strip() for s in learner_skills if s.strip()}
    role_skills = role["skills"] + role.get("core_skills", [])
    role_map = {_norm(s): s for s in role_skills}

    matched_norm = sorted(set(learner_map) & set(role_map))
    missing_norm = set(role_map) - set(learner_map)
    # Preserve role-defined order so technical gaps appear before critical-core gaps.
    # This makes the recommended next action more practical for learners.
    matched = [role_map[s] for s in matched_norm]
    missing = [s for s in role_skills if _norm(s) in missing_norm]

    # Transparent score: 65% skill overlap, 20% critical-core overlap, 15% interest fit.
    skill_overlap = len(set(learner_map) & set(_norm(s) for s in role["skills"])) / max(1, len(role["skills"]))
    core_overlap = len(set(learner_map) & set(_norm(s) for s in role.get("core_skills", []))) / max(1, len(role.get("core_skills", [])))
    interest_text = " ".join(interests).lower()
    interest_hits = sum(1 for term in [role["title"], role["sector"], role["summary"], *role["skills"]] if any(tok in term.lower() for tok in interest_text.split()))
    interest_fit = min(1.0, interest_hits / 4)
    score_float = 0.65 * skill_overlap + 0.20 * core_overlap + 0.15 * interest_fit
    score = round(score_float * 100)
    match_percent = round(len(matched_norm) / max(1, len(role_map)) * 100)

    top_gaps = missing[:5]
    explanation = (
        f"{role['title']} scores {score}/100: {round(skill_overlap*100)}% technical overlap, "
        f"{round(core_overlap*100)}% core-skills overlap, and transparent interest fit. "
        f"Priority gaps: {', '.join(top_gaps) if top_gaps else 'none'}."
    )

    plan = build_plan(top_gaps, role["title"])
    evidence = [
        f"Matched skills: {', '.join(matched) if matched else 'none yet'}",
        f"Missing skills from role profile: {', '.join(missing[:8]) if missing else 'none'}",
        f"Key tasks considered: {', '.join(role['tasks'])}",
        f"Data source note: {role['source']}",
    ]

    return Recommendation(
        role_id=role["id"], title=role["title"], sector=role["sector"], level=role["level"],
        summary=role["summary"], score=score, match_percent=match_percent, matched_skills=matched,
        missing_skills=missing, explanation=explanation, evidence=evidence, four_week_plan=plan,
    )


def build_plan(gaps: list[str], target_role: str) -> list[dict]:
    if not gaps:
        return [{"week": 1, "focus": "Validate readiness", "actions": [f"Build a portfolio artefact for {target_role}", "Ask a practitioner for feedback"]}]
    plan = []
    for i in range(4):
        skill = gaps[i % len(gaps)]
        actions = LEARNING_RESOURCES.get(skill, [f"Find a credible course or guide for {skill}", f"Apply {skill} in a tiny work-like task"])
        plan.append({"week": i + 1, "focus": skill, "actions": actions[:2]})
    return plan


def recommend(learner: dict, limit: int = 4) -> dict:
    recs = [score_role(learner.get("skills", []), role, learner.get("interests", [])) for role in ROLES]
    recs.sort(key=lambda r: (r.score, r.match_percent), reverse=True)
    best = recs[:limit]
    return {
        "learner": learner,
        "recommendations": [asdict(r) for r in best],
        "next_best_action": next_best_action(best[0], learner) if best else "Add skills to get recommendations.",
        "method": {
            "score": "65% technical skill overlap + 20% critical-core overlap + 15% interest fit",
            "guardrail": "No hidden AI ranking: model math and role evidence are visible to the learner.",
            "data": "SkillsFuture Skills Framework-style schema; demo dataset can be replaced with official spreadsheet import.",
        },
    }


def next_best_action(top: Recommendation, learner: dict) -> str:
    hours = learner.get("hours_per_week") or 4
    if top.missing_skills:
        first_gap = top.missing_skills[0]
        return f"This week: spend {hours} hours building one tiny artefact around {first_gap} for the {top.title} pathway."
    return f"This week: spend {hours} hours packaging proof that you can already perform {top.title} tasks."
