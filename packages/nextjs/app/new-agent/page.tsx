"use client";

import { useState } from "react";

export default function NewAgent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");
  const [inputOutputPairs, setInputOutputPairs] = useState([{ input: "", output: "" }]);

  const preloadedImages = [
    "https://imgcdn.stablediffusionweb.com/2024/4/4/d4a384e8-35f7-40df-bf6c-3c9ea21f07a5.jpg",
    "https://imgcdn.stablediffusionweb.com/2024/11/17/4d7dfe9c-2cba-445a-af74-d974d3275a63.jpg",
    "https://imgcdn.stablediffusionweb.com/2024/10/21/a914a10c-22f6-49b7-b668-a1686bed1738.jpg",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      selectedImage,
      apiKey,
      description,
      inputOutputPairs,
    });
  };

  const addInputOutputPair = () => {
    setInputOutputPairs([...inputOutputPairs, { input: "", output: "" }]);
  };

  const updateInputOutputPair = (index: number, field: "input" | "output", value: string) => {
    const newPairs = [...inputOutputPairs];
    newPairs[index][field] = value;
    setInputOutputPairs(newPairs);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Agent</h1>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          {selectedImage && (
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Agent Avatar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="label">
            <span className="label-text">Or Select Preloaded Image</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {preloadedImages.map((img, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden h-24 ${
                  selectedImage === img ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`Preloaded ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">API Key</span>
          </label>
          <input
            type="password"
            placeholder="Enter your API key"
            className="input input-bordered w-full rounded-xl"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 rounded-xl"
            placeholder="Describe your agent's capabilities"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {inputOutputPairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sample Input {index + 1}</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 rounded-xl"
                placeholder="Enter sample input"
                value={pair.input}
                onChange={e => updateInputOutputPair(index, "input", e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Sample Output {index + 1}</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 rounded-xl"
                placeholder="Enter expected output"
                value={pair.output}
                onChange={e => updateInputOutputPair(index, "output", e.target.value)}
              />
            </div>
          </div>
        ))}

        <button className="btn btn-secondary w-full mb-4" onClick={addInputOutputPair}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Input/Output Pair
        </button>

        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Create Agent
        </button>
      </div>
    </div>
  );
}
