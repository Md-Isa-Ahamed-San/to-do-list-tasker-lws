import "./App.css";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import TaskSection from "./TaskSection/TaskSection";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
      <HeroSection />
      <TaskSection/>
      </div>
      <Footer />
    </>
  );
}

export default App;
