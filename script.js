        let demo = "";
        let voices = [];
        const voicesDropdown = document.querySelector('[name="voice"]');
        const options = document.querySelectorAll('[type="range"], [name="text"]');
        const speakButton = document.querySelector('#speak');
        const stopButton = document.querySelector('#stop');
        const textToSpeak = document.querySelector("#inputBox");
        const msg = new SpeechSynthesisUtterance(textToSpeak.innerHTML);
        //Your code goes here
        speechSynthesis.onvoiceschanged = function () {
            voices = speechSynthesis.getVoices();
            voicesDropdown.innerHTML = voices
                .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
        }

        // setup the event liseners

        speakButton.addEventListener("click", speak);
        stopButton.addEventListener("click", () => speechSynthesis.cancel());

        voicesDropdown.addEventListener("change", setVoice);
        options.forEach((option) => option.addEventListener("change", songChanges))

        function speak(e, setVoiceValue = demo) {
            // msg.voice = voices[voicesDropdown.value];
            const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
            console.log(voices);
            if (setVoiceValue ) {
                msg.voice=setVoiceValue
                speechSynthesis.speak(msg);
            }else{
            speechSynthesis.speak(msg);
            }
        }
        function setVoice(e) {
            e.target.value;
            console.log(voices)
            let voiceFinder = voices.find(voice => voice.name === e.target.value);
           
            demo = voiceFinder;
            console.log(demo);
           
        }
        function songChanges() {

        }
    
