import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, UserPlus, Users, CheckCircle, AlertCircle } from "lucide-react";
import Lottie from "lottie-react";

export default function LedgeVotesStack() {
  const [step, setStep] = useState(0);

  const cards = [
    {
      title: "Connect Your Wallet",
      icon: <Wallet size={40} className="text-green-500" />,
      description:
        "Start by securely connecting your wallet. This verifies your identity without exposing personal data — no central server, no manipulation.",
      lottie: "/animations/ConnectWallet.json",
      button: "Next Step",
    },

    {
      title: "Create or Join an Election",
      icon: <Users size={40} className="text-green-500" />,
      description:
        "Choose whether to create a new election or join an existing one. Both actions are protected with decentralized verification.",
      lottie: "/animations/CreateJoin.json",
      button: "Next Step",
    },

    {
      title: "Creating an Election",
      icon: <UserPlus size={40} className="text-green-500" />,
      description:
        "To create an election, you will enter: a Title, a Description, Candidates, and Start/End Dates. Everything is locked on-chain.",
      lottie: "/animations/CreateFlow.json",
      button: "Next Step",
    },

    {
      title: "Joining an Election",
      icon: <CheckCircle size={40} className="text-green-500" />,
      description:
        "To join, simply enter the Election ID and Secret Key. This prevents unauthorized access and stops fake voters.",
      lottie: "/animations/JoinElection.json",
      button: "Next Step",
    },

    {
      title: "What LedgeVotes Fixes",
      icon: <AlertCircle size={40} className="text-green-500" />,
      description:
        "No bribery. No double voting. No rigging. No backend manipulation. Every vote is time-stamped, transparent, and verifiable.",
      lottie: "/animations/AntiFraud.json",
      button: "Back to Start",
    },
  ];

  const slide = {
    hidden: { x: 120, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 140 }},
    exit: { x: -120, opacity: 0, transition: { duration: 0.3 }},
  };

  return (
    <section className="w-full pt-10 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
          How LedgeVotes Works
        </h2>

        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full bg-white rounded-3xl shadow-lg border border-green-100 p-8 flex flex-col md:flex-row items-center justify-between gap-10"
            >
              {/* Left side info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  {cards[step].icon}
                  <h3 className="text-2xl font-bold">{cards[step].title}</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {cards[step].description}
                </p>

                <button
                  onClick={() => {
                    if (step === cards.length - 1) setStep(0);
                    else setStep(step + 1);
                  }}
                  className="mt-4 px-6 py-3 hidden lg:block bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
                >
                  {cards[step].button}
                </button>
              </div>
{/* 
          
              <div className="flex-1 h-full flex items-center justify-center rounded-xl bg-green-50 p-4">
                <div className="w-60 h-60 opacity-80">
               
                  <div className="w-full h-full rounded-xl border border-green-200 flex items-center justify-center text-green-500">
                    Animation
                  </div>
                </div>
              </div> */}
                             <button
                  onClick={() => {
                    if (step === cards.length - 1) setStep(0);
                    else setStep(step + 1);
                  }}
                  className="mt-4 px-6 py-3 bg-green-600 block lg:hidden text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
                >
                  {cards[step].button}
                </button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
