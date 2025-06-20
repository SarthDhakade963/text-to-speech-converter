let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

const pitchRange = document.querySelector("#pitchRange");
const volumeRange = document.querySelector("#volumeRange");
const rateRange = document.querySelector("#rateRange");

const speakBtn = document.querySelector("#speakBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const stopBtn = document.querySelector("#stopBtn");


window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  if(!voices) console.log("Voices not loaded");
  if (!voices.length) return;

  speech.voice = voices[0];

  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Voice controller implement
speakBtn.addEventListener("click", () => {
  const text = document.querySelector("textarea").value;

  if (!text) return alert("Please enter some text");
  if (!voices.length) return alert("Voices not loaded yet. Please wait.");

  console.log("Speaking:", text);

  speech.text = text;
  speech.voice = voices[voiceSelect.value];
  
  speech.pitch = parseFloat(pitchRange.value);
  speech.rate = parseFloat(rateRange.value);
  speech.volume = parseFloat(volumeRange.value);

  window.speechSynthesis.cancel(); // block any current speech
  window.speechSynthesis.speak(speech);
});

pauseBtn.addEventListener("click", () => {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
  }
});

resumeBtn.addEventListener("click", () => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
});

stopBtn.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
