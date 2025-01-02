import { twMerge } from "tailwind-merge";

export default function Card({ title, className, onClick }) {
  return (
    <div onClick={onClick} className={twMerge("Card w-[250px] sm:w-[150px] h-[250px] sm:h-[150px] bg-slate-700 rounded-md grid place-content-center cursor-pointer", className)}>
      {title && (
        <div
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          className="text-5xl lg:text-3xl font-bold text-white text-center select-none "
        >
          {title}
        </div>
      )}
    </div>
  );
}
