import React, { useState, useEffect } from "react";

const categories = [
  {
    items: [
      { phrase: "Mes amis ....... une maison à la campagne.", word: "ont" },
      { phrase: "La mère de Lucie ....... espagnole", word: "est" },
      { phrase: "Pierre et Jacques ....... du sport tous les week end.", word: "font" },
      { phrase: "Tu ....... au théâtre.", word: "vas" },
      { phrase: "Louna ....... photographe.", word: "est" },
      { phrase: "Tu ....... froid ?", word: "as" },
      { phrase: "Je ....... au supermarché en voiture", word: "vais" },
      { phrase: "Nous ....... célibataires", word: "sommes" },
      { phrase: "Vous ....... 20 ans", word: "avez" },
      { phrase: "Mes cousines ....... un ami à Lisbonne", word: "ont" },
      { phrase: "Lucien ....... un téléphone portable", word: "a" },
      { phrase: "Nous ....... au bureau à pied.", word: "allons" },
      { phrase: "Vous ....... les courses le samedi matin.", word: "faites" },
      { phrase: "Tu ....... triste.", word: "es" },
      { phrase: "La soupe ....... chaude.", word: "est" },
      { phrase: "Ils ....... du tennis.", word: "font" },
      { phrase: "Le bébé ....... faim", word: "a" },
      { phrase: "Thérèse ....... au supermarché en voiture", word: "vais" },
      { phrase: "Jasmine ....... sommeil.", word: "a" },
      { phrase: "Vous ....... au restaurant tous les soirs.", word: "allez" },
      { phrase: "Vous ....... en retard ce matin.", word: "êtes" },
      { phrase: "Mes voisins ....... la fête tous les vendredis soirs.", word: "font" },
      { phrase: "Vous ....... soif ?", word: "avez" },
      { phrase: "Ses parents ....... en Argentine pour les vacances.", word: "sont" },
    ],
  },
];

const correctResponses = [
  "Très bien, c'est correct !",
  "Bravo, tu as trouvé la bonne réponse !",
  "Parfait, on continue comme ça !",
  "Exactement, c’est la bonne phrase !",
  "Super, tu progresses !"
];

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
      <div className="grid grid-cols-2 gap-x-20">
        {categories.map((category, catIndex) => (
          <div key={catIndex}>
            <h4 className="font-bold mb-4 text-[20px]">
              Catégorie {catIndex + 1}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-lg">
              {category.items.map((item, itemIndex) => (
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
