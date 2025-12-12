import React from 'react';
import { motion } from 'framer-motion';
import styles from './VisionMission.module.css';
import { Target, Lightbulb, Link2, Users, Rocket, Globe, Sparkles } from 'lucide-react'; // Icons

const VisionMission = () => {
  // Animation variants
  const sectionVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 40, damping: 15, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      className={styles.visionMissionSection}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        {/* Vision */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardIcon}><Target /></div>
          <h2 className={styles.title}>Our Vision</h2>
          <p className={styles.text}>
            To become the world’s most dynamic creative ecosystem — a global stage where every artist, innovator, and technologist can turn <span className={styles.highlight}>imagination into impact</span>.
          </p>
          <p className={styles.subText}>
            We envision a future where creativity transcends boundaries. By blending art with innovation, and creativity with technology, we aim to redefine how talent is discovered, celebrated, and connected in the digital age.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div className={styles.card} variants={itemVariants}>
           <div className={styles.cardIcon}><Rocket /></div>
          <h2 className={styles.title}>Our Mission</h2>
          <p className={styles.text}>
            To ignite the world’s creative spirit by building a platform where <span className={styles.highlight}>passion meets purpose</span> and innovation meets artistry.
          </p>
          <ul className={styles.missionList}>
            <motion.li variants={itemVariants}><Sparkles size={16}/> Empowering creators with advanced digital tools.</motion.li>
            <motion.li variants={itemVariants}><Users size={16}/> Building global connections for collaboration.</motion.li>
            <motion.li variants={itemVariants}><Lightbulb size={16}/> Driving innovation through cross-disciplinary partnerships.</motion.li>
            <motion.li variants={itemVariants}><Globe size={16}/> Championing cultural diversity and expression.</motion.li>
            <motion.li variants={itemVariants}><Link2 size={16}/> Inspiring future generations to create boldly.</motion.li>
          </ul>
        </motion.div>
      </div>
      {/* Decorative background elements */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>
    </motion.section>
  );
};

export default VisionMission;