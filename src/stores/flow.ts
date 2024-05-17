import {Node} from "reactflow";
import {create} from "zustand";

interface FlowState {
  nodes: Node<unknown, string | undefined>[];
  setNodes: (nodes: Node<unknown, string | undefined>[]) => void;
}

export const useFlowStore = create<FlowState>()((set) => ({
  nodes: [],
  setNodes: (nodes) => set({nodes}),
}));
