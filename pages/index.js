// ✅ Importing Head from Next.js for setting SEO-related tags (title, meta, schema)
import Head from "next/head";

// ✅ Importing custom products with fake data api
import ProductCard from "../components/ProductCard";

// yahan hum apne home page me Navbar import kr rhe hain
import Navbar from "../components/Navbar";

//we are importing here FilterSideBar
import FilterSideBar from "@/components/FilterSideBar";

// ✅ Importing SortDropdown (Recommended ▼, Price High-Low etc.)
import SortDropdown from "@/components/SortDropdown";

import { useState } from "react"; // 👈 Added for toggle-btn and sorting state

// SERVER-SIDE RENDERING (SSR)
// getServerSideProps() runs on the server before rendering the page
// ye data yahan se fetch krega aur as a props paas krega hamare page componenets ko
export async function getServerSideProps() {
  // Fetching product data from Fake Store API (Mock API)
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  // Returning data as props for SSR
  return { props: { products } };
}

// MAIN COMPONENT
// This is the default export which represents the Home Page
export default function Home({ products }) {
  // If API doesn't return products (empty state handling)
  if (!products || products.length === 0) {
    return <p style={{ textAlign: "center" }}>No products found!</p>;
  }

  // 👇 here i Added toggle state for showing/hiding filter sidebar
  const [showFilter, setShowFilter] = useState(true);

  // 👇 Added sorting state( yahan se maine sorting ka componenet bana kr logic likha so user can find products according to their needs)
  const [sortedProducts, setSortedProducts] = useState(products);

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
      // Fake random shuffle for demo
      sorted = [...products].sort(() => Math.random() - 0.5);
      break;

    case "Popular":
      // Fake random shuffle for demo
      sorted = [...products].sort(() => Math.random() - 0.5);
      break;

    default:
      // Recommended → original SSR order
      sorted = [...products];
      break;
  }

  console.log("Sorting by:", option);
  console.log("First 5 prices after sort:", sorted.slice(0, 5).map(p => p.price));

  setSortedProducts(sorted); // ✅ Now React will detect new array and re-render
};


  return (
    <>
      {/* SEO & Meta Information */}
      <Head>
        {/* Title shown in browser tab */}
        <title>AppScrip Task - Product Listing Page</title>

        {/* Basic meta tags for SEO */}
        <meta
          name="description"
          content="SSR Product listing page built with React + Next.js and Plain CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags (for better link previews on social media) */}
        <meta property="og:title" content="All Products - AppScrip Task" />
        <meta
          property="og:description"
          content="Browse products rendered with SSR using Next.js"
        />
        <meta property="og:type" content="website" />

        {/* Schema Markup for SEO (Structured Data) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProductCollection",
              name: "All Products",
              description:
                "Product listing fetched from FakeStore API using Next.js SSR",
            }),
          }}
        />
      </Head>

      <Navbar />

      {/* Main Page Content */}
      <main className="main-layout">
        {/* Sidebar (toggle visibility) */}
        {showFilter && <FilterSideBar />}

        <div className="content-section">
          {/* ✅ Top Bar with Filter toggle + Count + Sort Dropdown */}
          <div className="top-bar">
            <div className="filter-toggle">
              <h3>Filters</h3>

              {/* ✅ Product Count (dynamic) */}
              <p className="product-count">{products.length} Items</p>

              {/* ✅ Show / Hide button */}
              <span
                className="toggle-btn"
                onClick={() => setShowFilter(!showFilter)}
              >
                {showFilter ? "Hide" : "Show"}
              </span>
            </div>

            {/* ✅ Sort Dropdown integrated here */}
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          {/* Page Heading (H1 is important for SEO) */}
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>
            All Products
          </h1>

          {/* Sub-heading (H2 for SEO hierarchy) */}
          <h2 style={{ textAlign: "center", color: "#555" }}>
            Explore our curated collection
          </h2>

          {/* Product Grid Section */}
          <div className="product-grid">
            {/* i am Mapping here through each product and rendering ProductCard component */}
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>

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
          cursor: default;
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
          transition: all 0.3s ease; /* smooth animation for sorting */
        }

        /* Tablet View: 3 columns */
        @media (max-width: 1024px) {
          .main-layout {
            flex-direction: column;
          }
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Mobile View: 2 columns */
        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
