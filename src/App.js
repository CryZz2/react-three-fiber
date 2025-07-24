import React, { useState, useEffect } from 'react';

const Dice = () => {
  // 1️⃣ État local pour la valeur du dé (entre 1 et 6)
  const [diceValue, setDiceValue] = useState(1);
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 2️⃣ Tableau d'émojis représentant les faces du dé
  const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];


  // Charger depuis localStorage une seule fois
  useEffect(() => {
    const savedHistory = localStorage.getItem('diceHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    setIsLoaded(true); // ✅ Indique que le chargement est fait
  }, []);

  // Sauvegarder uniquement après le chargement initial
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('diceHistory', JSON.stringify(history));
    }
  }, [history, isLoaded]);


  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);
    setHistory(prev => [...prev, randomValue]);
  };


  return (
    <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '50px' }}>
      <div style={{ fontSize: '100px' }}>
        {/* 3️⃣ Affiche l'émoji correspondant à la valeur actuelle */}
        {diceFaces[diceValue - 1]}
      </div>
      <button
        onClick={rollDice}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '8px'
        }}
      >
        Lancer le dé
      </button>

      <h2 style={{ marginTop: '40px' }}>Historique des lancers :</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {history.map((value, index) => (
          <li key={index} style={{ fontSize: '24px' }}>
            Lancer {index + 1}: {diceFaces[value - 1]}
          </li>
        ))}
      </ul>


    </div>
  );
};

export default Dice;