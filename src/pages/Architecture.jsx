import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import JVMArchitecture from '../components/JVM/JVMArchitecture';
import ClassLoader from '../components/JVM/ClassLoader';
import Heap from '../components/JVM/Heap';
import Stack from '../components/JVM/Stack';
import MethodArea from '../components/JVM/MethodArea';
import ExecutionEngine from '../components/Execution/ExecutionEngine';
import Interpreter from '../components/Execution/Interpreter';
import JITCompiler from '../components/Execution/JITCompiler';

const AccordionItem = ({ title, icon, content, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-bold text-primary">{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <motion.div
          className="px-6 py-4 border-t border-primary/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {content}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Architecture() {
  const sections = [
    {
      title: 'JDK (Java Development Kit)',
      icon: '📦',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>
            The JDK is a complete development environment to develop, compile, and run Java applications.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">Components:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>javac</strong> - Java Compiler (converts .java to .class)</li>
              <li>• <strong>java</strong> - JVM launcher</li>
              <li>• <strong>javadoc</strong> - Documentation generator</li>
              <li>• <strong>Libraries</strong> - Core Java libraries and APIs</li>
              <li>• <strong>Tools</strong> - Debugger, profiler, and other utilities</li>
            </ul>
          </div>
          <p className="text-sm">
            <strong>JDK = JRE + Development Tools</strong>
          </p>
        </div>
      )
    },
    {
      title: 'JRE (Java Runtime Environment)',
      icon: '⚙️',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>
            The JRE is the runtime environment needed to run Java applications. It doesn't include development tools.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">Components:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>JVM</strong> - Java Virtual Machine</li>
              <li>• <strong>Class Library</strong> - Core Java classes (java.lang, java.util, etc.)</li>
              <li>• <strong>Class Loader</strong> - Loads classes into memory</li>
              <li>• <strong>Bytecode Verifier</strong> - Ensures bytecode is valid</li>
            </ul>
          </div>
          <p className="text-sm">
            <strong>JRE = JVM + Libraries + Tools (without development)</strong>
          </p>
        </div>
      )
    },
    {
      title: 'JVM (Java Virtual Machine)',
      icon: '🖥️',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            The JVM is an abstract computing machine that enables a computer to run Java programs in a platform-independent manner.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Key Features:</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>✓ Platform Independent</li>
                <li>✓ Write Once, Run Anywhere (WORA)</li>
                <li>✓ Automatic Memory Management</li>
                <li>✓ Bytecode Verification</li>
                <li>✓ Dynamic Compilation (JIT)</li>
              </ul>
            </div>
            <div>
              <JVMArchitecture />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Class Loader',
      icon: '📂',
      content: (
        <div className="space-y-4">
          <div className="text-slate-300 space-y-2 mb-4">
            <p>The Class Loader is responsible for loading Java classes into memory at runtime.</p>
            <p className="text-sm">There are three built-in class loaders in a hierarchical order:</p>
          </div>
          <ClassLoader />
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4 text-sm text-slate-300">
            <p><strong>Parent Delegation Model:</strong> When a class loader is asked to load a class, it first delegates to its parent class loader. If the parent cannot find the class, the current loader tries to load it.</p>
          </div>
        </div>
      )
    },
    {
      title: 'Memory Areas',
      icon: '💾',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">The JVM allocates memory into distinct areas for different purposes:</p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Heap />
            <Stack />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <MethodArea />
            <div className="glass-panel p-6">
              <h3 className="text-primary font-bold mb-2">PC Register & Native Stack</h3>
              <p className="text-sm text-slate-300 mb-3">
                <strong>PC Register:</strong> Contains address of currently executing JVM instruction
              </p>
              <p className="text-sm text-slate-300">
                <strong>Native Method Stack:</strong> Contains all native methods used by application
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Execution Engine',
      icon: '⚡',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            The Execution Engine is responsible for executing bytecode instructions.
          </p>
          <ExecutionEngine />
          <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300 space-y-3 mt-4">
            <div>
              <p className="font-semibold text-primary mb-1">Interpreter:</p>
              <p className="text-xs">Reads and executes bytecode line by line. Slower but provides quick startup.</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">JIT Compiler:</p>
              <p className="text-xs">Compiles frequently executed code to native machine code. Provides better performance.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Compilation Process',
      icon: '📝',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Java source code goes through multiple stages before execution:</p>
          <div className="space-y-2 mt-4">
            {[
              { title: 'Source Code (.java)', desc: 'Human-readable Java code written by programmer' },
              { title: 'Lexical Analysis', desc: 'Tokenization of source code' },
              { title: 'Syntax Analysis', desc: 'Parsing tokens into syntax tree' },
              { title: 'Semantic Analysis', desc: 'Type checking and validation' },
              { title: 'Bytecode Generation', desc: 'Generation of platform-independent bytecode' },
              { title: 'Class File (.class)', desc: 'Binary format containing bytecode' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-primary">{step.title}</p>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Hotspot Detection & JIT',
      icon: '🔥',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            The JVM identifies frequently executed code (hotspots) and compiles them to native code for optimal performance.
          </p>
          <JITCompiler hotspotDetected={true} />
          <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300 space-y-3 mt-4">
            <div>
              <p className="font-semibold text-primary mb-1">🔍 Hotspot Identification:</p>
              <p className="text-xs">Methods or loops that are called/executed many times trigger JIT compilation.</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">⚡ Performance Improvement:</p>
              <p className="text-xs">JIT compiled code executes 10-100x faster than interpreted bytecode.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Garbage Collection',
      icon: '🗑️',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>
            Garbage Collection (GC) automatically manages heap memory by reclaiming objects no longer in use.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg space-y-3 text-sm mt-4">
            <div>
              <p className="font-semibold text-primary mb-1">Generation-Based Collection:</p>
              <p className="text-xs">Objects are categorized by age. Young objects are collected more frequently.</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Regions:</p>
              <p className="text-xs">
                <strong>Young Generation:</strong> For new objects<br />
                <strong>Old Generation:</strong> For long-lived objects
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Benefits:</p>
              <p className="text-xs">✓ Prevents memory leaks ✓ Automatic memory management ✓ Improves code reliability</p>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Java Architecture Guide</h1>
          <p className="text-slate-400 text-lg">
            Comprehensive guide to JDK, JRE, and JVM internals with detailed explanations.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <AccordionItem
              key={idx}
              title={section.title}
              icon={section.icon}
              content={section.content}
              index={idx}
            />
          ))}
        </div>

        {/* Summary Section */}
        <motion.div
          className="glass-panel p-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>JVM Advantages</span>
              </h3>
              <ul className="text-sm text-slate-400 space-y-2 ml-4">
                <li>✓ Platform Independence (WORA)</li>
                <li>✓ Automatic Memory Management</li>
                <li>✓ Security Features</li>
                <li>✓ Performance Optimization (JIT)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Execution Flow</span>
              </h3>
              <ul className="text-sm text-slate-400 space-y-2 ml-4">
                <li>1. Source Code → Compilation</li>
                <li>2. Bytecode Generation</li>
                <li>3. Class Loading</li>
                <li>4. Execution & Optimization</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
