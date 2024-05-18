import {useFlowStore} from "../../stores/flow";
import {PanelMode} from "../../types";
import {NodesPanel} from "./NodesPanel";
import {SettingsPanel} from "./SettingsPanel";

export const PanelWrapper = () => {
  const panelMode = useFlowStore((s) => s.panelMode);

  return (
    <>
      {panelMode === PanelMode.Nodes && <NodesPanel />}
      {panelMode === PanelMode.Settings && <SettingsPanel />}
    </>
  );
};
