import {Handle, Position} from "reactflow";
import whatsappIcon from "../../assets/whatsapp.svg";

export const TextNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="w-full border rounded-md shadow-md min-w-40 bg-white">
        <div className="p-2 rounded-tl-md rounded-tr-md flex items-center justify-between bg-teal-500">
          <p className="font-semibold text-xs">Send Message</p>
          <img src={whatsappIcon} alt="Whatsapp Icon" width={16} height={16} />
        </div>
        <div className="px-2 py-4 text-sm">Text message</div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
};
