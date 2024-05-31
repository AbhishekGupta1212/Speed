import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './Components/NodesPanel';
import SettingPanel from './Components/SettingPanel';
import TextNode from './Components/TextNode';
import ImageNode from './Components/ImageNode';  
import './App.css';

const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode, 
};

const initialNodes = [];
const initialEdges = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowInstance = useReactFlow();

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeClick = useCallback((event, node) => setSelectedNode(node), []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onSave = () => {
    const targetHandles = edges.map((edge) => edge.target);
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !targetHandles.includes(node.id)
    );
    if (nodesWithEmptyTargets.length > 1) {
      alert('Error: More than one node with empty target handles.');
    } else {
      const flowData = {
        nodes,
        edges,
      };
      console.log('Flow saved', flowData);
      // You can also save this data to a backend or local storage here
    }
  };

  return (
    <div className="app">
      <ReactFlowProvider>
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <div className="sidebar">
        {selectedNode ? (
          <SettingPanel
            selectedNode={selectedNode}
            setNodes={setNodes}
            setSelectedNode={setSelectedNode}
          />
        ) : (
          <NodesPanel setNodes={setNodes} />
        )}
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
}

let id = 0;
const getId = () => `dndnode_${id++}`;

export default App;
