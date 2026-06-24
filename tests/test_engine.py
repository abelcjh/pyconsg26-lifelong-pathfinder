import unittest

from src.skillbridge.data import SAMPLE_LEARNERS
from src.skillbridge.engine import recommend, score_role


class EngineTest(unittest.TestCase):
    def test_recommendations_are_ranked_and_explainable(self):
        result = recommend(SAMPLE_LEARNERS["operations-coordinator"])
        self.assertGreaterEqual(len(result["recommendations"]), 3)
        scores = [r["score"] for r in result["recommendations"]]
        self.assertEqual(scores, sorted(scores, reverse=True))
        top = result["recommendations"][0]
        self.assertIn("evidence", top)
        self.assertIn("four_week_plan", top)
        self.assertTrue(result["next_best_action"].startswith("This week:"))

    def test_score_rewards_skill_overlap(self):
        role = {
            "id": "x", "title": "Python Role", "sector": "ICT", "level": "Associate", "summary": "Builds scripts",
            "tasks": ["Automate"], "skills": ["Python Programming", "Testing"], "core_skills": ["Problem Solving"], "source": "test",
        }
        high = score_role(["Python Programming", "Testing", "Problem Solving"], role)
        low = score_role(["Communication"], role)
        self.assertGreater(high.score, low.score)
        self.assertEqual(high.missing_skills, [])


if __name__ == "__main__":
    unittest.main()
