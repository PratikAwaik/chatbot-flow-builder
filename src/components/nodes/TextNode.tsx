import {
  getConnectedEdges,
  Handle,
  NodeProps,
  Position,
  useEdges,
  useNodeId,
  useNodes,
} from "reactflow";
import whatsappIcon from "../../assets/whatsapp.svg";
import {useFlowStore} from "../../stores/flow";
import {PanelMode} from "../../types";
import {useCallback, useMemo} from "react";

export const TextNode = (props: NodeProps) => {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const setPanelMode = useFlowStore((s) => s.setPanelMode);
  const nodes = useNodes();
  const edges = useEdges();
  const nodeId = useNodeId();

  // Limit source to have only one edge originating from source handle
  const isHandleConnectable = useMemo(() => {
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return false;
    const connectedEdges = getConnectedEdges([node], edges);
    return connectedEdges.filter((edge) => edge.source === nodeId).length === 0;
  }, [nodes, edges, nodeId]);

  const onNodeClick = useCallback(() => {
    setSelectedNodeId(props.id);
    setPanelMode(PanelMode.Settings);
  }, [props.id, setPanelMode, setSelectedNodeId]);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="w-full border rounded-md shadow-md min-w-40 bg-white"
        onClick={onNodeClick}
      >
        <div className="p-2 rounded-tl-md rounded-tr-md flex items-center justify-between bg-teal-500">
          <p className="font-semibold text-xs">Send Message</p>
          <img src={whatsappIcon} alt="Whatsapp Icon" width={16} height={16} />
        </div>
        <div className="px-2 py-4 text-sm">{props.data.text}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectableStart={isHandleConnectable}
      />
    </>
  );
};
