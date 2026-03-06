import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap, Cpu, BookOpen } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: 'Java Source Code',
      description: 'Write and paste Java code to visualize compilation and execution'
    },
    {
      icon: Zap,
      title: 'JIT Compilation',
      description: 'See how frequently executed code is compiled to native machine code'
    },
    {
      icon: Cpu,
      title: 'JVM Internals',
      description: 'Understand memory areas, class loading, and execution engine'
    },
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Learn through step-by-step visualization and animation'
    }
  ];

  const architectureLayers = [
    { name: 'Java Application', color: 'from-blue-600 to-blue-500' },
    { name: 'JDK (Tools + Compiler)', color: 'from-purple-600 to-purple-500' },
    { name: 'JRE (Runtime)', color: 'from-indigo-600 to-indigo-500' },
    { name: 'JVM (Virtual Machine)', color: 'from-cyan-600 to-cyan-500' },
    { name: 'Operating System', color: 'from-gray-600 to-gray-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Java Execution</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Visualizer
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Learn how Java programs execute internally using JDK, JRE, and JVM through interactive animations and visual simulations.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/simulator"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Start Simulation</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/architecture"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Learn Architecture</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="glass-panel p-6 text-center group hover-glow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Java Architecture Stack
          </motion.h2>

          <div className="max-w-2xl mx-auto space-y-3">
            {architectureLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-r ${layer.color} rounded-lg p-6 text-white font-semibold flex items-center justify-between`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <span>{layer.name}</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg"
                >
                  {idx < architectureLayers.length - 1 ? '↓' : '→'}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Write Code', desc: 'Paste or write Java code in the editor' },
              { step: '2', title: 'Visualize', desc: 'Watch the compilation and loading process' },
              { step: '3', title: 'Learn', desc: 'Understand JVM internals step by step' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center glass-panel p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Learn?</h2>
          <p className="text-slate-400 mb-8">
            Start exploring Java execution internals right now with interactive visualizations.
          </p>
          <Link
            to="/simulator"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Launch Simulator</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
