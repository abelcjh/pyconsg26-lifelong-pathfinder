const FALLBACK_ROLES = [{"id": "data-analyst", "title": "Data Analyst", "sector": "ICT / Business Analytics", "level": "Associate", "summary": "Turns operational data into dashboards, insights and decisions.", "tasks": ["Profile datasets", "Build dashboards", "Explain trends", "Automate recurring reports"], "skills": ["Data Analysis", "SQL", "Data Visualisation", "Spreadsheet Modelling", "Statistical Thinking", "Stakeholder Communication"], "core_skills": ["Communication", "Sense Making", "Problem Solving"], "proficiency": {"Data Analysis": 3, "SQL": 3, "Data Visualisation": 3, "Stakeholder Communication": 2}, "source": "SkillsFuture Skills Framework-style sample, Q2 2026 demo schema"}, {"id": "ai-product-analyst", "title": "AI Product Analyst", "sector": "ICT / Product", "level": "Intermediate", "summary": "Connects product metrics, user research and AI evaluation to improve AI products safely.", "tasks": ["Define AI product metrics", "Evaluate model outputs", "Run user experiments", "Prioritise product improvements"], "skills": ["Data Analysis", "AI Literacy", "Prompt Evaluation", "Product Analytics", "Experiment Design", "User Research", "Responsible AI"], "core_skills": ["Communication", "Creative Thinking", "Decision Making", "Sense Making"], "proficiency": {"AI Literacy": 3, "Prompt Evaluation": 3, "Product Analytics": 3, "Responsible AI": 2}, "source": "Synthesised from AI product and analytics role patterns for hackathon demo"}, {"id": "python-automation-specialist", "title": "Python Automation Specialist", "sector": "ICT / Operations", "level": "Intermediate", "summary": "Automates repetitive business workflows with Python scripts, APIs and robust checks.", "tasks": ["Map manual workflows", "Integrate APIs", "Write Python automations", "Monitor failures"], "skills": ["Python Programming", "API Integration", "Workflow Automation", "Testing", "Data Cleaning", "Documentation"], "core_skills": ["Problem Solving", "Collaboration", "Adaptability"], "proficiency": {"Python Programming": 3, "API Integration": 3, "Testing": 2, "Documentation": 2}, "source": "SkillsFuture-style automation role sample"}, {"id": "cybersecurity-analyst", "title": "Cybersecurity Analyst", "sector": "ICT / Cybersecurity", "level": "Associate", "summary": "Monitors threats, investigates incidents and strengthens baseline controls.", "tasks": ["Triage security alerts", "Investigate incidents", "Document vulnerabilities", "Improve controls"], "skills": ["Cybersecurity Operations", "Log Analysis", "Risk Assessment", "Incident Response", "Python Programming", "Technical Writing"], "core_skills": ["Problem Solving", "Sense Making", "Communication"], "proficiency": {"Cybersecurity Operations": 3, "Log Analysis": 3, "Incident Response": 2, "Risk Assessment": 2}, "source": "SkillsFuture-style cybersecurity sample"}, {"id": "cloud-data-engineer", "title": "Cloud Data Engineer", "sector": "ICT / Cloud & Data", "level": "Intermediate", "summary": "Builds reliable data pipelines and cloud data products for analytics and AI teams.", "tasks": ["Design data pipelines", "Operate cloud storage", "Automate data quality checks", "Document data contracts"], "skills": ["Python Programming", "SQL", "Cloud Platforms", "Data Engineering", "Data Quality", "Testing", "API Integration"], "core_skills": ["Problem Solving", "Collaboration", "Digital Fluency"], "proficiency": {"Data Engineering": 3, "Cloud Platforms": 3, "SQL": 3, "Data Quality": 2}, "source": "SkillsFuture-style cloud data sample"}, {"id": "learning-experience-designer", "title": "Learning Experience Designer", "sector": "Training & Adult Education", "level": "Intermediate", "summary": "Designs learner-centred programmes, assessments and coaching journeys.", "tasks": ["Analyse learner needs", "Design learning journeys", "Create assessments", "Evaluate learning outcomes"], "skills": ["Learning Needs Analysis", "Curriculum Design", "Facilitation", "Assessment Design", "User Research", "Data Visualisation"], "core_skills": ["Communication", "Creative Thinking", "Collaboration"], "proficiency": {"Learning Needs Analysis": 3, "Curriculum Design": 3, "Assessment Design": 2, "User Research": 2}, "source": "Training and adult education framework-style sample"}, {"id": "sustainability-data-coordinator", "title": "Sustainability Data Coordinator", "sector": "Green Economy / Corporate Services", "level": "Associate", "summary": "Collects ESG data, validates evidence and supports sustainability reporting.", "tasks": ["Collect ESG metrics", "Validate evidence", "Prepare reports", "Coordinate departments"], "skills": ["Data Analysis", "Spreadsheet Modelling", "Sustainability Reporting", "Stakeholder Communication", "Data Quality", "Documentation"], "core_skills": ["Communication", "Collaboration", "Sense Making"], "proficiency": {"Sustainability Reporting": 2, "Data Analysis": 2, "Data Quality": 2, "Stakeholder Communication": 3}, "source": "Green skills and corporate reporting demo sample"}];
const FALLBACK_SAMPLES = {"operations-coordinator": {"label": "Operations coordinator moving into data/automation", "current_role": "Operations Coordinator", "skills": ["Spreadsheet Modelling", "Stakeholder Communication", "Documentation", "Problem Solving", "Data Cleaning"], "interests": ["less manual reporting", "clear career ladder", "Python"], "hours_per_week": 5}, "marketing-exec": {"label": "Marketing executive exploring AI product roles", "current_role": "Marketing Executive", "skills": ["User Research", "Stakeholder Communication", "Data Visualisation", "Creative Thinking", "Communication"], "interests": ["AI tools", "product analytics", "user behaviour"], "hours_per_week": 4}, "support-engineer": {"label": "Support engineer considering cloud data or cyber", "current_role": "Support Engineer", "skills": ["Python Programming", "Technical Writing", "Problem Solving", "API Integration", "Log Analysis"], "interests": ["cloud", "security", "automation"], "hours_per_week": 6}};
const FALLBACK_RESOURCES = {"Python Programming": ["Automate a CSV/reporting task with Python", "Write tests for one script"], "SQL": ["Practise joins/window functions on a public dataset", "Explain one query plan in plain English"], "Data Visualisation": ["Rebuild one workplace dashboard with fewer charts", "Add annotations explaining the decision"], "AI Literacy": ["Complete an AI literacy module", "Document risks and safeguards for one AI workflow"], "Prompt Evaluation": ["Create 10 test cases for an AI assistant", "Score outputs for usefulness, safety and accuracy"], "Product Analytics": ["Define activation/retention metrics for a simple product", "Run a before/after analysis"], "Responsible AI": ["Write a privacy and bias checklist", "Add human review checkpoints"], "API Integration": ["Call one public API from Python", "Handle errors, retries and logging"], "Workflow Automation": ["Map a manual workflow", "Automate the smallest painful step first"], "Testing": ["Add unit tests around core logic", "Test happy path and one edge case"], "Cloud Platforms": ["Deploy a small service", "Explain storage, compute and monitoring choices"], "Data Engineering": ["Create an extract-transform-load pipeline", "Add data validation checks"], "Data Quality": ["Define quality rules", "Produce a failed-record report"], "Cybersecurity Operations": ["Triage sample alerts", "Write an incident timeline"], "Log Analysis": ["Parse logs with Python", "Find unusual patterns and explain them"], "Incident Response": ["Draft a playbook", "Run a tabletop exercise"], "Learning Needs Analysis": ["Interview 3 learners", "Turn needs into measurable outcomes"], "Curriculum Design": ["Storyboard a 2-hour module", "Align activities to outcomes"], "Assessment Design": ["Create a rubric", "Pilot it on one example"], "Sustainability Reporting": ["Map reporting metrics to evidence", "Create an audit trail"]};

async function apiGet(path, fallback) {
  try {
    const r = await fetch(path);
    if (!r.ok) throw new Error('api unavailable');
    return await r.json();
  } catch (_) { return fallback; }
}

async function apiRecommend(payload) {
  try {
    const r = await fetch('api/recommend', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    if (!r.ok) throw new Error('api unavailable');
    return await r.json();
  } catch (_) { return clientRecommend(payload); }
}

function norm(s) { return String(s).trim().toLowerCase().replace(/\s+/g, ' '); }
function buildPlan(gaps, title) {
  if (!gaps.length) return [{week:1, focus:'Validate readiness', actions:[`Build a portfolio artefact for ${title}`, 'Ask a practitioner for feedback']}];
  return [0,1,2,3].map(i => { const skill = gaps[i % gaps.length]; return {week:i+1, focus:skill, actions:(FALLBACK_RESOURCES[skill] || [`Find a credible course or guide for ${skill}`, `Apply ${skill} in a tiny work-like task`]).slice(0,2)}; });
}
function scoreRole(learner, role) {
  const learnerSet = new Set((learner.skills||[]).map(norm));
  const roleSkills = [...role.skills, ...(role.core_skills||[])];
  const matched = roleSkills.filter(s => learnerSet.has(norm(s)));
  const missing = roleSkills.filter(s => !learnerSet.has(norm(s)));
  const skillOverlap = role.skills.filter(s => learnerSet.has(norm(s))).length / Math.max(1, role.skills.length);
  const coreOverlap = (role.core_skills||[]).filter(s => learnerSet.has(norm(s))).length / Math.max(1, (role.core_skills||[]).length);
  const interestText = (learner.interests||[]).join(' ').toLowerCase();
  const hay = [role.title, role.sector, role.summary, ...role.skills];
  const hits = hay.filter(term => interestText.split(/\s+/).some(tok => tok && term.toLowerCase().includes(tok))).length;
  const interestFit = Math.min(1, hits/4);
  const score = Math.round((0.65*skillOverlap + 0.20*coreOverlap + 0.15*interestFit)*100);
  const topGaps = missing.slice(0,5);
  return { role_id:role.id, title:role.title, sector:role.sector, level:role.level, summary:role.summary, score, match_percent:Math.round(matched.length/Math.max(1, roleSkills.length)*100), matched_skills:matched, missing_skills:missing, explanation:`${role.title} scores ${score}/100: ${Math.round(skillOverlap*100)}% technical overlap, ${Math.round(coreOverlap*100)}% core-skills overlap, and transparent interest fit. Priority gaps: ${topGaps.join(', ') || 'none'}.`, evidence:[`Matched skills: ${matched.join(', ') || 'none yet'}`, `Missing skills from role profile: ${missing.slice(0,8).join(', ') || 'none'}`, `Key tasks considered: ${role.tasks.join(', ')}`, `Data source note: ${role.source}`], four_week_plan:buildPlan(topGaps, role.title) };
}
function clientRecommend(learner) {
  const recommendations = FALLBACK_ROLES.map(r => scoreRole(learner, r)).sort((a,b)=>b.score-a.score || b.match_percent-a.match_percent).slice(0,4);
  const top = recommendations[0];
  return { learner, recommendations, next_best_action:`This week: spend ${learner.hours_per_week || 4} hours building one tiny artefact around ${top.missing_skills[0] || top.title} for the ${top.title} pathway.`, method:{score:'65% technical skill overlap + 20% critical-core overlap + 15% interest fit', guardrail:'No hidden AI ranking: model math and role evidence are visible to the learner.', data:'SkillsFuture Skills Framework-style schema; demo dataset can be replaced with official spreadsheet import.'}, coach_note:`You are closest to ${top.title}. Focus on one portfolio artefact, show evidence, and ask a human mentor to sanity-check the path.` };
}

let lastResult = null;
const $ = (id) => document.getElementById(id);

async function loadSamples() {
  const samples = await apiGet('api/sample-learners', FALLBACK_SAMPLES);
  const select = $('sample-select');
  select.innerHTML = '<option value="">Sample profiles</option>' + Object.entries(samples).map(([key, s]) => `<option value="${key}">${s.label}</option>`).join('');
  select.addEventListener('change', () => {
    const s = samples[select.value];
    if (!s) return;
    $('current_role').value = s.current_role;
    $('skills').value = s.skills.join(', ');
    $('interests').value = s.interests.join(', ');
    $('hours').value = s.hours_per_week;
  });
}

function payloadFromForm() {
  return {
    current_role: $('current_role').value.trim(),
    skills: $('skills').value.split(',').map(s => s.trim()).filter(Boolean),
    interests: $('interests').value.split(',').map(s => s.trim()).filter(Boolean),
    hours_per_week: Number($('hours').value || 4)
  };
}

function list(items) { return `<ul>${items.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`; }
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function render(result) {
  const cards = result.recommendations.map((r, idx) => `
    <article class="card">
      <h3><span>${idx + 1}. ${escapeHtml(r.title)}</span><span class="badge">${r.score}/100</span></h3>
      <p class="meta">${escapeHtml(r.sector)} · ${escapeHtml(r.level)} · ${r.match_percent}% profile match</p>
      <p>${escapeHtml(r.summary)}</p>
      <p><b>Why:</b> ${escapeHtml(r.explanation)}</p>
      <div class="cols">
        <div><b>Matched</b>${list(r.matched_skills.slice(0, 8))}</div>
        <div><b>Priority gaps</b>${list(r.missing_skills.slice(0, 8))}</div>
      </div>
      <details>
        <summary>Evidence and data notes</summary>
        ${list(r.evidence)}
      </details>
      <h4>4-week action plan</h4>
      <div class="plan">
        ${r.four_week_plan.map(w => `<div class="week"><b>Week ${w.week}: ${escapeHtml(w.focus)}</b>${list(w.actions)}</div>`).join('')}
      </div>
    </article>`).join('');
  $('result').className = 'result';
  $('result').innerHTML = `
    <div class="topline"><b>Method:</b> ${escapeHtml(result.method.score)}<br><span class="meta">${escapeHtml(result.method.guardrail)}</span></div>
    <div class="next-action">${escapeHtml(result.next_best_action)}</div>
    <p><b>Coach note:</b> ${escapeHtml(result.coach_note)}</p>
    ${cards}
  `;
}

$('learner-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  $('result').className = 'result empty';
  $('result').textContent = 'Scoring pathways...';
  const res = await apiRecommend(payloadFromForm());
  lastResult = res;
  render(lastResult);
});

$('export-btn').addEventListener('click', () => {
  if (!lastResult) return;
  const blob = new Blob([JSON.stringify(lastResult, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'skillbridge-pathway.json';
  a.click();
});

loadSamples();
$('learner-form').dispatchEvent(new Event('submit'));
