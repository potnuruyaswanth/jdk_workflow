import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StackView({ frames = [] }) {
  const sampleFrame = frames.length > 0 ? frames : [{
    method: 'main',
    locals: { '0': 'args', '1': 2, '2': 3, '3': 5 }
  }];

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center justify-between">
        <span>📚 Stack Frames</span>
        <span className="text-xs text-gray-500">{sampleFrame.length} frame(s)</span>
      </div>
      <div className="devtools-content overflow-y-auto space-y-3">
        <AnimatePresence>
          {sampleFrame.map((frame, idx) => (
            <motion.div
              key={idx}
              className="bg-purple-500/10 border-l-4 border-purple-500 rounded p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono text-sm font-bold text-purple-400">
                  {frame.method}()
                </h4>
                <span className="text-xs text-gray-500">Frame #{idx}</span>
              </div>
              
              <div className="space-y-1.5 font-mono text-xs">
                {frame.locals && Object.entries(frame.locals).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400">
                      {isNaN(key) ? key : `var[${key}]`}:
                    </span>
                    <span className="text-purple-300 font-semibold">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sampleFrame.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-600">
            <p>No stack frames available</p>
          </div>
        )}
      </div>
    </div>
  );
}
