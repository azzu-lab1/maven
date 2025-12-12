// import React, { useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
// import styles from './Hero.module.css'; //

// // Import images
// import pianoImage from '../../images/piano-glow.jpg'; //
// import micImage from '../../images/mic-glow.jpg'; //
// import cameraImage from '../../images/camera-glow.png.jpg'; //
// import dancerImage from '../../images/dancing-figure-glow.png'; //
// import dancerImage2 from '../../images/dancing-figure-glow2.png'; //
// import directorChairImage from '../../images/director-chair-glow.png'; //
// import guitarImage from '../../images/guitar-glow.jpg'; //


// const Hero = () => {
//   // Scope scroll
//   const heroRef = useRef(null); //
//   const shouldReduceMotion = useReducedMotion(); //
//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] }); //

//   // Parallax transforms
//   const yBg = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "50%"]); //
//   const yGrid = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "25%"]); //
//   const yPiano = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-40%"]); //
//   const yMic = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "30%"]); //
//   const yCamera = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-60%"]); //
//   const yDancer = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-20%"]); //
//   const yDancer2 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "25%"]); //
//   const yChair = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "50%"]); //
//   const yGuitar = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "35%"]); //


//   // Mouse movement
//   const mouseX = useMotionValue(0); //
//   const mouseY = useMotionValue(0); //
//   const mouseXSpring = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 1.2 }); //
//   const mouseYSpring = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 1.2 }); //

//   useEffect(() => { //
//     if (shouldReduceMotion) return;
//     const handleMouseMove = (e) => {
//       mouseX.set(e.clientX - window.innerWidth / 2); //
//       mouseY.set(e.clientY - window.innerHeight / 2); //
//     };
//     window.addEventListener('mousemove', handleMouseMove, { passive: true }); //
//     return () => window.removeEventListener('mousemove', handleMouseMove); //
//   }, [mouseX, mouseY, shouldReduceMotion]);

//   const baseMouseX = shouldReduceMotion ? useMotionValue(0) : mouseXSpring; //
//   const baseMouseY = shouldReduceMotion ? useMotionValue(0) : mouseYSpring; //

//   // Mouse parallax transforms
//   const pPianoX = useTransform(baseMouseX, (v) => v * 0.015); //
//   const pPianoY = useTransform(baseMouseY, (v) => v * 0.015); //
//   const pMicX = useTransform(baseMouseX, (v) => v * -0.02); //
//   const pMicY = useTransform(baseMouseY, (v) => v * -0.02); //
//   const pCameraX = useTransform(baseMouseX, (v) => v * 0.025); //
//   const pCameraY = useTransform(baseMouseY, (v) => v * 0.025); //
//   const pDancerX = useTransform(baseMouseX, (v) => v * -0.01); //
//   const pDancerY = useTransform(baseMouseY, (v) => v * -0.01); //
//   const pDancer2X = useTransform(baseMouseX, (v) => v * 0.018); //
//   const pDancer2Y = useTransform(baseMouseY, (v) => v * 0.018); //
//   const pChairX = useTransform(baseMouseX, (v) => v * 0.012); //
//   const pChairY = useTransform(baseMouseY, (v) => v * 0.012); //
//   const pGuitarX = useTransform(baseMouseX, (v) => v * -0.015); //
//   const pGuitarY = useTransform(baseMouseY, (v) => v * -0.015); //

//   const smoothTransition = { type: "spring", stiffness: 40, damping: 20 }; //

//   // Initial load animation helper
//   const initialLoadAnimation = (delay, xStart = 0, yStart = 0) => ({ //
//     initial: { opacity: 0, scale: 0.8, x: xStart, y: yStart },
//     animate: { opacity: 1, scale: 1, x: 0, y: 0 },
//     transition: {
//       type: "tween",
//       ease: [0.25, 1, 0.5, 1],
//       duration: 3.5,
//       delay: 1 + delay
//     }
//   });

//   const maybeInitial = (delay, xStart = 0, yStart = 0) => (shouldReduceMotion ? {} : initialLoadAnimation(delay, xStart, yStart)); //

//   // Navigation helper
//   const navigate = (destination) => { //
//     window.dispatchEvent(new CustomEvent('talentz:navigate', { detail: { to: destination } })); //
//   };

//   return (
//     <div ref={heroRef} className={styles.hero}> {/* Ensure position: relative is set by CSS */} {/* */}
//       <motion.div style={{ y: yBg }} className={styles.heroBackground} /> {/* */}
//       <motion.div style={{ y: yGrid }} className={styles.heroGrid} /> {/* */}

//       {/* Parallax Images */}
//       <motion.div style={{ y: yPiano }} className={`${styles.parallaxWrapper} ${styles.wrapperPiano}`} {...maybeInitial(0.6, -50, 30)}> {/* */}
//         {/* --- FIX: Changed fetchPriority to fetchpriority --- */}
//         <motion.img src={pianoImage} alt="Piano" loading="eager" decoding="async" fetchpriority="high" style={{ x: pPianoX, y: pPianoY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yMic }} className={`${styles.parallaxWrapper} ${styles.wrapperMic}`} {...maybeInitial(1.4, 40, -20)}> {/* */}
//         <motion.img src={micImage} alt="Microphone" loading="lazy" decoding="async" style={{ x: pMicX, y: pMicY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yCamera }} className={`${styles.parallaxWrapper} ${styles.wrapperCamera}`} {...maybeInitial(0.4, 50, -30)}> {/* */}
//         <motion.img src={cameraImage} alt="Camera" loading="lazy" decoding="async" style={{ x: pCameraX, y: pCameraY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yDancer }} className={`${styles.parallaxWrapper} ${styles.wrapperDancer}`} {...maybeInitial(1.0, -40, 20)}> {/* */}
//         <motion.img src={dancerImage} alt="Dancer" loading="lazy" decoding="async" style={{ x: pDancerX, y: pDancerY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yDancer2 }} className={`${styles.parallaxWrapper} ${styles.wrapperDancer2}`} {...maybeInitial(0.2, -60, -20)}> {/* */}
//         <motion.img src={dancerImage2} alt="Dancer 2" loading="lazy" decoding="async" style={{ x: pDancer2X, y: pDancer2Y }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yChair }} className={`${styles.parallaxWrapper} ${styles.wrapperChair}`} {...maybeInitial(1.2, 30, 30)}> {/* */}
//         <motion.img src={directorChairImage} alt="Director Chair" loading="lazy" decoding="async" style={{ x: pChairX, y: pChairY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>
//       <motion.div style={{ y: yGuitar }} className={`${styles.parallaxWrapper} ${styles.wrapperGuitar}`} {...maybeInitial(0.8, 60, 20)}> {/* */}
//         <motion.img src={guitarImage} alt="Guitar" loading="lazy" decoding="async" style={{ x: pGuitarX, y: pGuitarY }} className={styles.parallaxImage} transition={smoothTransition} /> {/* */}
//       </motion.div>

//       <div className={styles.overlay}></div> {/* */}
//       <div className={styles.content}> {/* */}
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 50, delay: 0.1 }}
//           className={styles.title}
//         > {/* */}
//           Showcase Your <span className={styles.glowText}>Talent.</span> <br /> {/* */}
//           Connect with Opportunity.{/* */}
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.9 }}
//           className={styles.subtitle}
//         > {/* */}
//           Talentz gives every artist – beginner or pro – the power to be seen and appreciated.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className={styles.buttonGroup}
//         > {/* */}
//           {/* Ensure onClick navigates to 'App1' */}
//           <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('App1')}> {/* */}
//              Get Started
//           </button>
//            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => navigate('features')}> {/* */}
//              Explore
//            </button>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default Hero;