import React from "react";
import Button from "../shared/Button";

const Period = ({ index, startTime, endTime, handleEdit, handleDelete }) => {
  const convert24HoursTo12HoursFormat = (time) => {
    let [hour, min] = time
      ?.trim()
      .split(":")
      .map((el) => Number(el));
    let meridiem = "AM";
    if (hour > 12) {
      meridiem = "PM";
      hour -= 12;
    }
    const convertedTime = `${hour < 10 ? "0" + hour : hour}:${
      min < 10 ? "0" + min : min
    } ${meridiem}`;
    return convertedTime;
  };
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Period {index + 1}
        </h3>
        <p className="text-gray-600">
          {convert24HoursTo12HoursFormat(startTime)} - {convert24HoursTo12HoursFormat(endTime)}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => handleEdit(index)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 text-lg"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(index)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 text-lg"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Period;
