import React from "react";
import { DocsContainer } from "@storybook/blocks";
import { useEffect, useState } from "react";
import { themes } from "../themes";

export const Container = ({ children, context }) => {
  const topDocument = window.top.document;
  const [currentTheme, setTheme] = useState<string>(topDocument.documentElement.dataset.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
    const handleChange = (e: CustomEvent) => {
      const theme = e.detail;
      setTheme(theme);
      document.documentElement.dataset.theme = theme;
    };
    topDocument.addEventListener("theme-change", handleChange);

    return () => {
      topDocument.removeEventListener("theme-change", handleChange);
    };
  }, []);
  const theme = themes[currentTheme];
  return (
    <DocsContainer
      context={context}
      theme={theme}
    >
      {children}
    </DocsContainer>
  );
};
