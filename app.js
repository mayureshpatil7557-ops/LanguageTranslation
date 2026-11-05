/* =========================================================
   LinguaFlow – App Logic
   API: MyMemory (free, no key required)
   ========================================================= */

'use strict';

// ── Language Data ─────────────────────────────────────────
const LANGUAGES = [
  { code: 'auto', name: '🔍 Auto Detect' },
  { code: 'en',   name: '🇬🇧 English' },
  { code: 'es',   name: '🇪🇸 Spanish' },
  { code: 'fr',   name: '🇫🇷 French' },
  { code: 'de',   name: '🇩🇪 German' },
  { code: 'it',   name: '🇮🇹 Italian' },
  { code: 'pt',   name: '🇵🇹 Portuguese' },
  { code: 'ru',   name: '🇷🇺 Russian' },
  { code: 'zh',   name: '🇨🇳 Chinese (Simplified)' },
  { code: 'ja',   name: '🇯🇵 Japanese' },
  { code: 'ko',   name: '🇰🇷 Korean' },
  { code: 'ar',   name: '🇸🇦 Arabic' },
  { code: 'hi',   name: '🇮🇳 Hindi' },
  { code: 'bn',   name: '🇧🇩 Bengali' },
  { code: 'tr',   name: '🇹🇷 Turkish' },
  { code: 'vi',   name: '🇻🇳 Vietnamese' },
  { code: 'th',   name: '🇹🇭 Thai' },
  { code: 'id',   name: '🇮🇩 Indonesian' },
  { code: 'ms',   name: '🇲🇾 Malay' },
  { code: 'nl',   name: '🇳🇱 Dutch' },
  { code: 'pl',   name: '🇵🇱 Polish' },
  { code: 'sv',   name: '🇸🇪 Swedish' },
  { code: 'no',   name: '🇳🇴 Norwegian' },
  { code: 'da',   name: '🇩🇰 Danish' },
  { code: 'fi',   name: '🇫🇮 Finnish' },
  { code: 'cs',   name: '🇨🇿 Czech' },
  { code: 'sk',   name: '🇸🇰 Slovak' },
  { code: 'hu',   name: '🇭🇺 Hungarian' },
  { code: 'ro',   name: '🇷🇴 Romanian' },
  { code: 'uk',   name: '🇺🇦 Ukrainian' },
  { code: 'el',   name: '🇬🇷 Greek' },
  { code: 'he',   name: '🇮🇱 Hebrew' },
  { code: 'fa',   name: '🇮🇷 Persian' },
  { code: 'ur',   name: '🇵🇰 Urdu' },
  { code: 'ta',   name: '🇮🇳 Tamil' },
  { code: 'te',   name: '🇮🇳 Telugu' },
  { code: 'ml',   name: '🇮🇳 Malayalam' },
  { code: 'kn',   name: '🇮🇳 Kannada' },
  { code: 'mr',   name: '🇮🇳 Marathi' },
  { code: 'gu',   name: '🇮🇳 Gujarati' },
  { code: 'pa',   name: '🇮🇳 Punjabi' },
  { code: 'sw',   name: '🇰🇪 Swahili' },
  { code: 'af',   name: '🇿🇦 Afrikaans' },
  { code: 'sq',   name: '🇦🇱 Albanian' },
  { code: 'ca',   name: '🇪🇸 Catalan' },
  { code: 'hr',   name: '🇭🇷 Croatian' },
  { code: 'sr',   name: '🇷🇸 Serbian' },
  { code: 'bg',   name: '🇧🇬 Bulgarian' },
  { code: 'lv',   name: '🇱🇻 Latvian' },
  { code: 'lt',   name: '🇱🇹 Lithuanian' },
  { code: 'et',   name: '🇪🇪 Estonian' },
  { code: 'sl',   name: '🇸🇮 Slovenian' },
  { code: 'mk',   name: '🇲🇰 Macedonian' },
  { code: 'tl',   name: '🇵🇭 Filipino' },
  { code: 'mt',   name: '🇲🇹 Maltese' },
  { code: 'is',   name: '🇮🇸 Icelandic' },
  { code: 'ga',   name: '🇮🇪 Irish' },
  { code: 'cy',   name: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh' },
];

const FLOAT_CHARS = [
  '文','語','言','あ','ア','한','字','Α','Б','ع','क','বা','ξ',
  'ש','ყ','ω','ñ','ü','ô','å','ø','ł','ę','ž','ç','ß'
];

// ── State ─────────────────────────────────────────────────
let totalCharsTranslated = 0;

// ── DOM Refs ───────────────────────────────────────────────
const $  = id => document.getElementById(id);
const sourceLangEl     = $('sourceLang');
const targetLangEl     = $('targetLang');
const inputTextEl      = $('inputText');
const translateBtn     = $('translateBtn');
const clearBtn         = $('clearBtn');
const swapBtn          = $('swapBtn');
const copyBtn          = $('copyBtn');
const ttsSourceBtn     = $('ttsSourceBtn');
const ttsTargetBtn     = $('ttsTargetBtn');
const charCountEl      = $('charCount');
const outputTextEl     = $('outputText');
const loadingStateEl   = $('loadingState');
const emptyStateEl     = $('emptyState');
const errorStateEl     = $('errorState');
const errorMsgEl       = $('errorMsg');
const toastEl          = $('toast');
const statCharsEl      = $('statChars');
const wordCountEl      = $('wordCount');
const confidenceBadgeEl= $('confidenceBadge');
const confidenceTextEl = $('confidenceText');
const langChips        = document.querySelectorAll('.lang-chip');

// ── Bootstrap ──────────────────────────────────────────────
(function init() {
  populateSelects();
  spawnFloatingChars();
  bindEvents();
  // Keyboard shortcut hint
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  translateBtn.title = `Translate (${isMac ? '⌘' : 'Ctrl'}+Enter)`;
})();

// ── Populate Dropdowns ────────────────────────────────────
function populateSelects() {
  const srcFrag = document.createDocumentFragment();
  const tgtFrag = document.createDocumentFragment();

  LANGUAGES.forEach(({ code, name }) => {
    const sOpt = new Option(name, code);
    if (code === 'auto') sOpt.selected = true;
    srcFrag.appendChild(sOpt);
    if (code !== 'auto') {
      const tOpt = new Option(name, code);
      if (code === 'es') tOpt.selected = true;
      tgtFrag.appendChild(tOpt);
    }
  });

  sourceLangEl.appendChild(srcFrag);
  targetLangEl.appendChild(tgtFrag);
}

// ── Floating Background Characters ────────────────────────
function spawnFloatingChars() {
  const container = document.getElementById('floatingChars');
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('span');
    el.className = 'float-char';
    el.textContent = FLOAT_CHARS[Math.floor(Math.random() * FLOAT_CHARS.length)];
    el.style.left             = `${Math.random() * 100}%`;
    el.style.fontSize         = `${13 + Math.random() * 18}px`;
    el.style.animationDuration = `${14 + Math.random() * 20}s`;
    el.style.animationDelay   = `${-Math.random() * 25}s`;
    container.appendChild(el);
  }
}

// ── Events ─────────────────────────────────────────────────
function bindEvents() {
  translateBtn.addEventListener('click', handleTranslate);
  clearBtn.addEventListener('click', handleClear);
  swapBtn.addEventListener('click', handleSwap);
  copyBtn.addEventListener('click', handleCopy);
  ttsSourceBtn.addEventListener('click', () => handleTTS('source'));
  ttsTargetBtn.addEventListener('click', () => handleTTS('target'));

  inputTextEl.addEventListener('input', updateCharCount);
  inputTextEl.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  });

  langChips.forEach(chip => {
    chip.addEventListener('click', () => {
      targetLangEl.value = chip.dataset.lang;
      langChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      showToast(`Target → ${chip.textContent.trim()}`);
    });
  });
}

function updateCharCount() {
  const len = inputTextEl.value.length;
  charCountEl.textContent = `${len} / 500`;
  charCountEl.className = 'char-count' +
    (len >= 450 ? ' danger' : len >= 350 ? ' warn' : '');
}

// ── Translate Handler ─────────────────────────────────────
async function handleTranslate() {
  const text = inputTextEl.value.trim();
  if (!text) {
    showToast('⚠️ Please enter some text first');
    inputTextEl.focus();
    return;
  }

  const src = sourceLangEl.value;
  const tgt = targetLangEl.value;

  if (src !== 'auto' && src === tgt) {
    showToast('⚠️ Source and target are the same language');
    return;
  }

  setUIState('loading');

  const t0 = Date.now();
  try {
    const result = await translateText(text, src, tgt);
    const ms = Date.now() - t0;
    displayResult(result, text, ms);
  } catch (err) {
    setUIState('error', err.message || 'Translation failed. Please try again.');
  }
}

// ── MyMemory API ──────────────────────────────────────────
async function translateText(text, from, to) {
  const langPair = from === 'auto' ? `|${to}` : `${from}|${to}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 12000);

  let res;
  try {
    res = await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) throw new Error(`API Error (HTTP ${res.status})`);

  const data = await res.json();
  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'Translation API returned an error');
  }

  const translated = data.responseData?.translatedText;
  if (!translated) throw new Error('No translation returned from API');

  return {
    text: translated,
    match: data.responseData?.match ?? null,
  };
}

// ── Display Result ────────────────────────────────────────
function displayResult(result, originalText, ms) {
  outputTextEl.textContent = result.text;

  // Word count
  const words = result.text.trim().split(/\s+/).filter(Boolean).length;
  wordCountEl.textContent = `${words} word${words !== 1 ? 's' : ''}`;
  wordCountEl.classList.remove('hidden');

  // Confidence
  if (result.match !== null) {
    const pct = Math.round(result.match * 100);
    const badge = confidenceBadgeEl;
    const dot   = badge.querySelector('.badge-dot');
    badge.classList.remove('hidden');

    if (pct >= 70) {
      confidenceTextEl.textContent = 'High';
      badge.style.cssText = 'background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.3);color:#34d399';
      dot.style.background = '#34d399';
    } else if (pct >= 40) {
      confidenceTextEl.textContent = 'Medium';
      badge.style.cssText = 'background:rgba(251,191,36,.1);border-color:rgba(251,191,36,.3);color:#fbbf24';
      dot.style.background = '#fbbf24';
    } else {
      confidenceTextEl.textContent = 'Low';
      badge.style.cssText = 'background:rgba(248,113,113,.1);border-color:rgba(248,113,113,.3);color:#f87171';
      dot.style.background = '#f87171';
    }
  }

  // Stats
  totalCharsTranslated += originalText.length;
  animateCount(statCharsEl, totalCharsTranslated);

  // Speed display
  const speedEl = document.getElementById('statSpeed');
  if (speedEl) speedEl.textContent = ms < 1000 ? `${ms}ms` : `${(ms/1000).toFixed(1)}s`;

  setUIState('result');
}

// ── UI State Machine ──────────────────────────────────────
function setUIState(state, msg = '') {
  emptyStateEl.classList.add('hidden');
  loadingStateEl.classList.add('hidden');
  outputTextEl.classList.add('hidden');
  errorStateEl.classList.add('hidden');
  confidenceBadgeEl.classList.add('hidden');
  wordCountEl.classList.add('hidden');
  copyBtn.disabled    = true;
  ttsTargetBtn.disabled = true;

  translateBtn.classList.remove('loading');
  translateBtn.querySelector('.btn-text').textContent = 'Translate';

  switch (state) {
    case 'loading':
      loadingStateEl.classList.remove('hidden');
      translateBtn.classList.add('loading');
      translateBtn.querySelector('.btn-text').textContent = 'Translating…';
      break;
    case 'result':
      outputTextEl.classList.remove('hidden');
      copyBtn.disabled      = false;
      ttsTargetBtn.disabled = false;
      break;
    case 'error':
      errorStateEl.classList.remove('hidden');
      errorMsgEl.textContent = msg;
      showToast(`❌ ${msg}`);
      break;
    default: // 'empty'
      emptyStateEl.classList.remove('hidden');
  }
}

// ── Clear ─────────────────────────────────────────────────
function handleClear() {
  inputTextEl.value = '';
  updateCharCount();
  setUIState('empty');
  inputTextEl.focus();
  showToast('Cleared');
}

// ── Swap ──────────────────────────────────────────────────
function handleSwap() {
  const src = sourceLangEl.value;
  const tgt = targetLangEl.value;

  if (src === 'auto') {
    showToast('💡 Set a specific source language to swap');
    return;
  }

  sourceLangEl.value = tgt;
  targetLangEl.value = src;

  // Swap text if translation exists
  const currentOutput = outputTextEl.textContent.trim();
  if (currentOutput && !outputTextEl.classList.contains('hidden')) {
    inputTextEl.value = currentOutput;
    updateCharCount();
    setUIState('empty');
  }

  showToast('⇄ Languages swapped');
}

// ── Copy ──────────────────────────────────────────────────
async function handleCopy() {
  const text = outputTextEl.textContent.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback
    const ta = Object.assign(document.createElement('textarea'), {
      value: text,
      style: 'position:fixed;opacity:0'
    });
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  const origHTML = copyBtn.innerHTML;
  copyBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 10 8 14 16 6"/></svg>`;
  copyBtn.classList.add('copied');
  showToast('✅ Copied to clipboard!');

  setTimeout(() => {
    copyBtn.innerHTML = origHTML;
    copyBtn.classList.remove('copied');
  }, 2000);
}

// ── Text-to-Speech ─────────────────────────────────────────
function handleTTS(which) {
  if (!('speechSynthesis' in window)) {
    showToast('⚠️ Text-to-speech not supported in your browser');
    return;
  }

  const btn  = which === 'source' ? ttsSourceBtn : ttsTargetBtn;
  const text = which === 'source'
    ? inputTextEl.value.trim()
    : outputTextEl.textContent.trim();
  const lang = which === 'source'
    ? (sourceLangEl.value === 'auto' ? 'en' : sourceLangEl.value)
    : targetLangEl.value;

  if (!text) { showToast('⚠️ Nothing to speak'); return; }

  window.speechSynthesis.cancel();

  if (btn.classList.contains('speaking')) {
    btn.classList.remove('speaking');
    return;
  }

  const utt  = new SpeechSynthesisUtterance(text);
  utt.lang   = lang;
  utt.rate   = 0.92;
  utt.pitch  = 1;

  const voices = window.speechSynthesis.getVoices();
  const voice  = voices.find(v => v.lang.startsWith(lang));
  if (voice) utt.voice = voice;

  btn.classList.add('speaking');
  utt.onend = utt.onerror = () => btn.classList.remove('speaking');
  window.speechSynthesis.speak(utt);
}

// Load voices eagerly
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ── Counter Animation ─────────────────────────────────────
function animateCount(el, target) {
  const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
  const delta = target - start;
  const steps = 28;
  let i = 0;
  const t = setInterval(() => {
    i++;
    el.textContent = Math.round(start + delta * (i / steps)).toLocaleString();
    if (i >= steps) { clearInterval(t); el.textContent = target.toLocaleString(); }
  }, 18);
}

// ── Toast ──────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, dur = 2800) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toastEl.classList.remove('show'), dur);
}
