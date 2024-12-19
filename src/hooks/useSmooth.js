import { useEffect } from "react";

export const useSmooth = () => {
  useEffect(() => {
    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);
};
