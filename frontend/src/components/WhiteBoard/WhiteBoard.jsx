import React, { useEffect, useLayoutEffect, useState } from "react";
import propTypes from "prop-types";
import rough from "roughjs";
// const roughGenerator = rough.generator();
const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    context.strokeWidth = 5;
    context.scale(2, 2);
    context.lineCap = "round";

    //context.lineWidth = 5;
    ctxRef.current = context;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    elements.forEach((element) => {
      roughCanvas.linearPath(element.path);
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setElements((prevElements) => [
      ...prevElements,
      {
        element: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: "#000000",
      },
    ]);
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      //for pencil by default

      setElements((prevElements) =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              offsetX: ele.offsetX,
              offsetY: ele.offsetY,
              path: [...ele.path, [offsetX, offsetY]],
              stroke: "#000000",
              element: "pencil",
            };
          } else {
            return ele;
          }
        })
      );
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className=" border-2 overflow-hidden border-black "
      style={{ height: "500px" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

WhiteBoard.propTypes = {
  canvasRef: propTypes.object,
  ctxRef: propTypes.object,
  elements: propTypes.array,
  setElements: propTypes.func,
};

export default WhiteBoard;
