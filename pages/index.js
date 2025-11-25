// ✅ Importing Head from Next.js for setting SEO-related tags (title, meta, schema)
import Head from "next/head";

// ✅ Importing custom products with fake data api
import ProductCard from "../components/ProductCard";

// yahan hum apne home page me Navbar import kr rhe hain
import Navbar from "../components/Navbar";

//we are importing here FilterSideBar
import FilterSideBar from "@/components/FilterSideBar";

// ✅ Importing SortDropdown (Recommended ▼, Price High-Low etc.)
import SortDropdown from "../components/SortDropdown";

//now we are importing footer here 
import Footer from "../components/Footer";

import { useState } from "react"; // 👈 Added for toggle-btn and sorting state



// STATIC SITE GENERATION (SSG)
// getStaticProps() runs at build time on Netlify
// ye data build time par fetch karega, aur page ko props provide karega
export async function getStaticProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    // Check if response is OK and content-type is JSON
    if (!res.ok) {
      console.error("API returned:", res.status, res.statusText);
      return { props: { products: [] }, revalidate: 60 };
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Invalid response type:", contentType);
      return { props: { products: [] }, revalidate: 60 };
    }

    const products = await res.json();

    return { 
      props: { products },
      revalidate: 60  // ISR enabled – Netlify har 60sc pr regenerate krega ise 
    };
  } catch (err) {
    console.error("SSG fetch error:", err);
    return { 
      props: { products: [] },
      revalidate: 60 
    };
  }
}



// MAIN COMPONENT
// This is the default export which represents the Home Page
export default function Home({ products }) {
  // 👇 ✅ All Hooks must be at the top level — not inside any condition
  const [showFilter, setShowFilter] = useState(true);

  // 👇 Added sorting state( yahan se maine sorting ka componenet bana kr logic likha so user can find products according to their needs)
  const [sortedProducts, setSortedProducts] = useState(products || []);

  // ✅ Added search query state (user search bar input ko store krega)
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ NEW: Added filter state to track checkbox selections
  // ye state sidebar ke filters ko store karegi
  const [filters, setFilters] = useState({
    idealFor: [],
    occasion: [],
    material: [],
  });

  // ✅ NEW: function to update filter state when user toggles any checkbox
  // ye function FilterSideBar se trigger hota hai (child → parent via props)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // ✅ Sorting logic connected with dropdown
  const handleSortChange = (option) => {
    let sorted = [];
    switch (option) {
      case "LowToHigh":
        sorted = [...products].sort((a, b) => a.price - b.price);
        break;
      case "HighToLow":
        sorted = [...products].sort((a, b) => b.price - a.price);
        break;
      case "Newest":
      case "Popular":
        sorted = [...products].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = [...products];
        break;
    }
    setSortedProducts(sorted);
  };

  // ✅ handleSearch will update searchQuery when user types in Navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // ✅ Filtered products based on search + filters + sorting
  // yahan hum title ke through simulate kar rhe hain (FakeStoreAPI me gender/material data nahi hai)
  const filteredProducts = sortedProducts.filter((product) => {
    const title = product.title.toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());

    const matchesIdealFor =
      filters.idealFor.length === 0 ||
      filters.idealFor.some((f) => title.includes(f.toLowerCase()));

    const matchesOccasion =
      filters.occasion.length === 0 ||
      filters.occasion.some((f) => title.includes(f.toLowerCase()));

    const matchesMaterial =
      filters.material.length === 0 ||
      filters.material.some((f) => title.includes(f.toLowerCase()));

    // ✅ product tabhi show hoga jab sab conditions true ho
    return matchesSearch && matchesIdealFor && matchesOccasion && matchesMaterial;
  });

  // ✅ Moved this check below hooks to avoid conditional hook error
  if (!products || products.length === 0) {
    return <p style={{ textAlign: "center" }}>No products found!</p>;
  }

  return (
    <>
      <Head>
        <title>AppScrip Task - Product Listing Page</title>
        <meta
          name="description"
          content="SSR Product listing page built with React + Next.js and Plain CSS"
        />
      </Head>

      {/* ✅ Navbar with search functionality connected */}
      <Navbar onSearch={handleSearch} />

      {/* Main Page Content */}
      <main className="main-layout">
        {/* Sidebar (toggle visibility) */}
        {showFilter && <FilterSideBar onFilterChange={handleFilterChange} />}

        <div className="content-section">
          {/* ✅ Top Bar with Filter toggle + Count + Sort Dropdown */}
          <div className="top-bar">
            <div className="filter-toggle">
              <h3>Filters</h3>
              <p className="product-count">{filteredProducts.length} Items</p>
              <span
                className="toggle-btn"
                onClick={() => setShowFilter(!showFilter)}
              >
                {showFilter ? "Hide" : "Show"}
              </span>
            </div>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          <h1 style={{ textAlign: "center", marginTop: "20px" }}>All Products</h1>
          <h2 style={{ textAlign: "center", color: "#555" }}>
            Explore our curated collection
          </h2>

          {/* ✅ Product Grid Section (filtered + sorted results) */}
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p style={{ textAlign: "center" }}>No products match your filters.</p>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Inline CSS using styled-jsx --- Next.js built-in */}
      <style jsx>{`
        .main-layout {
          display: flex;
          gap: 20px;
          padding: 10px 20px;
        }
        .content-section {
          flex: 1;
        }
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
        }
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .filter-toggle h3 {
          margin: 0;
          font-size: 1.1rem;
        }
        .toggle-btn {
          color: purple;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
        }
        .product-count {
          color: #555;
          font-size: 0.9rem;
          cursor: default;
          user-select: none;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        @media (max-width: 1024px) {
          .main-layout {
            flex-direction: column;
          }
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
