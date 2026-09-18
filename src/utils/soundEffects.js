let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

export function speakWelcome() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    "Welcome to the machine of agents, Omnivore"
  );

  message.rate = 0.72;
  message.pitch = 0.38;
  message.volume = 0.75;

  window.speechSynthesis.speak(message);
}

export function speakAgentsActivated() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    "Agents are activated"
  );

  message.rate = 0.68;
  message.pitch = 0.38;
  message.volume = 0.75;

  window.speechSynthesis.speak(message);
}

export function speakComplete() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    "Omnivore workflow complete"
  );

  message.rate = 0.68;
  message.pitch = 0.38;
  message.volume = 0.75;

  window.speechSynthesis.speak(message);
}

export function playCompletionSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    150,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    300,
    now + 0.7
  );

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(
    900,
    now
  );

  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.1,
    now + 0.06
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.9
  );

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.9);
}