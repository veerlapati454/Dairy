import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/stackly_logo.webp"

/* ---------------------------------------------------------
   Header — fixed transparent nav bar that sits on top of
   the hero image. Manages its own mobile-menu state.

   LOGO: swap the src below for your own logo file.
   Recommended size: roughly 140x40px (or similar aspect).
--------------------------------------------------------- */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pasture", path: "/pasture" },
    { name: "Dairy Case", path: "/dairy-case" },
    { name: "Craft", path: "/craft" },
    { name: "Standards", path: "/standards" },
    { name: "Join", path: "/login" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="site-header">
        <div 
          className="logo-slot" 
          onClick={() => handleNavigation("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Logo placeholder — replace with your own"
          />
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                className="nav-link-btn"
                onClick={() => handleNavigation(link.path)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                className="mobile-nav-btn"
                onClick={() => handleNavigation(link.path)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}