import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp } from 'lucide-react';

export default function GCVisualizer({ gcLogs = [], onObjectCollected }) {
  const [collectedCount, setCollectedCount] = React.useState(0);

  React.useEffect(() => {
    setCollectedCount(gcLogs.length);
  }, [gcLogs]);

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center justify-between">
        <span className="flex items-center space-x-2">
          <Trash2 size={14} />
          <span>Garbage Collector</span>
        </span>
        <span className="text-xs text-gray-500">{gcLogs.length} events</span>
      </div>
      <div className="devtools-content space-y-4">
        {/* GC Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">GC Events</div>
            <div className="text-2xl font-bold text-green-400">{gcLogs.length}</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Objects Collected</div>
            <div className="text-2xl font-bold text-blue-400">{collectedCount}</div>
          </div>
        </div>

        {/* GC Event Timeline */}
        <div>
          <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center space-x-2">
            <TrendingUp size={12} />
            <span>GC Timeline</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {gcLogs.length === 0 ? (
                <div className="text-gray-600 text-xs italic text-center py-4">
                  No GC events recorded
                </div>
              ) : (
                gcLogs.map((event, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-green-500/10 border-l-2 border-green-500 rounded p-2 text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-green-300">{event.type}</span>
                      <span className="text-gray-500">{event.timestamp.toFixed(3)}s</span>
                    </div>
                    <div className="text-gray-400 mt-1 text-xs">
                      {event.raw}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* GC Info */}
        <div className="bg-green-600/10 border border-green-600/30 rounded p-3 text-xs text-gray-300">
          <p className="font-semibold text-green-400 mb-1">Garbage Collection</p>
          <p>
            The JVM automatically reclaims memory from objects that are no longer reachable. 
            GC events show when heap cleanup occurs.
          </p>
        </div>
      </div>
    </div>
  );
}
