import React from 'react'
import { motion } from 'framer-motion'

import { ShieldCheck, UserX, Ban, BadgeCheck } from "lucide-react";
import Lottie from 'lottie-react'


export default function ProblemStack(){
  const features = [
    {
      icon: <ShieldCheck size={36} className="text-green-500" />,
      title: "Vote Tampering Eliminated",
      description:
        "Votes are immutably recorded. No editing, no backdoor changes, no hidden manipulation.",
    },
    {
      icon: <UserX size={36} className="text-red-500" />,
      title: "No Double Voting",
      description:
        "Every voter is cryptographically verified. No duplicates, no impersonation.",
    },
    {
      icon: <Ban size={36} className="text-yellow-500" />,
      title: "No Bribery or Interference",
      description:
        "Anonymous vote submission prevents coercion, vote-buying, and external pressure.",
    },
    {
      icon: <BadgeCheck size={36} className="text-blue-500" />,
      title: "End-to-End Transparency",
      description:
        "Results are publicly verifiable, auditable, and updated in real-time.",
    },
  ];

  // framer variants
  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, type:'spring', stiffness: 120 } }),
    hover: { y: -8, boxShadow: '0 12px 30px rgba(2,6,23,0.12)', scale: 1.01 }
  }

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white to-brand-50">
      <div className=" mx-auto px-6 space-y-6">
           <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
          Problems We Solve
        </h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
          LedgeVote eliminates the core problems that destroy trust in
          traditional elections.
        </p>

        <div className="space-y-6 mt-12">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariant}
              className="sticky top-28 lg:mx-10 mx-3 flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-white rounded-2xl shadow"
              style={{ minHeight: 180 }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{f.title}</h3>
                </div>
                <p className="text-slate-600">{f.description}</p>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[160px]">
                {/* Lottie placeholder: put actual animation JSON files at /public/animations/*.json */}
                <div className="w-56 h-40">
                  {/* If you don't have Lottie files, comment Lottie out and leave an illustrative SVG or image */}
                  {/* <Lottie animationData={ f.lottie ? require(`../animations/${f.lottie.split('/').pop()}`) : null } loop={true} /> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
