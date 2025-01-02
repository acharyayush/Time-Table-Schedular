import React, { useState } from "react";
import axios from "axios";
import Button from "../shared/Button";
import { IoIosAddCircle } from "react-icons/io";
const SemesterAdd = ({ faculty }) => {
  const [semesterNumber, setSemesterNumber] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSemesterNumber(value);
    setError(null);
  };
  const handleSemesterAdd = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      // Check if the value is within the valid range
      if (semesterNumber >= 1 && semesterNumber <= 8) {
        await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/faculty/semesters`, {
          semesterNumber,
          faculty: faculty,
        });
        setSemesterNumber("")
        setError(null);
      } else {
        setError("Semester number must be between 1 and 8.");
      }
    } catch (err) {
      console.log("Could not add semester ", err);
    }
    setIsPending(false);
  };
  return (
    <form onSubmit={handleSemesterAdd}>
      <label
        htmlFor="semesterNumber"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Add a semester for {faculty}
      </label>
      <div className="w-full relative">
        <input
          type="number"
          id="semesterNumber"
          name="semesterNumber"
          value={semesterNumber}
          onChange={handleChange}
          min="1"
          max="8"
          className="p-3 outline-none border-2 border-gray-300 rounded-lg w-full"
          placeholder="Enter Semester Number"
        />
        <Button
          isDisable={isPending}
          className={
            " text-md absolute right-0 h-full p-0 m-0 mr-1 bg-transparent"
          }
        >
          <IoIosAddCircle className="text-5xl text-teal-500" />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default SemesterAdd;
