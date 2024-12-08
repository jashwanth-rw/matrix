"use client";

import { useState } from "react";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function NewAgent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");
  const [inputOutputPairs, setInputOutputPairs] = useState([{ input: "", output: "" }]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showGasModal, setShowGasModal] = useState(false);
  const [selectedGasPrice, setSelectedGasPrice] = useState<number | null>(null);

  const gasData = [
    {
      chainId: 11155420,
      gasPrice: 1000251,
    },
    {
      chainId: 84532,
      gasPrice: 1000271,
    },
    {
      chainId: 421614,
      gasPrice: 100000000,
    },
  ];

  const chartData = {
    labels: gasData.map(d => `Chain ${d.chainId}`),
    datasets: [
      {
        label: "Gas Price",
        data: gasData.map(d => d.gasPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const preloadedImages = [];
  for (let i = 1; i <= 28; i++) {
    preloadedImages.push(
      `https://github.com/AmitChigare/matrixx/blob/main/output_cropped_images/box_${i}.png?raw=true`,
    );
  }

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
    setShowGasModal(true);
  };

  const handleGasSelect = (gasPrice: number) => {
    setSelectedGasPrice(gasPrice);

    // Create data object with all form values
    const formData = {
      selectedImage,
      apiKey,
      description,
      inputOutputPairs,
      selectedGasPrice: gasPrice,
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(formData);

    // Save JSON data
    try {
      localStorage.setItem("agentData", jsonData);
      console.log("Data saved successfully:", jsonData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addInputOutputPair = () => {
    setInputOutputPairs([...inputOutputPairs, { input: "", output: "" }]);
  };

  const updateInputOutputPair = (index: number, field: "input" | "output", value: string) => {
    const newPairs = [...inputOutputPairs];
    newPairs[index][field] = value;
    setInputOutputPairs(newPairs);
  };

  const maxGasPrice = Math.max(...gasData.map(d => d.gasPrice));

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
          <div className="grid grid-cols-3 gap-4">
            {preloadedImages.slice(0, 5).map((img, index) => (
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
            <div
              className="cursor-pointer border-2 border-dashed rounded-lg overflow-hidden h-24 flex items-center justify-center"
              onClick={() => setShowAllImages(true)}
            >
              <span>Show All</span>
            </div>
          </div>
        </div>
      </div>

      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-[80vw] h-[80vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">All Images</h2>
              <button className="btn btn-sm btn-circle" onClick={() => setShowAllImages(false)}>
                ✕
              </button>
            </div>
            <div className="grid grid-cols-8 gap-1">
              {preloadedImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden h-40 ${
                    selectedImage === img ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => {
                    setSelectedImage(img);
                    setShowAllImages(false);
                  }}
                >
                  <img src={img} alt={`Preloaded ${index + 1}`} className="w-1/2 h-1/2 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showGasModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-[80vw] max-w-2xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Select Gas Price</h2>
              <button className="btn btn-sm btn-circle" onClick={() => setShowGasModal(false)}>
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div className="h-60">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <div className="flex justify-around mt-4">
                {gasData.map(data => (
                  <button
                    key={data.chainId}
                    className={`btn ${selectedGasPrice === data.gasPrice ? "btn-primary" : "btn-outline"}`}
                    onClick={() => handleGasSelect(data.gasPrice)}
                  >
                    Chain {data.chainId}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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

        <div className="flex justify-end">
          <button className="btn btn-secondary w-[12rem] mb-4 self-center" onClick={addInputOutputPair}>
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
            add input/output
          </button>
        </div>

        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Create Agent
        </button>
      </div>
    </div>
  );
}
