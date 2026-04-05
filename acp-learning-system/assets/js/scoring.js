/**
 * ACP Learning System — Scoring & Validation Engine v1.0
 * Evaluates user actions against expected step outcomes
 * Returns: { status: 'correct'|'incorrect'|'partial', score, feedback }
 */

const ACPScoring = (() => {

  // ── Evaluate a single step ─────────────────────────────────────────
  function evaluateStep(step, userAction, userValue) {
    if (!step) return { status: 'incorrect', score: 0, feedback: 'Step not found.' };

    // Action type match
    const actionMatch = !step.expectedAction || userAction === step.expectedAction;

    // Value match — supports exact, range, contains, any
    let valueMatch = true;
    if (step.expectedValue !== undefined && step.expectedValue !== null) {
      valueMatch = matchValue(step.expectedValue, userValue, step.matchType || 'exact');
    }

    if (actionMatch && valueMatch) {
      return {
        status: 'correct',
        score: 1,
        feedback: step.correctFeedback || 'Correct!',
        acpContext: step.acpContext || ''
      };
    }

    // Partial credit check
    if (step.partialValues && matchPartial(step.partialValues, userValue)) {
      return {
        status: 'partial',
        score: 0.5,
        feedback: step.partialFeedback || 'Close — check the details.',
        acpContext: step.acpContext || ''
      };
    }

    return {
      status: 'incorrect',
      score: 0,
      feedback: step.incorrectFeedback || 'Incorrect. Try again.',
      acpContext: step.acpContext || '',
      correctValue: step.expectedValue
    };
  }

  function matchValue(expected, actual, type) {
    if (actual === undefined || actual === null) return false;
    switch (type) {
      case 'exact':
        return String(actual).toLowerCase().trim() === String(expected).toLowerCase().trim();
      case 'contains':
        return String(actual).toLowerCase().includes(String(expected).toLowerCase());
      case 'range':
        return parseFloat(actual) >= expected.min && parseFloat(actual) <= expected.max;
      case 'any':
        return Array.isArray(expected) ? expected.some(e => matchValue(e, actual, 'exact')) : true;
      case 'truthy':
        return !!actual;
      default:
        return actual === expected;
    }
  }

  function matchPartial(partialValues, actual) {
    return partialValues.some(v => matchValue(v, actual, 'exact'));
  }

  // ── Calculate task score ───────────────────────────────────────────
  function calculateScore(stepResults, config) {
    const total = config.steps.length;
    const answered = stepResults.filter(r => r !== null);
    const correct = stepResults.filter(r => r && r.status === 'correct').length;
    const partial = stepResults.filter(r => r && r.status === 'partial').length;
    const raw = correct + (partial * 0.5);
    const pct = Math.round((raw / total) * 100);
    const passed = pct >= 70;

    return {
      correct, partial, incorrect: total - correct - partial,
      total, raw, pct, passed,
      objectiveCode: `${config.tool.charAt(0).toUpperCase()}s-${config.objective}`,
      bloomsLevel: config.bloomsLevel,
      domain: config.domain,
      label: passed ? (pct === 100 ? 'Excellent' : 'Passed') : 'Needs more practice',
      color: passed ? (pct === 100 ? '#00D68F' : '#31A8FF') : '#FFB800'
    };
  }

  // ── Score report HTML ─────────────────────────────────────────────
  function renderScoreReport(score, config, mode, elapsedSec, hintsUsed) {
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

    return `
      <div class="score-report animate-fade">
        <div class="score-ring" style="--pct:${score.pct};--color:${score.color}">
          <div class="score-inner">
            <div class="score-num" style="color:${score.color}">${score.pct}%</div>
            <div class="score-label">${score.label}</div>
          </div>
        </div>
        <div class="score-details">
          <div class="score-stat"><span class="score-stat-n" style="color:var(--correct)">${score.correct}</span><span>Correct</span></div>
          <div class="score-stat"><span class="score-stat-n" style="color:var(--partial)">${score.partial}</span><span>Partial</span></div>
          <div class="score-stat"><span class="score-stat-n" style="color:var(--incorrect)">${score.incorrect}</span><span>Incorrect</span></div>
        </div>
        <div class="acp-citation">
          <span class="acp-tag">${score.objectiveCode}</span>
          <span style="font-size:0.85rem;color:var(--text-secondary);">${config.objectiveText}</span>
        </div>
        <div class="score-meta" style="font-size:0.8rem;color:var(--text-tertiary);margin-top:0.5rem;">
          Mode: ${mode === 'guided' ? '📚 Guided' : '🎯 Independent'} &nbsp;·&nbsp;
          Time: ${timeStr} &nbsp;·&nbsp;
          Hints used: ${hintsUsed}
        </div>
        <div class="score-actions">
          <button class="btn btn-ghost btn-sm" onclick="ACPEngine.setMode('${mode}')">🔄 Try again</button>
          <button class="btn btn-ghost btn-sm" onclick="ACPEngine.setMode('${mode==='guided'?'independent':'guided'}')">
            ${mode === 'guided' ? '🎯 Try independent' : '📚 Review in guided mode'}
          </button>
          ${score.passed ? '<button class="btn btn-primary btn-sm" onclick="ACPProgress.nextTask()">Next task →</button>' : ''}
        </div>
        ${renderStepBreakdown(score, config)}
      </div>
    `;
  }

  function renderStepBreakdown(score, config) {
    return `
      <details class="step-breakdown" style="margin-top:1rem;">
        <summary style="cursor:pointer;font-size:0.85rem;color:var(--text-secondary);padding:0.5rem 0;">
          View step-by-step breakdown
        </summary>
        <div class="breakdown-table">
          ${config.steps.map((step, i) => {
            // Note: in real usage, stepResults passed in; here we render config only
            return `<div class="breakdown-row">
              <span class="breakdown-num">${i+1}</span>
              <span class="breakdown-text">${step.instruction}</span>
            </div>`;
          }).join('')}
        </div>
      </details>
    `;
  }

  return { evaluateStep, calculateScore, renderScoreReport };
})();
