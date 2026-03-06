import React from 'react';
import { motion } from 'framer-motion';
import { jvmMemoryAreas } from '../../data/executionSteps';

const MemoryBlock = ({ area, index, isActive }) => {
  return (
    <motion.div
      className={`${area.color} rounded-lg p-4 text-white cursor-pointer transform transition-all duration-300 ${isActive ? 'ring-2 ring-yellow-300 scale-105' : 'hover:scale-102'}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      <h4 className="font-bold text-sm">{area.name}</h4>
      <p className="text-xs mt-1 opacity-90">{area.description}</p>
      <p className="text-xs mt-2 opacity-75">{area.size}</p>
    </motion.div>
  );
};

export default function JVMArchitecture({ activeComponent = null }) {
  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">JVM Architecture</h2>
        <p className="text-slate-400 text-sm">The Java Virtual Machine memory areas and components</p>
      </div>

      {/* Memory Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {jvmMemoryAreas.map((area, index) => (
          <MemoryBlock 
            key={index}
            area={area}
            index={index}
            isActive={activeComponent === area.name.toLowerCase().replace(/\s+/g, '-')}
          />
        ))}
      </div>

      {/* Flow Diagram */}
      <motion.div className="glass-panel p-6 mt-8">
        <h3 className="text-primary font-bold mb-4">Execution Flow</h3>
        <div className="space-y-3">
          {[
            "1. Source Code (.java)",
            "2. JDK Compiler (javac)",
            "3. Bytecode (.class)",
            "4. JRE loads program",
            "5. Class Loader",
            "6. Memory Allocation",
            "7. Execution Engine",
            "8. Interpreter/JIT",
            "9. Native Execution"
          ].map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeComponent === `step-${index + 1}` 
                  ? 'bg-primary/20 border border-primary' 
                  : 'hover:bg-slate-800/50'
              }`}
              whileHover={{ x: 4 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs font-bold">
                {index + 1}
              </div>
              <span className="text-sm text-slate-300">{step.split('. ')[1]}</span>
              {index < 8 && <div className="flex-1 border-t border-primary/20 mx-2" />}
              {index < 8 && (
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-primary"
                >
                  ↓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
