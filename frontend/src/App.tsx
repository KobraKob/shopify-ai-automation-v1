// src/App.tsx
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState("");
  const [details, setDetails] = useState("");
  const [keywords, setKeywords] = useState("");
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setListing(null);

    try {
      const response = await axios.post("http://localhost:5000/generate-listing", {
        product_description: product,
        additional_details: details,
        base_keywords: keywords
      });

      setListing(response.data);
    } catch (error: any) {
      alert("Error generating listing: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛍️ Shopify Listing Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Description"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Additional Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Base Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Listing"}
        </button>
      </form>

      {listing && (
        <div className="mt-8 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold">🎉 Generated Listing</h2>
          <p><strong>Title:</strong> {listing.title}</p>
          <p><strong>Description:</strong></p>
          <p className="whitespace-pre-wrap">{listing.description}</p>
          <p><strong>Tags:</strong> {listing.tags}</p>
        </div>
      )}
    </div>
  );
}

export default App;
