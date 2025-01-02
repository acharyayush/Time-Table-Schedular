import { Link } from "react-router-dom";

const SemesterCard = ({ semester, to }) => {
  return (
    <Link
    to={to}
      className={`w-60 h-40 bg-teal-500 rounded-lg shadow-lg transform transition-all duration-300 
            hover:scale-105 hover:shadow-xl overflow-hidden`}
    >
      <div className="h-full flex items-center justify-center p-4">
        <h3 className="text-3xl font-semibold text-white">Semester {semester}</h3>
      </div>
    </Link>
  );
};
export default SemesterCard;
