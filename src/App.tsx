import {ReactFlowProvider} from "reactflow";
import {Toaster} from "react-hot-toast";
import {FlowBuilder} from "./components/builder/FlowBuilder";
import {BuilderHeader} from "./components/builder/BuilderHeader";

import "reactflow/dist/style.css";

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ReactFlowProvider>
        <BuilderHeader />
        <div className="w-full h-full">
          <FlowBuilder />
        </div>
      </ReactFlowProvider>
      <Toaster />
    </div>
  );
}
