import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import CognitiveAIModal from './CognitiveAIModal.jsx';
import AddFilesModal from './AddFilesModal.jsx';
import AdaptiveSystemsModal from './AdaptiveSystemsModal.jsx';
import './App.css';

const EASE = [0.16, 1, 0.3, 1];

export default function App() {
  const [isCognitiveAIOpen, setIsCognitiveAIOpen] = useState(false);
  const [isAddFilesOpen, setIsAddFilesOpen] = useState(false);
  const [isAdaptiveSystemsOpen, setIsAdaptiveSystemsOpen] = useState(false);
  const [customDataset, setCustomDataset] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="hero-container">
      {/* 1. Fixed Navbar at Top (z-index 50) */}
      <motion.nav
        className="hero-navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        aria-label="Main Navigation"
      >
        {/* Left Side Navigation Items */}
        <div className="nav-left nav-interactive">
          {/* Logo & Brand Name */}
          <a href="#" className="brand-group" aria-label="Knightfall Home">
            <span className="brand-icon-wrap">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g transform="rotate(-35 12 12)">
                  <rect x="7.25" y="3.5" width="3.5" height="17" rx="1.75" fill="#000000" />
                  <rect x="13.25" y="3.5" width="3.5" height="17" rx="1.75" fill="#000000" />
                </g>
              </svg>
            </span>
            <span className="brand-name">Knightfall</span>
          </a>

          {/* Menu Button: Black pill with white circle containing Plus icon */}
          <button 
            className="menu-btn" 
            type="button" 
            aria-label="Add Files & Ingest Data"
            onClick={() => setIsAddFilesOpen(true)}
          >
            <span className="menu-circle">
              <Plus size={12} strokeWidth={3} />
            </span>
            <span className="menu-text">Add Files</span>
          </button>

          {/* Dedicated Knightfall AI Pill (always visible on all screen sizes) */}
          <button 
            className="cognitive-direct-pill"
            type="button"
            onClick={() => setIsCognitiveAIOpen(true)}
            aria-label="Launch Knightfall AI Analyst"
          >
            <span className="active-glow-dot" />
            <span className="cognitive-direct-text">Knightfall AI</span>
          </button>

          {/* Tags Pill: Light gray pill with category labels */}
          <div className="tags-pill" role="region" aria-label="Category tags">
            <span className="tag-label">Advanced Bionics</span>
            <span className="tag-separator" aria-hidden="true" />
            <span className="tag-label">Neural Kinetics</span>
          </div>
        </div>

        {/* Right Side Navigation Items */}
        <div className="nav-right nav-interactive">
          {/* AI Query Pill */}
          <div 
            className="adaptive-pill" 
            role="button" 
            tabIndex={0} 
            aria-label="AI Query — Human Questions"
            onClick={() => setIsAdaptiveSystemsOpen(true)}
          >
            <span className="grid-circle-btn">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="3.5" cy="3.5" r="1.4" fill="#ffffff" />
                <circle cx="8.5" cy="3.5" r="1.4" fill="#ffffff" />
                <circle cx="3.5" cy="8.5" r="1.4" fill="#ffffff" />
                <circle cx="8.5" cy="8.5" r="1.4" fill="#ffffff" />
              </svg>
            </span>
            <span className="adaptive-label">AI Query</span>
          </div>
        </div>
      </motion.nav>

      {/* 2. Absolutely Positioned Full-Screen Background Video (z-index 0) */}
      <div className="video-background-layer" aria-hidden="true">
        <motion.div
          className="video-wrapper"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            {/* User requested upscaled video */}
            <source src="/upscaled-video.mp4" type="video/mp4" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* 3. Footer Content Pinned to Bottom with Fade-Up Gradient (z-index 30) */}
      <motion.footer
        className="hero-footer-wrapper"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.0, ease: EASE }}
      >
        <div className="footer-inner">
          {/* Left Block */}
          <div className="footer-left-block">
            {/* Subtitle Line: 8px black circle + text */}
            <motion.div
              className="subtitle-line"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            >
              <span className="black-dot" aria-hidden="true" />
              <span className="subtitle-text">Proof-Carrying Data Analyst 2026</span>
            </motion.div>

            {/* Heading: Two lines, weight 300 */}
            <motion.h1
              className="hero-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            >
              <span className="heading-line">Math with receipts.</span>
              <span className="heading-line">Every insight carries its proof.</span>
            </motion.h1>

            {/* Two Buttons: See Features & How It Works */}
            <motion.div
              className="buttons-group"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
            >
              <button 
                className="btn-features" 
                type="button"
                onClick={() => setIsCognitiveAIOpen(true)}
              >
                See Features
              </button>
              <button 
                className="btn-how-it-works" 
                type="button"
                onClick={() => setIsAdaptiveSystemsOpen(true)}
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Block: Three tag pills */}
          <div className="footer-right-block" aria-label="Feature tags">
            <span className="footer-tag-pill">Neuromorphic</span>
            <span className="footer-tag-pill">AGI</span>
            <span className="footer-tag-pill">Cybernetics</span>
          </div>
        </div>
      </motion.footer>

      {/* Add Files & Data Ingestion Modal */}
      {isAddFilesOpen && (
        <AddFilesModal
          isOpen={isAddFilesOpen}
          onClose={() => setIsAddFilesOpen(false)}
          onTransferToCognitiveAI={(dataset) => {
            setCustomDataset(dataset);
            setIsCognitiveAIOpen(true);
          }}
        />
      )}

      {/* Adaptive Systems Human Questions Modal */}
      {isAdaptiveSystemsOpen && (
        <AdaptiveSystemsModal
          isOpen={isAdaptiveSystemsOpen}
          onClose={() => setIsAdaptiveSystemsOpen(false)}
          onSelectQuestion={(qText) => {
            setActiveQuestion(qText);
            setIsCognitiveAIOpen(true);
          }}
        />
      )}

      {/* Cognitive AI Proof-Carrying Data Analyst Modal */}
      {isCognitiveAIOpen && (
        <CognitiveAIModal 
          isOpen={isCognitiveAIOpen} 
          onClose={() => setIsCognitiveAIOpen(false)} 
          customDataset={customDataset}
          initialQuestion={activeQuestion}
          onOpenAddFiles={() => setIsAddFilesOpen(true)}
        />
      )}
    </div>
  );
}
