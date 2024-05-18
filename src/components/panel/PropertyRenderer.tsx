import {useCallback, useMemo} from "react";
import {useFlowStore} from "../../stores/flow";
import {useNodes, useStore} from "reactflow";
import {ExtendedNode} from "../../types";

type PropertyRendererProps = {
  property: {label: string; type: string; nodeKeyToUpdate: string};
};

export const PropertyRenderer = ({property}: PropertyRendererProps) => {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const nodes = useNodes();
  const setNodes = useStore((s) => s.setNodes);
  const selectedNode = useMemo(
    () =>
      nodes.find((node) => node.id === selectedNodeId) as
        | ExtendedNode
        | undefined,
    [selectedNodeId, nodes]
  );

  const handleOnChange = useCallback(
    (value: string) => {
      if (!selectedNode) return;

      setNodes(
        nodes.map((node) =>
          node.id === selectedNode.id
            ? {...node, data: {[property.nodeKeyToUpdate]: value}}
            : node
        )
      );
    },
    [nodes, property.nodeKeyToUpdate, selectedNode, setNodes]
  );

  if (!selectedNode) return null;

  switch (property.type) {
    case "textarea":
      return (
        <textarea
          value={selectedNode.data.text}
          onChange={(e) => handleOnChange(e.target.value)}
          className="border text-sm p-2 rounded-md"
          rows={4}
        ></textarea>
      );
  }
};
