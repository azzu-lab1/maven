import React, { useRef, useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styles from './ContactUs.module.css';
import miartzLogo from '../../images/miartzlogo.jpg';
import { X } from 'lucide-react'; // Import X icon for closing map

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_agt7eey";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_etn5g7i";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "j1Kh5vBpCbS1i7JgD";

// Google Maps Embed URL using the address query
const MAP_EMBED_URL = "https://www.google.com/maps?q=Richera+Ventures+Private+Limited,1st+Floor,Sastri+Mansion,19th+Main+Rd,Rajajinagar,Bengaluru&output=embed";
// Direct link for opening in new tab (from your share link)
const MAP_EXTERNAL_LINK = "https://maps.app.goo.gl/EH6VTmW23VXBi3et9";


const ContactUs = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [showMap, setShowMap] = useState(false); // State for map visibility

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = new Date().toString();
    form.current.appendChild(timeInput);

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current)
      .then(
        () => {
          console.log('SUCCESS!');
          setSubmitStatus('success');
          form.current.reset();
          if (form.current.contains(timeInput)) {
            form.current.removeChild(timeInput);
          }
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSubmitStatus('error');
          if (form.current.contains(timeInput)) {
             form.current.removeChild(timeInput);
          }
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Toggle map visibility
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <section id="contactus" className={styles.contactSection}>
      <div className={styles.container}>
        {/* Enquiry Form Column */}
        <div className={styles.formColumn}>
          <h2 className={styles.title}>Enquire Now</h2>
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            {/* Input fields... (same as before) */}
             <div className={styles.inputGroup}>
               <label htmlFor="name" className={styles.label}>Name</label>
               <input type="text" id="name" name="name" className={styles.input} required />
             </div>
             <div className={styles.inputGroup}>
               <label htmlFor="email" className={styles.label}>Email</label>
               <input type="email" id="email" name="email" className={styles.input} required />
             </div>
             <div className={styles.inputGroup}>
               <label htmlFor="phone" className={styles.label}>Phone</label>
               <input type="tel" id="phone" name="phone" className={styles.input} required />
             </div>
             <div className={styles.inputGroup}>
               <label htmlFor="requirement" className={styles.label}>Please mention your requirement briefly</label>
               <textarea id="requirement" name="requirement" className={styles.textarea}></textarea>
             </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {/* Submit button SVG and text... (same as before) */}
               <div className={styles.svgWrapper1}>
                 <div className={styles.svgWrapper}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                     <path fill="none" d="M0 0h24v24H0z"></path>
                     <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                   </svg>
                 </div>
               </div>
               <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
            </button>
            {submitStatus === 'success' && <p style={{ color: 'green', marginTop: '1rem' }}>Message sent successfully!</p>}
            {submitStatus === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>Failed to send message. Please try again.</p>}
          </form>
        </div>

        {/* Address & Details Column */}
        <div className={styles.detailsColumn}>
          <div className={styles.logoContainer}>
            <img src={miartzLogo} alt="MIARTZ Logo" className={styles.companyLogo} />
          </div>
          <div className={styles.address}>
            {/* Address details... (same as before) */}
             <div>
               <span>1st Floor, Sastri Mansion, 371/67, 19th Main Rd, 1st Block, 2nd Block</span>
               <span>Rajajinagar</span>
               <span>Bengaluru - 560010</span>
             </div>
          </div>

          {/* Map Button Area */}
          <div className={styles.mapBtnContainer}>
             <svg height="0" width="0"> {/* SVG filter... (same as before) */}
               <filter id="land">
                 <feTurbulence result="turb" numOctaves="7" baseFrequency="0.006" type="fractalNoise"></feTurbulence>
                 <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale="700" in="SourceGraphic" in2="turb"></feDisplacementMap>
               </filter>
             </svg>
             <div className={styles.mapBtnWrapper}>
                {/* --- UPDATED BUTTON --- */}
                <button type="button" onClick={toggleMap} className={styles.mapBtn}>
                  {showMap ? 'Hide Map' : 'View on Map'} {/* Change text based on state */}
                </button>
                {/* --- END UPDATE --- */}
                <div className={styles.pinpoint}></div>
                <div className={styles.mapContainer}> {/* Animated map folds... (same as before) */}
                  <div className={`${styles.map} ${styles.fold1}`}></div>
                  <div className={`${styles.map} ${styles.fold2}`}></div>
                  <div className={`${styles.map} ${styles.fold3}`}></div>
                  <div className={`${styles.map} ${styles.fold4}`}></div>
                </div>
             </div>
          </div>

          {/* --- Conditionally Rendered Map Iframe --- */}
          {showMap && (
            <div className={styles.mapEmbedContainer}>
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="300" // Adjust height as needed
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
              {/* Optional: Add button/link to open externally */}
               <a href={MAP_EXTERNAL_LINK} target="_blank" rel="noopener noreferrer" className={styles.openMapExternallyButton}>
                 Open in Google Maps
               </a>
              <button onClick={toggleMap} className={styles.closeMapButton} aria-label="Close map">
                <X size={18} />
              </button>
            </div>
          )}
          {/* --- End Map Iframe --- */}


          {/* Contact Info */}
          <div className={styles.contactInfo}>
            {/* Contact details... (same as before) */}
             <p>miartz@gmail.com</p>
             <p>+91 9380542011</p>
          </div>
          {/* Social Icons */}
          <div className={styles.socialIcons}>
            {/* Social links... (same as before) */}
             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;