import React, { useState } from "react";
import Button from "../shared/Button";
import Period from "./Period";
import axios from "axios";
const PeriodManager = () => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
  });
  const [periods, setPeriods] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes for start and end time
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };
  const handleEditRequest = async () => {
    try {
      axios.put(`${import.meta.env.VITE_SERVER_BASEURL}/periods`, {...formData, id: periods[editIndex]?.id})
      const updatedPeriods = [...periods];
      updatedPeriods[editIndex] = formData;
      setPeriods(updatedPeriods);
      setFormData({ startTime: "", endTime: "" });
    } catch (err) {
      console.log("Could not edit ", err);
    }
    setEditIndex(null);
  };
  const handleAddRequest = async () => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/periods`, formData)
      setPeriods([...periods, {...formData, id: data.id}]);
      setFormData({ startTime: "", endTime: "" });
    } catch (err) {
      console.log("Could not add ", err);
    }
  };
  // Handle form submission (Add/Edit period)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation: Ensure both start and end times are filled
    if (!formData.startTime || !formData.endTime) {
      setError("Both start and end times are required.");
      return;
    }
    setIsPending(true);
    // Add or Update Period
    if (editIndex !== null) {
      await handleEditRequest();
    } else {
      await handleAddRequest();
    }
    setIsPending(false);
    setError(null);
  };

  // Edit period
  const handleEdit = (index) => {
    setFormData(periods[index]);
    setEditIndex(index);
  };

  // Delete period
  const handleDelete = async(index) => {
    try{
      await axios.delete(`${import.meta.env.VITE_SERVER_BASEURL}/periods/${periods[index]?.id}`)
      const updatedPeriods = periods.filter((_, i) => i !== index);
      setPeriods(updatedPeriods);
    }
    catch(err){
      console.log("Could not delete the period", err)
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Manage Periods
      </h2>

      {/* Form to Add/Edit Period */}
      <form onSubmit={handleSubmit} className="w-full mb-6">
        <div className="flex gap-4">
          {/* Start Time */}
          <div className="flex-1">
            <label
              htmlFor="startTime"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* End Time */}
          <div className="flex-1">
            <label
              htmlFor="endTime"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button
          isDisable={isPending}
          pendingText={editIndex !== null ? "Updating..." : "Adding..."}
          type="submit"
          className="mt-4 w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 text-lg mx-0"
        >
          {editIndex !== null ? "Update Period" : "Add Period"}
        </Button>
      </form>

      {/* Periods List */}
      <div className="mt-6">
        {periods.length > 0 ? (
          <div className="grid gap-4">
            {periods.map((period, index) => (
              <Period
                key={index}
                index={index}
                startTime={period.startTime}
                endTime={period.endTime}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No periods added yet.</p>
        )}
      </div>
    </div>
  );
};

export default PeriodManager;
