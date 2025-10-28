// ye Navbar component hai - Display top navigation bar jisme Logo, Menu, and icons honge
// ise pages/index.js me import karenge

import Link from "next/link";
import { useState } from "react";

// ✅ FIXED: destructure { onSearch } from props instead of plain onSearch
export default function Navbar({ onSearch }) {

  // ab hum yahan logic banayenge filter ke liye navbar me aur taake filter me koi shirts pr click kre to page render ho kar sirf shirts appear hon
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    // ✅ safe check before calling
    if (typeof onSearch === "function") {
      onSearch(value);  // yahan se parent ko send krenge request
    }
  };

  // ✅ Optional: trigger search when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onSearch === "function") {
      onSearch(query);
    }
  };

  // ye state use hogi mobile menu toggle ke liye
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* ye section logo ka hai left wala */}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}  // ✅ trigger search on Enter ye function sirf enter pr hit krne ke liye search ko
        />
      </div>

      <div className="logo">
        <Link href="/" legacyBehavior >
          <a className="logo-link"> AppScrip-Mart</a>
        </Link>
      </div>

      {/* ye center ka section hai jo Menu links hoga */}
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link href="#">Shop</Link>
        <Link href="#">Skills</Link>
        <Link href="#">Stories</Link>
        <Link href="#">About Us</Link>
        <Link href="#">Contact Us</Link>
      </nav>

      {/* right section wale icons */}
      <div className="icons">
        {/* user/profile */}
        <button className="icon-btn" aria-label="User Profile">
          👤
        </button>

        {/* Wishlist */}
        <button className="icon-btn" aria-label="Wishlist">
          ❤️
        </button>

        {/* Cart */}
        <button className="icon-btn" aria-label="Cart">
          🛒
        </button>

        {/* Hamburger Menu (mobile view) */}
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Styling using styled-jsx --- Next.js built-in */}
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .search-bar input {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .search-bar input:focus {
          outline: none;
          border-color: #ce9178;
          box-shadow: 0 0 5px rgba(206, 145, 120, 0.4);
        }

        .search-bar input:hover {
          border-color: #ce9178;
          box-shadow: 0 0 5px rgba(39, 4, 61, 0.3);
        }

        .logo-link {
          font-weight: bold;
          font-size: 1.2rem;
          text-decoration: none;
          color: #ce9178;
        }

        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links :global(a) {
          text-decoration: none;
          color: #333;
          font-size: 1rem;
          transition: color 0.3s;
        }

        .nav-links :global(a:hover) {
          color: #ce9178;
        }

        .icons {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .icon-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .icon-btn:hover {
          transform: scale(1.1);
        }

        /* hamburger icon (ye hide ho jayega desktop pr only visible in mobile ) */
        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        /* for responsiveness design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 60px;
            left: 0;
            background-color: #fff;
            width: 100%;
            flex-direction: column;
            align-items: center;
            border-top: 1px solid #ddd;
            padding: 20px 0;
          }

          .nav-links.open {
            display: flex;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
