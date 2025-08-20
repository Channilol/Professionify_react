import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <h2>
        Your <span className="gradient-text">formatted</span> text
      </h2>
      <h2>
        in just{" "}
        <span className="gradient-text hero-underline">FEW CLICKS!</span>
      </h2>
      <p className="hero-subtitle">
        Transform any text in professional content with the power of AI
      </p>
    </div>
  );
}
