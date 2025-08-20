import React from "react";
import "./Dashboard.css";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Dropdowns from "../Dropdowns/Dropdowns";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Hero />
      <Dropdowns />
    </div>
  );
}
