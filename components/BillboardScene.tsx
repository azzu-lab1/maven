import { motion } from "framer-motion";
import billboardIntro from "../assets/Video_Generation_Billboard_Intro.mp4";

interface BillboardSceneProps {
  isCurrentFocus: boolean;
  isRelatedToScene: boolean;
}

export function BillboardScene({ isCurrentFocus, isRelatedToScene }: BillboardSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Foggy cityscape background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2dneSUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjA2OTUzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Foggy cityscape at night"
          className="w-full h-full object-cover rounded-3xl"
        />
        
        {/* Cinematic fog overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/20 to-black/40 rounded-3xl" />
        
        {/* Fog layers */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(100, 120, 150, 0.3) 0%, rgba(60, 80, 100, 0.4) 50%, rgba(30, 40, 50, 0.5) 100%)",
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Atmospheric particles (dust/mist) */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`fog-particle-${i}`}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(20px)",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Billboard structure */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {/* Billboard frame with neon glow */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: "75%",
            height: "65%",
            background: "linear-gradient(135deg, rgba(20, 20, 30, 0.9), rgba(10, 10, 20, 0.95))",
            border: "2px solid rgba(100, 150, 255, 0.3)",
          }}
          animate={{
            boxShadow: isCurrentFocus 
              ? [
                  "0 0 60px rgba(100, 150, 255, 0.4), 0 0 120px rgba(150, 200, 255, 0.2), inset 0 0 60px rgba(100, 150, 255, 0.1)",
                  "0 0 100px rgba(100, 150, 255, 0.6), 0 0 200px rgba(150, 200, 255, 0.3), inset 0 0 80px rgba(100, 150, 255, 0.15)",
                  "0 0 60px rgba(100, 150, 255, 0.4), 0 0 120px rgba(150, 200, 255, 0.2), inset 0 0 60px rgba(100, 150, 255, 0.1)",
                ]
              : "0 0 40px rgba(100, 150, 255, 0.3), 0 0 80px rgba(150, 200, 255, 0.15)",
          }}
          transition={{
            duration: 3,
            repeat: isCurrentFocus ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {/* Billboard screen glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
          
          {/* Billboard content container */}
          <div className="relative w-full h-full flex items-center justify-center p-12">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isCurrentFocus ? [0.8, 1, 1.02, 1] : 0.95,
                opacity: isCurrentFocus ? 1 : 0.7,
              }}
              transition={{
                duration: isCurrentFocus ? 2 : 1.5,
                ease: "easeOut",
                times: [0, 0.5, 0.8, 1],
              }}
            >
              {/* Screen glow backdrop */}
              <motion.div
                className="absolute inset-0 -z-10"
                style={{
                  filter: "blur(40px)",
                }}
                animate={{
                  background: isCurrentFocus 
                    ? [
                        "radial-gradient(circle, rgba(100, 150, 255, 0.4), transparent 70%)",
                        "radial-gradient(circle, rgba(150, 100, 255, 0.5), transparent 70%)",
                        "radial-gradient(circle, rgba(100, 150, 255, 0.4), transparent 70%)",
                      ]
                    : "radial-gradient(circle, rgba(100, 150, 255, 0.2), transparent 70%)",
                }}
                transition={{
                  duration: 4,
                  repeat: isCurrentFocus ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
              
              {/* Intro Video */}
              <motion.video
                className="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                style={{
                  filter: isCurrentFocus
                    ? "drop-shadow(0 0 30px rgba(150, 200, 255, 0.6))"
                    : "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                }}
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={billboardIntro} type="video/mp4" />
              </motion.video>
            </motion.div>
          </div>
          
          {/* Neon border glow animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "linear-gradient(45deg, transparent 40%, rgba(100, 150, 255, 0.2) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: isCurrentFocus ? ["0% 0%", "100% 100%", "0% 0%"] : "0% 0%",
            }}
            transition={{
              duration: 6,
              repeat: isCurrentFocus ? Infinity : 0,
              ease: "linear",
            }}
          />
        </motion.div>
        
        {/* Billboard support structure (poles) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-24 bg-gradient-to-b from-gray-700 to-gray-900 opacity-40" />
      </div>
      
      {/* Volumetric light rays from billboard */}
      {isCurrentFocus && (
        <>
          {/* Main spotlight cone */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(100, 150, 255, 0.15) 30deg, transparent 60deg, rgba(150, 100, 255, 0.12) 90deg, transparent 120deg, rgba(100, 150, 255, 0.15) 150deg, transparent 180deg)",
                filter: "blur(40px)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          
          {/* Radial light burst */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(100, 150, 255, 0.2), transparent 60%)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* Ambient city lights in background */}
      {isRelatedToScene && [...Array(20)].map((_, i) => (
        <motion.div
          key={`city-light-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: `rgba(${150 + Math.random() * 100}, ${100 + Math.random() * 100}, 255, ${0.3 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating light particles in front */}
      {isCurrentFocus && [...Array(12)].map((_, i) => (
        <motion.div
          key={`light-particle-${i}`}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
