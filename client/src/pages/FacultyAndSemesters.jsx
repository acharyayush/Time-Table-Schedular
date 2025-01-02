import { useState } from "react";
import SemesterSelect from "../components/semesters/SemesterSelect";
import SemesterAdd from "../components/semesters/SemesterAdd";

const FacultyAndSemesters = () => {
  const faculties = ["CSIT", "BCA"];
  const semesters = {
    CSIT: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
    BCA: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
  };

  const [selectedFaculty, setSelectedFaculty] = useState(faculties[0]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-full">
        {!selectedFaculty && (
          <h3 className="text-3xl font-bold text-teal-700 mb-5">
            Choose a faculty
          </h3>
        )}
        {/* Faculty Buttons - Positioned Horizontally */}
        <div className="flex justify-start mb-10">
          {faculties.map((faculty) => (
            <button
              key={faculty}
              className={`group relative w-32 h-16 bg-gray-50 
                transition-all duration-300
                border-2 border-gray-200 hover:border-teal-600
                shadow-sm hover:shadow-md 
                ${selectedFaculty === faculty ? "bg-teal-600" : ""}`}
              onClick={() => setSelectedFaculty(faculty)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-xl font-bold  group-active:text-white 
                  transition-colors duration-300 
                ${
                  selectedFaculty === faculty ? "text-white" : "text-teal-600"
                }`}
                >
                  {faculty}
                </span>
              </div>
            </button>
          ))}
        </div>
        {selectedFaculty && <SemesterAdd faculty={selectedFaculty}/>}
        <SemesterSelect faculty={selectedFaculty} />
      </div>
    </div>
  );
};

export default FacultyAndSemesters;
