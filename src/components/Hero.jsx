import React from "react";
import Button from "./Button"; // Import the Button component

const Hero = () => {
  return (
    <div className="text-center bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to GOAL DIGGER</h1>
      <p className="text-lg text-gray-700 mt-4">
        Your AI-powered Career Guidance Chatbot
      </p>
      <div className="mt-6">
        <Button text="Get Started" />
      </div>
    </div>
  );
};

export default Hero;
