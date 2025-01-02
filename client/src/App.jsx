import { Route, BrowserRouter, Routes } from "react-router-dom";
import FacultyAndSemesters from "./pages/FacultyAndSemesters"
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:faculty/semesters/:semester" element={<Subjects />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/" element={<FacultyAndSemesters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
