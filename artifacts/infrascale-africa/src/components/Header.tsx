import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ============================================================
 * HEADER COMPONENT — Infrascale Africa Limited
 * ============================================================
 *
 * EASY CUSTOMIZATION GUIDE
 * ------------------------
 * Edit the constants below to control the look of the header.
 * No need to touch the JSX unless you want to add new links.
 * ============================================================ */

// === LOGO SETTINGS ==========================================
// File path of your logo (place file in `public/` folder)
const LOGO_SRC = "/logo.png";

// Logo display HEIGHT (Tailwind h-* classes)
//   h-8  = 32px   |   h-10 = 40px   |   h-12 = 48px
//   h-14 = 56px   |   h-16 = 64px   |   h-20 = 80px
// Format: "<mobile-size> lg:<desktop-size>"
const LOGO_HEIGHT_CLASS = "h-12 lg:h-16";

// Logo MAX width (so wide logos do not overflow)
//   max-w-[160px] | max-w-[200px] | max-w-[280px] | max-w-[360px]
const LOGO_MAX_WIDTH_CLASS = "max-w-[260px] lg:max-w-[360px]";

// Native pixel dimensions (for browser layout — set to roughly your logo's real ratio)
const LOGO_NATIVE_WIDTH = 360;
const LOGO_NATIVE_HEIGHT = 80;

// === HEADER BAR SETTINGS ====================================
// Vertical padding of the header bar (controls header height)
//   py-3 = small   |   py-5 = medium   |   py-6 = large   |   py-8 = extra
const HEADER_VERTICAL_PADDING = "py-4 lg:py-6";

// Horizontal padding (space between edges and content)
const HEADER_HORIZONTAL_PADDING = "px-6 lg:px-12";

// === NAV LINKS ==============================================
const navLinks = [
  { href: "#thesis", label: "The Thesis" },
  { href: "#divisions", label: "Services" },
  { href: "#scale", label: "Scale" },
  { href: "#projects", label: "Projects" },
];

/* ============================================================ */

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ============ HEADER BAR ============ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${HEADER_HORIZONTAL_PADDING} ${HEADER_VERTICAL_PADDING} flex items-center justify-between bg-background/10 backdrop-blur-md border-b border-white/5`}
      >
        {/* ---- LOGO ---- */}
        <a
          href="#"
          className="flex items-center shrink-0 hover:opacity-80 transition-opacity mr-4"
          aria-label="Infrascale Africa Limited"
        >
          <img
            src={LOGO_SRC}
            alt="Infrascale Africa Limited"
            width={LOGO_NATIVE_WIDTH}
            height={LOGO_NATIVE_HEIGHT}
            decoding="async"
            fetchPriority="high"
            className={`${LOGO_HEIGHT_CLASS} ${LOGO_MAX_WIDTH_CLASS} w-auto object-contain object-left`}
          />
        </a>

        {/* ---- DESKTOP NAV (lg breakpoint and above) ---- */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onContactClick}
            className="px-6 py-3 bg-white text-background hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Partner With Us
          </button>
        </div>

        {/* ---- MOBILE/TABLET HAMBURGER ---- */}
        <button
          className="lg:hidden text-white/80 hover:text-white transition-colors p-2"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* ============ MOBILE SLIDE-DOWN MENU ============ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/10 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="px-6 py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm text-center hover:bg-white hover:text-background transition-colors duration-300 mt-2"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
