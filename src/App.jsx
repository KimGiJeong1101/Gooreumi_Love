import { useState } from "react";
import "./App.css";
import Contents from "./pages/Contents";
import Header from "./pages/Header";
import BackGroundMusic from "./components/BackGroundMusic";

const App = () => {
  const [page, setPage] = useState("home"); // home | photo | video

  return (
    <div className="w-full min-h-screen border-4 relative">
      <BackGroundMusic></BackGroundMusic>
      <div className="mx-auto px-6 pb-6">
        <Header setPage={setPage} />
        <Contents page={page} />
      </div>
    </div>
  );
};

export default App;
