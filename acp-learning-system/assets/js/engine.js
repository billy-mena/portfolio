/**
 * ACP Learning System — Simulator Engine v1.0
 * Task runner, state management, guided/independent modes
 * Used by all 3 tool simulators (Photoshop, Illustrator, InDesign)
 */

const ACPEngine = (() => {

  let state = {
    taskConfig: null,
    currentStep: 0,
    mode: 'guided',       // 'guided' | 'independent'
    stepResults: [],
    startTime: null,
    timerEnabled: false,
    hintsUsed: 0,
    completed: false
  };

  let callbacks = {
    onStepCorrect: null,
    onStepIncorrect: null,
    onStepPartial: null,
    onTaskComplete: null,
    onModeChange: null,
    onHintRequest: null
  };

  // ── Load a task config object ──────────────────────────────────────
  function loadTask(config) {
    state.taskConfig = config;
    state.currentStep = 0;
    state.stepResults = new Array(config.steps.length).fill(null);
    state.startTime = Date.now();
    state.hintsUsed = 0;
    state.completed = false;
    ACPProgress.markTaskStarted(config.id);
    renderTaskHeader(config);
    renderStep(0);
  }

  // ── Set interaction mode ───────────────────────────────────────────
  function setMode(mode) {
    state.mode = mode;
    state.currentStep = 0;
    state.stepResults = new Array(state.taskConfig.steps.length).fill(null);
    state.hintsUsed = 0;
    state.completed = false;
    if (callbacks.onModeChange) callbacks.onModeChange(mode);
    renderStep(0);
  }

  function toggleMode() {
    setMode(state.mode === 'guided' ? 'independent' : 'guided');
  }

  // ── Validate a user action against the current step ───────────────
  function validateStep(userAction, userValue) {
    if (!state.taskConfig || state.completed) return;
    const step = state.taskConfig.steps[state.currentStep];
    const result = ACPScoring.evaluateStep(step, userAction, userValue);
    state.stepResults[state.currentStep] = result;

    if (result.status === 'correct') {
      if (callbacks.onStepCorrect) callbacks.onStepCorrect(step, result, state.currentStep);
      if (state.mode === 'guided') {
        setTimeout(() => advanceStep(), 800);
      }
    } else if (result.status === 'incorrect') {
      if (callbacks.onStepIncorrect) callbacks.onStepIncorrect(step, result, state.currentStep);
    } else if (result.status === 'partial') {
      if (callbacks.onStepPartial) callbacks.onStepPartial(step, result, state.currentStep);
    }

    updateStepDots();
    return result;
  }

  // ── Independent mode: submit all at once ──────────────────────────
  function submitIndependent(allAnswers) {
    if (!state.taskConfig) return;
    allAnswers.forEach((answer, i) => {
      const step = state.taskConfig.steps[i];
      if (step && answer !== null) {
        state.stepResults[i] = ACPScoring.evaluateStep(step, answer.action, answer.value);
      }
    });
    completeTask();
  }

  // ── Advance to next step ───────────────────────────────────────────
  function advanceStep() {
    if (state.currentStep < state.taskConfig.steps.length - 1) {
      state.currentStep++;
      renderStep(state.currentStep);
    } else {
      completeTask();
    }
  }

  function goToStep(index) {
    if (index >= 0 && index < state.taskConfig.steps.length) {
      state.currentStep = index;
      renderStep(index);
    }
  }

  // ── Request a hint ─────────────────────────────────────────────────
  function requestHint(level = 1) {
    if (state.mode !== 'guided') return null;
    const step = state.taskConfig.steps[state.currentStep];
    state.hintsUsed++;
    const hint = level === 1 ? step.hint1 : level === 2 ? step.hint2 : step.hint3;
    if (callbacks.onHintRequest) callbacks.onHintRequest(hint, level, state.currentStep);
    return hint;
  }

  // ── Complete the task ──────────────────────────────────────────────
  function completeTask() {
    state.completed = true;
    const score = ACPScoring.calculateScore(state.stepResults, state.taskConfig);
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    ACPProgress.saveTaskResult(state.taskConfig.id, score, state.mode, elapsed, state.hintsUsed);
    if (callbacks.onTaskComplete) {
      callbacks.onTaskComplete(score, state.taskConfig, state.mode, elapsed);
    }
  }

  // ── DOM rendering helpers ──────────────────────────────────────────
  function renderTaskHeader(config) {
    const header = document.getElementById('task-header');
    if (!header) return;
    header.innerHTML = `
      <div class="task-meta">
        <span class="acp-tag">${config.tool.toUpperCase()}-${config.objective}</span>
        <span class="badge badge-${config.tool}">${config.tool.charAt(0).toUpperCase() + config.tool.slice(1)}</span>
        <span class="badge badge-${config.domain <= 1 ? 'mc' : 'live'}">${config.bloomsLevel}</span>
        <span style="color:var(--text-tertiary);font-size:0.8rem;">~${config.estimatedMinutes} min</span>
      </div>
      <h2>${config.objectiveText}</h2>
      <p class="task-scenario">${config.scenario}</p>
      <div class="mode-toggle">
        <button class="btn btn-sm ${state.mode==='guided'?'btn-primary':'btn-ghost'}" onclick="ACPEngine.setMode('guided')">
          📚 Guided (Learn)
        </button>
        <button class="btn btn-sm ${state.mode==='independent'?'btn-primary':'btn-ghost'}" onclick="ACPEngine.setMode('independent')">
          🎯 Independent (Practice)
        </button>
      </div>
    `;
  }

  function renderStep(index) {
    const el = document.getElementById('step-panel');
    if (!el || !state.taskConfig) return;
    const step = state.taskConfig.steps[index];
    const total = state.taskConfig.steps.length;

    if (state.mode === 'guided') {
      el.innerHTML = `
        <div class="step-header">
          <div class="step-counter">Step ${index + 1} of ${total}</div>
          <div class="step-dots">${renderDots(total, index)}</div>
        </div>
        <div class="step-instruction animate-fade">
          <div class="gagne-tag">Gagne: ${getGagneLabel(step.gagneEvent || 6)}</div>
          <p>${step.instruction}</p>
        </div>
        <div id="hint-area"></div>
        <div id="feedback-area"></div>
        <div class="step-actions">
          <button class="btn btn-ghost btn-sm" onclick="ACPEngine.requestHintLevel(1)">💡 Hint</button>
          ${index > 0 ? '<button class="btn btn-ghost btn-sm" onclick="ACPEngine.goToStep(ACPEngine.getState().currentStep-1)">← Back</button>' : ''}
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="step-header">
          <div class="step-counter">Independent practice — ${total} steps</div>
          <p style="font-size:0.85rem;color:var(--text-tertiary);">Complete all steps, then click Submit.</p>
        </div>
        <div id="feedback-area"></div>
      `;
    }
    updateStepDots();
  }

  function renderDots(total, current) {
    return Array.from({length: total}, (_, i) => {
      const r = state.stepResults[i];
      const cls = r === null ? (i === current ? 'current' : '') :
                  r.status === 'correct' ? 'done' : 'error';
      return `<div class="step-dot ${cls}"></div>`;
    }).join('');
  }

  function updateStepDots() {
    const container = document.querySelector('.step-dots');
    if (!container || !state.taskConfig) return;
    container.innerHTML = renderDots(state.taskConfig.steps.length, state.currentStep);
  }

  function getGagneLabel(event) {
    const labels = {
      1:'Gain attention', 2:'Inform objectives', 3:'Stimulate recall',
      4:'Present content', 5:'Provide guidance', 6:'Elicit performance',
      7:'Provide feedback', 8:'Assess performance', 9:'Enhance retention'
    };
    return labels[event] || `Event ${event}`;
  }

  function showFeedback(status, message, acpContext) {
    const el = document.getElementById('feedback-area');
    if (!el) return;
    const icon = status === 'correct' ? '✓' : status === 'incorrect' ? '✗' : '~';
    el.innerHTML = `
      <div class="feedback-block ${status} animate-fade">
        <strong>${icon} ${status.charAt(0).toUpperCase() + status.slice(1)}</strong>
        <p>${message}</p>
        ${acpContext ? `<p class="acp-context" style="margin-top:0.4rem;font-size:0.8rem;opacity:0.8;">${acpContext}</p>` : ''}
      </div>
    `;
  }

  function showHint(hint, level) {
    const el = document.getElementById('hint-area');
    if (!el) return;
    el.innerHTML = `
      <div class="feedback-block partial animate-fade" style="margin:0.5rem 0;">
        <strong>💡 Hint ${level}</strong>
        <p>${hint}</p>
      </div>
    `;
  }

  // ── Public hint with level cycling ────────────────────────────────
  let currentHintLevel = 0;
  function requestHintLevel(startLevel) {
    currentHintLevel = Math.min((currentHintLevel || 0) + 1, 3);
    const hint = requestHint(currentHintLevel);
    if (hint) showHint(hint, currentHintLevel);
  }

  // ── Register callbacks ─────────────────────────────────────────────
  function on(event, fn) { callbacks[event] = fn; }

  function getState() { return { ...state }; }

  return {
    loadTask, setMode, toggleMode, validateStep, submitIndependent,
    advanceStep, goToStep, requestHint, requestHintLevel,
    showFeedback, showHint, on, getState, renderTaskHeader
  };
})();
