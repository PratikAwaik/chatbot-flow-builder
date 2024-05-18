/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import {PanelMode} from "../types";
interface FlowState {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
  panelMode: PanelMode;
  setPanelMode: (mode: PanelMode) => void;
}

export const useFlowStore = create<FlowState>()((set) => ({
  selectedNodeId: null,
  setSelectedNodeId: (node) => set({selectedNodeId: node}),
  panelMode: PanelMode.Nodes,
  setPanelMode: (mode) => set({panelMode: mode}),
}));
