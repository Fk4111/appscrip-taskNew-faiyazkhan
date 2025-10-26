// ye FilterSideBar component hai jo product filter show karega left side par
// aur ye import hoga inside index.js

import { useState } from "react";

export default function FilterSideBar({ onFilterChange }) {
  // ✅ NEW: yahan state rakhenge for selected checkboxes
  // so that we can track which filters user has selected
  const [filters, setFilters] = useState({
    idealFor: [],
    occasion: [],
    material: [],
  });

  // ✅ NEW: ye function har checkbox ke change hone par call hoga
  // ye filter state ko update karega aur parent (index.js) ko bhej dega via props
  const handleCheckboxChange = (category, value) => {
    const updated = { ...filters };
    if (updated[category].includes(value)) {
      // agar already checked hai to uncheck kardo
      updated[category] = updated[category].filter((v) => v !== value);
    } else {
      // agar unchecked tha to add kardo
      updated[category].push(value);
    }
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated); // ✅ parent component ko bhej rahe hain
  };

  return (
    <aside className="sidebar">
      {/* Filter header (no toggle button here — controlled by parent) */}
      <div className="filter-header">
        <h3>Filters</h3>
      </div>

      {/* ✅ Ideal For section */}
      <div className="filter-group">
        <h4>Ideal For</h4>
        {["Men", "Women", "Kids"].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={filters.idealFor.includes(item)}
              onChange={() => handleCheckboxChange("idealFor", item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* ✅ Occasion section */}
      <div className="filter-group">
        <h4>Occasion</h4>
        {["Casual", "Party", "Formal"].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={filters.occasion.includes(item)}
              onChange={() => handleCheckboxChange("occasion", item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* ✅ Material section */}
      <div className="filter-group">
        <h4>Material</h4>
        {["Cotton", "Wool", "Leather"].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={filters.material.includes(item)}
              onChange={() => handleCheckboxChange("material", item)}
            />
            {item}
          </label>
        ))}
      </div>

      <style jsx>{`
        .sidebar {
          width: 220px;
          border-right: 1px solid #e0e0e0;
          padding: 15px;
          background-color: #fafafa;
          transition: all 0.3s ease;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .filter-group {
          margin-bottom: 20px;
        }

        .filter-group h4 {
          font-size: 1rem;
          margin-bottom: 8px;
          color: #333;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.9rem;
          color: #555;
        }

        input[type="checkbox"] {
          margin-right: 8px;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            border: none;
            border-bottom: 1px solid #ddd;
          }
        }
      `}</style>
    </aside>
  );
}
