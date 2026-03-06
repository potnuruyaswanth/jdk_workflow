export const executionSteps = [
  {
    id: 1,
    title: "Write Java Code",
    description: "Developer writes Java source code and saves it as a .java file. This is the first step where the programmer composes the program.",
    highlightComponent: "editor",
    animationType: "fade-in"
  },
  {
    id: 2,
    title: "Java Source File Created",
    description: "The Java source file (e.g., Hello.java) contains human-readable code with classes, methods, and logic.",
    highlightComponent: "source-code",
    animationType: "slide-in"
  },
  {
    id: 3,
    title: "JDK Compiler (javac)",
    description: "The JDK compiler (javac) reads the .java file and compiles it into bytecode. This is a one-time compilation process.",
    highlightComponent: "compiler",
    animationType: "highlight"
  },
  {
    id: 4,
    title: "Bytecode Generated (.class)",
    description: "The compiler produces bytecode files (.class) containing JVM instructions. Bytecode is platform-independent and can run on any JVM.",
    highlightComponent: "bytecode",
    animationType: "zoom"
  },
  {
    id: 5,
    title: "JRE Loads Program",
    description: "The Java Runtime Environment (JRE) is invoked to run the program. It provides the JVM and runtime libraries.",
    highlightComponent: "jre",
    animationType: "glow"
  },
  {
    id: 6,
    title: "JVM Class Loader",
    description: "The Class Loader is responsible for loading .class files into JVM memory. It verifies the bytecode and checks for security issues.",
    highlightComponent: "class-loader",
    animationType: "highlight"
  },
  {
    id: 7,
    title: "Method Area Populated",
    description: "The Class Loader loads class structures, method definitions, and static variables into the Method Area (part of heap).",
    highlightComponent: "method-area",
    animationType: "fill"
  },
  {
    id: 8,
    title: "Heap Memory Allocation",
    description: "The JVM allocates memory in the Heap for objects. Heap is shared across all threads and managed by garbage collector.",
    highlightComponent: "heap",
    animationType: "fill"
  },
  {
    id: 9,
    title: "Stack Frame Created",
    description: "When a method is invoked, a new Stack Frame is created containing local variables, method calls, and return addresses.",
    highlightComponent: "stack",
    animationType: "slide-in"
  },
  {
    id: 10,
    title: "Execution Engine Starts",
    description: "The Execution Engine takes bytecode instructions and executes them. It operates in two modes: Interpreter and JIT Compiler.",
    highlightComponent: "execution-engine",
    animationType: "glow"
  },
  {
    id: 11,
    title: "Bytecode Interpretation",
    description: "The Interpreter reads bytecode instructions one by one and converts them into native machine instructions for execution.",
    highlightComponent: "interpreter",
    animationType: "flow"
  },
  {
    id: 12,
    title: "Hotspot Detection",
    description: "The JVM monitors code execution and detects frequently executed code paths (hotspots). This triggers JIT compilation.",
    highlightComponent: "hotspot",
    animationType: "pulse"
  },
  {
    id: 13,
    title: "JIT Compilation",
    description: "The JIT Compiler compiles frequently executed bytecode directly into native machine code for better performance.",
    highlightComponent: "jit-compiler",
    animationType: "highlight"
  },
  {
    id: 14,
    title: "Native Code Execution",
    description: "The compiled native code executes much faster than interpreted bytecode. The JVM caches this code for reuse.",
    highlightComponent: "native-execution",
    animationType: "pulse"
  },
  {
    id: 15,
    title: "Program Output",
    description: "The program produces output and completes execution. Memory is eventually garbage collected.",
    highlightComponent: "output",
    animationType: "fade-in"
  }
];

export const jvmArchitectureData = {
  layers: [
    {
      name: "Java Application",
      description: "Your Java code (.java files)",
      color: "bg-blue-500"
    },
    {
      name: "JDK (Java Development Kit)",
      description: "Compiler (javac), Tools, Libraries",
      color: "bg-purple-500"
    },
    {
      name: "JRE (Java Runtime Environment)",
      description: "JVM + Standard Libraries",
      color: "bg-indigo-500"
    },
    {
      name: "JVM (Java Virtual Machine)",
      description: "Executes bytecode",
      color: "bg-cyan-500"
    },
    {
      name: "Operating System",
      description: "Windows, Linux, macOS",
      color: "bg-gray-500"
    }
  ]
};

export const jvmMemoryAreas = [
  {
    name: "Method Area",
    description: "Stores class structures, method definitions, static data, code for methods",
    size: "Shared (per JVM)",
    color: "bg-orange-600"
  },
  {
    name: "Heap",
    description: "Runtime data area for object allocation, garbage collected",
    size: "Shared (per JVM)",
    color: "bg-red-600"
  },
  {
    name: "Stack",
    description: "Stores stack frames for method calls, local variables",
    size: "Per Thread",
    color: "bg-green-600"
  },
  {
    name: "Program Counter (PC) Register",
    description: "Stores address of currently executing JVM instruction",
    size: "Per Thread",
    color: "bg-blue-600"
  },
  {
    name: "Native Method Stack",
    description: "Contains all native methods used in the application",
    size: "Per Thread",
    color: "bg-yellow-600"
  }
];

export const sampleJavaCode = `public class Hello {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 5; i++) {
            count += i;
            System.out.println("Count: " + count);
        }
        System.out.println("Final count: " + count);
    }
}`;
