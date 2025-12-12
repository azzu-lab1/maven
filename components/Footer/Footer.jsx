import React from 'react';
// Correct import assuming react-icons is installed
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; //
import styles from './Footer.module.css'; //

const Footer = () => {
  return (
    <footer className={styles.footer}> {/* */}
      <div className={styles.container}> {/* */}
        <div className={styles.socialIcons}> {/* */}
          {/* Replace # with actual links */}
          <a href="#" aria-label="Twitter"><FaTwitter /></a> {/* */}
          <a href="#" aria-label="Instagram"><FaInstagram /></a> {/* */}
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a> {/* */}
        </div>
        <p>&copy; {new Date().getFullYear()} MIARTZ. All Rights Reserved.</p> {/* Dynamically set year */} {/* */}
      </div>
    </footer>
  );
};

export default Footer;