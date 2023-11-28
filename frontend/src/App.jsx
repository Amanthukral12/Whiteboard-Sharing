import { Route, Routes } from "react-router-dom";
import "./App.css";
import Forms from "./components/Forms/Forms";

import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <div className="container mx-auto px-4 h-full">
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
