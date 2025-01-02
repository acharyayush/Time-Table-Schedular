import React, { useState } from "react";
import axios from "axios";
import Button from "../shared/Button";
import { IoIosAddCircle } from "react-icons/io";
const TeacherAdd = ({ faculty }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    setError(null);
  };
  const handleTeacherAdd = async (e) => {
    e.preventDefault();
    try {
      // Check if the value is within the valid range
      if(name.trim().length>0)
      {
        axios.post("/teacher", {
          name,
        });
        setError(null);
      } else {
        setError("Teacher field cannot be empty");
      }
    } catch (err) {}
  };
  return (
    <form onSubmit={handleTeacherAdd}>
      <label
        htmlFor="semesterNumber"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Add a teacher
      </label>
      <div className="w-full relative">
        <input
          required
          type="text"
          id="teacherName"
          name="name"
          value={name}
          onChange={handleChange}
          className="p-3 outline-none border-2 border-gray-300 rounded-lg w-full"
          placeholder="Enter Semester Number"
        />
        <Button className={" text-md absolute right-0 h-full p-0 m-0 mr-1 bg-transparent"}><IoIosAddCircle className="text-5xl text-teal-500" /></Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default TeacherAdd;
