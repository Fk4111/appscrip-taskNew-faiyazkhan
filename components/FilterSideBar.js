// ye FilterSideBar component hai jo product filter show karega left side par
// aur ye import hoga inside index.js

export default function FilterSideBar() {
  return (
    <aside className="sidebar">
      {/* Filter header (no toggle button here — controlled by parent) */}
      <div className="filter-header">
        <h3>Filters</h3>
      </div>

      {/* filter section */}
      <div className="filter-group">
        <h4>Ideal For</h4>
        <label>
          <input type="checkbox" /> Men
        </label>

        <label>
          <input type="checkbox" /> Women
        </label>

        <label>
          <input type="checkbox" /> Kids
        </label>
      </div>

      <div className="filter-group">
        <h4>Occasion</h4>
        <label>
          <input type="checkbox" /> Casual
        </label>

        <label>
          <input type="checkbox" /> Party
        </label>

        <label>
          <input type="checkbox" /> Formal
        </label>
      </div>

      <div className="filter-group">
        <h4>Material</h4>
        <label>
          <input type="checkbox" /> Cotton
        </label>

        <label>
          <input type="checkbox" /> Wool
        </label>

        <label>
          <input type="checkbox" /> Leather
        </label>
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
