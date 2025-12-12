// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
// --- NEW: Import Dropdown and LogOut icon ---
import { Menu, X, Home, Image, Phone, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '../ui/dropdown-menu'; // Make sure this path is correct
// ---
import { throttle } from 'lodash';
import styles from './Navbar.module.css';
import logo from '../../images/miartzlogo.jpg';
import Sidebar from '../Sidebar/Sidebar.jsx';

const menuItems = [
  {
    label: 'Home',
    href: '#home',
    icon: <Home size={20} />,
    onClick: () => {
        window.dispatchEvent(new CustomEvent('talentz:navigate', { detail: { to: '#home' } }));
    }
  },
  { label: 'Gallery', href: '#gallery', icon: <Image size={20} /> },
  { label: 'Contact Us', href: '#contactus', icon: <Phone size={20} /> },
];

// Utility
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

// Hook
const useNavigate = () => {
    return (destination) => {
        window.dispatchEvent(new CustomEvent('talentz:navigate', { detail: { to: destination } }));
    };
};

// --- NEW: Accept login props ---
const Navbar = ({ onSignUpClick, isLoggedIn, username, onLogout }) => {
  const [isSidebarMode, setIsSidebarMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const route = window.location.hash || '#home'; 

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsSidebarMode(window.scrollY > scrollThreshold);
    };
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', throttledHandleScroll);
        throttledHandleScroll.cancel(); 
    };
  }, []); 

  // Toggle
  const toggleMenu = () => setIsOpen(!isOpen);

  // Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Click handler
  const handleHeaderItemClick = (item) => {
     if (item.onClick) {
       item.onClick();
     } else if (item.href) {
       navigate(item.href);
     }
  };

  // Styles
  const animationDuration = 0.8;
  const buttonColor = '#8B5CF6';
  const textColor = '#F5F5F5';
  const buttonSize = 'md';
  const zIndex = 1000;

  const buttonSizes = { sm: styles.buttonSm, md: styles.buttonMd, lg: styles.buttonLg };
  const buttonRef = useRef(null);


  return (
    <>
      <nav
        ref={navbarRef}
        className={cn(
          styles.navbar,
          isSidebarMode ? styles.navbarSidebarMode : styles.navbarHeaderMode
        )}
        style={{ '--animation-duration': `${animationDuration}s`, zIndex: zIndex }}
      >
        {/* Header Content */}
        <div className={cn(styles.headerContent, isSidebarMode && styles.hidden)}>
          <div className={styles.logo}>
            <img
              src={logo}
              alt="MiArtz Logo"
              className={styles.logoImage}
              onClick={() => handleHeaderItemClick({ href: '#home' })} 
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles.navRightGroup}>
            <div className={styles.navLinks}>
              {menuItems.map(item => (
                <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleHeaderItemClick(item); }}>
                  {item.label}
                </a>
              ))}
            </div>
           
            {/* --- NEW: Conditional Rendering for Login --- */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={styles.usernameButton}>
                    {username}
                  </button>
                </DropdownMenuTrigger>
                {/* Add z-[1001] to ensure dropdown is above the navbar (z-1000) */}
                {/* Add align="end" to align the dropdown to the right */}
                <DropdownMenuContent 
                  className={styles.dropdownContent} // Use class for z-index/margin
                  align="end"
                >
                  <DropdownMenuItem 
                    className={styles.logoutItem} 
                    onClick={onLogout}
                    onSelect={(e) => e.preventDefault()} // Prevents premature close
                  >
                    {/* --- UPDATED ICON SIZE --- */}
                    <LogOut size={18} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button className={styles.signUpButton} onClick={onSignUpClick}>Sign Up</button>
            )}
            {/* --- END NEW --- */}

          </div>
          {/* Hamburger for header mode */}
           <button
             ref={buttonRef} 
             className={cn(
               styles.hamburgerButton,
               buttonSizes[buttonSize],
               styles.hamburgerButtonHeader 
             )}
             style={{ backgroundColor: buttonColor, zIndex: zIndex + 1 }}
             onClick={toggleMenu}
             aria-label="Toggle navigation menu"
             aria-expanded={isOpen}
           >
              <div className={styles.iconContainer}>
                 <Menu className={cn(styles.iconBase, isOpen ? styles.iconHidden : styles.iconVisible)} color={textColor} />
                 <X className={cn(styles.iconBase, isOpen ? styles.iconVisible : styles.iconHidden)} color={textColor} />
             </div>
           </button>
        </div>

        {/* Hamburger (sidebar mode) */}
        {isSidebarMode && (
          <button
            ref={buttonRef} 
            className={cn(
              styles.hamburgerButton,
              buttonSizes[buttonSize],
              styles.hamburgerButtonSidebar 
            )}
            style={{ backgroundColor: buttonColor, zIndex: zIndex + 1 }}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
              <div className={styles.iconContainer}>
                 <Menu className={cn(styles.iconBase, isOpen ? styles.iconHidden : styles.iconVisible)} color={textColor} />
                 <X className={cn(styles.iconBase, isOpen ? styles.iconVisible : styles.iconHidden)} color={textColor} />
             </div>
          </button>
        )}
      </nav>

      {/* --- Sidebar Component (Pass props) --- */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuItems}
        zIndex={zIndex}
        logoSrc={logo}
        logoAlt="MiArtz Logo"
        
        // --- ADDED PROPS ---
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={() => {
          onLogout();
          setIsOpen(false); // Close sidebar after logout
        }}
        // ---
        
        onSignUpClick={() => {
            onSignUpClick(); 
            setIsOpen(false); 
        }}
      />
    </>
  );
};

export default Navbar;