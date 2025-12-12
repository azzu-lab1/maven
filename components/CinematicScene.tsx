import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingImage {
  src: string;
  alt: string;
  position: { x: number; y: number };
  size: number;
  depth: number;
}

interface CinematicSceneProps {
  images: FloatingImage[];
  focusImage: string;
  focusAlt: string;
  sceneIndex: number;
  title?: string;
  description?: string;
}

export function CinematicScene({
  images,
  focusImage,
  focusAlt,
  sceneIndex,
  title,
  description,
}: CinematicSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom effect - starts zoomed out, zooms in at middle, then zooms out
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.8, 1.2, 1.5, 1.2, 0.8]
  );

  // Focus image scale - zooms in more dramatically
  const focusScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.5, 1, 1.8, 1, 0.5]
  );

  // Opacity for fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  );

  // Focus opacity - stronger presence
  const focusOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.3, 1, 0.3, 0]
  );

  return (
    <div
      ref={ref}
      className="relative h-[200vh] flex items-center justify-center overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background floating images with parallax */}
        {images.map((img, idx) => {
          const parallaxY = useTransform(
            scrollYProgress,
            [0, 1],
            [100 * img.depth, -100 * img.depth]
          );
          const parallaxX = useTransform(
            scrollYProgress,
            [0, 1],
            [50 * (img.depth - 0.5), -50 * (img.depth - 0.5)]
          );

          return (
            <motion.div
              key={`scene-${sceneIndex}-img-${idx}`}
              style={{
                x: parallaxX,
                y: parallaxY,
                opacity,
                scale,
              }}
              className="absolute"
              initial={{ opacity: 0 }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="rounded-2xl shadow-2xl object-cover"
                style={{
                  width: `${img.size}px`,
                  height: `${img.size}px`,
                  left: `${img.position.x}vw`,
                  top: `${img.position.y}vh`,
                }}
              />
            </motion.div>
          );
        })}

        {/* Main focus image */}
        <motion.div
          style={{
            scale: focusScale,
            opacity: focusOpacity,
          }}
          className="absolute z-10 flex flex-col items-center justify-center"
        >
          <motion.img
            src={focusImage}
            alt={focusAlt}
            className="rounded-3xl shadow-2xl max-w-2xl w-full object-cover"
            style={{
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
          {title && (
            <motion.div
              className="absolute -bottom-20 text-center"
              style={{ opacity: focusOpacity }}
            >
              <h2 className="text-white drop-shadow-2xl mb-2">{title}</h2>
              {description && (
                <p className="text-white/80 drop-shadow-lg">{description}</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Atmospheric overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none"
          style={{ opacity }}
        />
      </div>
    </div>
  );
}
