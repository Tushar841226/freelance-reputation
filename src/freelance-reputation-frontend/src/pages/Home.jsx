import React, { useState } from "react";

const freelancers = [
  { name: "Alice Johnson", rating: 4.8, reviews: 120 },
  { name: "Bob Smith", rating: 4.6, reviews: 90 },
  { name: "Charlie Davis", rating: 4.9, reviews: 150 }
];

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setWalletConnected(true);
    alert("Wallet connected successfully!");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>
        Decentralized Reputation for Freelancers
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "24px" }}>
        A trustless way for clients to verify freelancer reputation on the blockchain.
      </p>

      <button 
        onClick={handleWalletConnect} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", marginBottom: "24px" }}
      >
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
        Top Rated Freelancers
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {freelancers.map((freelancer, index) => (
          <div key={index} style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "500" }}>{freelancer.name}</h3>
            <p>⭐ {freelancer.rating} ({freelancer.reviews} reviews)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
