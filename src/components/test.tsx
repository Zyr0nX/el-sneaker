import React from 'react'

export default function Test() {
  return (
    <div className="flex h-screen">
      <div className="bg-red-500 basis-3/5">
        <div className="bg-green-500 h-[300px]"></div>
        <div className="bg-green-500 h-[300px] w-full overflow-x-auto">
          <div className="w-[2000px] h-full"></div>
        </div>
      </div>
      <div className="bg-blue-500 basis-2/5"></div>
    </div>
  );
}
