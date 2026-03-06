import React from 'react';
import Editor from '@monaco-editor/react';

const defaultCode = `public class Test {
    public static void main(String[] args) {
        int a = 2;
        int b = 3;
        int c = a + b;
        System.out.println("Result: " + c);
    }
}`;

export default function CodeEditor({ code, onChange, readOnly = false }) {
  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center justify-between">
        <span>📝 Java Code Editor</span>
        <span className="text-xs text-gray-500">Monaco Editor</span>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="java"
          value={code || defaultCode}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'Fira Code, Monaco, monospace',
            lineHeight: 20,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            formatOnPaste: true,
            readOnly,
            automaticLayout: true
          }}
        />
      </div>
    </div>
  );
}
