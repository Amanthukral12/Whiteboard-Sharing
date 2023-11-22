import React from "react";
import PropTypes from "prop-types";

const CreateRoomForm = (props) => {
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
        placeholder="Generate random code"
        disabled
      />
      <div className="flex justify-evenly">
        <button
          className=" bg-blue-600 w-2/5 shadow-md rounded-lg text-xl font-semibold py-1"
          type="button"
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
      >
        Generate Room
      </button>
    </form>
  );
};

CreateRoomForm.propTypes = {};

export default CreateRoomForm;
