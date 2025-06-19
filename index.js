let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

const pitchRange = document.querySelector("pitchRange");
const volumeRange = document.querySelector("volumeRange");
const rateRange = document.querySelector("rateRange");

const pitchValue = document.querySelector("pitchValue");
const volumeValue = document.querySelector("volumeValue");
const rateValue = document.querySelector("rateValue");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;

  speech.voice = voices[0];
  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Update displayed values
pitchRange.addEventListener("input", () => {
  pitchValue.textContent = pitchRange.value;
});

rateRange.addEventListener("input", () => {
  rateValue.textContent = rateRange.value;
});

volumeRange.addEventListener("input", () => {
  volumeRange.textContent = volumeRange.value;
});

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value.trim();
  if (!text) alert("Please enter some text");

  speech.text = text;
  speech.voice = voices[voiceSelect.value];
  speech.pitch = parseFloat(pitchRange.value);
  speech.rate = parseFloat(rateRange.value);
  speech.volume = parseFloat(volumeRange.value);


  window.speechSynthesis.cancel(); // block any ongoing voice 
  window.speechSynthesis.speak(speech);
});
