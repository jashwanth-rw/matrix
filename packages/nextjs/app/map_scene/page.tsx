"use client";

import { toast } from "react-toastify";
import Chat from "~~/components/chat";

export default function Map_scene() {
  return (
    <div className="flex flex-row justify-start items-stretch mt-2 h-screen gap-2">
      {/* Left section */}
      <div className="w-3/5 h-full">
        <div className="card w-full h-full border p-0">
          <div className="card-body h-full">
            <h2 className="card-title bg-green-200 h-full flex items-center justify-center">Card 1</h2>
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
                  onChange={e => {
                    const handleKeyPress = (event: KeyboardEvent) => {
                      switch (event.key) {
                        case "ArrowUp":
                          alert("Moving Up!");
                          break;
                        case "ArrowDown":
                          alert("Moving Down!");
                          break;
                        case "ArrowLeft":
                          alert("Moving Left!");
                          break;
                        case "ArrowRight":
                          alert("Moving Right!");
                          break;
                      }
                    };

                    if (e.target.checked) {
                      window.addEventListener("keydown", handleKeyPress);
                    } else {
                      window.removeEventListener("keydown", handleKeyPress);
                    }
                  }}
                />
                <label htmlFor="keyboardNav" className="text-sm cursor-pointer">
                  Enable keyboard navigation (↑,↓,←,→)
                </label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button
                  className="p-2 bg-gray-100 rounded-full transition-colors"
                  onClick={() => alert("Moving Up!")}
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
                    onClick={() => alert("Moving Left!")}
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
                    onClick={() => alert("Moving Down!")}
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
                    onClick={() => alert("Moving Right!")}
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
