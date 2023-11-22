import CreateRoomForm from "./CreateRoomForm/CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm/JoinRoomForm";

const Forms = () => {
  return (
    <div className="flex flex-row justify-center pt-5 h-full">
      <div className="flex flex-col w-2/5 items-center bg-[#283F4D] mt-5 p-3 mr-8 h-[60vh] rounded-lg">
        <h1 className="text-3xl">Create Room</h1>
        <CreateRoomForm />
      </div>
      <div className="flex flex-col w-2/5 items-center bg-[#283F4D] mt-5 p-3 h-[60vh] rounded-lg">
        <h1 className="text-3xl">Join Room</h1>
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default Forms;
