// ye Navbar component hai - Display top navigation bar jisme Logo, Menu, and icons honge
// ise pages/index.js me import karenge

import { useState } from "react";

export default function Navbar() {
  // ye state use hogi mobile menu toggle ke liye
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* ye section logo ka hai left wala */}
      
        <div className="logo">
        <a href="/" className="logo-link">
          AppScrip-Mart
        </a>
      </div>

      

      {/* ye center ka section hai jo Menu links hoga */}
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <a href="#">Shop</a>
        <a href="#">Skills</a>
        <a href="#">Stories</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </nav>

      {/* right section wale icons */}
      <div className="icons">
        {/* Search Icon 🔍 */}
        <button className="icon-btn" aria-label="Search">
          🔍
        </button>

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

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-size: 1.0rem;
          transition: color 0.3s;
        }

        .nav-links a:hover {
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
