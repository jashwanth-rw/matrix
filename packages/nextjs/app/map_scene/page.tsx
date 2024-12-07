"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Chat from "~~/components/Chat";

const MapScene = () => {
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0 });
  const dotMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, "X", 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "X", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "X", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "X", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, "X", 0, 0, 0],
  ];

  const handleKeyPress = (event: KeyboardEvent) => {
    const newX = userPosition.x;
    const newY = userPosition.y;
    switch (event.key) {
      case "ArrowUp":
        if (newY > 0) {
            updateUserPosition(-1,0)
        }
        break;
      case "ArrowDown":
        if (newY < dotMatrix.length - 1) {
            updateUserPosition(1,0)
        }
        break;
      case "ArrowLeft":
        if (newX > 0) {
            updateUserPosition(0,-1)
        }
        break;
      case "ArrowRight":
        if (newX < dotMatrix[0].length - 1) {
            updateUserPosition(0,1)
        }
        break;
    }
  };
  const updateUserPosition = (x: number, y: number) => {
    const newX = userPosition.x + x;
    const newY = userPosition.y + y;
    if (newX >= 0 && newX < dotMatrix[0].length && newY >= 0 && newY < dotMatrix.length) {
      setUserPosition({ x: newX, y: newY });
    }
  }
  const handleKeyboardNavChange = (e) => {
    if (e.target.checked) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }
  };

  return (
    <div className="flex flex-row justify-start items-stretch mt-2 h-screen gap-2">
      {/* Left section */}
      <div className="w-3/5 h-full">
        <div className="card w-full h-full border p-0">
          <div className="card-body h-full flex items-center justify-center">
            <div className="grid grid-cols-10 gap-0">
              {dotMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-col">
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className={`w-10 h-10 ${cell === "X" ? "bg-gray-200" : userPosition.x === cellIndex && userPosition.y === rowIndex ? "bg-gray-200" : "bg-gray-200"}`}>
                      {userPosition.x === cellIndex && userPosition.y === rowIndex && (
                        <img src="https://github.com/jashwanth-rw/matrix/blob/main/output_cropped_images/box_1.png?raw=true" alt="Player" className="w-full h-full object-cover" />
                      )}
                      {cell === "X" && (
                        <img src={`https://github.com/jashwanth-rw/matrix/blob/main/output_cropped_images/box_${Math.floor(Math.random() * (28 - 2 + 1)) + 2}.png?raw=true`} alt="Player" className="w-full h-full object-cover" />
                      )}

                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="w-2/5 h-full flex flex-col justify-between items-stretch">
        {/* Chat component */}
        <div className="flex-2 h-3/5 overflow-hidden">
          <div className="card w-full h-full border">
            <Chat />
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex-1 h-2/5 overflow-hidden p-2">
          <div className="card w-full h-full border">
            <div className="card-body p-4 flex flex-col justify-between">
              <h2 className="card-title text-lg mb-2">Navigation Controls</h2>
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="keyboardNav"
                  className="mr-2 cursor-pointer"
                  onChange={handleKeyboardNavChange}
                />
                <label htmlFor="keyboardNav" className="text-sm cursor-pointer">
                  Enable keyboard navigation (↑,↓,←,→)
                </label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button
                  className="p-2 bg-gray-100 rounded-full transition-colors"
                  onClick={() => updateUserPosition(-1,0)}
                  title="Move Up"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <div className="flex gap-1">
                  <button
                    className="p-2 bg-gray-100 rounded-full transition-colors"
                    onClick={() => updateUserPosition(0,-1)}
                    title="Move Left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-2 bg-gray-100 rounded-full transition-colors"
                    onClick={() => updateUserPosition(1,0)}
                    title="Move Down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-2 bg-gray-100 rounded-full transition-colors"
                    onClick={() => updateUserPosition(0,1)}
                    title="Move Right"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapScene;
