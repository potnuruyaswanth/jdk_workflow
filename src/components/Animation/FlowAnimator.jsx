import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlowAnimator({ currentStep = 0, totalSteps = 15, allSteps = [], onStepClick }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    // Scroll to current step when it changes
    if (scrollContainerRef.current) {
      const stepElement = scrollContainerRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStep]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-bold">Execution Progress</h3>
        <span className="text-sm text-slate-400">{currentStep + 1} / {totalSteps}</span>
      </div>

      {/* Horizontal Scrollable Steps */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-slate-900/90 hover:bg-slate-800 rounded-full border border-primary/30 hover:border-primary transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-primary" />
        </button>

        {/* Steps Container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-12 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              data-step={idx}
              onClick={() => onStepClick && onStepClick(idx)}
              className={`flex-shrink-0 cursor-pointer group`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center min-w-[120px]">
                {/* Circle */}
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all mb-2 ${
                    idx === currentStep 
                      ? 'bg-primary text-dark ring-4 ring-primary/30' 
                      : idx < currentStep
                      ? 'bg-primary/60 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                  animate={{
                    scale: idx === currentStep ? 1.1 : 1,
                    boxShadow: idx === currentStep ? '0 0 20px rgba(0, 217, 255, 0.6)' : 'none'
                  }}
                >
                  {idx + 1}
                </motion.div>

                {/* Step Title */}
                <div className={`text-xs text-center font-medium transition-colors ${
                  idx === currentStep 
                    ? 'text-primary' 
                    : idx < currentStep
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}>
                  {step.title.length > 20 ? step.title.substring(0, 18) + '...' : step.title}
                </div>

                {/* Connector Arrow */}
                {idx < allSteps.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+60px)] w-6 flex items-center justify-center">
                    <motion.div
                      className={`text-2xl ${idx < currentStep ? 'text-primary' : 'text-slate-700'}`}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-slate-900/90 hover:bg-slate-800 rounded-full border border-primary/30 hover:border-primary transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-primary" />
        </button>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="relative h-2 bg-slate-800 rounded-full overflow-hidden mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
