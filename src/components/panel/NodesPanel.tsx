import {Panel} from "reactflow";
import textIcon from "../../assets/text.svg";

/**
 * List of all types of node (currently only supports TextNode)
 */
export const NodesPanel = () => {
  return (
    <Panel position="top-right">
      <div className="w-64 h-screen border rounded-md bg-white">
        <h3 className="p-4 border-b">Nodes</h3>
        <div className="p-4">
          {nodes.map((node, idx) => (
            <button
              key={idx}
              className="w-full flex items-center p-2 border rounded-md shadow-sm gap-x-2"
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

const nodes = [
  {
    icon: textIcon,
    name: "Text Node",
  },
];
