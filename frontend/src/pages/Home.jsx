import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, Eye, Layers, Zap, Box } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: 'Real Java Execution',
      description: 'Compile and execute actual Java code using javac and the JVM runtime'
    },
    {
      icon: Eye,
      title: 'Bytecode Visualization',
      description: 'Step through bytecode instructions with stack and local variable tracking'
    },
    {
      icon: Cpu,
      title: 'JIT Compilation Logs',
      description: 'View real-time JIT compilation events and performance optimizations'
    },
    {
      icon: Layers,
      title: 'Memory Visualization',
      description: '3D visualization of Heap, Stack, and Method Area with real-time updates'
    },
    {
      icon: Zap,
      title: 'Garbage Collection',
      description: 'Monitor GC events, pause times, and heap memory reclamation'
    },
    {
      icon: Box,
      title: 'JVM Architecture',
      description: 'Interactive diagram showing JVM components and execution flow'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-jvm-darker via-jvm-dark to-jvm-darker">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-jvm-accent to-purple-600 rounded-xl flex items-center justify-center">
              <Code2 size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            JVM Insight
          </h1>
          <p className="text-2xl text-jvm-accent mb-6">
            Advanced Java Execution Visualizer
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Understand how Java code executes at the deepest level. Compile, decompile, and visualize 
            bytecode execution with real JVM runtime data including JIT compilation and garbage collection.
          </p>
          <Link
            to="/visualizer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-jvm-accent to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Launch Visualizer
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-jvm-dark border border-gray-800 rounded-lg p-6 hover:border-jvm-accent transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-jvm-accent/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-jvm-accent" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="bg-jvm-dark border border-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-jvm-accent mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Node.js + Express
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  OpenJDK 17 (javac, javap, java)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Docker Sandbox Execution
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time JVM Log Parsing
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-jvm-accent mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  React 18 + Vite
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Monaco Editor (VS Code)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Three.js 3D Visualization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  React Flow Diagrams
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="bg-jvm-dark border border-gray-800 rounded-lg p-6 flex-1 max-w-xs">
              <div className="text-3xl font-bold text-jvm-accent mb-2">1</div>
              <h3 className="font-semibold text-white mb-2">Write Java Code</h3>
              <p className="text-sm text-gray-400">Use the Monaco editor to write your Java program</p>
            </div>
            <ArrowRight className="text-gray-600 hidden md:block" size={32} />
            <div className="bg-jvm-dark border border-gray-800 rounded-lg p-6 flex-1 max-w-xs">
              <div className="text-3xl font-bold text-jvm-accent mb-2">2</div>
              <h3 className="font-semibold text-white mb-2">Compile & Execute</h3>
              <p className="text-sm text-gray-400">Backend compiles with javac and runs on real JVM</p>
            </div>
            <ArrowRight className="text-gray-600 hidden md:block" size={32} />
            <div className="bg-jvm-dark border border-gray-800 rounded-lg p-6 flex-1 max-w-xs">
              <div className="text-3xl font-bold text-jvm-accent mb-2">3</div>
              <h3 className="font-semibold text-white mb-2">Visualize Execution</h3>
              <p className="text-sm text-gray-400">Step through bytecode with live memory visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
