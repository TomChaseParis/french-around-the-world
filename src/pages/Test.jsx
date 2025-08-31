import React, { useRef, useState } from 'react';
import audioEtreFile from "../etre.mp3";
import audioAvoirFile from "../avoir.mp3";
import audioFaireFile from "../faire.mp3";
import audioAllerFile from "../aller.mp3";
import testVideo from "../videoexo.mp4";
import TestTwo from './TestTwo'
import BenTop from "../Benoit Brisefer Vous avez l'heure (1).png"

const Test = () => {
  const audioEtre = useRef(new Audio(audioEtreFile));
  const audioAvoir = useRef(new Audio(audioAvoirFile));
  const audioFaire = useRef(new Audio(audioFaireFile));
  const audioAller = useRef(new Audio(audioAllerFile));

  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  //const [feedbacks, setFeedbacks] = useState({});

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
      videoRef.current.onended = () => setVideoPlaying(false);
    }
  };

  const playAudio = (audioRef) => {
    audioRef.current.play();
  };

 /*  const startRecognition = (expectedVerbs, key) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setFeedbacks(prev => ({ ...prev, [key]: "🎤 Parlez maintenant..." }));
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      let allCorrect = true;

      const feedbackArray = expectedVerbs.map(verb => {
        if (!transcript.includes(verb.toLowerCase())) {
          allCorrect = false;
          return `❌ ${verb}`;
        }
        return `✅ ${verb}`;
      });

      const feedbackText = feedbackArray.join(" | ");
      setFeedbacks(prev => ({ ...prev, [key]: feedbackText }));

      const voices = window.speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(allCorrect ? 
        "Bravo, tu as tout dit correctement !" : 
        "Il y a des erreurs, essaye encore !");
      utterance.voice = voices.find(v => v.name === "Google français") || voices[0];
      utterance.lang = "fr-FR";
      utterance.pitch = 0.9;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    };

    recognition.onerror = (event) => {
      setFeedbacks(prev => ({ ...prev, [key]: `Erreur : ${event.error}` }));
    };

    recognition.start();
  }; */

  return (
    <> 
      {/* VIDEO FIXÉE À GAUCHE */}
      <div className="fixed left-0 top-10 z-50 p-4">
        <video
          ref={videoRef}
          src={testVideo}
          className="w-96 rounded-lg shadow-lg"
          controls={false}
          aria-label="Vidéo exercice"
        />
        {!videoPlaying && (
          <button
            onClick={playVideo}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg hover:bg-opacity-30 transition"
            aria-label="Play video"
          >
            ▶ Play
          </button>
        )}
      </div>

      {/* IMAGE FIXÉE EN HAUT À DROITE */}
      <div className="absolute  top-10 right-0 z-50 pr-[90px]">
        <img className="h-[470px]" src={BenTop} alt="BenTop" />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="flex flex-col items-center pt-10 space-y-5">
        <h1 className="text-2xl font-bold">ÊTRE, AVOIR, ALLER, FAIRE</h1>

        <div className="relative"></div>

        <div className="flex flex-col">
          {/* Première rangée */}
          <div className="pt-[80px] grid grid-cols-2 gap-x-20">
            <div>
              <h4 className="font-bold mb-4 text-[20px]">ÊTRE</h4>
              <ul className=" list-decimal flex space-x-10 text-lg">
                <ul>
                  <li>1. Je <span className='font-bold'>suis</span></li>
                  <li>2. Tu <span className='font-bold'>es</span></li>
                  <li>3. Il <span className='font-bold'>est</span></li>
                </ul>
                <ul>
                  <li>4. Nous <span className='font-bold'>sommes</span></li>
                  <li>5. Vous <span className='font-bold'>êtes</span></li>
                  <li>6. Ils <span className='font-bold'>sont</span></li>
                </ul>
              </ul>
              <div className='flex flex-col'>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                  onClick={() => playAudio(audioEtre)}
                >
                  ECOUTER
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[20px]">AVOIR</h4>
              <ul className=" list-decimal flex space-x-10  text-lg">
                <ul>
                  <li>1. J'<span className='font-bold'>ai</span></li>
                  <li>2. Tu <span className='font-bold'>as</span></li>
                  <li>3. Il <span className='font-bold'>a</span></li>
                </ul>
                <ul>
                  <li>4. Nous <span className='font-bold'>avons</span></li>
                  <li>5. Vous <span className='font-bold'>avez</span></li>
                  <li>6. Ils <span className='font-bold'>ont</span></li>
                </ul>
              </ul>
              <div className='flex flex-col'>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                  onClick={() => playAudio(audioAvoir)}
                >
                  ECOUTER
                </button>
              </div>
            </div>
          </div>

          {/* Deuxième rangée */}
          <div className="pt-9 grid grid-cols-2 gap-x-20">
            <div>
              <h4 className="font-bold mb-4 text-[20px]">FAIRE</h4>
              <ul className="list-decimal flex space-x-10  text-lg">
                <ul>
                  <li>1. Je <span className='font-bold'>fais</span></li>
                  <li>2. tu <span className='font-bold'>fais</span></li>
                  <li>3. Il <span className='font-bold'>fait</span></li>
                </ul>
                <ul>
                  <li>4. Nous <span className='font-bold'>faisons</span></li>
                  <li>5. Vous <span className='font-bold'>faites</span></li>
                  <li>6. Ils <span className='font-bold'>font</span></li>
                </ul>
              </ul>
              <div className='flex flex-col'>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                  onClick={() => playAudio(audioFaire)}
                >
                  ECOUTER
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[20px]">ALLER</h4>
              <ul className="list-decimal flex space-x-10  text-lg ">
                <ul>
                  <li>1. Je <span className='font-bold'>vais</span></li>
                  <li>2. Tu <span className='font-bold'>vas</span></li>
                  <li>3. Il <span className='font-bold'>va</span></li>
                </ul>
                <ul>
                  <li>4. Nous <span className='font-bold'>allons</span></li>
                  <li>5. Vous <span className='font-bold'>allez</span></li>
                  <li>6. Ils <span className='font-bold'>vont</span></li>
                </ul>
              </ul>
              <div className='flex flex-col'>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                  onClick={() => playAudio(audioAller)}
                >
                  ECOUTER
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-[80px]'>
          <h1 className="text-2xl font-bold text-center">EXERCICE</h1>
          <div className='pt-[60px]'>
            <TestTwo />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Test;
