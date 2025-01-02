import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
export default function Button({
  children,
  isDisable,
  pendingText,
  onClick,
  className,
  navigateTo,
  noShadow = true,
  allowModal,
  modalTitle,
}) {
  const [openModal, setOpenModal] = useState(false);
  const handleButtonClick = (e) => {
    if (allowModal) setOpenModal(true);
    else onClick?.(e);
  };
  const renderButton = () => {
    if (!navigateTo) {
      return (
        <button
          disabled={isDisable}
          style={
            !noShadow
              ? { boxShadow: "0 0.4rem 0.1rem rgba(0, 18, 47, 0.5)" }
              : {}
          }
          onClick={handleButtonClick}
          className={twMerge(
            `inline-block outline-none bg-blue-500 py-4 px-16 rounded-xl text-3xl font-bold text-white m-2`,
            className
          )}
        >
          {isDisable && pendingText ? pendingText : children}
        </button>
      );
    }
    return (
      <Link
        style={
          !noShadow ? { boxShadow: "0 0.4rem 0.1rem rgba(0, 18, 47, 0.5)" } : {}
        }
        onClick={handleButtonClick}
        to={navigateTo}
        className={twMerge(
          `inline-block outline-none bg-blue-500 py-4 px-16 rounded-xl text-3xl font-bold text-white m-2`,
          className
        )}
      >
        {children}
      </Link>
    );
  };
  return (
    <>
      {renderButton()}
      {allowModal && (
        <Modal
          isOpen={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          submitVal={"Resign"}
          onSubmit={(e) => {
            onClick?.(e);
          }}
        >
          <h1 className="mt-4 text-center text-2xl font-bold sm:text-[1.35rem] sm:leading-[1.85rem] xsm:text-xl">
            {modalTitle}
          </h1>
        </Modal>
      )}
    </>
  );
}
