"use client";

import { useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Define gradient colors for each card
const cardGradients = [
  "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)", // Rich gold gradient
  "linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)", // Royal blue gradient
  "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)", // Hot pink gradient
  "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)", // Modern silver gradient
  "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)", // Rich gold gradient
  "linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)", // Royal blue gradient
  "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)", // Hot pink gradient
  "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)", // Modern silver gradient
  "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)", // Rich gold gradient
  "linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)", // Royal blue gradient
  "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)", // Hot pink gradient
  "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)"  // Modern silver gradient
];

export const useCardAnimation = (
  cardsRef: React.RefObject<HTMLDivElement | null>,
  cardSelector: string
) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const initAnimations = useCallback(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(cardSelector);
    const firstCard = cards[0] as HTMLElement;
    const lastCard = cards[cards.length - 1] as HTMLElement;
    
    // Create container trigger for default states
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => setActiveCardId(firstCard.id),
      onLeave: () => setActiveCardId(lastCard.id),
      onEnterBack: () => setActiveCardId(lastCard.id),
      onLeaveBack: () => setActiveCardId(firstCard.id)
    });

    // Create trigger for each card
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const nextCard = cards[index + 1] as HTMLElement | undefined;
      const gradient = cardGradients[index % cardGradients.length];
      
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        endTrigger: nextCard || card,
        end: nextCard ? "top center" : "bottom bottom",
        markers: false,
        onEnter: () => {
          // Animate card activation
          const shadowColor = gradient.match(/#[A-Fa-f0-9]{6}/)?.[0] || "#FFFFFF";
          gsap.to(cardElement, {
            background: gradient,
            boxShadow: `0 0px 30px ${shadowColor}1A`, // Using hex opacity (1A = 10%)
            scale: 1.02,
            border: "none",
            duration: 0.4,
            ease: "power2.out"
          });

          // Animate icon container
          const iconContainer = cardElement.querySelector(".icon-container");
          if (iconContainer) {
            gsap.to(iconContainer, {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "#000000",
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });

            // Animate icon size
            const icon = iconContainer.querySelector("svg");
            if (icon) {
              gsap.to(icon, {
                width: "2rem",
                height: "2rem",
                duration: 0.4,
                ease: "power2.out"
              });
            }
          }

          // Animate title
          const title = cardElement.querySelector("h3");
          if (title) {
            gsap.to(title, {
              color: "#000000",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }

          // Animate description
          const description = cardElement.querySelector("p");
          if (description) {
            gsap.to(description, {
              color: "rgba(0, 0, 0, 0.8)",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }

          setActiveCardId(cardElement.id);
        },
        onLeave: () => {
          // Only deactivate if there's a next card and we're not at the last card
          if (nextCard && cardElement !== lastCard) {
            // Animate card deactivation
            gsap.to(cardElement, {
              background: "rgba(24, 24, 27, 0.5)",
              boxShadow: "none",
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });

            // Animate icon container
            const iconContainer = cardElement.querySelector(".icon-container");
            if (iconContainer) {
              gsap.to(iconContainer, {
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                color: "var(--theme-yellow)",
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });

              // Animate icon size back
              const icon = iconContainer.querySelector("svg");
              if (icon) {
                gsap.to(icon, {
                  width: "1.5rem",
                  height: "1.5rem",
                  duration: 0.4,
                  ease: "power2.out"
                });
              }
            }

            // Animate title
            const title = cardElement.querySelector("h3");
            if (title) {
              gsap.to(title, {
                color: "#ffffff",
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
            }

            // Animate description
            const description = cardElement.querySelector("p");
            if (description) {
              gsap.to(description, {
                color: "#a1a1aa",
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
            }
          }
        },
        onEnterBack: () => {
          // Animate card activation
          const shadowColor = gradient.match(/#[A-Fa-f0-9]{6}/)?.[0] || "#FFFFFF";
          gsap.to(cardElement, {
            background: gradient,
            boxShadow: `0 0px 30px ${shadowColor}1A`, // Using hex opacity (1A = 10%)
            scale: 1.02,
            border: "none",
            duration: 0.4,
            ease: "power2.out"
          });

          const iconContainer = cardElement.querySelector(".icon-container");
          if (iconContainer) {
            gsap.to(iconContainer, {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "#000000",
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });

            // Animate icon size
            const icon = iconContainer.querySelector("svg");
            if (icon) {
              gsap.to(icon, {
                width: "2rem",
                height: "2rem",
                duration: 0.4,
                ease: "power2.out"
              });
            }
          }

          const title = cardElement.querySelector("h3");
          if (title) {
            gsap.to(title, {
              color: "#000000",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }

          const description = cardElement.querySelector("p");
          if (description) {
            gsap.to(description, {
              color: "rgba(0, 0, 0, 0.8)",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }

          setActiveCardId(cardElement.id);
        },
        onLeaveBack: () => {
          // Only deactivate if there's a previous card and we're not at the first card
          if (index > 0 && cardElement !== firstCard) {
            // Animate card deactivation
            gsap.to(cardElement, {
              background: "rgba(24, 24, 27, 0.5)",
              boxShadow: "none",
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });

            const iconContainer = cardElement.querySelector(".icon-container");
            if (iconContainer) {
              gsap.to(iconContainer, {
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                color: "var(--theme-yellow)",
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });

              // Animate icon size back
              const icon = iconContainer.querySelector("svg");
              if (icon) {
                gsap.to(icon, {
                  width: "1.5rem",
                  height: "1.5rem",
                  duration: 0.4,
                  ease: "power2.out"
                });
              }
            }

            const title = cardElement.querySelector("h3");
            if (title) {
              gsap.to(title, {
                color: "#ffffff",
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
            }

            const description = cardElement.querySelector("p");
            if (description) {
              gsap.to(description, {
                color: "#a1a1aa",
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
            }
          }
        }
      });
    });
  }, [cardsRef, cardSelector]);

  const cleanupAnimations = useCallback(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    setActiveCardId(null);
  }, []);

  return {
    activeCardId,
    initAnimations,
    cleanupAnimations
  };
}; 