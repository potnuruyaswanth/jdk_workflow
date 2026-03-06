import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/Editor/CodeEditor';
import JVMArchitecture from '../components/JVM/JVMArchitecture';
import ClassLoader from '../components/JVM/ClassLoader';
import Heap from '../components/JVM/Heap';
import Stack from '../components/JVM/Stack';
import MethodArea from '../components/JVM/MethodArea';
import NativeStack from '../components/JVM/NativeStack';
import ExecutionEngine from '../components/Execution/ExecutionEngine';
import Interpreter from '../components/Execution/Interpreter';
import JITCompiler from '../components/Execution/JITCompiler';
import NativeExecution from '../components/Execution/NativeExecution';
import ExplanationPanel from '../components/UI/ExplanationPanel';
import StepController from '../components/Animation/StepController';
import FlowAnimator from '../components/Animation/FlowAnimator';
import { sampleJavaCode } from '../data/executionSteps';
import { parseJavaCode, detectHotspots, estimateMemoryUsage } from '../utils/javaParser';
import { generateExecutionSteps, getActiveComponents } from '../utils/executionStepGenerator';

export default function Simulator() {
  const [code, setCode] = useState(sampleJavaCode);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [executionSteps, setExecutionSteps] = useState([]);

  // Generate dynamic execution steps when code changes
  useEffect(() => {
    const analysis = parseJavaCode(code);
    setCodeAnalysis(analysis);
    
    // Generate steps based on current code
    const dynamicSteps = generateExecutionSteps(code);
    setExecutionSteps(dynamicSteps);
    
    // Reset to beginning when code changes
    setCurrentStep(0);
    setIsRunning(false);
  }, [code]);

  // Auto-advance step when running
  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      if (currentStep < executionSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsRunning(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  // Update active component based on current step
  useEffect(() => {
    const step = executionSteps[currentStep];
    if (step) {
      setActiveComponent(step.highlightComponent);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRun = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const hotspots = codeAnalysis ? detectHotspots(code) : [];
  const memoryInfo = codeAnalysis ? estimateMemoryUsage(code) : null;

  // Get which components to show based on current step
  const componentsVisibility = getActiveComponents(executionSteps[currentStep], executionSteps);

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Java Execution Visualizer</h1>
          <p className="text-slate-400">Step through the Java execution process with interactive animation</p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Code Editor */}
          <motion.div
            className="lg:col-span-1 h-[600px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CodeEditor code={code} onCodeChange={setCode} />
          </motion.div>

          {/* Center: Execution Flow */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Step Progress - Now Horizontal */}
            <div className="glass-panel p-6">
              <FlowAnimator 
                currentStep={currentStep} 
                totalSteps={executionSteps.length}
                allSteps={executionSteps}
                onStepClick={handleStepClick}
              />
            </div>

            {/* Current Step Info */}
            <ExplanationPanel step={executionSteps[currentStep]} analysis={codeAnalysis} />

            {/* Analysis Info */}
            {codeAnalysis && (
              <motion.div className="glass-panel p-6">
                <h3 className="text-primary font-bold mb-3">Code Analysis</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Variables:</span>
                    <span className="text-primary">{codeAnalysis.variables.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Methods:</span>
                    <span className="text-primary">{codeAnalysis.hasMethods}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loops:</span>
                    <span className={codeAnalysis.hasLoops > 0 ? 'text-yellow-400' : 'text-slate-400'}>
                      {codeAnalysis.hasLoops} {codeAnalysis.hasLoops > 0 ? '🔥 Hotspot' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conditionals:</span>
                    <span className="text-cyan-400">{codeAnalysis.hasConditionals}</span>
                  </div>
                  {memoryInfo && (
                    <div className="flex justify-between border-t border-primary/20 pt-2">
                      <span>Est. Memory:</span>
                      <span className="text-cyan-400">{memoryInfo.formattedSize}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-primary/20 pt-2">
                    <span>Total Steps:</span>
                    <span className="text-green-400">{executionSteps.length}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: JVM Visualization */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Dynamic Component Display based on current step */}
            <div className="space-y-4">
              {componentsVisibility.showClassLoader && (
                <ClassLoader isActive={activeComponent === 'class-loader'} />
              )}
              {componentsVisibility.showMethodArea && (
                <MethodArea isActive={activeComponent === 'method-area'} />
              )}
              {componentsVisibility.showHeap && (
                <Heap isActive={activeComponent === 'heap'} />
              )}
              {componentsVisibility.showStack && (
                <Stack isActive={activeComponent === 'stack'} />
              )}
              {componentsVisibility.showExecutionEngine && (
                <ExecutionEngine isActive={activeComponent === 'execution-engine'} />
              )}
              {componentsVisibility.showInterpreter && (
                <Interpreter step={currentStep} />
              )}
              {componentsVisibility.showJIT && (
                <JITCompiler hotspotDetected={hotspots.length > 0} />
              )}
              {componentsVisibility.showNativeExecution && (
                <NativeExecution isExecuting={isRunning} />
              )}
              {componentsVisibility.showNativeStack && (
                <NativeStack isActive={activeComponent === 'native-stack'} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <StepController
            currentStep={currentStep}
            totalSteps={executionSteps.length}
            isRunning={isRunning}
            onNext={handleNext}
            onPrev={handlePrev}
            onRun={handleRun}
            onReset={handleReset}
          />
        </div>

        {/* JVM Architecture Overview */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <JVMArchitecture activeComponent={activeComponent} />
        </motion.div>
      </div>
    </div>
  );
}
