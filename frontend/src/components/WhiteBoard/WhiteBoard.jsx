import { useEffect, useLayoutEffect, useState } from "react";
import propTypes from "prop-types";
import rough from "roughjs";
const roughGenerator = rough.generator();
const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  user,
  socket,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.on("whiteBoardDataResponse", (data) => {
      console.log(data);
      setImage(data.imageUrl);
    });
  }, [socket]);

  console.log(image);

  if (!user?.presenter) {
    return (
      <div
        className=" border-2 overflow-hidden bg-white border-black mb-8"
        style={{ height: "80vh" }}
      >
        <img
          src={image}
          alt="Real time white board image shared by presenter"
          className="text-black"
        />
      </div>
    );
  }
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    context.strokeWidth = 2;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;

    //context.lineWidth = 5;
    ctxRef.current = context;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    if (canvasRef) {
      const roughCanvas = rough.canvas(canvasRef.current);

      if (elements.length > 0) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      elements.forEach((element) => {
        if (element.type === "line") {
          roughCanvas.draw(
            roughGenerator.line(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              { stroke: element.stroke, strokeWidth: 2, roughness: 0 }
            )
          );
        } else if (element.type === "rect") {
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              { stroke: element.stroke, strokeWidth: 2, roughness: 0 }
            )
          );
        } else if (element.type === "pencil") {
          roughCanvas.linearPath(element.path, {
            stroke: element.stroke,
            strokeWidth: 2,
            roughness: 0,
          });
        }
      });
      const canvasImage = canvasRef.current.toDataURL();
      socket.emit("whiteboardData", canvasImage);
    }
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
          element: tool,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
          element: tool,
        },
      ]);
    }

    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: "pencil",
                type: "pencil",
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
                stroke: ele.stroke,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
              };
            } else {
              return ele;
            }
          })
        );
      }
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
      className=" border-2 overflow-hidden bg-white border-black mb-8"
      style={{ height: "80vh" }}
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
  tool: propTypes.string,
  color: propTypes.string,
  user: propTypes.object,
  socket: propTypes.object,
};

export default WhiteBoard;
