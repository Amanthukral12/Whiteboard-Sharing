import { useState } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };
  return (
    <form className=" mt-5">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={roomId}
        placeholder="Generate random code"
        disabled
      />
      <div className="flex justify-evenly">
        <button
          className=" bg-blue-600 w-2/5 shadow-md rounded-lg lg:text-xl text-base font-semibold py-1"
          type="button"
          onClick={() => setRoomId(uuid())}
        >
          Generate
        </button>
        <button className="bg-white w-2/5 text-gray-800 text-xl shadow-md rounded-lg font-semibold py-1">
          Copy
        </button>
      </div>
      <button
        type="submit"
        className=" bg-blue-600 w-full shadow-md rounded-lg text-xl font-semibold py-1 mt-5"
        onClick={(e) => handleCreateRoom(e)}
      >
        Generate Room
      </button>
    </form>
  );
};

CreateRoomForm.propTypes = {
  uuid: propTypes.func,
  socket: propTypes.object,
  setUser: propTypes.func,
};

export default CreateRoomForm;
