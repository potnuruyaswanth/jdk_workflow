import javaExecutor from '../services/javaExecutor.js';
import bytecodeParser from '../services/bytecodeParser.js';

// Execute Java code with full pipeline
export async function executeJavaCode(req, res) {
  try {
    const { code, enableJIT = true, enableGC = true } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid Java code provided'
      });
    }

    // Step 1: Compile Java code
    console.log('📝 Compiling Java code...');
    const compileResult = await javaExecutor.compileJava(code);

    if (!compileResult.success) {
      return res.json({
        success: false,
        stage: 'compilation',
        error: compileResult.error
      });
    }

    const className = compileResult.className;

    // Step 2: Extract bytecode
    console.log('📊 Extracting bytecode...');
    const bytecodeResult = await javaExecutor.extractBytecode(className);

    if (!bytecodeResult.success) {
      await javaExecutor.cleanup(className);
      return res.json({
        success: false,
        stage: 'bytecode',
        error: bytecodeResult.error
      });
    }

    // Step 3: Parse bytecode
    const methods = bytecodeParser.parseMethodBytecode(bytecodeResult.instructions);
    const executionTrace = bytecodeParser.generateExecutionTrace(bytecodeResult.instructions);

    // Step 4: Execute Java program
    console.log('▶️  Executing Java program...');
    const execResult = await javaExecutor.executeJava(className, {
      enableJIT,
      enableGC
    });

    // Step 5: Cleanup
    await javaExecutor.cleanup(className);

    // Return complete results
    res.json({
      success: true,
      data: {
        className,
        bytecode: {
          raw: bytecodeResult.raw,
          instructions: bytecodeResult.instructions,
          methods,
          executionTrace
        },
        execution: {
          output: execResult.output,
          success: execResult.success,
          error: execResult.error
        },
        jitLogs: execResult.jitLogs || [],
        gcLogs: execResult.gcLogs || [],
        metadata: {
          timestamp: new Date().toISOString(),
          instructionCount: bytecodeResult.instructions.length,
          methodCount: Object.keys(methods).length
        }
      }
    });

  } catch (error) {
    console.error('❌ Execution error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}

// Compile only (no execution)
export async function compileJavaCode(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'No code provided'
      });
    }

    const result = await javaExecutor.compileJava(code);

    if (result.success) {
      await javaExecutor.cleanup(result.className);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Get bytecode only
export async function getBytecode(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'No code provided'
      });
    }

    // Compile first
    const compileResult = await javaExecutor.compileJava(code);

    if (!compileResult.success) {
      return res.json({
        success: false,
        error: compileResult.error
      });
    }

    // Extract bytecode
    const bytecodeResult = await javaExecutor.extractBytecode(compileResult.className);
    
    // Cleanup
    await javaExecutor.cleanup(compileResult.className);

    if (bytecodeResult.success) {
      const methods = bytecodeParser.parseMethodBytecode(bytecodeResult.instructions);
      
      res.json({
        success: true,
        bytecode: bytecodeResult.raw,
        instructions: bytecodeResult.instructions,
        methods
      });
    } else {
      res.json(bytecodeResult);
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export default {
  executeJavaCode,
  compileJavaCode,
  getBytecode
};
