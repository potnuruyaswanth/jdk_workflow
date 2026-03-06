# Java Execution Visualizer

An interactive web application that helps students and beginners understand **how Java programs execute internally using JDK, JRE, and JVM** through step-by-step animated visualizations.

## 🎯 Project Overview

Java Execution Visualizer is an educational tool that demonstrates the complete Java execution pipeline:

```
Java Source Code (.java)
    ↓
JDK Compiler (javac)
    ↓
Bytecode (.class)
    ↓
JRE loads program
    ↓
JVM Class Loader
    ↓
Memory Allocation
    ↓
Execution Engine
    ↓
Interpreter/JIT Compiler
    ↓
Native Machine Code Execution
```

## ✨ Features

- **Interactive Code Editor**: Write or paste Java code to visualize
- **Dynamic Execution Flow**: Execution steps adapt based on your actual code
  - Detects loops and triggers JIT compilation visualization
  - Skips unnecessary steps for simple programs
  - Adjusts flow based on code complexity
- **Horizontal Step Navigation**: Smooth scrollable step indicators with arrow controls
- **Step-by-Step Animation**: Watch each phase of Java execution
- **JVM Architecture Visualization**: Understand memory areas and components
- **Hotspot Detection**: See how frequently executed code triggers JIT compilation
- **Code Analysis**: Automatic detection of loops, methods, and variables
- **Memory Visualization**: Watch heap and stack memory in action
- **Educational Content**: Detailed explanations of JDK, JRE, and JVM concepts
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **Routing**: React Router
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd java-execution-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The application will automatically open at `http://localhost:5173`
   - If not, manually navigate to that URL

## 🚀 Usage

### Home Page
- View the project overview
- Learn about JDK, JRE, and JVM
- Navigate to the simulator or architecture guide

### Simulator
1. **Code Input**: Paste or write Java code in the editor
2. **Dynamic Execution**: The execution flow adapts to your code
   - Simple programs: ~10-12 steps (skips JIT compilation)
   - Programs with loops: ~14-16 steps (includes hotspot detection and JIT)
   - Complex programs: Additional steps for conditionals and native calls
3. **Run Controls**: 
   - `Run` - Auto-advance through all steps
   - `Next` - Move to the next execution step
   - `Previous` - Move to previous step
   - `Reset` - Return to beginning
4. **Horizontal Navigation**: Scroll through steps with arrow buttons
5. **Visualization**: Watch the JVM components activate as code progresses
6. **Analysis**: See code statistics including loops, methods, and variables

**Example Code Flows:**

*Simple Code (No Loops):*
```java
public class Simple {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```
→ Generates ~11 steps (skips JIT compilation)

*Code with Loops:*
```java
public class Loop {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
        }
    }
}
```
→ Generates ~15 steps (includes hotspot detection and JIT compilation)

### Architecture Guide
- Comprehensive explanations of JVM concepts
- Interactive diagrams and visualizations
- Detailed information about:
  - JDK (Java Development Kit)
  - JRE (Java Runtime Environment)
  - JVM (Java Virtual Machine)
  - Memory areas (Heap, Stack, Method Area)
  - Execution engine and JIT compilation
  - Garbage collection

## 📂 Project Structure

```
java-execution-visualizer/
├── src/
│   ├── components/
│   │   ├── Animation/
│   │   │   ├── FlowAnimator.jsx
│   │   │   └── StepController.jsx
│   │   ├── Editor/
│   │   │   └── CodeEditor.jsx
│   │   ├── Execution/
│   │   │   ├── ExecutionEngine.jsx
│   │   │   ├── Interpreter.jsx
│   │   │   ├── JITCompiler.jsx
│   │   │   └── NativeExecution.jsx
│   │   ├── JVM/
│   │   │   ├── ClassLoader.jsx
│   │   │   ├── Heap.jsx
│   │   │   ├── JVMArchitecture.jsx
│   │   │   ├── MethodArea.jsx
│   │   │   ├── NativeStack.jsx
│   │   │   └── Stack.jsx
│   │   └── UI/
│   │       ├── ExplanationPanel.jsx
│   │       ├── Footer.jsx
│   │       └── Navbar.jsx
│   ├── data/
│   │   └── executionSteps.js
│   ├── pages/
│   │   ├── Architecture.jsx
│   │   ├── Home.jsx
│   │   └── Simulator.jsx
│   ├── utils/
│   │   ├── executionStepGenerator.js
│   │   └── javaParser.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Component Overview

### Core Components

**CodeEditor.jsx** - Monaco-based Java code editor with syntax highlighting

**StepController.jsx** - Controls for simulation (Run, Next, Previous, Reset)

**ExplanationPanel.jsx** - Displays description and analysis of current step

**FlowAnimator.jsx** - Visual progress indicator showing execution steps

### JVM Components

**JVMArchitecture.jsx** - Overview of JVM components and execution flow

**ClassLoader.jsx** - Shows class loading process and hierarchy

**Heap.jsx** - Visualizes heap memory and object allocation

**Stack.jsx** - Shows stack frames and local variables

**MethodArea.jsx** - Displays class information and method metadata

**NativeStack.jsx** - Shows native method stack

### Execution Engine Components

**ExecutionEngine.jsx** - Overall execution engine overview

**Interpreter.jsx** - Bytecode interpretation visualization

**JITCompiler.jsx** - Hotspot detection and JIT compilation process

**NativeExecution.jsx** - Native machine code execution

## 🔧 Configuration

### Vite Configuration
- Port: `5173`
- Auto-open: enabled
- Fast refresh: enabled

### TailwindCSS
- Dark theme optimized
- Custom colors: primary (`#00d9ff`)
- Custom animations and effects

### Monaco Editor
- Language: Java
- Theme: vs-dark
- Custom styling for dark theme

## 📊 Data Files

**executionSteps.js** - Contains base execution steps and sample code

**executionStepGenerator.js** - Dynamic step generation that:
- Analyzes Java code structure
- Generates custom execution flows
- Detects loops, methods, and conditionals
- Determines component visibility per step
- Adapts JIT compilation steps based on code

**javaParser.js** - Utility functions for:
- Java code parsing and analysis
- Hotspot detection
- Memory usage estimation
- Bytecode representation generation

## 🎯 Learning Outcomes

After using this visualizer, users will understand:

1. ✅ How Java source code is compiled to bytecode
2. ✅ The role of JDK, JRE, and JVM
3. ✅ Class loading and verification process
4. ✅ JVM memory areas (Heap, Stack, Method Area)
5. ✅ Bytecode interpretation
6. ✅ Hotspot detection and JIT compilation
7. ✅ Native code execution
8. ✅ Garbage collection basics
9. ✅ Java's "Write Once, Run Anywhere" capability
10. ✅ Performance optimization techniques

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Connect your GitHub repo to Netlify
# Netlify automatically deploys from the dist folder
```

### Manual Hosting
```bash
npm run build
# Deploy the dist/ folder to any static hosting service
```

## 🔨 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📚 Learning Resources

- [OpenJDK Documentation](https://openjdk.java.net/)
- [Java Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se17/html/)
- [JIT Compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation)
- [Java Memory Management](https://docs.oracle.com/en/java/javase/17/)

## 🤝 Contributing

This is an educational project. Improvements and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is released under the MIT License.

## 🙋 Support

For questions, issues, or suggestions, please open an issue on the project repository.

## 🎓 Educational Purpose

This tool is designed to help:
- Computer Science students understand JVM internals
- Java developers appreciate compilation and execution
- Interview candidates prepare for technical interviews
- Educators teach about virtual machines and compilation

---

**Happy Learning!** 🚀

Transform your understanding of Java execution from "black box" to complete clarity.
