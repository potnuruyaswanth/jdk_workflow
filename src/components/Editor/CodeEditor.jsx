import React from 'react';
import Editor from '@monaco-editor/react';
import { sampleJavaCode } from '../../data/executionSteps';

export default function CodeEditor({ code, onCodeChange, isLoading = false }) {
  const handleEditorChange = (value) => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  return (
    <div className="h-full flex flex-col bg-darker rounded-lg border border-primary/20 overflow-hidden">
      <div className="px-4 py-3 bg-slate-900 border-b border-primary/20 flex items-center justify-between">
        <h3 className="font-semibold text-primary">Java Code Editor</h3>
        <span className="text-xs text-slate-400">Monaco Editor</span>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Editor
          theme="vs-dark"
          defaultLanguage="java"
          defaultValue={code || sampleJavaCode}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "'Fira Code', 'Monaco', monospace",
            lineHeight: 20,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            formatOnPaste: true,
            automaticLayout: true,
          }}
          loading={<div className="flex items-center justify-center h-full text-slate-400">Loading editor...</div>}
        />
      </div>

      <div className="px-4 py-2 bg-slate-900 border-t border-primary/20 text-xs text-slate-400">
        <span>{code ? code.split('\n').length : sampleJavaCode.split('\n').length} lines</span>
      </div>
    </div>
  );
}
