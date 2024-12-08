"use client";

import { useState } from "react";

export default function Progress() {
  const [activeTab, setActiveTab] = useState("German");

  const languages = {
    German: {
      progress: 60,
      misspellings: ["Accommodate", "Separate", "Necessary"],
    },
    Sanskrit: {
      progress: 30,
      misspellings: ["Indescribable", "Unnecessary", "Disappear"],
    },
    French: {
      progress: 80,
      misspellings: ["Excessive", "Unpredictable", "Cooperation"],
    },
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-2xl font-bold">Language Learning Progress</h1>

      <div className="card w-full border">
        <div className="card-body">
          <div className="tabs tabs-boxed mb-4">
            {Object.keys(languages).map(lang => (
              <button
                key={lang}
                className={`tab ${activeTab === lang ? "tab-active" : ""}`}
                onClick={() => setActiveTab(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          {Object.entries(languages).map(([lang, data]) => (
            <div key={lang} className={activeTab === lang ? "block" : "hidden"}>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-500 h-2.5 rounded-full transition-all" style={{ width: `${data.progress}%` }} />
              </div>
              <p className="text-sm mb-4">{data.progress}% Complete</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.misspellings.map((word, i) => (
                  <div key={i} className="card border bg-base-100 shadow-xl">
                    <div className="card-body p-4">
                      <p className="text-sm">
                        Misspellings: <br />
                        {i + 1}. {word}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card w-full border">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Overall Progress</h2>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Total Lessons Completed: 120</p>
            <p className="text-sm">Total Hours Spent Learning: 50</p>
            <p className="text-sm">Average Daily Progress: 10%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
