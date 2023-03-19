import { Home } from "./pages/home";
import {Course} from './pages/AboutCourse'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container content"></main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}
export default App;
