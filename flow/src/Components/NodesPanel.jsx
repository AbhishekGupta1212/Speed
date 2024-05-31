import React from 'react';

function NodesPanel({ setNodes }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        Text Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'imageNode')}
        draggable
      >
        Image Node
      </div>
    </div>
  );
}

export default NodesPanel;
