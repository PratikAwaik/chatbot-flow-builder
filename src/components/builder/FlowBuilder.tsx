import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodes,
  useStore,
} from "reactflow";
import type {Connection, Edge, EdgeChange, NodeChange} from "reactflow";
import {PanelWrapper} from "../panel/PanelWrapper";
import {DragEvent, useCallback} from "react";
import {NodeTypes} from "../../types";
import {TextNode} from "../nodes/TextNode";
import {useFlowStore} from "../../stores/flow";

const defaultEdgeOptions = {animated: true};

const initialNodes = [
  {
    id: "1",
    type: "textNode",
    position: {x: 0, y: 0},
    data: {text: "Text message"},
  },
  {
    id: "2",
    type: "textNode",
    position: {x: 0, y: 100},
    data: {text: "Text message"},
  },
];

const initialEdges = [{id: "e1-2", source: "1", target: "2"}];

const nodeTypes = {
  textNode: TextNode,
};

export const FlowBuilder = () => {
  const reactFlowInstance = useFlowStore((s) => s.reactFlowInstance);
  const setReactFlowInstance = useFlowStore((s) => s.setReactFlowInstance);
  const nodes = useNodes();
  const {edges, setNodes, setEdges} = useStore((s) => s);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(applyNodeChanges(changes, nodes)),
    [setNodes, nodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
    [setEdges, edges]
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges(addEdge(connection, edges)),
    [setEdges, edges]
  );

  const addNodeToCanvas = useCallback(
    (type: NodeTypes, position: {x: number; y: number}) => {
      // Depending on the node type, add corresponding data
      setNodes(
        nodes.concat({
          id: (nodes.length + 1).toString(),
          type,
          position,
          data: {
            text: "Text message",
          },
        })
      );
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow") as
        | NodeTypes
        | undefined;

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      addNodeToCanvas(type, position);
    },
    [reactFlowInstance, addNodeToCanvas]
  );

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      onInit={setReactFlowInstance}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <PanelWrapper />
    </ReactFlow>
  );
};
