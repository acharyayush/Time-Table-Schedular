import SemesterCard from "./SemesterCard";
const SemesterSelect = ({ faculty }) => {
  const semesters = {
    CSIT: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
    BCA: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
  };
  return (
    <div className="flex flex-wrap gap-8 mt-10">
      {semesters[faculty]?.map((semester) => (
        <SemesterCard to={`/${faculty}/semesters/${semester}`}
          onClick={() => {
            handleSemesterClick(semester, faculty);
          }}
          key={semester}
          semester={semester}
        />
      ))}
    </div>
  );
};

export default SemesterSelect;
