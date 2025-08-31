import React, { useEffect, useState } from "react";

const VoiceTesterFr = () => {
  const [voices, setVoices] = useState([]);
  const [text, setText] = useState("Bonjour ! Ceci est un test.");

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      if (availableVoices.length > 0) {
        // Filtrer uniquement les voix françaises
        const frenchVoices = availableVoices.filter((v) => v.lang.startsWith("fr"));
        setVoices(frenchVoices);
      }
    };

    // Charger les voix maintenant
    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speak = (voice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Testeur de voix françaises</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ul className="space-y-2">
        {voices.map((voice, index) => (
          <li key={index} className="flex items-center space-x-2">
            <button
              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
              onClick={() => speak(voice)}
            >
              🔊
            </button>
            <div>
              <strong>{voice.name}</strong> ({voice.lang}){" "}
              {voice.default ? "- par défaut" : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoiceTesterFr;
