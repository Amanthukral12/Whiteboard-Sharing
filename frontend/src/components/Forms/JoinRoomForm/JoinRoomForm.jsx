import propTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleJoinRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    console.log(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };
  return (
    <form className=" mt-5">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter room code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button
        type="submit"
        onClick={(e) => handleJoinRoom(e)}
        className=" bg-blue-600 w-full shadow-md rounded-lg text-xl font-semibold py-1 mt-5"
      >
        Join Room
      </button>
    </form>
  );
};

JoinRoomForm.propTypes = {
  uuid: propTypes.func,
  socket: propTypes.object,
  setUser: propTypes.func,
};

export default JoinRoomForm;
