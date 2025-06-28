import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './LandingPage.tsx'
import App from './App.tsx';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/generator',
    element: <App />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


// Initialize particles.js after the component mounts
document.addEventListener('DOMContentLoaded', () => {
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#6c5ce7"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6c5ce7",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
});