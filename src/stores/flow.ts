/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import {PanelMode} from "../types";
import type {ReactFlowInstance} from "reactflow";
interface FlowState {
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
  panelMode: PanelMode;
  setPanelMode: (mode: PanelMode) => void;
}

export const useFlowStore = create<FlowState>()((set) => ({
  reactFlowInstance: null,
  setReactFlowInstance: (instance) => set({reactFlowInstance: instance}),
  selectedNodeId: null,
  setSelectedNodeId: (node) => set({selectedNodeId: node}),
  panelMode: PanelMode.Nodes,
  setPanelMode: (mode) => set({panelMode: mode}),
}));
