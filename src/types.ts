import type {Node} from "reactflow";

export enum NodeTypes {
  TextNode = "textNode",
}

export enum PanelMode {
  Nodes = "nodes",
  Settings = "settings",
}

export interface ExtendedNode extends Node {
  data: {
    text: string;
  };
}
