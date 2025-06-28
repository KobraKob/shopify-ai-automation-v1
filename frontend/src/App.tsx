import { useState, useEffect } from 'react';

function App() {
  const [productDesc, setProductDesc] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [baseKeywords, setBaseKeywords] = useState('');
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'result'>('form');

  useEffect(() => {
    if (result) {
      setActiveTab('result');
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_description: productDesc,
          additional_details: additionalDetails,
          base_keywords: baseKeywords,
          upload
        })
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductDesc('');
    setAdditionalDetails('');
    setBaseKeywords('');
    setUpload(false);
    setResult(null);
    setError(null);
    setActiveTab('form');
  };

  return (
    <div className="app-content">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Create Listing
        </button>
        <button
          className={`tab-button ${activeTab === 'result' ? 'active' : ''}`}
          onClick={() => setActiveTab('result')}
          disabled={!result}
        >
          Results
        </button>
      </div>

      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-group floating-label">
            <textarea
              id="productDesc"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              className="form-input"
              rows={4}
              placeholder=" "
              required
            />
            <label htmlFor="productDesc">Product Description*</label>
            <div className="focus-border"></div>
          </div>

          <div className="form-group floating-label">
            <textarea
              id="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="form-input"
              rows={2}
              placeholder=" "
            />
            <label htmlFor="additionalDetails">Additional Details</label>
            <div className="focus-border"></div>
          </div>

          <div className="form-group floating-label">
            <input
              type="text"
              id="baseKeywords"
              value={baseKeywords}
              onChange={(e) => setBaseKeywords(e.target.value)}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="baseKeywords">Base Keywords* (comma separated)</label>
            <div className="focus-border"></div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={upload}
                onChange={(e) => setUpload(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Upload directly to Shopify</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              <>
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Generate Listing
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="result-container animate__animated animate__fadeIn">
          <div className="result-header">
            <h2>Your AI-Generated Listing</h2>
            <p className="result-subtitle">Here's your optimized product listing ready for Shopify</p>
          </div>

          <div className="result-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21M5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Product Title
            </h3>
            <div className="result-content">{result?.title || 'No title generated'}</div>
          </div>

          <div className="result-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Description
            </h3>
            <div className="result-content description-content">
              {result?.description || 'No description generated'}
            </div>
          </div>

          <div className="result-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7H7.01M7 3H12C12.5119 3 13.0237 3.19525 13.4142 3.58579L20.4142 10.5858C21.1953 11.3668 21.1953 12.6332 20.4142 13.4142L13.4142 20.4142C12.6332 21.1953 11.3668 21.1953 10.5858 20.4142L3.58579 13.4142C3.19526 13.0237 3 12.5119 3 12V7C3 4.79086 4.79086 3 7 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tags
            </h3>
            <div className="tags-container">
              {Array.isArray(result?.tags) 
                ? result.tags.map((tag: string, index: number) => (
                    <span key={index} className="tag">{tag}</span>
                  ))
                : <span className="tag">{result?.tags || 'No tags generated'}</span>}
            </div>
          </div>

          <div className="result-actions">
            <button className="action-button secondary" onClick={resetForm}>
              Create Another
            </button>
            {upload ? (
              <button className="action-button success" disabled>
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Uploaded to Shopify
              </button>
            ) : (
              <button className="action-button primary">
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V3M12 15L8 11M12 15L16 11M21 15H16V20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20V15H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Upload to Shopify
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="error-message animate__animated animate__fadeIn">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="error-content">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
          <button className="error-close" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;