"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  type FC,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register any GSAP plugins if needed
if (typeof window !== "undefined") {
  // No plugins needed for now
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface EnhancedTextProps {
  texts: string[];
  // Rotation configuration
  rotationInterval?: number;
  loop?: boolean;
  auto?: boolean;
  onNext?: (index: number) => void;
  // Highlight configuration
  highlightBorderColor?: string;
  highlightGlowColor?: string;
  highlightPadding?: number;
  cornerSize?: number;
  // Animation configuration
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  // Style classNames
  className?: string;
  textClassName?: string;
  highlightClassName?: string;
}

interface SplitTextInstance {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

const EnhancedText: FC<EnhancedTextProps> = forwardRef<HTMLDivElement, EnhancedTextProps>((props, ref) => {
  // Destructure all props with defaults
  const {
    texts,
    // Rotation config
    rotationInterval = 2000,
    loop = true,
    auto = true,
    onNext,
    // Highlight config
    highlightBorderColor = "#facc15",
    highlightGlowColor = "rgba(250, 204, 21, 0.6)",
    highlightPadding = 10,
    cornerSize = 16,
    // Animation config
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-100%", opacity: 0 },
    // Style classNames
    className,
    textClassName,
    highlightClassName,
    ...rest
  } = props;

  // State management
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [highlightWidth, setHighlightWidth] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(0);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const animationInProgress = useRef(false);
  const mainAnimationTimeline = useRef<gsap.core.Timeline | null>(null);

  // Calculate animation duration from framer-motion transition
  const getAnimationDuration = useCallback(() => {
    // Default duration if we can't determine from transition
    let duration = 0.5;
    
    if (typeof transition === 'object') {
      if (transition.duration) {
        duration = transition.duration;
      } else if (transition.type === 'spring') {
        // Approximate spring duration based on damping and stiffness
        const damping = transition.damping || 10;
        const stiffness = transition.stiffness || 100;
        // This is a rough approximation
        duration = 1000 / Math.sqrt(stiffness) * (damping / 10);
        // Convert to seconds and ensure reasonable bounds
        duration = Math.min(Math.max(duration, 0.3), 1.5);
      }
    }
    
    // Make corner animations faster by reducing duration
    return duration * 0.6; // 40% faster than text animation
  }, [transition]);

  // Handle text change
  const handleTextChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  // Auto rotation logic
  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleTextChange(nextIndex);
      }
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [auto, currentTextIndex, texts.length, loop, rotationInterval, handleTextChange]);

  // Measure text dimensions after render
  useLayoutEffect(() => {
    if (!textRefs.current[currentTextIndex]) return;
    
    const textElement = textRefs.current[currentTextIndex];
    if (textElement) {
      // Force a reflow to get accurate dimensions
      const width = textElement.offsetWidth;
      const height = textElement.offsetHeight;
      
      setTextDimensions({ width, height });
    }
  }, [currentTextIndex, texts]);

  // Create and manage the main animation timeline
  useEffect(() => {
    // Create a new timeline for this text transition
    mainAnimationTimeline.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        animationInProgress.current = false;
      }
    });
    
    return () => {
      // Clean up timeline on unmount or when dependency changes
      if (mainAnimationTimeline.current) {
        mainAnimationTimeline.current.kill();
        mainAnimationTimeline.current = null;
      }
    };
  }, [currentTextIndex]);

  // Update highlight position and size
  const updateHighlightPosition = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!textRefs.current[currentTextIndex] || !containerRef.current || animationInProgress.current) return;

    // Update the highlight position to match the current text
    const textElement = textRefs.current[currentTextIndex];
    if (textElement) {
      // Get accurate measurements
      const textRect = textElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate horizontal position and width
      const newWidth = textRect.width + (highlightPadding * 2);
      const newPosition = textRect.left - containerRect.left - highlightPadding;
      
      // Only animate if values have changed significantly
      if (Math.abs(newWidth - highlightWidth) > 1 || Math.abs(newPosition - highlightPosition) > 1) {
        animationInProgress.current = true;
        
        // Get animation duration from framer-motion transition
        const animDuration = getAnimationDuration();
        
        // Create a new timeline if needed
        if (!mainAnimationTimeline.current) {
          mainAnimationTimeline.current = gsap.timeline({
            paused: true,
            onComplete: () => {
              animationInProgress.current = false;
            }
          });
        } else {
          // Clear existing animations
          mainAnimationTimeline.current.clear();
        }
        
        // Animate the highlight container
        if (highlightRef.current) {
          mainAnimationTimeline.current.to(highlightRef.current, {
            width: newWidth,
            left: newPosition,
            duration: animDuration,
            ease: "power2.inOut",
            onComplete: () => {
              setHighlightWidth(newWidth);
              setHighlightPosition(newPosition);
            }
          }, 0);
        }
        
        // Animate the corner positions - all corners animate simultaneously
        const cornerElements = document.querySelectorAll('.highlight-corner');
        cornerElements.forEach((corner) => {
          const isRight = corner.classList.contains('right-corner');
          if (isRight) {
            mainAnimationTimeline.current?.to(corner, {
              left: newWidth - cornerSize,
              duration: animDuration,
              ease: "power2.inOut",
            }, 0);
          }
        });
        
        // Add subtle scale effect - make it faster
        mainAnimationTimeline.current.to('.highlight-corner', {
          scale: 1.1,
          duration: animDuration / 4, // Faster scale up
        }, 0);
        
        mainAnimationTimeline.current.to('.highlight-corner', {
          scale: 1,
          duration: animDuration / 4, // Faster scale down
        }, animDuration / 4);
        
        // Play the timeline
        mainAnimationTimeline.current.play();
      }
    }
  }, [currentTextIndex, highlightPadding, highlightWidth, highlightPosition, cornerSize, getAnimationDuration]);

  // GSAP animation for highlight
  useEffect(() => {
    updateHighlightPosition();
  }, [currentTextIndex, updateHighlightPosition, textDimensions]);

  // Also update on resize to ensure correct positioning
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleResize = () => {
      updateHighlightPosition();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial position
    updateHighlightPosition();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateHighlightPosition]);

  // Setup text refs
  const setTextRef = (el: HTMLDivElement | null, index: number) => {
    textRefs.current[index] = el;
  };

  useEffect(() => {
    if (!textRefs.current[currentTextIndex]) return;

    const splitText = new SplitText(textRefs.current[currentTextIndex], {
      type: 'chars,words,lines',
    }) as unknown as SplitTextInstance;

    gsap.fromTo(
      splitText.chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
      }
    );

    return () => {
      splitText.revert();
    };
  }, [currentTextIndex, texts]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={ref || containerRef} {...rest}>
      {/* Highlight corners */}
      <div 
        ref={highlightRef}
        className={cn(
          "absolute pointer-events-none",
          highlightClassName
        )}
        style={{
          position: "absolute",
          zIndex: 0,
          width: highlightWidth || "auto",
          left: highlightPosition || 0,
          height: "80px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {/* Top-left corner */}
        <div 
          className="highlight-corner left-corner absolute border-t-[3px] border-l-[3px] rounded-tl-[3px] top-0 left-0"
          style={{
            width: cornerSize,
            height: cornerSize,
            borderColor: highlightBorderColor,
            filter: `drop-shadow(0 0 4px ${highlightGlowColor})`,
            transformOrigin: "top left",
          }}
        />
        
        {/* Top-right corner */}
        <div 
          className="highlight-corner right-corner absolute border-t-[3px] border-r-[3px] rounded-tr-[3px] top-0"
          style={{
            width: cornerSize,
            height: cornerSize,
            borderColor: highlightBorderColor,
            filter: `drop-shadow(0 0 4px ${highlightGlowColor})`,
            left: highlightWidth - cornerSize,
            transformOrigin: "top right",
          }}
        />
        
        {/* Bottom-left corner */}
        <div 
          className="highlight-corner left-corner absolute border-b-[3px] border-l-[3px] rounded-bl-[3px] bottom-0 left-0"
          style={{
            width: cornerSize,
            height: cornerSize,
            borderColor: highlightBorderColor,
            filter: `drop-shadow(0 0 4px ${highlightGlowColor})`,
            transformOrigin: "bottom left",
          }}
        />
        
        {/* Bottom-right corner */}
        <div 
          className="highlight-corner right-corner absolute border-b-[3px] border-r-[3px] rounded-br-[3px] bottom-0"
          style={{
            width: cornerSize,
            height: cornerSize,
            borderColor: highlightBorderColor,
            filter: `drop-shadow(0 0 4px ${highlightGlowColor})`,
            left: highlightWidth - cornerSize,
            transformOrigin: "bottom right",
          }}
        />
      </div>

      <div className="relative h-24 flex items-center justify-center">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentTextIndex}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{
              ...transition,
              duration: transition.duration || 0.5,
              staggerChildren: 0.1
            }}
            className="absolute flex flex-col justify-center items-center w-full"
            onAnimationStart={() => {
              // Reset animation in progress flag when heading animation starts
              animationInProgress.current = false;
              // Trigger highlight position update at the start of heading animation
              updateHighlightPosition();
            }}
            onAnimationComplete={() => {
              // Ensure highlight position is updated after animation completes
              updateHighlightPosition();
            }}
          >
            {/* Screen reader text */}
            <span className="sr-only">{texts[currentTextIndex]}</span>
            
            {/* Current text */}
            <div
              ref={(el) => setTextRef(el, currentTextIndex)}
              className={cn(
                "text-4xl md:text-6xl font-black text-center relative z-10",
                textClassName
              )}
            >
              {texts[currentTextIndex]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

EnhancedText.displayName = "EnhancedText";
export default EnhancedText; 