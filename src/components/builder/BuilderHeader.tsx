import {useCallback} from "react";
import toast from "react-hot-toast";
import {
  getConnectedEdges,
  useEdges,
  useNodes,
  useReactFlow,
  useStore,
} from "reactflow";
import {useFlowStore} from "../../stores/flow";

export const BuilderHeader = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const reactFlowInstance = useFlowStore((s) => s.reactFlowInstance);
  const {setNodes, setEdges} = useStore((s) => s);
  const {setViewport} = useReactFlow();

  const onSave = useCallback(() => {
    // check if every node has connected edges
    for (const node of nodes) {
      if (getConnectedEdges([node], edges).length === 0) {
        toast.error("Connect all the nodes before saving it!");
        break;
      }
    }

    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("__react_flow_data__", JSON.stringify(flow));
      toast.success("Flow saved successfully!");
    }
  }, [nodes, edges, reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(
        localStorage.getItem("__react_flow_data__") || ""
      );

      if (flow) {
        const {x = 0, y = 0, zoom = 1} = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({x, y, zoom});
        toast.success("Flow restored successfully!");
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  return (
    <div className="w-full px-8 py-4 flex items-center justify-end bg-blue-100">
      <div className="flex items-center gap-x-4">
        <button
          className="bg-slate-100 p-2 px-4 text-sm rounded-md hover:bg-gray-50 transition-all"
          onClick={onRestore}
        >
          Restore
        </button>
        <button
          className="bg-blue-600 p-2 px-4 text-white text-sm rounded-md hover:bg-blue-500 transition-all"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
