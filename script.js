document.getElementById('playBtn').addEventListener('click', () => {
  const text = document.getElementById('outputText').value;
  const selectedVoice = document.getElementById('voiceSelect').value;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(v => v.name === selectedVoice);
  speechSynthesis.speak(utterance);
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  speechSynthesis.pause();
});

document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('outputText').value;
  const targetLang = document.getElementById('languageSelect').value;

  if (!text.trim()) return alert("No text to translate.");

  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    document.getElementById('outputText').value = data.translatedText;
  } catch (err) {
    alert("Translation failed.");
  }
});

function populateVoices() {
  const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = voices.map(v => `<option value="\${v.name}">\${v.name}</option>`).join("");
}
speechSynthesis.onvoiceschanged = populateVoices;