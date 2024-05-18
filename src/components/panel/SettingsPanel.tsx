import {Panel, useNodes} from "reactflow";
import {NodeTypes, PanelMode} from "../../types";
import {useFlowStore} from "../../stores/flow";
import {PropertyRenderer} from "./PropertyRenderer";
import {useCallback, useMemo} from "react";
import arrowBackIcon from "../../assets/arrow-back.svg";

export const SettingsPanel = () => {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const nodes = useNodes();
  const setPanelMode = useFlowStore((s) => s.setPanelMode);
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  const handleBackClick = useCallback(() => {
    setPanelMode(PanelMode.Nodes);
  }, [setPanelMode]);

  return (
    <Panel position="top-right">
      <div className="w-64 h-screen border rounded-md bg-white">
        <div className="p-4 flex items-center gap-x-4 border-b">
          <img
            src={arrowBackIcon}
            alt="Arrow back icon"
            width={16}
            height={16}
            onClick={handleBackClick}
            className="cursor-pointer"
          />
          <h3 className="font-semibold">{nodeProperties["textNode"].title}</h3>
        </div>
        <div className="flex flex-col gap-y-4 p-4">
          {nodeProperties[selectedNode?.type as NodeTypes].properties.map(
            (property, idx) => (
              <div key={idx} className="flex flex-col gap-y-1">
                <label className="text-sm font-semibold">
                  {property.label}
                </label>
                <PropertyRenderer property={property} />
              </div>
            )
          )}
        </div>
      </div>
    </Panel>
  );
};

const nodeProperties = {
  [NodeTypes.TextNode]: {
    title: "Message",
    properties: [
      {
        label: "Text",
        type: "textarea",
        nodeKeyToUpdate: "text",
      },
    ],
  },
};
