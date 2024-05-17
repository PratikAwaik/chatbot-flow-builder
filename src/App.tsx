import {useCallback, useState} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import {TextNode} from "./components/nodes/TextNode";
import {NodesPanel} from "./components/panel/NodesPanel";

const initialNodes = [
  {id: "1", position: {x: 0, y: 0}, data: {label: "1"}},
  {id: "2", position: {x: 0, y: 100}, data: {label: "2"}},
  {id: "3", type: "textNode", position: {x: 0, y: 200}, data: {}},
];
const initialEdges = [{id: "e1-2", source: "1", target: "2", animated: true}];

const defaultEdgeOptions = {animated: true};

const nodeTypes = {
  textNode: TextNode,
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <NodesPanel />
      </ReactFlow>
    </div>
  );
}
