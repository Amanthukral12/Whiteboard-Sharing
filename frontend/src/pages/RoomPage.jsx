import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import WhiteBoard from "../components/WhiteBoard/WhiteBoard";
import "./styles.css";
const RoomPage = (props) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setElements([]);
  };

  return (
    <div className="">
      <h1 className="text-center py-5 text-2xl">
        White Board Sharing App <span>[Users Online : 0]</span>
      </h1>
      <div className="flex md:flex-row flex-col mt-4 mb-5 justify-around items-center">
        <div className="flex lg:w-1/4 w-full justify-center lg:mb-0 mb-3">
          <div className="flex gap-1 mr-1">
            <label htmlFor="pencil">Pencil</label>
            <input
              type="radio"
              name="tool"
              value="pencil"
              id="pencil"
              className="mt-1"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="flex gap-1 mr-1">
            <label htmlFor="line">Line</label>
            <input
              type="radio"
              name="tool"
              value="line"
              id="line"
              checked={tool === "line"}
              className="mt-1"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="flex gap-1 mr-1">
            <label htmlFor="rect">Rectangle</label>
            <input
              type="radio"
              name="tool"
              value="rect"
              id="rect"
              checked={tool === "rect"}
              className="mt-1"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>
        <div className="flex lg:w-1/4 w-full justify-center lg:mb-0 mb-3">
          <div className="flex gap-2 items-center">
            <label htmlFor="color">Select Color</label>
            <input
              type="color"
              value={color}
              id="color"
              className="mt-1"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="flex lg:w-1/4 w-full justify-center lg:mb-0 mb-3">
          <div className="flex gap-2 items-center">
            <button className="text-black px-4 py-1 bg-slate-400 rounded-sm">
              Undo
            </button>
            <button className="px-4 py-1 bg-[#283f4dc2] rounded-sm">
              Redo
            </button>
          </div>
        </div>
        <div className="flex lg:w-1/4 w-full justify-center lg:mb-0 mb-3">
          <div className="flex gap-2 items-center">
            <button
              className="px-4 py-1 bg-red-900 rounded-sm"
              onClick={() => handleClearCanvas()}
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
        />
      </div>
    </div>
  );
};

RoomPage.propTypes = {};

export default RoomPage;
