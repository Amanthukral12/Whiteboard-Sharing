import PropTypes from "prop-types";

const JoinRoomForm = (props) => {
  return (
    <form className=" mt-5">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter your name"
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter room code"
      />

      <button
        type="submit"
        className=" bg-blue-600 w-full shadow-md rounded-lg text-xl font-semibold py-1 mt-5"
      >
        Join Room
      </button>
    </form>
  );
};

JoinRoomForm.propTypes = {};

export default JoinRoomForm;
