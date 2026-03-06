import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const JVMNode = ({ data }) => (
  <div className={`jvm-node ${data.active ? 'active' : ''}`}>
    <div className="text-sm font-bold mb-1">{data.label}</div>
    <div className="text-xs text-gray-400">{data.description}</div>
  </div>
);

const nodeTypes = {
  jvmNode: JVMNode
};

export default function JVMArchitecture({ activeNode = null }) {
  const nodes = [
    {
      id: '1',
      type: 'jvmNode',
      position: { x: 200, y: 50 },
      data: { label: 'Source Code', description: '.java file', active: activeNode === 'source' }
    },
    {
      id: '2',
      type: 'jvmNode',
      position: { x: 200, y: 150 },
      data: { label: 'Compiler (javac)', description: 'JDK Tool', active: activeNode === 'compiler' }
    },
    {
      id: '3',
      type: 'jvmNode',
      position: {x: 200, y: 250 },
      data: { label: 'Bytecode', description: '.class file', active: activeNode === 'bytecode' }
    },
    {
      id: '4',
      type: 'jvmNode',
      position: { x: 200, y: 350 },
      data: { label: 'Class Loader', description: 'Loads classes', active: activeNode === 'classloader' }
    },
    {
      id: '5',
      type: 'jvmNode',
      position: { x: 50, y: 450 },
      data: { label: 'Method Area', description: 'Class metadata', active: activeNode === 'methodarea' }
    },
    {
      id: '6',
      type: 'jvmNode',
      position: { x: 200, y: 450 },
      data: { label: 'Heap', description: 'Objects', active: activeNode === 'heap' }
    },
    {
      id: '7',
      type: 'jvmNode',
      position: { x: 350, y: 450 },
      data: { label: 'Stack', description: 'Frames', active: activeNode === 'stack' }
    },
    {
      id: '8',
      type: 'jvmNode',
      position: { x: 200, y: 550 },
      data: { label: 'Execution Engine', description: 'Runs bytecode', active: activeNode === 'execution' }
    },
    {
      id: '9',
      type: 'jvmNode',
      position: { x: 100, y: 650 },
      data: { label: 'Interpreter', description: 'Line-by-line', active: activeNode === 'interpreter' }
    },
    {
      id: '10',
      type: 'jvmNode',
      position: { x: 300, y: 650 },
      data: { label: 'JIT Compiler', description: 'Optimizes code', active: activeNode === 'jit' }
    }
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e4-6', source: '4', target: '6' },
    { id: 'e4-7', source: '4', target: '7' },
    { id: 'e5-8', source: '5', target: '8' },
    { id: 'e6-8', source: '6', target: '8' },
    { id: 'e7-8', source: '7', target: '8' },
    { id: 'e8-9', source: '8', target: '9' },
    { id: 'e8-10', source: '8', target: '10' }
  ];

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header">🏗️ JVM Architecture</div>
      <div className="flex-1 bg-jvm-darker">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
