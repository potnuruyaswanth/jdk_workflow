import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const execPromise = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, '../temp');

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.access(TEMP_DIR);
  } catch {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  }
}

// Extract class name from Java code
function extractClassName(code) {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : 'Main';
}

// Compile Java code
export async function compileJava(code) {
  await ensureTempDir();

  const className = extractClassName(code);
  const javaFilePath = path.join(TEMP_DIR, `${className}.java`);

  try {
    // Write Java source file
    await fs.writeFile(javaFilePath, code);

    // Compile using javac
    const { stdout, stderr } = await execPromise(`javac "${javaFilePath}"`, {
      cwd: TEMP_DIR,
      timeout: 10000
    });

    if (stderr && !stderr.includes('Note:')) {
      throw new Error(stderr);
    }

    return {
      success: true,
      className,
      message: 'Compilation successful',
      classFile: path.join(TEMP_DIR, `${className}.class`)
    };
  } catch (error) {
    // Clean up on error
    try {
      await fs.unlink(javaFilePath);
    } catch {}

    return {
      success: false,
      error: error.message || 'Compilation failed'
    };
  }
}

// Extract bytecode using javap
export async function extractBytecode(className) {
  await ensureTempDir();

  try {
    const { stdout } = await execPromise(`javap -c -v "${className}"`, {
      cwd: TEMP_DIR,
      timeout: 10000
    });

    // Parse bytecode instructions
    const instructions = parseBytecodeInstructions(stdout);

    return {
      success: true,
      raw: stdout,
      instructions
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Bytecode extraction failed'
    };
  }
}

// Parse bytecode into structured format
function parseBytecodeInstructions(bytecode) {
  const instructions = [];
  const lines = bytecode.split('\n');
  
  let inMethodCode = false;
  let currentMethod = null;

  for (const line of lines) {
    // Detect method start
    if (line.includes('Code:')) {
      inMethodCode = true;
      continue;
    }

    // Detect method name
    const methodMatch = line.match(/(\w+)\s*\([^)]*\)/);
    if (methodMatch && !inMethodCode) {
      currentMethod = methodMatch[1];
    }

    // Parse instruction
    if (inMethodCode && line.trim()) {
      const instrMatch = line.match(/^\s*(\d+):\s+(\w+)\s*(.*)?$/);
      if (instrMatch) {
        instructions.push({
          index: parseInt(instrMatch[1]),
          opcode: instrMatch[2],
          operand: instrMatch[3] ? instrMatch[3].trim() : '',
          method: currentMethod || 'main'
        });
      }

      // End of code block
      if (line.includes('LineNumberTable') || line.includes('LocalVariableTable')) {
        inMethodCode = false;
      }
    }
  }

  return instructions;
}

// Execute Java program
export async function executeJava(className, options = {}) {
  const {
    enableJIT = true,
    enableGC = true,
    timeout = 15000
  } = options;

  await ensureTempDir();

  try {
    // Build JVM flags
    let jvmFlags = [];
    
    if (enableJIT) {
      jvmFlags.push('-XX:+PrintCompilation');
    }
    
    if (enableGC) {
      jvmFlags.push('-Xlog:gc*');
    }

    const command = `java ${jvmFlags.join(' ')} ${className}`;

    const { stdout, stderr } = await execPromise(command, {
      cwd: TEMP_DIR,
      timeout
    });

    // Parse logs
    const programOutput = extractProgramOutput(stdout, stderr);
    const jitLogs = enableJIT ? extractJITLogs(stderr) : [];
    const gcLogs = enableGC ? extractGCLogs(stderr) : [];

    return {
      success: true,
      output: programOutput,
      jitLogs,
      gcLogs,
      rawStdout: stdout,
      rawStderr: stderr
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Execution failed',
      output: error.stdout || '',
      stderr: error.stderr || ''
    };
  }
}

// Extract program output from stdout
function extractProgramOutput(stdout, stderr) {
  // Filter out JVM logs, keep only program output
  const lines = stdout.split('\n').filter(line => {
    return !line.includes('[') && 
           !line.includes('Compiled') &&
           !line.includes('gc') &&
           line.trim() !== '';
  });
  return lines.join('\n');
}

// Extract JIT compilation events
function extractJITLogs(stderr) {
  const jitEvents = [];
  const lines = stderr.split('\n');

  for (const line of lines) {
    if (line.includes('Compiled') || line.includes('Made not entrant') || line.includes('Made zombie')) {
      const match = line.match(/(\d+)\s+\d+\s+\S+\s+(\S+)::\s*(\w+)/);
      if (match) {
        jitEvents.push({
          timestamp: parseInt(match[1]),
          className: match[2],
          methodName: match[3],
          event: 'compiled',
          raw: line
        });
      }
    }
  }

  return jitEvents;
}

// Extract Garbage Collection events
function extractGCLogs(stderr) {
  const gcEvents = [];
  const lines = stderr.split('\n');

  for (const line of lines) {
    if (line.includes('[gc') || line.includes('GC(')) {
      const timestampMatch = line.match(/\[([0-9.]+)s\]/);
      const gcTypeMatch = line.match(/Pause\s+(\w+)/);
      
      if (timestampMatch) {
        gcEvents.push({
          timestamp: parseFloat(timestampMatch[1]),
          type: gcTypeMatch ? gcTypeMatch[1] : 'Unknown',
          raw: line
        });
      }
    }
  }

  return gcEvents;
}

// Clean up temp files
export async function cleanup(className) {
  try {
    const javaFile = path.join(TEMP_DIR, `${className}.java`);
    const classFile = path.join(TEMP_DIR, `${className}.class`);

    await fs.unlink(javaFile).catch(() => {});
    await fs.unlink(classFile).catch(() => {});

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default {
  compileJava,
  extractBytecode,
  executeJava,
  cleanup
};
