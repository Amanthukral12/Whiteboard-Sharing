import { useRef, useState, useEffect } from "react";
import propTypes from "prop-types";
import WhiteBoard from "../components/WhiteBoard/WhiteBoard";
import "./styles.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/Sidebar/Sidebar";
const RoomPage = ({ user, socket, users }) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.on("whiteBoardDataResponse", (data) => {
      setImage(data.imageUrl);
    });
  }, [socket]);

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

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);

    elements.length === 1
      ? handleClearCanvas()
      : setElements((prevElements) =>
          prevElements.slice(0, prevElements.length - 1)
        );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <div className="">
      <GiHamburgerMenu
        className=" absolute left-5 top-5 rounded text-2xl cursor-pointer"
        onClick={() => setOpenedUserTab(!openedUserTab)}
      />
      <Sidebar
        shown={openedUserTab}
        close={() => setOpenedUserTab(!openedUserTab)}
        users={users}
        user={user}
      >
        <h1>hello</h1>
      </Sidebar>
      <h1 className="text-center py-5 text-2xl">
        White Board Sharing App <span>[Users Online : {users.length}]</span>
      </h1>
      {user && user.presenter && (
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
              <button
                className="text-black px-4 py-1 bg-slate-400 rounded-sm"
                disabled={elements.length === 0}
                onClick={() => undo()}
              >
                Undo
              </button>
              <button
                className="px-4 py-1 bg-[#283f4dc2] rounded-sm"
                disabled={history.length < 1}
                onClick={() => redo()}
              >
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
      )}

      <div className="flex flex-col mt-8">
        {user && user.presenter ? (
          <WhiteBoard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            tool={tool}
            color={color}
            user={user}
            socket={socket}
          />
        ) : (
          <div className=" border-2 bg-white border-black mb-8">
            <img
              src={image}
              alt="Real time white board image shared by presenter"
              className="text-black"
              style={{
                width: `1500px`,
                height: `780px`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

RoomPage.propTypes = {
  user: propTypes.object,
  socket: propTypes.object,
  users: propTypes.array,
};

export default RoomPage;
