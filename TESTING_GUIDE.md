# 🧪 JVM Insight - Panel Testing Guide

Test each visualization panel with these code examples to see different aspects of Java execution.

---

## 📋 Test 1: Simple Arithmetic (Default)
**Purpose**: Test basic bytecode operations and stack manipulation

### Code:
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

### What to Observe:
✅ **Bytecode Viewer**: ~15 instructions
- `iconst_5` - Push constant 5
- `istore_1` - Store to local variable 1 (x)
- `bipush 10` - Push constant 10
- `istore_2` - Store to local variable 2 (y)
- `iload_1` - Load x
- `iload_2` - Load y
- `iadd` - Add them
- `istore_3` - Store result (sum)
- `invokevirtual println` - Print output

✅ **Stack View**: Watch stack grow/shrink
- Starts empty
- Push 5 → Stack: [5]
- Store to x → Stack: []
- Push 10 → Stack: [10]
- Store to y → Stack: []
- Load x, y → Stack: [5, 10]
- Add → Stack: [15]

✅ **Execution Logs**: `Sum: 15`

✅ **Debugger**: Step through each instruction

---

## 📋 Test 2: Loop with Control Flow
**Purpose**: Test branching instructions (goto, if_icmpge)

### Code:
```java
public class Counter {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
        System.out.println("Done!");
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Look for control flow
- `goto` - Jump to label
- `if_icmpge` - Compare and branch
- Loop structure visible

✅ **Stack View**: Counter variable in locals
- Local variable 1: i (changes 0→1→2→3→4)

✅ **Execution Logs**: 
```
0
1
2
3
4
Done!
```

✅ **Debugger**: Watch loop iterations
- See goto jump back to loop start
- See if_icmpge check condition

---

## 📋 Test 3: Method Calls (Stack Frames)
**Purpose**: Test multiple stack frames and method invocation

### Code:
```java
public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int result = add(a, b);
        System.out.println("Result: " + result);
    }
    
    static int add(int x, int y) {
        int sum = x + y;
        return sum;
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Two methods
- `main` method bytecode
- `add` method bytecode
- `invokestatic` - Call add method
- `ireturn` - Return from add

✅ **Stack View**: Multiple stack frames
- Frame 1: main (variables: a, b, result)
- Frame 2: add (variables: x, y, sum) - appears during call

✅ **Execution Logs**: `Result: 30`

✅ **JVM Architecture**: Active node changes during execution
- Execution Engine active during method call

---

## 📋 Test 4: Object Creation (Heap Allocation)
**Purpose**: Test object allocation and heap visualization

### Code:
```java
public class Person {
    String name;
    int age;
    
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "Alice";
        p.age = 25;
        System.out.println(p.name + " is " + p.age);
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Object operations
- `new Person` - Create object
- `dup` - Duplicate reference
- `invokespecial <init>` - Call constructor
- `astore_1` - Store reference
- `aload_1` - Load reference
- `putfield name` - Set field
- `getfield age` - Get field

✅ **Heap View**: Object appears!
- Type: Person
- Fields: name="Alice", age=25
- Orange box with object details

✅ **Stack View**: Reference type
- Local variable 1: Person@<reference>

✅ **3D Memory**: Orange sphere shows heap object

---

## 📋 Test 5: Array Operations
**Purpose**: Test array creation and access

### Code:
```java
public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;
        
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        
        System.out.println("Sum: " + sum);
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Array operations
- `newarray` - Create array
- `dup`
- `iconst_0` - Index 0
- `bipush 10` - Value 10
- `iastore` - Store to array
- `aaload` - Load from array
- `arraylength` - Get array length

✅ **Heap View**: Array object
- Type: int[]
- Length: 5
- Values: [10, 20, 30, 40, 50]

✅ **Execution Logs**: `Sum: 150`

✅ **Debugger**: Watch array access in loop

---

## 📋 Test 6: Recursion (Multiple Stack Frames)
**Purpose**: Test deep stack frames and method recursion

### Code:
```java
public class Factorial {
    public static void main(String[] args) {
        int n = 5;
        int result = factorial(n);
        System.out.println("Factorial of " + n + " = " + result);
    }
    
    static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}
```

### What to Observe:
✅ **Stack View**: Deep recursion!
- Frame 1: main(n=5)
- Frame 2: factorial(n=5)
- Frame 3: factorial(n=4)
- Frame 4: factorial(n=3)
- Frame 5: factorial(n=2)
- Frame 6: factorial(n=1)
- Frames disappear as recursion unwinds

✅ **Bytecode Viewer**: Recursive call
- `invokestatic factorial` - Recursive call
- `ireturn` - Return integer

✅ **Execution Logs**: `Factorial of 5 = 120`

✅ **3D Memory**: Purple stack tower grows tall!

---

## 📋 Test 7: Static Fields (Method Area)
**Purpose**: Test static variable storage

### Code:
```java
public class Counter {
    static int count = 0;
    
    public static void main(String[] args) {
        count = 10;
        count = count + 5;
        System.out.println("Count: " + count);
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Static field access
- `putstatic count` - Set static field
- `getstatic count` - Get static field

✅ **JVM Architecture**: Method Area active
- Shows where static data is stored

✅ **Execution Logs**: `Count: 15`

---

## 📋 Test 8: String Operations (String Pool)
**Purpose**: Test string constant pool and concatenation

### Code:
```java
public class StringTest {
    public static void main(String[] args) {
        String greeting = "Hello";
        String name = "World";
        String message = greeting + " " + name + "!";
        System.out.println(message);
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: String operations
- `ldc "Hello"` - Load string constant
- `astore` - Store reference
- `new StringBuilder` - String concatenation
- `invokespecial <init>` - Constructor
- `invokevirtual append` - Append to builder
- `invokevirtual toString` - Get final string

✅ **Heap View**: Multiple String objects
- "Hello"
- "World"
- StringBuilder object
- Final message "Hello World!"

✅ **Execution Logs**: `Hello World!`

---

## 📋 Test 9: Exception Handling (Try-Catch)
**Purpose**: Test exception tables and control flow

### Code:
```java
public class ExceptionTest {
    public static void main(String[] args) {
        try {
            int x = 10;
            int y = 0;
            int result = x / y;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero");
        }
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Exception handling
- Exception table visible
- Catch block bytecode
- `idiv` - Division operation

✅ **Execution Logs**: `Error: Division by zero`
- No stack trace, just catch block output

---

## 📋 Test 10: Multiple Data Types
**Purpose**: Test different primitive types

### Code:
```java
public class DataTypes {
    public static void main(String[] args) {
        int i = 100;
        long l = 1000L;
        float f = 3.14f;
        double d = 2.718;
        boolean b = true;
        
        System.out.println("Int: " + i);
        System.out.println("Long: " + l);
        System.out.println("Float: " + f);
        System.out.println("Double: " + d);
        System.out.println("Boolean: " + b);
    }
}
```

### What to Observe:
✅ **Bytecode Viewer**: Different opcodes
- `istore` - Integer store
- `lstore` - Long store
- `fstore` - Float store
- `dstore` - Double store
- `ldc2_w` - Load long/double constant

✅ **Stack View**: Different type sizes
- long and double take 2 slots
- int, float, boolean take 1 slot

---

## 🎯 Panel Checklist

Test each panel systematically:

### ✅ Code Editor Panel
- [ ] Test 1: Default code loads
- [ ] Test 2: Can edit code
- [ ] Test 3: Syntax highlighting works
- [ ] Test 4: Can paste new code

### ✅ Bytecode Viewer Panel
- [ ] Test 1: Shows basic instructions (iconst, istore, iload)
- [ ] Test 2: Shows control flow (goto, if_icmpge)
- [ ] Test 3: Shows method calls (invokestatic, invokevirtual)
- [ ] Test 4: Shows object ops (new, dup, putfield)
- [ ] Test 5: Highlights current instruction during stepping

### ✅ Bytecode Debugger Panel
- [ ] Test 1: Previous button works (⏮️)
- [ ] Test 2: Play/Pause works (▶️)
- [ ] Test 3: Next button works (⏭️)
- [ ] Test 4: Reset button works (🔄)
- [ ] Test 5: Progress bar updates
- [ ] Test 6: Stack display shows current state
- [ ] Test 7: Description shows instruction info

### ✅ Stack View Panel
- [ ] Test 1: Shows single frame (Test 1)
- [ ] Test 2: Shows local variables (Test 1)
- [ ] Test 3: Shows multiple frames (Test 3, Test 6)
- [ ] Test 4: Frames disappear on method return
- [ ] Test 5: Purple color theme visible

### ✅ Heap View Panel
- [ ] Test 1: Shows objects (Test 4)
- [ ] Test 2: Shows arrays (Test 5)
- [ ] Test 3: Shows strings (Test 8)
- [ ] Test 4: Orange color theme visible
- [ ] Test 5: Animations work

### ✅ Execution Logs Panel
- [ ] Test 1: Program Output tab shows println output
- [ ] Test 2: JIT Logs tab shows compilation events
- [ ] Test 3: GC tab shows garbage collection
- [ ] Test 4: Logs are scrollable
- [ ] Test 5: Color coding works (green/purple)

### ✅ GC Visualizer Panel
- [ ] Test 1: Shows GC event count
- [ ] Test 2: Shows objects collected
- [ ] Test 3: Timeline displays events
- [ ] Test 4: Green theme visible

### ✅ JVM Architecture Panel
- [ ] Test 1: Diagram loads
- [ ] Test 2: Shows all components (Class Loader, Heap, Stack, etc.)
- [ ] Test 3: Active node highlighting works
- [ ] Test 4: Can zoom/pan diagram

### ✅ Memory 3D Panel
- [ ] Test 1: 3D scene renders
- [ ] Test 2: Purple tower (Stack) visible
- [ ] Test 3: Orange sphere (Heap) visible
- [ ] Test 4: Blue plane (Method Area) visible
- [ ] Test 5: Can rotate view (click + drag)
- [ ] Test 6: Objects appear in heap during execution
- [ ] Test 7: Stack frames appear during execution

### ✅ Explanation Panel
- [ ] Test 1: Shows current instruction description
- [ ] Test 2: Quick reference displays
- [ ] Test 3: Content updates with execution
- [ ] Test 4: Educational content is accurate

---

## 🚀 Testing Workflow

For each test above:

1. **Copy the code** from this guide
2. **Paste into Code Editor** (left panel)
3. **Click Execute** (purple button in top bar)
4. **Wait for compilation** (~2-5 seconds)
5. **Click ▶️ Play** to auto-step through bytecode
6. **Observe all panels** simultaneously
7. **Use debugger controls** to step manually
8. **Check each panel** for expected behavior

---

## 📊 Expected Results Summary

| Test | Bytecode Size | Stack Frames | Heap Objects | Output Lines |
|------|---------------|--------------|--------------|--------------|
| 1. Arithmetic | ~15 | 1 | 0-1 | 1 |
| 2. Loop | ~25 | 1 | 0 | 6 |
| 3. Methods | ~30 | 2 | 0 | 1 |
| 4. Objects | ~40 | 1 | 1 | 1 |
| 5. Arrays | ~50 | 1 | 1 | 1 |
| 6. Recursion | ~20 | 6 (max) | 0 | 1 |
| 7. Static | ~20 | 1 | 0 | 1 |
| 8. Strings | ~60 | 1 | 4+ | 1 |
| 9. Exception | ~30 | 1 | 1 | 1 |
| 10. Types | ~80 | 1 | 5+ | 5 |

---

## 🎓 Learning Outcomes

After testing all panels, you'll understand:

✅ How Java compiles to bytecode
✅ How the operand stack works
✅ How local variables are stored
✅ How method calls create stack frames
✅ How objects are allocated on the heap
✅ How arrays are stored and accessed
✅ How recursion builds deep stacks
✅ How static fields live in Method Area
✅ How strings are handled (constant pool + concatenation)
✅ How JIT compiles hot code
✅ How GC reclaims memory

---

**Start with Test 1 and work your way through all 10 tests!** 🚀
