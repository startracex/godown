import { DocsContainer } from "@storybook/addon-docs/blocks";
import { useEffect, useState } from "react";
import { themes } from "../themes";

export const Container = ({ children, context }) => {
  const topDocument = window.top.document;
  const [currentTheme, setTheme] = useState<string>(topDocument.documentElement.dataset.theme);
  useEffect(() => {
    const handleChange = (e: CustomEvent) => {
      setTheme(e.detail);
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
