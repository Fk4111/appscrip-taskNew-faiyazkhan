// ✅ Importing Head from Next.js for setting SEO-related tags (title, meta, schema)
import Head from "next/head";

// ✅ Importing custom products with fake data api
import ProductCard from "../components/ProductCard";

// yahan hum apne home page me Navbar import kr rhe hain
import Navbar from "../components/Navbar";

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

      <Navbar/>

      {/* Main Page Content */}
      <main>
        {/* Page Heading (H1 is important for SEO) */}
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>All Products</h1>

        {/* Sub-heading (H2 for SEO hierarchy) */}
        <h2 style={{ textAlign: "center", color: "#555" }}>
          Explore our curated collection
        </h2>

        {/* Product Grid Section */}
        <div className="product-grid">
          {/* i am Mapping here through each product and rendering ProductCard component */}
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      {/* Inline CSS using styled-jsx --- Next.js built-in */}
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        /* Tablet View: 3 columns */
        @media (max-width: 1024px) {
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
