import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { kcContext } from "./kcContext";
import KcApp from "KcApp";
import { MantineProvider } from "@mantine/core";

if (kcContext === undefined) {
  throw new Error(
    "This app is a Keycloak theme" +
      "It isn't meant to be deployed outside of Keycloak"
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        fontFamily: "'Lexend Deca', sans-serif",
        headings: {
          fontFamily: "'Lexend Deca', sans-serif",
        },
      }}
    >
      <KcApp kcContext={kcContext} />
    </MantineProvider>
  </StrictMode>
);
