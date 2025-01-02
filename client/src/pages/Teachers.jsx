import React from "react";
import TeacherList from "../components/teachers/TeacherList";
import TeacherAdd from "../components/teachers/TeacherAdd";
const Teachers = () => {
  return (
    <div className="overflow-x-auto w-[90vw] mx-auto mt-4">
      <br />
      <TeacherAdd />
      <br />
      <TeacherList faculty={"CSIT"} />
    </div>
  );
};

export default Teachers;
