let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const rateSlider = document.querySelector('[name="rate"]');
const pitchSlider = document.querySelector('[name="pitch"]');
const textToSpeak = document.querySelector("#inputBox");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const msg = new SpeechSynthesisUtterance();

// Populate voices when they are available
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Set voice from dropdown
function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    if (selectedVoice) {
        msg.voice = selectedVoice;
    }
}

// Update rate & pitch settings
function updateSettings() {
    msg.rate = rateSlider.value;
    msg.pitch = pitchSlider.value;
}

// Speak function
function speak() {
    if (!textToSpeak.value.trim()) {
        alert("Please enter text before speaking.");
        return;
    }

    msg.text = textToSpeak.value;
    speechSynthesis.cancel(); // Stop any ongoing speech before starting fresh
    speechSynthesis.speak(msg);
}

// Stop function
function stopSpeech() {
    speechSynthesis.cancel(); // Stops the speech immediately
}

// Event listeners
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
rateSlider.addEventListener("input", updateSettings);
pitchSlider.addEventListener("input", updateSettings);
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stopSpeech);
