import React from "react";
import { motion } from "framer-motion";

// REUSABLE SCROLLING DECK COMPONENT
function InfiniteDeck({ items, reverse }) {
  return (
    <div className="relative w-full overflow-hidden pt-2 bg-white">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ["100%", "-100%"] : ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="text-xs md:text-xs font-semibold text-gray-700"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LedgeVotesScrollingDeck() {
  const backedBy = [
    "Backed by Blockchain Security",
    "Trusted Identity Verification",
    "Zero Manipulation",
    "Real-time Transparency",
    "Cryptographic Integrity",
    "Multi-layer Fraud Prevention",
  ];

  const whatIsLedge = [
    "LedgeVote = Secure Digital Voting",
    "Decentralized, Transparent Elections",
    "No Rigging, No Bribery",
    "Fast & Immutable Vote Records",
    "Auditable Results for Everyone",
    "Future of Trust-Based Governance",
  ];

  return (
    <section className="w-full bg-white pt-27">
      {/* SECTION HEADING */}
      <h2 className="text-xs md:text-xs font-bold text-center text-green-700 mb-1">
        Trusted. Transparent. Tamper-Proof.
      </h2>

      {/* FIRST DECK — Right → Left */}
      <InfiniteDeck items={backedBy} reverse={false} />

      {/* SECOND DECK — Left → Right */}
      <InfiniteDeck items={whatIsLedge} reverse={true} />
    </section>
  );
}
