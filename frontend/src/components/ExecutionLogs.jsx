import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function ExecutionLogs({ programOutput = '', jitLogs = [], gcLogs = [], executionError = null }) {
  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center space-x-2">
        <Terminal size={14} />
        <span>Execution Logs & Output</span>
      </div>
      <div className="devtools-content overflow-y-auto space-y-4">
        {/* Program Output */}
        <div>
          <h4 className="text-xs font-semibold text-gray-400 mb-2">📤 Program Output:</h4>
          <div className="bg-black/50 rounded p-3 font-mono text-xs">
            {executionError ? (
              <div className="text-red-400">
                <p className="font-semibold mb-1">❌ Error:</p>
                <pre className="whitespace-pre-wrap">{executionError}</pre>
              </div>
            ) : programOutput ? (
              <pre className="whitespace-pre-wrap text-green-400">{programOutput}</pre>
            ) : (
              <p className="text-gray-600 italic">No output yet</p>
            )}
          </div>
        </div>

        {/* JIT Compilation Logs */}
        {jitLogs && jitLogs.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-2">⚡ JIT Compilation Events:</h4>
            <div className="space-y-1">
              {jitLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  className="log-entry jit"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-purple-400 font-semibold">[JIT]</span>
                  <span className="text-gray-300 ml-2">
                    Compiled {log.className}::{log.methodName}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Garbage Collection Logs */}
        {gcLogs && gcLogs.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-2">🗑️ Garbage Collection Events:</h4>
            <div className="space-y-1">
              {gcLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  className="log-entry gc"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-green-400 font-semibold">[GC]</span>
                  <span className="text-gray-300 ml-2">
                    {log.type} @ {log.timestamp.toFixed(3)}s
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
