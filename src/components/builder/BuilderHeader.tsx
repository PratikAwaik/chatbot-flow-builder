import {useCallback} from "react";
import toast from "react-hot-toast";
import {getConnectedEdges, useEdges, useNodes} from "reactflow";

export const BuilderHeader = () => {
  const nodes = useNodes();
  const edges = useEdges();

  const onSave = useCallback(() => {
    // check if every node has connected edges
    for (const node of nodes) {
      if (getConnectedEdges([node], edges).length === 0) {
        toast.error("Connect all the nodes before saving it!");
        break;
      }
    }
  }, [nodes, edges]);

  return (
    <div className="w-full px-8 py-4 flex items-center justify-end bg-gray-200">
      <button
        className="bg-blue-600 p-2 px-4 text-white text-sm rounded-md hover:bg-blue-500 transition-all"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};
