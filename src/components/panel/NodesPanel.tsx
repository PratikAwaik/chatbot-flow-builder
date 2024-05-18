import {Panel} from "reactflow";
import {NodeTypes} from "../../types";
import {DragEvent, useCallback} from "react";
import textIcon from "../../assets/text.svg";

/**
 * List of all types of node (currently only supports TextNode)
 */
export const NodesPanel = () => {
  const onDragStart = useCallback(
    (e: DragEvent<HTMLButtonElement>, type: NodeTypes) => {
      e.dataTransfer.setData("application/reactflow", type);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <Panel position="top-right">
      <div className="w-64 h-screen border rounded-md bg-white">
        <h3 className="p-4 border-b">Nodes</h3>
        <div className="p-4">
          {nodeTypes.map((node, idx) => (
            <button
              key={idx}
              className="w-full flex items-center p-2 border rounded-md shadow-sm gap-x-2"
              onDragStart={(e) => onDragStart(e, node.type)}
              draggable
            >
              <img
                src={node.icon}
                alt={`${node.name} Icon`}
                width={16}
                height={16}
              />
              <p>{node.name}</p>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
};

const nodeTypes = [
  {
    icon: textIcon,
    name: "Text Node",
    type: NodeTypes.TextNode,
  },
];
