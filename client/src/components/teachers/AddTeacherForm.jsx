import React, { useState } from "react";

import axios from "axios";
import Button from "../shared/Button";
const AddTeacherForm = () => {
  const initialFormData = {
    teacherName: "",
    teacherType: "",
    startTime: "",
    endTime: "",
  };
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const FULL_TIMER = "Full Timer";
  const PART_TIMER = "Part Timer";
  const [formData, setFormData] = useState(initialFormData);
  const teacherType = [FULL_TIMER, PART_TIMER];
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "teacherType") {
      if (value === PART_TIMER) setShowAdditionalField(true);
      else setShowAdditionalField(false);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null); // Reset error message on field change
  };
  const validate = () => {
    // Validation
    if (!formData.teacherName || !formData.teacherType) {
      setError("Both teacher name teacher type are required.");
      return;
    }
    if (
      formData.teacherType === PART_TIMER &&
      (!formData.startTime || !formData.endTime)
    ) {
      setError("Start and end times for part timer are required.");
      return;
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    validate();
    setIsPending(true)
    let dataToSubmit = {};
    if (formData.teacherType === FULL_TIMER) dataToSubmit = formData;
    else
      dataToSubmit = {
        teacherName: formData.teacherName,
        teacherType: formData.teacherType,
      };
    //Submit the form to the server
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_BASEURL}/teachers`,
        dataToSubmit
      );
      setFormData(initialFormData);
      console.log("Successfully created a teacher");
    } catch (err) {
      console.log("Unable to add a teacher: ", err);
    }
    setIsPending(false)
    setError(null);
  };
  const renderAdditionalFields = () => {
    return (
      <div className="flex sm:block gap-4 mb-4">
        {/* Start Time Field */}
        <div className="flex-1">
          <label
            htmlFor="startTime"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Arrival Time
          </label>
          <input
            required
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full outline-none"
            placeholder="Enter Arrival Time, Ex: 6:10"
          />
        </div>

        {/* End Time Field */}
        <div className="flex-1">
          <label
            htmlFor="endTime"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Departure Time
          </label>
          <input
            required
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full outline-none"
            placeholder="Enter Departure Time, Ex: 8:10"
          />
        </div>
      </div>
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mb-6"
    >
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Add New Teacher
      </h2>

      <div className="flex sm:block gap-4 mb-4">
        {/* Teacher Name Field */}
        <div className="flex-1">
          <label
            htmlFor="teacherName"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Teacher Name
          </label>
          <input
            required
            type="text"
            id="teacherName"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full outline-none"
            placeholder="Enter New Teacher Name"
          />
        </div>

        {/* Teacher Type Field */}
        <div className="flex-1">
          <label
            htmlFor="teacherType"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Teacher Name
          </label>
          <select
            required
            id="teacherType"
            name="teacherType"
            value={formData.teacherType}
            onChange={handleChange}
            className="p-3 border-2 border-gray-300 rounded-lg w-full"
          >
            <option value="">Select Type</option>
            {teacherType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {showAdditionalField && renderAdditionalFields()}
      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1 text-center mb-2">{error}</p>
      )}

      {/* Submit Button */}
      <Button
        isDisable={isPending}
        pendingText = "Adding..."
        type="submit"
        className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 text-lg mx-0"
      >
        Add Teacher
      </Button>
    </form>
  );
};

export default AddTeacherForm;
