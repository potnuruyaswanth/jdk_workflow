# 🚀 JVM Insight - Quick Start Guide

## ✅ Application Status: COMPLETE & RUNNING

Both servers are up and running successfully!

### Running Servers
- **Backend**: http://localhost:5000 ✅
- **Frontend**: http://localhost:3000 ✅

---

## 🎯 How to Use

### 1. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

### 2. Home Page
- You'll see a beautiful landing page with:
  - Project overview
  - Feature highlights (Real Java Execution, Bytecode Visualization, JIT Logs, etc.)
  - Technology stack
  - "How It Works" section

### 3. Launch Visualizer
Click the **"Launch Visualizer"** button to access the main application.

### 4. Main Interface (Visualizer)
The interface is divided into multiple panels:

#### **Left Panel - Code Editor**
- Monaco editor (VS Code experience)
- Write or edit Java code
- Syntax highlighting
- Default code:
```java
public class HelloWorld {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int sum = x + y;
        System.out.println("Sum: " + sum);
    }
}
```

#### **Execute Button**
Click the purple **"Execute"** button in the top bar to:
1. Compile the code with `javac`
2. Extract bytecode with `javap -c`
3. Execute with JVM flags for JIT and GC logs
4. Visualize everything in real-time

#### **Right Top Panels**
- **Bytecode Viewer**: Shows all bytecode instructions
- **Bytecode Debugger**: Step-by-step execution controls
  - ⏮️ Previous step
  - ▶️ Play/Pause
  - ⏭️ Next step
  - 🔄 Reset
  - Progress bar showing execution progress

#### **Right Bottom Panels**
- **Stack View**: Stack frames with local variables (purple theme)
- **Heap View**: Heap objects with lifecycle animations (orange theme)
- **Execution Logs**: 
  - 📟 Program Output (green)
  - 🚀 JIT Compilation Logs (purple)
  - 🗑️ GC Events (green)

#### **Bottom Panel - Advanced Visualizations**
- **GC Visualizer**: Garbage collection timeline with events
- **JVM Architecture**: React Flow diagram showing JVM components
- **Memory 3D**: Three.js 3D visualization of Stack, Heap, and Method Area
- **Explanation Panel**: Educational descriptions and quick reference

---

## 🎮 Try These Examples

### Example 1: Simple Addition (Default)
Already loaded - just click Execute!

### Example 2: Fibonacci
```java
public class Fibonacci {
    public static void main(String[] args) {
        int n = 10;
        for (int i = 0; i < n; i++) {
            System.out.println(fib(i));
        }
    }
    
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}
```

### Example 3: Factorial
```java
public class Factorial {
    public static void main(String[] args) {
        int num = 5;
        int result = factorial(num);
        System.out.println("Factorial of " + num + " = " + result);
    }
    
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}
```

### Example 4: Array Operations
```java
public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
    }
}
```

---

## 🔍 What to Observe

### 1. Bytecode Instructions
Watch how Java compiler converts your code to bytecode:
- `iconst_*` - Push constants
- `istore_*` - Store to local variables
- `iload_*` - Load from local variables
- `iadd` - Add integers
- `invokevirtual` - Call methods
- `getstatic` - Access static fields
- `aload_0` - Load 'this' reference

### 2. Stack & Locals
See how the operand stack grows and shrinks with each instruction:
- Purple boxes = Stack items
- Local variables table updated in real-time

### 3. Execution Flow
Use the debugger to:
- Step through each bytecode instruction
- See stack state at each step
- Understand how the JVM executes your code

### 4. JIT Compilation
Look for messages like:
```
[JIT] Compiling method: java.lang.String.equals
[JIT] Tier 3 compilation complete
```

### 5. Garbage Collection
Monitor GC events in the GC Visualizer:
- GC event count
- Objects collected
- Timeline with timestamps

---

## 🛠️ Backend API

The backend exposes these endpoints:

### POST /api/execute
Execute Java code and get full results
```bash
curl -X POST http://localhost:5000/api/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"public class Test { public static void main(String[] args) { System.out.println(\"Hello\"); } }"}'
```

### POST /api/compile
Compile only (no execution)

### POST /api/bytecode
Get bytecode for compiled class

### GET /health
Check backend status
```bash
curl http://localhost:5000/health
```

---

## 📊 Architecture Flow

```
┌─────────────┐      HTTP POST         ┌──────────────┐
│   React     │─────────────────────────▶│   Express    │
│  Frontend   │◀─────────────────────────│   Backend    │
│ (Port 3000) │      JSON Response      │ (Port 5000)  │
└─────────────┘                         └──────┬───────┘
                                               │
                                               │ child_process.exec
                                               ▼
                                        ┌──────────────┐
                                        │    javac     │ Compile .java → .class
                                        │    javap     │ Extract bytecode
                                        │    java      │ Execute with JVM logs
                                        └──────────────┘
                                               │
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  JVM Output  │
                                        │  - Bytecode  │
                                        │  - Stdout    │
                                        │  - JIT Logs  │
                                        │  - GC Logs   │
                                        └──────────────┘
                                               │
                                               │ Parse & Simulate
                                               ▼
                                        ┌──────────────┐
                                        │ Visualize in │
                                        │   Frontend   │
                                        └──────────────┘
```

---

## 🎨 UI Features

### DevTools-Style Layout
Professional multi-panel interface similar to Chrome DevTools

### Color Themes
- **Purple** - Stack & JIT compilation
- **Orange** - Heap & objects
- **Green** - Output & GC events
- **Blue** - Method Area & architecture

### Animations
- Smooth transitions with Framer Motion
- Stack push/pop animations
- Heap object lifecycle
- GC event timeline

### Interactive Elements
- Resizable panels (future enhancement)
- Hover descriptions
- Click to highlight bytecode
- 3D orbit controls for Memory3D

---

## 🐛 Troubleshooting

### Backend not compiling Java
**Issue**: "javac not found"
**Solution**: Ensure Java JDK 17+ is installed and in PATH
```bash
java -version
javac -version
```

### Port conflicts
**Issue**: "Port 5000 already in use"
**Solution**: 
- Close other apps using port 5000
- Or edit `backend/.env` to change PORT

### Frontend not connecting to backend
**Issue**: API calls fail
**Solution**: 
- Ensure backend is running on port 5000
- Check `frontend/vite.config.js` proxy settings

---

## 🌟 Success Indicators

You'll know it's working when you see:

✅ **Backend Console**:
```
🚀 JVM Insight Backend running on port 5000
📊 Health check: http://localhost:5000/health
📝 Compiling Java code...
📊 Extracting bytecode...
▶️  Executing Java program...
POST /api/execute 200 3724ms
```

✅ **Frontend Browser**:
- Beautiful home page loads
- Visualizer page shows all panels
- Code editor is functional
- Execute button works
- Bytecode appears after execution
- Stack/Heap update in real-time
- Logs show program output

✅ **Browser DevTools Console**:
- No red errors
- Successful API responses (200 status)

---

## 📚 Learning Resources

Use this application to understand:

1. **Java Compilation Process**
   - Source code → Bytecode transformation
   - Class file structure

2. **JVM Architecture**
   - Class Loader
   - Runtime Data Areas (Heap, Stack, Method Area)
   - Execution Engine (Interpreter + JIT)

3. **Bytecode Instructions**
   - Stack-based virtual machine
   - Opcode semantics
   - Method invocation

4. **Runtime Optimizations**
   - JIT compilation triggers
   - Tiered compilation
   - Inline optimization

5. **Memory Management**
   - Heap allocation
   - Stack frames
   - Garbage collection

---

## 🎉 You're All Set!

The JVM Insight application is fully functional and ready to explore. Happy learning! 🚀

### Next Steps
1. Open http://localhost:3000
2. Click "Launch Visualizer"
3. Click "Execute" on the default code
4. Step through bytecode instructions
5. Try different Java programs
6. Explore all visualization panels

**Enjoy visualizing the magic of the JVM! ✨**
