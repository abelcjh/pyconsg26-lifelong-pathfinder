let lastResult = null;
const $ = (id) => document.getElementById(id);

async function loadSamples() {
  const samples = await fetch('/api/sample-learners').then(r => r.json());
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
  const res = await fetch('/api/recommend', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payloadFromForm())});
  lastResult = await res.json();
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
