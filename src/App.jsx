import "./App.css";
import Contents from "./pages/Contents";
import Header from "./pages/Header";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-pink-600">
      <div className="mx-auto px-6">
        <Header />
        <Contents />
      </div>
    </div>
  );
};

export default App;
