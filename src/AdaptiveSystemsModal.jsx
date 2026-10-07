import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Brain, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Users, 
  Coins, 
  Scale, 
  Search,
  ArrowRight
} from 'lucide-react';
import './AdaptiveSystemsModal.css';

const HUMAN_BASIC_QUESTIONS = [
  {
    id: 'bottom_line',
    icon: Coins,
    humanIntuition: 'The Bottom Line (Solvency & Survival)',
    humanQuestion: '"Did we actually make or lose money at the end of the day?"',
    whyHumansAsk: 'The first instinct of any business owner or executive is net liquidity. Humans cut straight to the net profit/loss before looking at granular ledgers.',
    aiProofSolution: 'Deduplicates raw orders, applies 1.08x FX conversion to EUR amounts, isolates pending & refunded states, and verifies exactly $1,971.30 USD net completed revenue.',
    promptToLoad: 'What is the net completed revenue in USD across all orders?'
  },
  {
    id: 'trust_check',
    icon: ShieldAlert,
    humanIntuition: 'The Trust Check (Ghost Charges & Fraud)',
    humanQuestion: '"Can I trust these numbers, or did someone get double-charged?"',
    whyHumansAsk: 'Humans have high loss aversion. If an order appears twice, a human immediately suspects a billing bug or double credit card swipe.',
    aiProofSolution: 'Scans the natural key order_id, flags duplicate rows ORD-102 and ORD-106, and proves $716.00 USD was saved from artificial double-counting.',
    promptToLoad: 'How many duplicate orders are in the messy data?'
  },
  {
    id: 'vip_relationship',
    icon: Users,
    humanIntuition: 'The Relationship Metric (VIPs & Top Spenders)',
    humanQuestion: '"Who is keeping our business alive, and who spent the most?"',
    whyHumansAsk: 'Human business is relational. Knowing who the top client is determines client management, discounts, and retention priority.',
    aiProofSolution: 'Aggregates spend by customer ID, strips duplicate records, and proves CUST-05 is the top customer with $500.00 USD completed spend.',
    promptToLoad: 'Who is the top customer by spend?'
  },
  {
    id: 'leakage',
    icon: HelpCircle,
    humanIntuition: 'The Friction Metric (Leaks, Refunds & Pending Sales)',
    humanQuestion: '"Where is money slipping away? Did customers cancel or ask for refunds?"',
    whyHumansAsk: 'Humans want to know operational failure rates: how much inventory was returned or is sitting unpaid in pending limbo.',
    aiProofSolution: 'Separates completed sales from ORD-107 ($90.00 USD refunded) and ORD-105 (180.00 EUR pending), verifying true operational cash flow.',
    promptToLoad: 'How many completed, pending, and refunded orders?'
  },
  {
    id: 'conflict',
    icon: Scale,
    humanIntuition: 'The Accountability Check (Organizational Conflict)',
    humanQuestion: '"Why does Sales say one thing while Accounting says another? Who is lying?"',
    whyHumansAsk: 'When two departments give different revenue totals, humans immediately suspect missing commissions, timing differences, or accounting errors.',
    aiProofSolution: 'Compares CRM ($3.55M) vs Finance ERP ($3.17M), pinpoints the $380,000 USD variance across North America and Asia, and refuses to guess without a ledger.',
    promptToLoad: 'What is the revenue discrepancy between CRM and Finance?'
  },
  {
    id: 'reality_check',
    icon: Brain,
    humanIntuition: 'The Common Sense Boundary (Reality Checks & Edge Cases)',
    humanQuestion: '"Wait, does this question even make sense, or is someone trying to trick me?"',
    whyHumansAsk: 'Human common sense instantly flags impossible premises (e.g., asking about "Quarter 5" or products that do not exist).',
    aiProofSolution: 'Implements Rule #2 (Controlled Refusal): Confidently refuses trick queries (Q5, Campaign Zeta) with explicit justifications instead of hallucinating.',
    promptToLoad: 'What was our net profit in Q5? (Trap #7)'
  }
];

export default function AdaptiveSystemsModal({ isOpen, onClose, onSelectQuestion }) {
  if (!isOpen) return null;

  const handleAskInCognitiveAI = (questionText) => {
    if (onSelectQuestion) {
      onSelectQuestion(questionText);
    }
    onClose();
  };

  return (
    <div className="adaptive-backdrop" onClick={onClose}>
      <motion.div 
        className="adaptive-glass-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="adaptive-header">
          <div className="adaptive-header-left">
            <span className="adaptive-badge">
              <Brain size={14} className="badge-glow-icon" />
              AI Query · Human Cognition vs. Proof Engine
            </span>
            <h2 className="adaptive-heading">What Basic Questions That All Asked?</h2>
            <p className="adaptive-subheading">
              When analyzing financial data, 6 fundamental questions are always asked. Here is how they map directly to our Proof-Carrying AI architecture:
            </p>
          </div>
          <button className="adaptive-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Questions Grid */}
        <div className="adaptive-body">
          <div className="adaptive-grid">
            {HUMAN_BASIC_QUESTIONS.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="adaptive-card">
                  <div className="adaptive-card-header">
                    <div className="icon-wrap">
                      <IconComp size={18} color="#38bdf8" />
                    </div>
                    <span className="card-category-tag">{item.humanIntuition}</span>
                  </div>

                  <h3 className="card-human-question">{item.humanQuestion}</h3>

                  <div className="card-section">
                    <span className="section-label">🧠 Human Intuition:</span>
                    <p className="section-text">{item.whyHumansAsk}</p>
                  </div>

                  <div className="card-section ai-section">
                    <span className="section-label ai-label">⚡ How Knightfall AI Proves It:</span>
                    <p className="section-text ai-text">{item.aiProofSolution}</p>
                  </div>

                  <button 
                    type="button" 
                    className="ask-ai-direct-btn"
                    onClick={() => handleAskInCognitiveAI(item.promptToLoad)}
                  >
                    <span>Ask Knightfall AI this Question</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="adaptive-footer">
          <span className="footer-note">
            AI Query bridges human curiosity with mathematical receipts.
          </span>
          <button type="button" className="adaptive-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
