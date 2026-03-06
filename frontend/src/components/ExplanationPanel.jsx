import React from 'react';
import { BookOpen } from 'lucide-react';

const explanationDatabase = {
  compilation: {
    title: "Java Compilation Process",
    content: "The Java compiler (javac) converts human-readable source code (.java) into bytecode (.class). Bytecode is platform-independent and can run on any JVM."
  },
  classloader: {
    title: "Class Loader Subsystem",
    content: "The Class Loader loads .class files into memory. It performs three main operations: Loading (reads bytecode), Linking (verifies and prepares), and Initialization (executes static blocks)."
  },
  heap: {
    title: "Heap Memory",
    content: "The Heap stores all Java objects and instance variables. It's shared across all threads and managed by the Garbage Collector. Objects are created here during runtime."
  },
  stack: {
    title: "Stack Memory",
    content: "Each thread has its own Stack, storing method frames. A frame contains local variables, operand stack, and method information. Frames are created on method calls and destroyed on return."
  },
  methodarea: {
    title: "Method Area",
    content: "Stores class-level data including class metadata, static variables, method bytecode, and the constant pool. It's shared among all threads."
  },
  bytecode: {
    title: "Bytecode Instructions",
    content: "Bytecode is the intermediate representation executed by the JVM. Common instructions include: iconst (push constant), iload (load local), istore (store local), iadd (add integers), invokevirtual (call method)."
  },
  gc: {
    title: "Garbage Collection",
    content: "The Garbage Collector automatically reclaims memory by removing unreachable objects from the Heap. Modern JVMs use generational GC (Young Gen, Old Gen) to optimize performance."
  },
  jit: {
    title: "JIT Compilation",
    content: "The Just-In-Time compiler optimizes frequently executed bytecode ('hot code') by compiling it to native machine code at runtime, significantly improving performance."
  },
  execution: {
    title: "Execution Engine",
    content: "The Execution Engine runs bytecode using the Interpreter (line-by-line) and JIT Compiler (optimize hot paths). It manages the program counter and interacts with memory areas."
  }
};

export default function ExplanationPanel({ topic = 'compilation', currentInstruction = null }) {
  const explanation = explanationDatabase[topic] || explanationDatabase.compilation;

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center gap-2">
        <BookOpen size={16} />
        <span>Explanation</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-lg font-bold text-jvm-accent mb-3">{explanation.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{explanation.content}</p>

        {currentInstruction && (
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-bold text-purple-400 mb-2">Current Instruction</h4>
            <div className="bg-jvm-darker p-3 rounded font-mono text-sm">
              <div className="text-green-400 mb-2">{currentInstruction.instruction}</div>
              {currentInstruction.description && (
                <div className="text-gray-400 text-xs">{currentInstruction.description}</div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h4 className="text-sm font-bold text-blue-400 mb-3">Quick Reference</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">iconst_n</span>
              <span className="text-gray-400">Push integer constant n onto stack</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">iload_n</span>
              <span className="text-gray-400">Load integer from local variable n</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">istore_n</span>
              <span className="text-gray-400">Store integer to local variable n</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">iadd</span>
              <span className="text-gray-400">Add top two integers from stack</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">invokevirtual</span>
              <span className="text-gray-400">Invoke instance method</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono">return</span>
              <span className="text-gray-400">Return void from method</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
