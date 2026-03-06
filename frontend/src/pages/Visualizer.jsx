import React, { useState } from 'react';
import { Play, AlertCircle, Loader2 } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import BytecodeViewer from '../components/BytecodeViewer';
import BytecodeDebugger from '../components/BytecodeDebugger';
import StackView from '../components/StackView';
import HeapView from '../components/HeapView';
import ExecutionLogs from '../components/ExecutionLogs';
import GCVisualizer from '../components/GCVisualizer';
import JVMArchitecture from '../components/JVMArchitecture';
import Memory3D from '../components/Memory3D';
import ExplanationPanel from '../components/ExplanationPanel';
import { executeJavaCode } from '../services/api';

const defaultCode = `public class HelloWorld {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int sum = x + y;
        System.out.println("Sum: " + sum);
    }
}`;

export default function Visualizer() {
  const [code, setCode] = useState(defaultCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Execution data
  const [bytecode, setBytecode] = useState([]);
  const [executionTrace, setExecutionTrace] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [programOutput, setProgramOutput] = useState('');
  const [jitLogs, setJitLogs] = useState([]);
  const [gcLogs, setGcLogs] = useState([]);
  const [heapObjects, setHeapObjects] = useState([]);
  const [stackFrames, setStackFrames] = useState([]);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await executeJavaCode(code);
      
      if (result.success) {
        setBytecode(result.bytecode || []);
        setExecutionTrace(result.executionTrace || []);
        setProgramOutput(result.output || '');
        setJitLogs(result.jitLogs || []);
        setGcLogs(result.gcLogs || []);
        setCurrentStep(0);
        
        // Initialize visualization data
        if (result.executionTrace && result.executionTrace.length > 0) {
          const firstStep = result.executionTrace[0];
          setStackFrames(firstStep.stack || []);
          setHeapObjects([]);
        }
      } else {
        setError(result.error || 'Compilation or execution failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to execute code');
    } finally {
      setLoading(false);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (executionTrace[step]) {
      setStackFrames(executionTrace[step].stack || []);
      // Update heap based on execution state (simplified)
      if (step > executionTrace.length / 2) {
        setHeapObjects([
          { id: 'obj1', type: 'String', value: 'Sum: 15' }
        ]);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-jvm-darker">
      {/* Top Bar */}
      <div className="bg-jvm-dark border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">Java Execution Visualizer</h1>
        <button
          onClick={handleExecute}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-jvm-accent to-purple-600 text-white px-6 py-2 rounded hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Execute</span>
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 px-4 py-3 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-400">Execution Error</p>
            <pre className="text-sm text-red-300 mt-1 whitespace-pre-wrap">{error}</pre>
          </div>
        </div>
      )}

      {/* Main Content - DevTools Style Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Code Editor */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <CodeEditor code={code} onChange={setCode} />
        </div>

        {/* Right Panel - Split View */}
        <div className="w-1/2 flex flex-col">
          {/* Top Right - Bytecode & Debugger */}
          <div className="h-1/2 border-b border-gray-800 flex">
            <div className="w-1/2 border-r border-gray-800">
              <BytecodeViewer 
                bytecode={bytecode} 
                currentLine={executionTrace[currentStep]?.line || 0}
              />
            </div>
            <div className="w-1/2">
              <BytecodeDebugger
                executionTrace={executionTrace}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>
          </div>

          {/* Bottom Right - Multi-tab View */}
          <div className="h-1/2 flex">
            <div className="w-1/3 border-r border-gray-800">
              <StackView frames={stackFrames} />
            </div>
            <div className="w-1/3 border-r border-gray-800">
              <HeapView objects={heapObjects} />
            </div>
            <div className="w-1/3">
              <ExecutionLogs
                programOutput={programOutput}
                jitLogs={jitLogs}
                gcLogs={gcLogs}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Expandable Visualizations */}
      <div className="h-64 border-t border-gray-800 flex">
        <div className="w-1/3 border-r border-gray-800">
          <GCVisualizer gcEvents={gcLogs} />
        </div>
        <div className="w-1/3 border-r border-gray-800">
          <JVMArchitecture activeNode={currentStep > 0 ? 'execution' : null} />
        </div>
        <div className="w-1/3 flex">
          <div className="w-1/2 border-r border-gray-800">
            <Memory3D stackData={stackFrames} heapData={heapObjects} />
          </div>
          <div className="w-1/2">
            <ExplanationPanel
              topic="bytecode"
              currentInstruction={executionTrace[currentStep]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
