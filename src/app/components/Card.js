import React from 'react';

export default function Card(props) {
  return (
    <div id={props.key}>
      <div className="w-96 h-80 relative p-7 flex flex-col">
        <img className="w-full h-48 object-cover rounded-lg" src={props.image} alt={props.name} />
        <div className="pt-5 flex-grow">
          <h5 className="mb-2 text-xl font-normal tracking-tight" style={{ color: '#2E2E2E' }}>
            {props.name}
          </h5>
          <p className="font-normal">
            <span className="font-bold text-2xl" style={{ color: '#2E2E2E' }}>{props.calories}</span>
            <span className="font-bold" style={{ fontSize: '28px', color: '#F8B602' }}> Cal</span>
          </p>
        </div>
        <div className="flex justify-end mt-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}
