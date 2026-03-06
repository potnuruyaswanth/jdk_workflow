import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from 'lucide-react';

export default function HeapView({ objects = [] }) {
  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center justify-between">
        <span>🗄️ Heap Memory</span>
        <span className="text-xs text-gray-500">{objects.length} object(s)</span>
      </div>
      <div className="devtools-content overflow-y-auto">
        <AnimatePresence>
          {objects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-600">
              <Box size={32} className="mb-2 opacity-50" />
              <p>No heap objects allocated</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {objects.map((obj, idx) => (
                <motion.div
                  key={idx}
                  className="heap-object"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono text-sm font-bold">
                      {obj.className || 'Object'}
                    </h4>
                    <span className="text-xs opacity-75">@{obj.address || idx}</span>
                  </div>
                  
                  <div className="space-y-1 font-mono text-xs">
                    {obj.fields && Object.entries(obj.fields).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="opacity-90">{key}:</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
