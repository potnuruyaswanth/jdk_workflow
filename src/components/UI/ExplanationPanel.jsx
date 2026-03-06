import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, Zap } from 'lucide-react';

export default function ExplanationPanel({ step, analysis = null }) {
  if (!step) {
    return (
      <div className="glass-panel p-6">
        <p className="text-slate-400">Select a step to view explanation</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="glass-panel p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Step Header */}
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20 text-primary">
            <span className="text-lg font-bold">{step.id}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primary">{step.title}</h3>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Analysis Info */}
      {analysis && (
        <motion.div 
          className="mt-6 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-t border-primary/20 pt-4">
            <h4 className="text-primary font-semibold mb-3 flex items-center space-x-2">
              <Lightbulb size={16} />
              <span>Code Analysis</span>
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              {analysis.hasLoops > 0 && (
                <div className="flex items-start space-x-2">
                  <Zap size={14} className="text-yellow-400 mt-0.5" />
                  <span>{analysis.hasLoops} loop(s) detected - potential hotspot</span>
                </div>
              )}
              {analysis.hasMethods > 0 && (
                <div className="flex items-start space-x-2">
                  <Zap size={14} className="text-blue-400 mt-0.5" />
                  <span>{analysis.hasMethods} method(s) defined</span>
                </div>
              )}
              {analysis.variables.length > 0 && (
                <div className="flex items-start space-x-2">
                  <AlertCircle size={14} className="text-cyan-400 mt-0.5" />
                  <span>{analysis.variables.length} variable(s): {analysis.variables.slice(0, 2).join(", ")}{analysis.variables.length > 2 ? "..." : ""}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Point */}
      <div className="border-l-4 border-primary bg-primary/5 p-4 mt-4">
        <p className="text-sm text-slate-300 italic">
          💡 <strong>Key Point:</strong> This is an important concept in Java execution.
        </p>
      </div>
    </motion.div>
  );
}
