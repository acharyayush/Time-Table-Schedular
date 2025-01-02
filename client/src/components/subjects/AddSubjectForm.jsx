import React, { useState } from "react";
import Button from "../shared/Button";
import axios from "axios";

const AddSubjectForm = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    teacherName: "",
  });
  const teachers = [
    "Rikesh Shrestha",
    "Umesh Pathak",
    "Alan Turing",
    "Nanda Kishor Ray",
    "Mark Zuckerberg",
  ];
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // Handle change for both subject name and teacher name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null); // Reset error message on field change
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault()
    // Validation
    if (!formData.subjectName || !formData.teacherName) {
      setError("Both subject name and teacher name are required.");
      return;
    }
    setIsPending(true)
    try {
      console.log(formData)
      await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/subjects`, formData);
      // clear the form after submission
      setFormData({
        subjectName: "",
        teacherName: "",
      });
      console.log("Added new subject");
    } catch (err) {
      console.log("Unable to add new subject: ", err);
    }
    setIsPending(false)
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mb-6"
    >
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Add New Subject
      </h2>

      {/* Form Row: Subject Name and Teacher Name */}
      <div className="flex sm:block gap-4 mb-4">
        {/* Subject Name Field */}
        <div className="flex-1">
          <label
            htmlFor="subjectName"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Subject Name
          </label>
          <input
            required
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full outline-none"
            placeholder="Enter Subject Name"
          />
        </div>

        {/* Teacher Name Field */}
        <div className="flex-1">
          <label
            htmlFor="teacherName"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Teacher Name
          </label>
          <select
            required
            id="teacherName"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1 text-center mb-2">{error}</p>
      )}

      {/* Submit Button */}
      <Button
        isDisable={isPending}
        pendingText={"Adding..."}
        type="submit"
        className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 text-lg mx-0"
      >
        Add Subject
      </Button>
    </form>
  );
};

export default AddSubjectForm;
