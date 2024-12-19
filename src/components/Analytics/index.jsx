import { useEffect } from "react";
import { config } from "../../config";

const Analytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", config.analytics.googleAnalyticsId);
    }
  }, []);

  return null;
};

export default Analytics;
