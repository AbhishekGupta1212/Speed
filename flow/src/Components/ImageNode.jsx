import React from 'react';
import { Handle } from 'reactflow';

function ImageNode({ data }) {
  return (
    <div className="image-node">
      <Handle type="target" position="top" />
      <img src="https://via.placeholder.com/50" alt="Placeholder" />
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default ImageNode;
