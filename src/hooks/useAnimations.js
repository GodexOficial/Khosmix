import { useEffect } from "react";

export const useAnimations = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");

    const handleScroll = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible) {
          element.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};
