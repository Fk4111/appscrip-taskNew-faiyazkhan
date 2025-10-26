// Yahan hum dropdown sort component banayenge
// ✅ SortDropdown Component 👇
// This component displays the "Sort By" dropdown (Recommended ▼) seen in Figma
// It will later be used to sort the product list dynamically (Price, Name, etc.)
 
import { useState } from "react";

export default function SortDropdown({ onSortChange }) {
  // Local state to track the current selected sort option
  const [sortOption, setSortOption] = useState("Recommended");

  // Event handler for dropdown change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    console.log("Sorting by:", value); // ✅ Local log (for debug)
    if (onSortChange) {
      onSortChange(value); // ✅ ye Send krega selected value to parent (index.js)
    }
  };

  return (
    <div className="sort-container">
      {/* sort dropdown */}
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="Recommended">Recommended</option>
        <option value="Newest">Newest First</option>
        <option value="Popular">Popular</option>
        <option value="HighToLow">Price: High to Low</option>
        <option value="LowToHigh">Price: Low to High</option>
      </select>

      {/* Inline styles */}
      <style jsx>{`
        .sort-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #333;
        }

        .sort-select {
          padding: 5px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          font-size: 0.9rem;
          outline: none;
          cursor: default;
          user-select: none;
        }

        .sort-select:hover {
          border-color: #ce9178;
          box-shadow: 0 0 5px rgba(43, 18, 58, 0.3);
        }
      `}</style>
    </div>
  );
}