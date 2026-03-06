import { parseJavaCode, detectHotspots } from './javaParser';

// Base execution steps that always occur
const baseSteps = [
  {
    id: 1,
    title: "Write Java Code",
    description: "Developer writes Java source code and saves it as a .java file.",
    highlightComponent: "editor",
    animationType: "fade-in"
  },
  {
    id: 2,
    title: "Java Source File Created",
    description: "The Java source file contains human-readable code with classes, methods, and logic.",
    highlightComponent: "source-code",
    animationType: "slide-in"
  },
  {
    id: 3,
    title: "JDK Compiler (javac)",
    description: "The JDK compiler (javac) reads the .java file and compiles it into bytecode.",
    highlightComponent: "compiler",
    animationType: "highlight"
  },
  {
    id: 4,
    title: "Bytecode Generated (.class)",
    description: "The compiler produces bytecode files (.class) containing JVM instructions. Bytecode is platform-independent.",
    highlightComponent: "bytecode",
    animationType: "zoom"
  },
  {
    id: 5,
    title: "JRE Loads Program",
    description: "The Java Runtime Environment (JRE) is invoked to run the program.",
    highlightComponent: "jre",
    animationType: "glow"
  },
  {
    id: 6,
    title: "JVM Class Loader",
    description: "The Class Loader loads .class files into JVM memory and verifies the bytecode.",
    highlightComponent: "class-loader",
    animationType: "highlight"
  },
  {
    id: 7,
    title: "Method Area Populated",
    description: "The Class Loader loads class structures, method definitions, and static variables into the Method Area.",
    highlightComponent: "method-area",
    animationType: "fill"
  }
];

// Generate dynamic execution steps based on code analysis
export const generateExecutionSteps = (code) => {
  const analysis = parseJavaCode(code);
  const hotspots = detectHotspots(code);
  
  let steps = [...baseSteps];
  let currentId = 8;

  // Add heap allocation if objects are likely created
  steps.push({
    id: currentId++,
    title: "Heap Memory Allocation",
    description: `The JVM allocates memory in the Heap for objects. ${analysis.variables.length > 0 ? `Found ${analysis.variables.length} variable(s) in code.` : 'Heap is shared across all threads.'}`,
    highlightComponent: "heap",
    animationType: "fill"
  });

  // Add stack frame based on methods
  if (analysis.hasMain || analysis.hasMethods > 0) {
    steps.push({
      id: currentId++,
      title: "Stack Frame Created",
      description: `When ${analysis.hasMain ? 'main()' : 'a method'} is invoked, a new Stack Frame is created containing local variables${analysis.variables.length > 0 ? ` (${analysis.variables.slice(0, 2).join(', ')}${analysis.variables.length > 2 ? '...' : ''})` : ''}.`,
      highlightComponent: "stack",
      animationType: "slide-in"
    });
  }

  // Execution engine
  steps.push({
    id: currentId++,
    title: "Execution Engine Starts",
    description: "The Execution Engine takes bytecode instructions and begins execution.",
    highlightComponent: "execution-engine",
    animationType: "glow"
  });

  // Bytecode interpretation
  steps.push({
    id: currentId++,
    title: "Bytecode Interpretation",
    description: `The Interpreter reads bytecode instructions one by one. ${analysis.hasMethods > 0 ? `Executing ${analysis.methods.join(', ')} method(s).` : 'Converting bytecode to machine instructions.'}`,
    highlightComponent: "interpreter",
    animationType: "flow"
  });

  // Add hotspot detection only if loops or frequently called methods exist
  if (analysis.hasLoops > 0 || analysis.hasMethods > 2) {
    steps.push({
      id: currentId++,
      title: "Hotspot Detection",
      description: `🔥 Hotspot detected! ${analysis.hasLoops > 0 ? `Found ${analysis.hasLoops} loop(s)` : `Found ${analysis.hasMethods} methods`} - frequently executed code identified for optimization.`,
      highlightComponent: "hotspot",
      animationType: "pulse"
    });

    steps.push({
      id: currentId++,
      title: "JIT Compilation",
      description: `The JIT Compiler compiles the hotspot code directly into native machine code for ${analysis.hasLoops > 0 ? 'loop optimization' : 'better performance'}.`,
      highlightComponent: "jit-compiler",
      animationType: "highlight"
    });

    steps.push({
      id: currentId++,
      title: "Native Code Execution",
      description: "The compiled native code executes much faster than interpreted bytecode. The JVM caches this code for reuse.",
      highlightComponent: "native-execution",
      animationType: "pulse"
    });
  } else {
    // Simple interpretation without JIT
    steps.push({
      id: currentId++,
      title: "Direct Execution",
      description: "Code executes through interpretation. No hotspots detected, so JIT compilation is not triggered.",
      highlightComponent: "interpreter",
      animationType: "flow"
    });
  }

  // Add conditional execution step if conditionals exist
  if (analysis.hasConditionals > 0) {
    steps.push({
      id: currentId++,
      title: "Conditional Branching",
      description: `Executing ${analysis.hasConditionals} conditional statement(s). JVM evaluates conditions and branches accordingly.`,
      highlightComponent: "execution-engine",
      animationType: "highlight"
    });
  }

  // Native method calls if detected
  const hasNativeCalls = /System\.(out|in|err)|Math\.|Thread\./.test(code);
  if (hasNativeCalls) {
    steps.push({
      id: currentId++,
      title: "Native Method Invocation",
      description: "Calling native methods (System.out.println, Math functions, etc.) through Native Method Stack.",
      highlightComponent: "native-stack",
      animationType: "highlight"
    });
  }

  // Program output
  steps.push({
    id: currentId++,
    title: "Program Output",
    description: `Program execution completed successfully. ${analysis.hasLoops > 0 ? 'Loop iterations finished.' : ''} Memory will be garbage collected.`,
    highlightComponent: "output",
    animationType: "fade-in"
  });

  return steps;
};

// Get component visibility based on current step
export const getActiveComponents = (step, allSteps) => {
  const componentsToShow = {
    showClassLoader: false,
    showHeap: false,
    showStack: false,
    showMethodArea: false,
    showExecutionEngine: false,
    showInterpreter: false,
    showJIT: false,
    showNativeExecution: false,
    showNativeStack: false
  };

  if (!step) return componentsToShow;

  const stepId = step.id;
  
  // Class Loader visible from step 6-8
  componentsToShow.showClassLoader = stepId >= 6 && stepId <= 8;
  
  // Method Area visible from step 7 onwards
  componentsToShow.showMethodArea = stepId >= 7;
  
  // Heap visible from heap allocation step onwards
  const heapStep = allSteps.find(s => s.highlightComponent === 'heap');
  if (heapStep) {
    componentsToShow.showHeap = stepId >= heapStep.id;
  }
  
  // Stack visible from stack frame step onwards
  const stackStep = allSteps.find(s => s.highlightComponent === 'stack');
  if (stackStep) {
    componentsToShow.showStack = stepId >= stackStep.id;
  }
  
  // Execution Engine
  const execEngineStep = allSteps.find(s => s.highlightComponent === 'execution-engine');
  if (execEngineStep) {
    componentsToShow.showExecutionEngine = stepId >= execEngineStep.id;
  }
  
  // Interpreter
  const interpreterStep = allSteps.find(s => s.highlightComponent === 'interpreter');
  if (interpreterStep) {
    componentsToShow.showInterpreter = stepId >= interpreterStep.id;
  }
  
  // JIT Compiler
  const jitStep = allSteps.find(s => s.highlightComponent === 'jit-compiler');
  if (jitStep) {
    componentsToShow.showJIT = stepId >= jitStep.id && stepId <= jitStep.id + 2;
  }
  
  // Native Execution
  const nativeExecStep = allSteps.find(s => s.highlightComponent === 'native-execution');
  if (nativeExecStep) {
    componentsToShow.showNativeExecution = stepId >= nativeExecStep.id;
  }
  
  // Native Stack
  const nativeStackStep = allSteps.find(s => s.highlightComponent === 'native-stack');
  if (nativeStackStep) {
    componentsToShow.showNativeStack = stepId >= nativeStackStep.id;
  }
  
  return componentsToShow;
};
