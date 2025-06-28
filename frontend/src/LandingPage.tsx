import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h1>Ellie</h1>
        </div>
        <Link to="/generator" className="cta-button">
          Get Started
        </Link>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2>Transform Products into High-Converting Listings</h2>
            <p className="subtitle">
              AI-powered Shopify listings that boost conversions and save you hours of work
            </p>
            <Link to="/generator" className="cta-button primary">
              Generate Your First Listing
            </Link>
          </div>
          <div className="hero-graphic">
            <div className="product-card-animation">
              {/* Animated product card SVG */}
              <svg viewBox="0 0 400 300" className="product-animation">
  {/* Product image */}
  <image
    href="https://images.pexels.com/photos/1311590/pexels-photo-1311590.jpeg"
    x="50"
    y="30"
    width="300"
    height="180"
    preserveAspectRatio="xMidYMid slice"
    clipPath="url(#clip)"
  />

  {/* Optional rounded corners for image */}
  <defs>
    <clipPath id="clip">
      <rect x="50" y="30" width="300" height="180" rx="10" ry="10" />
    </clipPath>
  </defs>

  {/* Product Title */}
  <text x="50" y="230" fontSize="16" fill="#2d3436" fontWeight="bold">
    Awesome T-shirt
  </text>

  {/* Price */}
  <text x="260" y="230" fontSize="16" fill="#00cec9" fontWeight="bold">
    ₹999
  </text>
</svg>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h3>Why Use Our AI Listing Generator?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#6c5ce7" strokeWidth="2"/>
                </svg>
              </div>
              <h4>SEO-Optimized</h4>
              <p>Automatically includes high-ranking keywords to boost your search visibility</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00cec9" strokeWidth="2"/>
                  <path d="M12 8V12L16 14" stroke="#00cec9" strokeWidth="2"/>
                </svg>
              </div>
              <h4>Time-Saving</h4>
              <p>Generate complete listings in seconds instead of hours</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 12H18M6 12H2M12 6V2M12 22V18" stroke="#a29bfe" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="#a29bfe" strokeWidth="2"/>
                </svg>
              </div>
              <h4>Conversion Focused</h4>
              <p>Persuasive product descriptions that turn browsers into buyers</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h3>How It Works</h3>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Describe Your Product</h4>
                <p>Provide basic details about what you're selling</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>AI Magic Happens</h4>
                <p>Our system analyzes and creates the perfect listing</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Publish to Shopify</h4>
                <p>One-click upload to your Shopify store</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h3>Ready to Transform Your Listings?</h3>
          <p>Join hundreds of Shopify merchants boosting their sales with AI</p>
          <Link to="/generator" className="cta-button primary large">
            Start Generating Now
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Ellie (E.L.I. – Ecommerce Listing Intelligence). All rights reserved.</p>
        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Contact Us</Link>
        </div>
        
      </footer>
    </div>
  )
}