import React from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Button from "../shared/Button";

const SubjectCard = ({ subject, teacher, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sm:w-80 w-96 border border-teal-600 hover:scale-105 transition-all">
      <div className="content h-32">
        {/* Title - Subject */}
        <h3 className="text-2xl font-bold text-teal-600 mb-2">{subject}</h3>

        {/* teacher */}
        <p className="text-lg text-gray-700 mb-4">Taught by: {teacher}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex">
        <Button
          onClick={onEdit}
          className={
            " bg-teal-600 py-2 px-4 hover:bg-teal-700 rounded-md"
          }
        >
          <MdEditSquare className="text-2xl" />
        </Button>
       <Button
          onClick={onDelete}
          className={
            " bg-red-500 py-2 px-4 hover:bg-red-600 rounded-md"
          }
        >
          <MdDelete className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
