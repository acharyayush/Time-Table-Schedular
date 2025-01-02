import { useState, useEffect } from "react";
import axios from "axios"
import SemesterCard from "./SemesterCard";
const SemesterSelect = ({ faculty }) => {
  const initialSemesters = {
    CSIT: [],
    BCA: [],
  };
  const [semesters, setSemesters] = useState(initialSemesters);
  useEffect(() => {
    const fetchSemesters = async()=>{
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_BASEURL}/faculty/${faculty}/semesters`
        );
        setSemesters((prevState)=>({...prevState, [faculty]: data.sort()}));
      } catch (err) {
        console.log(err);
      }
    }
    fetchSemesters()
  }, [faculty]);
  return (
    <div className="flex flex-wrap gap-8 mt-10">
      {semesters[faculty]?.map((semester) => (
        <SemesterCard
          to={`/${faculty}/semesters/${semester}`}
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
