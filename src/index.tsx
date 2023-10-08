import { createRoot } from "react-dom/client";
import { StrictMode, Suspense, lazy } from "react";
import { kcContext as kcLoginThemeContext } from "./login/kcContext";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";
import { MantineProvider } from "@mantine/core";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

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
      <StrictMode>
        <Suspense>
          {(() => {
            if (kcLoginThemeContext !== undefined) {
              return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
            }

            if (kcAccountThemeContext !== undefined) {
              return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
            }

            return <p>Error</p>;
          })()}
        </Suspense>
      </StrictMode>
    </MantineProvider>
  </StrictMode>
);
