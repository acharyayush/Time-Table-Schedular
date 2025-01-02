import AddSubjectForm from "../components/subjects/AddSubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";
import { useParams } from "react-router-dom";
const Subjects = () => {
  const { faculty, semester } = useParams();
  const subjects = [
    {
      name: "Information Technology",
      teacher: "Rikesh Shrestha",
    },
    {
      name: "Data Structures and Algorithms",
      teacher: "Umesh Pathak",
    },
    {
      name: "Cryptography",
      teacher: "Alan Turing",
    },
    {
      name: "Design and Analysis of Algorithm",
      teacher: "Nanda Kishor Ray",
    },
    {
      name: "Web Technology",
      teacher: "Mark Zuckerberg",
    },
  ];
  return (
    <div className="w-[90vw] mx-auto mt-10">
      <AddSubjectForm />
      <br/>
      <h3 className="text-3xl font-bold text-teal-700 mb-5">
        Subjects of {semester} ({faculty})
      </h3>
      <div className="flex flex-wrap gap-8 mt-5 mx-auto">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.name}
            subject={subject.name}
            teacher={subject.teacher}
          />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
