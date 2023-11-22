import CreateRoomForm from "./CreateRoomForm/CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm/JoinRoomForm";

const Forms = () => {
  return (
    <div className="flex lg:flex-row lg:justify-center pt-5 h-full flex-col items-center">
      <div className="flex flex-col w-2/5 items-center bg-[#283F4D] mt-5 p-3 lg:mr-8 lg:h-[40vh] h-[35vh] rounded-lg">
        <h1 className="text-3xl mb-5">Create Room</h1>
        <CreateRoomForm />
      </div>
      <div className="flex flex-col w-2/5 items-center bg-[#283F4D] mt-5 p-3 lg:h-[40vh] h-[35vh] rounded-lg">
        <h1 className="text-3xl mb-5">Join Room</h1>
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default Forms;
