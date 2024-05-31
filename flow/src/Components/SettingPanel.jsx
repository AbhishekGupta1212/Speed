import React, { useState } from 'react';

function SettingPanel({ selectedNode, setNodes, setSelectedNode }) {
  const [nodeType, setNodeType] = useState('textNode');

  const onChange = (event) => {
    const newValue = event.target.value;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          node.data = { ...node.data, label: newValue };
        }
        return node;
      })
    );
    setSelectedNode((node) => ({ ...node, data: { ...node.data, label: newValue } }));
  };

  const addNode = () => {
    const newNode = {
      id: getId(),
      type: nodeType,
      position: { x: 250, y: 250 },
      data: { label: `${nodeType} node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="settings-panel">
      <div>
        <label>Node Label:</label>
        <input
          type="text"
          value={selectedNode.data.label}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Node Type:</label>
        <select value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
          <option value="textNode">Text Node</option>
          <option value="imageNode">Image Node</option>
          
        </select>
        <button onClick={addNode}>Add Node</button>
      </div>
    </div>
  );
}

let id = 0;
const getId = () => `dndnode_${id++}`;

export default SettingPanel;
