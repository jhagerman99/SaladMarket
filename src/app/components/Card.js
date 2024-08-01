import React from 'react';

export default function Card(props) {
  return (
    <div id={props.id}>
      <div className="w-90 h-96 relative p-7 rounded-xl bg-white">
        <img className="w-full h-48 object-cover rounded-xl" src={props.image} alt={props.name} />
        <div className="pt-5 flex-grow">
          <h5 className="mb-2 text-xl font-normal text-customBlack tracking-tight">
            {props.name}
          </h5>
          <p className="font-normal text-2xl">
            <span className="font-bold text-customBlack">{props.calories}</span>
            <span className="font-bold text-customYellow"> Cal</span>
          </p>
        </div>
        <div className="flex justify-end mt-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}
