import React from 'react';
import NFTEvolutiveCard from './components/NFTEvolutiveCard';

function App() {
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>MELANO IRA™ Evolutivo</h1>
      <NFTEvolutiveCard tokenId={1} />
    </div>
  );
}

export default App;