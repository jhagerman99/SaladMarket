import React from 'react';
import dagerSvg from '../../../public/icon/danger.svg';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons

export default function DeleteModal({ show, onClose, onConfirm}) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-100 p-6 rounded-md shadow-md flex flex-col items-center justify-center">
        <button onClick={onClose}className="absolute top-2 right-5 p-2 rounded-full hover:bg-gray-200">
          <FaTimes className="text-gray-300" size={15} />
        </button>
        <Image src={dagerSvg} alt="dager svg" width={72} height={72} />
        <h2 className="text-center text-xl font-bold my-4">Confirm Delete</h2>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <button className="text-white bg-customRed py-2 px-4 rounded mr-2" onClick={onConfirm}> Confirm </button>
          <button className="text-black py-2 px-4 rounded" onClick={onClose}> Cancel </button>
        </div>
      </div>
    </div>
  );
}
