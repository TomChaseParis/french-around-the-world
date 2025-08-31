import React, { useState, useEffect } from "react";

const categories = [
  {
    title: "1. ÊTRE",
    items: [
      { phrase: "Qui ....... étudiant ? Qui travaille ?", word: "est" },
      { phrase: "Où ....... les toilettes ?", word: "sont" },
      { phrase: "Je ne ....... pas français", word: "pas" },
      { phrase: "Tu ....... fatigué ?", word: "es" },
      { phrase: "Nous ....... étrangers", word: "sommes" },
      { phrase: "Merci, vous ....... bien aimables", word: "êtes" },
      { phrase: "On ....... en retard. Excusez-nous", word: "est" },
    ],
  },
  {
    title: "2. AVOIR",
    items: [
      { phrase: "Tu ....... quel âge ?", word: "as" },
      { phrase: "Excusez-moi, je n'....... pas le temps", word: "ai" },
      { phrase: "Ils n'....... pas d'argent", word: "ont" },
      { phrase: "Pardon, vous ....... l'heure ?", word: "avez" },
      { phrase: "Nous ....... un problème", word: "avons" },
      { phrase: "Elle ....... 15 ans", word: "a" },
      { phrase: "Vous ....... une minute s'il vous plaît ?", word: "avez" },
      { phrase: "On ....... faim et soif", word: "a" },
    ],
  },
  {
    title: "3. FAIRE",
    items: [
      { phrase: "Qu'est-ce qu'elle ....... comme études ?", word: "fait" },
      { phrase: "Vous ....... du sport ?", word: "faites" },
      { phrase: "Elles ....... un voyage en Asie", word: "font" },
      { phrase: "Je vous ....... un café ?", word: "fais" },
      { phrase: "Il ....... froid aujourd'hui ?", word: "fait" },
      { phrase: "Nous ....... des études en France", word: "faisons" },
      { phrase: "Qu'est-ce que tu ....... ce soir ?", word: "fais" },
    ],
  },
  {
    title: "4. ALLER",
    items: [
      { phrase: "Vous ....... bien ?", word: "allez" },
      { phrase: "Elle ....... où ?", word: "va" },
      { phrase: "On ....... au cinéma ?", word: "va" },
      { phrase: "Tu ....... téléphoner ?", word: "vas" },
      { phrase: "Mes parents ne ....... pas bien", word: "vont" },
      { phrase: "Je ....... avec toi", word: "vais" },
      { phrase: "Nous ....... à la banque", word: "allons" },
    ],
  },
];

// Réponses correctes aléatoires
const correctResponses = [
  "Très bien, c'est correct !",
  "Bravo, tu as trouvé la bonne réponse !",
  "Parfait, on continue comme ça !",
  "Exactement, c’est la bonne phrase !",
  "Super, tu progresses !"
];

// Mauvaises réponses aléatoires
const wrongResponses1 = [
  "Ce n’est pas ça, essaie encore.",
  "Mauvaise réponse, essaye à nouveau.",
  "Non, écoute bien et recommence.",
  "Raté, essaie encore une fois.",
  "Pas correct, refais un essai."
];

const wrongResponses2 = [
  "Toujours incorrect, concentre-toi.",
  "Non, ce n’est pas encore juste.",
  "Pas encore bon, essaie à nouveau.",
  "Faux, continue de chercher.",
  "Ce n’est toujours pas ça, réessaie."
];

const ExerciceStructure = () => {
  const [voices, setVoices] = useState([]);
  const [feedbacks, setFeedbacks] = useState(
    categories.map((cat) => cat.items.map(() => ""))
  );
  const [attempts, setAttempts] = useState(
    categories.map((cat) => cat.items.map(() => 0))
  );

  // Charger les voix au démarrage
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      if (availableVoices.length > 0) setVoices(availableVoices);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === "Google français") || voices[0];
    if (voice) utterance.voice = voice;
    utterance.lang = "fr-FR";
    utterance.pitch = 0.9;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startRecognition = (catIndex, itemIndex) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      const newFeedbacks = feedbacks.map((cat) => [...cat]);
      newFeedbacks[catIndex][itemIndex] = "🎤 Parlez maintenant...";
      setFeedbacks(newFeedbacks);
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += " " + event.results[i][0].transcript;
        }
      }
    };

    recognition.onend = () => {
      const transcriptNormalized = finalTranscript.toLowerCase().trim();
      const { phrase, word } = categories[catIndex].items[itemIndex];
      const currentWord = word.toLowerCase();

      const newFeedbacks = feedbacks.map((cat) => [...cat]);
      const newAttempts = attempts.map((cat) => [...cat]);

      if (transcriptNormalized.includes(currentWord)) {
        const randomCorrect = correctResponses[Math.floor(Math.random() * correctResponses.length)];
        newFeedbacks[catIndex][itemIndex] = `✅` + randomCorrect;
        speak(randomCorrect);
        newAttempts[catIndex][itemIndex] = 0;
      } else {
        newAttempts[catIndex][itemIndex] += 1;
        const attemptCount = newAttempts[catIndex][itemIndex];
        if (attemptCount === 1) {
          const randomWrong1 = wrongResponses1[Math.floor(Math.random() * wrongResponses1.length)];
          newFeedbacks[catIndex][itemIndex] = randomWrong1;
          speak(`${randomWrong1} Répète après moi : ${phrase.replace(".......", word)}`);
        } else if (attemptCount === 2) {
          const randomWrong2 = wrongResponses2[Math.floor(Math.random() * wrongResponses2.length)];
          newFeedbacks[catIndex][itemIndex] = randomWrong2;
          speak(randomWrong2);
        } else {
          newFeedbacks[catIndex][itemIndex] = `❌ Mauvaise réponse. La phrase correcte était : "${phrase.replace(
            ".......",
            word
          )}".`;
          speak(`La phrase correcte était : ${phrase.replace(".......", word)}`);
          newAttempts[catIndex][itemIndex] = 0;
        }
      }

      setFeedbacks(newFeedbacks);
      setAttempts(newAttempts);
    };

    recognition.onerror = (event) => {
      const newFeedbacks = feedbacks.map((cat) => [...cat]);
      newFeedbacks[catIndex][itemIndex] = `Erreur : ${event.error}`;
      setFeedbacks(newFeedbacks);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col space-y-10 pb-10">
      {/* Première ligne : ÊTRE et AVOIR */}
      <div className="grid grid-cols-2 gap-x-20">
        {[0, 1].map((catIndex) => (
          <div key={catIndex}>
            <h4 className="font-bold mb-4 text-[20px]">
              {categories[catIndex].title}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-lg">
              {categories[catIndex].items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    onClick={() => startRecognition(catIndex, itemIndex)}
                  >
                    🎤
                  </button>
                  <div>
                    {item.phrase}
                    <div className="text-sm text-gray-600">
                      {feedbacks[catIndex][itemIndex]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Deuxième ligne : FAIRE et ALLER */}
      <div className="grid grid-cols-2 gap-x-20">
        {[2, 3].map((catIndex) => (
          <div key={catIndex}>
            <h4 className="font-bold mb-4 text-[20px]">
              {categories[catIndex].title}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-lg">
              {categories[catIndex].items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    onClick={() => startRecognition(catIndex, itemIndex)}
                  >
                    🎤
                  </button>
                  <div>
                    {item.phrase}
                    <div className="text-sm text-gray-600">
                      {feedbacks[catIndex][itemIndex]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciceStructure;
