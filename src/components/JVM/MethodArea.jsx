import React from 'react';
import { motion } from 'framer-motion';

const ClassInfo = ({ name, methods, index }) => (
  <motion.div
    className="border border-orange-600/50 rounded-lg p-3 bg-orange-600/5"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <p className="text-orange-400 font-semibold text-sm">{name}.class</p>
    <ul className="mt-2 text-xs text-slate-300 space-y-1">
      {methods.map((method, idx) => (
        <li key={idx}>→ {method}</li>
      ))}
    </ul>
  </motion.div>
);

export default function MethodArea({ classes = [], isActive }) {
  const sampleClasses = classes.length > 0 ? classes : [
    { name: 'Hello', methods: ['main()', 'getInstance()'] },
    { name: 'String', methods: ['length()', 'substring()', 'concat()'] },
  ];

  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-orange-500 rounded-full" />
        <span>Method Area</span>
      </h3>
      
      <div className="space-y-3 mb-4">
        {sampleClasses.map((cls, idx) => (
          <ClassInfo key={idx} {...cls} index={idx} />
        ))}
      </div>

      <div className="p-3 bg-orange-600/10 rounded text-xs text-slate-300 border border-orange-600/20">
        <p><strong>Shared Memory Area</strong></p>
        <p className="mt-1">Stores class structures, method code, static variables, and constant pools.</p>
      </div>
    </motion.div>
  );
}
