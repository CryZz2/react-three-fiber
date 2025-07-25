import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Dice from './components/Dice';

const App = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger historique au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('diceHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarde auto
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('diceHistory', JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const rollDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    setDiceValue(random);
    setHistory(prev => [...prev, random]);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={rollDice}
        style={{
          margin: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '8px'
        }}
      >
        Lancer le dé
      </button>

      {/* Scène 3D */}
      <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
        <Canvas camera={{ position: [5, 5, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Dice value={diceValue} />
          <OrbitControls />
        </Canvas>
      </div>

      <h2>Historique des lancers :</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {history.map((val, i) => (
          <li key={i} style={{ fontSize: '20px' }}>
            Lancer {i + 1} : {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;