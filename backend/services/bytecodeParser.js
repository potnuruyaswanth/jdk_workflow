// Parse bytecode and simulate execution
export function parseMethodBytecode(instructions) {
  const methods = {};
  
  instructions.forEach(instr => {
    if (!methods[instr.method]) {
      methods[instr.method] = [];
    }
    methods[instr.method].push(instr);
  });

  return methods;
}

// Simulate stack operations for bytecode instruction
export function simulateInstruction(instruction, stack = [], locals = {}) {
  const { opcode, operand, index } = instruction;
  const newStack = [...stack];
  const newLocals = { ...locals };

  switch (opcode) {
    // Constants
    case 'iconst_0': newStack.push(0); break;
    case 'iconst_1': newStack.push(1); break;
    case 'iconst_2': newStack.push(2); break;
    case 'iconst_3': newStack.push(3); break;
    case 'iconst_4': newStack.push(4); break;
    case 'iconst_5': newStack.push(5); break;
    case 'bipush': newStack.push(parseInt(operand)); break;
    case 'sipush': newStack.push(parseInt(operand)); break;
    case 'ldc': newStack.push(operand); break;

    // Store operations
    case 'istore_0': newLocals['0'] = newStack.pop(); break;
    case 'istore_1': newLocals['1'] = newStack.pop(); break;
    case 'istore_2': newLocals['2'] = newStack.pop(); break;
    case 'istore_3': newLocals['3'] = newStack.pop(); break;
    case 'istore': 
      const storeIdx = operand.trim();
      newLocals[storeIdx] = newStack.pop();
      break;

    // Load operations - integers
    case 'iload_0': newStack.push(newLocals['0'] || 0); break;
    case 'iload_1': newStack.push(newLocals['1'] || 0); break;
    case 'iload_2': newStack.push(newLocals['2'] || 0); break;
    case 'iload_3': newStack.push(newLocals['3'] || 0); break;
    case 'iload':
      const loadIdx = operand.trim();
      newStack.push(newLocals[loadIdx] || 0);
      break;

    // Load operations - references
    case 'aload_0': newStack.push(newLocals['0'] || { type: 'reference', value: 'this' }); break;
    case 'aload_1': newStack.push(newLocals['1'] || { type: 'reference', value: 'arg0' }); break;
    case 'aload_2': newStack.push(newLocals['2'] || { type: 'reference', value: 'arg1' }); break;
    case 'aload_3': newStack.push(newLocals['3'] || { type: 'reference', value: 'arg2' }); break;
    case 'aload':
      const aloadIdx = operand.trim();
      newStack.push(newLocals[aloadIdx] || { type: 'reference' });
      break;

    // Store operations - references
    case 'astore_0': newLocals['0'] = newStack.pop(); break;
    case 'astore_1': newLocals['1'] = newStack.pop(); break;
    case 'astore_2': newLocals['2'] = newStack.pop(); break;
    case 'astore_3': newLocals['3'] = newStack.pop(); break;
    case 'astore':
      const astoreIdx = operand.trim();
      newLocals[astoreIdx] = newStack.pop();
      break;

    // Arithmetic
    case 'iadd':
      const b = newStack.pop();
      const a = newStack.pop();
      newStack.push(a + b);
      break;
    case 'isub':
      const b2 = newStack.pop();
      const a2 = newStack.pop();
      newStack.push(a2 - b2);
      break;
    case 'imul':
      const b3 = newStack.pop();
      const a3 = newStack.pop();
      newStack.push(a3 * b3);
      break;
    case 'idiv':
      const b4 = newStack.pop();
      const a4 = newStack.pop();
      newStack.push(Math.floor(a4 / b4));
      break;

    // Object operations
    case 'new':
      newStack.push({ type: 'object', className: operand });
      break;
    case 'dup':
      newStack.push(newStack[newStack.length - 1]);
      break;

    // Field access
    case 'getstatic':
      newStack.push({ type: 'static-field', field: operand });
      break;
    case 'putstatic':
      newStack.pop();
      break;
    case 'getfield':
      newStack.pop(); // object reference
      newStack.push({ type: 'field', field: operand });
      break;
    case 'putfield':
      newStack.pop(); // value
      newStack.pop(); // object reference
      break;

    // Control flow
    case 'goto':
    case 'if_icmpge':
    case 'if_icmpgt':
    case 'if_icmple':
    case 'if_icmplt':
    case 'if_icmpeq':
    case 'if_icmpne':
    case 'ifeq':
    case 'ifne':
    case 'iflt':
    case 'ifge':
    case 'ifgt':
    case 'ifle':
      // Branch instructions - pop comparison values
      if (opcode.startsWith('if_icmp')) {
        newStack.pop();
        newStack.pop();
      } else if (opcode.startsWith('if')) {
        newStack.pop();
      }
      break;

    // Method invocation
    case 'invokevirtual':
    case 'invokestatic':
    case 'invokespecial':
    case 'invokedynamic':
      // Pop arguments based on method signature (simplified)
      if (operand.includes('println')) {
        newStack.pop(); // pop the argument to println
        if (opcode === 'invokevirtual') {
          newStack.pop(); // pop the object reference
        }
      }
      break;

    // Return
    case 'return':
    case 'ireturn':
    case 'areturn':
      // Method returns
      break;

    default:
      // Unknown instruction - log it (suppress for now)
      // console.log(`Unknown opcode: ${opcode}`);
  }

  return {
    stack: newStack,
    locals: newLocals,
    description: getInstructionDescription(opcode, operand)
  };
}

// Get human-readable description of instruction
function getInstructionDescription(opcode, operand) {
  const descriptions = {
    iconst_0: 'Push constant 0 onto stack',
    iconst_1: 'Push constant 1 onto stack',
    iconst_2: 'Push constant 2 onto stack',
    iconst_3: 'Push constant 3 onto stack',
    iconst_4: 'Push constant 4 onto stack',
    iconst_5: 'Push constant 5 onto stack',
    bipush: `Push byte constant ${operand} onto stack`,
    sipush: `Push short constant ${operand} onto stack`,
    ldc: `Load constant ${operand}`,
    istore_0: 'Store top of stack into local variable 0',
    istore_1: 'Store top of stack into local variable 1',
    istore_2: 'Store top of stack into local variable 2',
    istore_3: 'Store top of stack into local variable 3',
    istore: `Store top of stack into local variable ${operand}`,
    iload_0: 'Load local variable 0 onto stack',
    iload_1: 'Load local variable 1 onto stack',
    iload_2: 'Load local variable 2 onto stack',
    iload_3: 'Load local variable 3 onto stack',
    iload: `Load local variable ${operand} onto stack`,
    aload_0: 'Load reference from local variable 0 (this)',
    aload_1: 'Load reference from local variable 1',
    aload_2: 'Load reference from local variable 2',
    aload_3: 'Load reference from local variable 3',
    aload: `Load reference from local variable ${operand}`,
    astore_0: 'Store reference into local variable 0',
    astore_1: 'Store reference into local variable 1',
    astore_2: 'Store reference into local variable 2',
    astore_3: 'Store reference into local variable 3',
    astore: `Store reference into local variable ${operand}`,
    iadd: 'Pop two integers, add them, push result',
    isub: 'Pop two integers, subtract them, push result',
    imul: 'Pop two integers, multiply them, push result',
    idiv: 'Pop two integers, divide them, push result',
    new: `Create new object of type ${operand}`,
    dup: 'Duplicate top of stack',
    getstatic: `Get static field ${operand}`,
    putstatic: `Set static field ${operand}`,
    getfield: `Get instance field ${operand}`,
    putfield: `Set instance field ${operand}`,
    goto: `Jump to instruction ${operand}`,
    if_icmpge: `Jump if first >= second to ${operand}`,
    if_icmpgt: `Jump if first > second to ${operand}`,
    if_icmple: `Jump if first <= second to ${operand}`,
    if_icmplt: `Jump if first < second to ${operand}`,
    if_icmpeq: `Jump if first == second to ${operand}`,
    if_icmpne: `Jump if first != second to ${operand}`,
    ifeq: `Jump if value == 0 to ${operand}`,
    ifne: `Jump if value != 0 to ${operand}`,
    iflt: `Jump if value < 0 to ${operand}`,
    ifge: `Jump if value >= 0 to ${operand}`,
    ifgt: `Jump if value > 0 to ${operand}`,
    ifle: `Jump if value <= 0 to ${operand}`,
    invokevirtual: `Invoke instance method ${operand}`,
    invokestatic: `Invoke static method ${operand}`,
    invokespecial: `Invoke special method ${operand}`,
    invokedynamic: `Invoke dynamic method ${operand}`,
    return: 'Return from void method',
    ireturn: 'Return integer from method',
    areturn: 'Return reference from method'
  };

  return descriptions[opcode] || `Execute ${opcode} ${operand}`;
}

// Generate execution trace for all instructions
export function generateExecutionTrace(instructions) {
  const trace = [];
  let stack = [];
  let locals = {};

  for (const instr of instructions) {
    const result = simulateInstruction(instr, stack, locals);
    stack = result.stack;
    locals = result.locals;

    trace.push({
      index: instr.index,
      opcode: instr.opcode,
      operand: instr.operand,
      stack: [...stack],
      locals: { ...locals },
      description: result.description
    });
  }

  return trace;
}

export default {
  parseMethodBytecode,
  simulateInstruction,
  generateExecutionTrace
};
