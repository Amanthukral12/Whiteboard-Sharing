import propTypes from "prop-types";

const Sidebar = ({ shown, close, users, user }) => {
  return shown ? (
    <div
      onClick={() => close()}
      className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.4)] z-[2] min-h-screen overflow-y-scroll no-scrollbar"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#283F4D] absolute top-0 left-0 w-1/5 min-h-[100vh]  overflow-y-scroll no-scrollbar text-white p-3 2xl rounded flex flex-col items-center "
      >
        <h1 className=" mb-6 font-bold text-3xl">Current Users</h1>

        <hr className="w-4/5 mb-6" />

        {users.map((usr, index) => (
          <h3
            key={index * 999}
            className={
              "text-lg my-2 w-full text-center rounded " +
              (user && user.userId === usr.userId ? "bg-[#6491ad]" : "")
            }
          >
            {usr.name}
          </h3>
        ))}
      </div>
    </div>
  ) : null;
};

Sidebar.propTypes = {
  shown: propTypes.bool,
  close: propTypes.func,
  users: propTypes.array,
  user: propTypes.object,
};

export default Sidebar;
