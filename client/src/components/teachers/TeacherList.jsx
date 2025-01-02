import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
const TeacherList = ({ faculty }) => {
  const teachers = {
    CSIT: [
      { name: "Mr. Smith", isPresent: "yes" },
      { name: "Ms. Johnson", isPresent: "yes" },
      { name: "Dr. Brown", isPresent: "yes" },
      { name: "Prof. White", isPresent: "yes" },
    ],
    BCA: [
      { name: "Mr. Taylor", isPresent: "yes" },
      { name: "Ms. Lewis", isPresent: "yes" },
      { name: "Dr. Clark", isPresent: "yes" },
      { name: "Prof. Walker", isPresent: "yes" },
    ],
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-teal-700 mb-5">Our Teachers</h3>
      <table className="min-w-full border-collapse border border-gray-200 text-center">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Present</th>
            <th className="border border-gray-300 px-4 py-2">Edit</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {teachers[faculty]?.map((teacher, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-white" : "bg-gray-200 text-black"
              }
            >
              <td className="border border-gray-300 px-4 py-2">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {teacher.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {teacher.isPresent}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded mr-2">
                  <MdEditSquare />
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TeacherList;
