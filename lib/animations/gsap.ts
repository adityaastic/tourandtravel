export const heroTextAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
};

export const scrollReveal = {
  initial: { y: 50, opacity: 0 },
  whileInView: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
  viewport: { once: true, margin: "-100px" },
};

export const parallaxConfig = {
  y: [100, -100],
  ease: "none",
};

export const floatAnimation = {
  y: ["-10px", "10px"],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

export const counterAnimation = {
  from: 0,
  duration: 2,
  ease: "power2.out",
};

export const magneticButton = {
  x: 0,
  y: 0,
  scale: 1,
  transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
};

export const shimmerAnimation = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: { duration: 2, repeat: Infinity, ease: "linear" },
};

export const stickyNavbar = {
  initial: { y: -100 },
  animate: { y: 0 },
  transition: { duration: 0.3, ease: "power2.out" },
};
