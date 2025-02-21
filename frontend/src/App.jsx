import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [resKeys, setResKeys] = useState([]);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      if (!jsonInput.trim()) {
        alert("Please enter valid JSON.");
        return;
      }

      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:4000/bfhl", parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      setResKeys(Object.keys(res.data)); // Extract response keys dynamically
      setResponse(res.data);
      console.log(res);
    } catch (error) {
      setError(error.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col  items-center p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Enter the data
      </h1>

      {/* JSON Input Box */}
      <input
        className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
        placeholder='Enter JSON (e.g., {"data":["M","1","334","4","B"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Multi Filter Dropdown */}

      {error && <p className="text-red-600 my-2 text-sm ">{error}</p>}

      {/* Filtered Response Section */}
      {response && (
        <div className="w-full">
          <div className="mt-6 w-full">
            <h3 className=" font-semibold text-gray-800 mb-2 ">Multi Filter</h3>
            <div className="relative border border-gray-300 rounded-md p-2 bg-white">
              {resKeys.map((filter) => (
                <div
                  key={filter}
                  className={`p-2 cursor-pointer rounded-md ${
                    selectedFilters.includes(filter)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setSelectedFilters(
                      (prev) =>
                        prev.includes(filter)
                          ? prev.filter((f) => f !== filter) // Remove if already selected
                          : [...prev, filter] // Add if not selected
                    )
                  }
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4 mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Filtered Response
            </h3>

            {selectedFilters.includes("user_id") && (
              <p className="text-gray-700">
                <span className="font-semibold">User ID:</span>{" "}
                {response.user_id}
              </p>
            )}

            {selectedFilters.includes("email") && (
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {response.email}
              </p>
            )}

            {selectedFilters.includes("roll_number") && (
              <p className="text-gray-700">
                <span className="font-semibold">Roll Number:</span>{" "}
                {response.roll_number}
              </p>
            )}
            {selectedFilters.includes("numbers") && (
              <p className="text-gray-700">
                <span className="font-semibold">Numbers:</span>{" "}
                {response.numbers.join(", ")}
              </p>
            )}
            {selectedFilters.includes("alphabets") && (
              <p className="text-gray-700">
                <span className="font-semibold">Alphabets:</span>{" "}
                {response.alphabets.join(", ")}
              </p>
            )}
            {selectedFilters.includes("highest_alphabet") && (
              <p className="text-gray-700">
                <span className="font-semibold">Highest Alphabet:</span>{" "}
                {response.highest_alphabet}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
