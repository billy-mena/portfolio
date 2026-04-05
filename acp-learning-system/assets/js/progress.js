/**
 * ACP Learning System — Progress Tracker v1.0
 * localStorage-based progress persistence
 * Tracks task completion, scores, mode, time per learner session
 */

const ACPProgress = (() => {
  const STORAGE_KEY = 'acp_progress_v1';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initData();
    } catch { return initData(); }
  }

  function initData() {
    return {
      startDate: new Date().toISOString(),
      lastAccess: new Date().toISOString(),
      tasks: {},          // taskId → { started, completed, bestScore, attempts, lastMode, totalTime }
      domainScores: {},   // 'ps-2' → { attempts, bestPct }
      totalTime: 0
    };
  }

  function save(data) {
    data.lastAccess = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
  }

  function markTaskStarted(taskId) {
    const d = load();
    if (!d.tasks[taskId]) d.tasks[taskId] = { started: true, completed: false, attempts: 0, bestScore: 0, totalTime: 0 };
    d.tasks[taskId].started = true;
    d.tasks[taskId].attempts = (d.tasks[taskId].attempts || 0) + 1;
    save(d);
  }

  function saveTaskResult(taskId, score, mode, elapsedSec, hintsUsed) {
    const d = load();
    if (!d.tasks[taskId]) d.tasks[taskId] = { started: true, attempts: 1, bestScore: 0, totalTime: 0 };
    const t = d.tasks[taskId];
    t.completed = score.passed;
    t.bestScore = Math.max(t.bestScore || 0, score.pct);
    t.lastScore = score.pct;
    t.lastMode = mode;
    t.lastPassed = score.passed;
    t.totalTime = (t.totalTime || 0) + elapsedSec;
    t.hintsUsed = (t.hintsUsed || 0) + hintsUsed;
    d.totalTime = (d.totalTime || 0) + elapsedSec;

    // Update domain score
    const domainKey = `${taskId.split('-')[0]}-${taskId.split('-')[1]}`;
    if (!d.domainScores[domainKey]) d.domainScores[domainKey] = { attempts: 0, bestPct: 0, taskIds: [] };
    d.domainScores[domainKey].attempts++;
    d.domainScores[domainKey].bestPct = Math.max(d.domainScores[domainKey].bestPct, score.pct);
    if (!d.domainScores[domainKey].taskIds.includes(taskId)) d.domainScores[domainKey].taskIds.push(taskId);

    save(d);
    updateProgressUI();
  }

  function getTaskStatus(taskId) {
    const d = load();
    return d.tasks[taskId] || { started: false, completed: false, bestScore: 0, attempts: 0 };
  }

  function getOverallStats(tool) {
    const d = load();
    const prefix = tool + '-';
    const toolTasks = Object.entries(d.tasks).filter(([k]) => k.startsWith(prefix));
    const completed = toolTasks.filter(([,v]) => v.completed).length;
    const total = toolTasks.length;
    const avgScore = total > 0 ? Math.round(toolTasks.reduce((s,[,v]) => s + (v.bestScore||0), 0) / total) : 0;
    return { completed, total, avgScore };
  }

  function updateProgressUI() {
    const el = document.getElementById('progress-summary');
    if (!el) return;
    const d = load();
    const tools = ['photoshop', 'illustrator', 'indesign'];
    el.innerHTML = tools.map(t => {
      const s = getOverallStats(t);
      const pct = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
      const color = t === 'photoshop' ? '#31A8FF' : t === 'illustrator' ? '#FF9A00' : '#FF3366';
      return `<div class="prog-tool">
        <span class="prog-name" style="color:${color}">${t.charAt(0).toUpperCase()+t.slice(1)}</span>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <span class="prog-stat">${s.completed}/${s.total} · ${s.avgScore}%</span>
      </div>`;
    }).join('');
  }

  function resetAll() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }

  // Called by engine after task complete to determine next task
  function nextTask() {
    const nextBtn = document.getElementById('next-task-btn');
    if (nextBtn) nextBtn.click();
    else history.back();
  }

  // Initialize UI on page load
  function init() {
    updateProgressUI();
  }

  return { markTaskStarted, saveTaskResult, getTaskStatus, getOverallStats, updateProgressUI, resetAll, nextTask, init, load };
})();

document.addEventListener('DOMContentLoaded', ACPProgress.init);
