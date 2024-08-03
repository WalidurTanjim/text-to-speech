document.addEventListener('DOMContentLoaded', () => {
    const synth = window.speechSynthesis;
    const textInput = document.getElementById('text-input');
    const speedInput = document.getElementById('speed');
    const voiceInput = document.getElementById('voice-select');
    const speechButton = document.getElementById('speech-btn');
    let voices = [];
    
    function populateVoiceList() {
        voices = synth.getVoices();
        // console.log({ voices })
        voiceInput.innerHTML = '';

        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceInput.appendChild(option);
        });
    }

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    speechButton.addEventListener('click', () => {
        const text = textInput.value;
        const speed = speedInput.value;
        const selectedVoiceIndex = voiceInput.value;
        speakText(text, speed, selectedVoiceIndex);
    });

    function speakText(text, speed, voiceIndex) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speed;
        utterance.voice = voices[voiceIndex];
        synth.speak(utterance);
    }
})