import React from "react";
import TeacherList from "../components/teachers/TeacherList";
import AddTeacherForm from "../components/teachers/AddTeacherForm";
const Teachers = () => {
  return (
    <div className="overflow-x-auto w-[90vw] mx-auto mt-4">
      <br />
      <AddTeacherForm />
      <br />
      <TeacherList faculty={"CSIT"} />
    </div>
  );
};

export default Teachers;
