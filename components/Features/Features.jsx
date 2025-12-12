import React from 'react';
import { motion } from 'framer-motion';
// New icons
import { FaMusic, FaPalette, FaVideo, FaCamera, FaPencilAlt } from "react-icons/fa";
import { IoIosBody } from "react-icons/io";
import styles from './Features.module.css';

// 1. Import images
import musicImg from '../../images/piano-glow.jpg';
import danceImg from '../../images/dancing-figure-glow.png';
import artImg from '../../images/digital art.jpg';
import filmImg from '../../images/film & acting.png';
// Add new images
import photoImg from '../../images/camera-glow.png.jpg'; // UPDATE PATH
import writingImg from '../../images/script.jpg'; // UPDATE PATH

// 2. Add data
const featuresData = [
  {
    icon: <FaMusic />,
    imgUrl: musicImg,
    title: "Music",
    description: "From singers to producers, find your rhythm and collaborators."
  },
  {
    icon: <IoIosBody />,
    imgUrl: danceImg,
    title: "Dance",
    description: "Showcase your choreography, join a troupe, or find your next gig."
  },
  {
    icon: <FaPalette />,
    imgUrl: artImg,
    title: "Digital Art",
    description: "A gallery for illustrators, animators, and designers to shine."
  },
  {
    icon: <FaVideo />,
    imgUrl: filmImg,
    title: "Film & Acting",
    description: "Connect with directors, find auditions, and bring stories to life."
  },
  // New category
  {
    icon: <FaCamera />,
    imgUrl: photoImg,
    title: "Photography",
    description: "Capture moments, share your portfolio, and find clients."
  },
  // New category
  {
    icon: <FaPencilAlt />,
    imgUrl: writingImg,
    title: "Writing",
    description: "For poets, novelists, and screenwriters to share their work."
  }
];

const Features = () => {
  // Variants
   const cardVariants = {
    offscreen: { y: 60, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 15 } }
  };

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Explore Our <span className={styles.highlight}>Categories</span>
        </h2>
        <div className={styles.grid}>
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
              transition={{ delay: index * 0.15 }}
              className={styles.card}
              // Background
              style={{
                backgroundImage: `url(${feature.imgUrl})`
              }}
            >
              {/* Overlay */}
              <div className={styles.cardOverlay}>
                <div className={styles.icon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;