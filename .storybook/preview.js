import "../src/styles/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "dark",
    list: [
      { name: "dark", class: "dark", color: "#000000" },
      { name: "light", class: "light", color: "#ffffff" },
    ],
  },
  viewport: {
    viewports: {
      mobile: {
        name: "Mobile",
        styles: {
          width: "360px",
          height: "640px",
        },
      },
      tablet: {
        name: "Tablet",
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
      desktop: {
        name: "Desktop",
        styles: {
          width: "1366px",
          height: "768px",
        },
      },
    },
  },
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: "#000000",
      },
      {
        name: "light",
        value: "#ffffff",
      },
    ],
  },
}; 