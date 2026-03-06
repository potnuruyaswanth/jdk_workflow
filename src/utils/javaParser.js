export const parseJavaCode = (code) => {
  const analysis = {
    hasClass: false,
    hasMain: false,
    hasMethods: 0,
    hasLoops: 0,
    hasConditionals: 0,
    variables: [],
    methods: []
  };

  // Check for class declaration
  analysis.hasClass = /\bclass\s+\w+/.test(code);

  // Check for main method
  analysis.hasMain = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+\w+\s*\)/.test(code);

  // Count methods
  const methodMatches = code.match(/\b(public|private|protected)?\s*(static)?\s*\w+\s+\w+\s*\([^)]*\)\s*\{/g);
  analysis.hasMethods = methodMatches ? methodMatches.length : 0;

  // Count loops
  const loopMatches = code.match(/\b(for|while|do)\s*(\(|{)/g);
  analysis.hasLoops = loopMatches ? loopMatches.length : 0;

  // Count conditionals
  const ifMatches = code.match(/\b(if|else|switch)\b/g);
  analysis.hasConditionals = ifMatches ? ifMatches.length : 0;

  // Extract variable declarations
  const varMatches = code.match(/\b(int|long|float|double|boolean|String|char|byte|short)\s+(\w+)/g);
  if (varMatches) {
    analysis.variables = [...new Set(varMatches)];
  }

  // Extract method names
  const methodNameMatches = code.match(/\b(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\(/g);
  if (methodNameMatches) {
    analysis.methods = methodNameMatches.map(m => {
      const match = m.match(/\s(\w+)\s*\(/);
      return match ? match[1] : null;
    }).filter(Boolean);
  }

  return analysis;
};

export const detectHotspots = (code) => {
  const analysis = parseJavaCode(code);
  const hotspots = [];

  if (analysis.hasLoops > 0) {
    hotspots.push({
      type: "loop",
      severity: "high",
      message: "Loops detected - candidate for JIT compilation"
    });
  }

  if (analysis.hasMethods > 1) {
    hotspots.push({
      type: "method-calls",
      severity: "medium",
      message: "Multiple methods detected - frequently called methods may be JIT compiled"
    });
  }

  if (analysis.hasConditionals > 0) {
    hotspots.push({
      type: "conditionals",
      severity: "low",
      message: "Conditional branches detected"
    });
  }

  return hotspots;
};

export const estimateMemoryUsage = (code) => {
  const analysis = parseJavaCode(code);
  
  // Very rough estimation
  const baseMemory = 1024 * 50; // 50KB base
  const perVariable = 64; // 64 bytes per variable
  const perMethod = 256; // 256 bytes per method
  
  const total = baseMemory + (analysis.variables.length * perVariable) + (analysis.hasMethods * perMethod);
  
  return {
    estimatedHeapSize: total,
    variables: analysis.variables.length,
    methods: analysis.hasMethods,
    formattedSize: formatBytes(total)
  };
};

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const generateBytecodeRepresentation = (code) => {
  const analysis = parseJavaCode(code);
  
  return `
; Bytecode representation
.class public Hello
.super java/lang/Object

; Methods
.method public static void main([Ljava/lang/String;)V
  .code
    ${analysis.variables.length > 0 ? `; Variables: ${analysis.variables.join(", ")}` : ""}
    aload_0
    arraylength
    ifne L0
    return
  L0:
    getstatic java/lang/System.out Ljava/io/PrintStream;
    ldc "Program Output"
    invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
    return
  .end code
.end method
  `;
};
