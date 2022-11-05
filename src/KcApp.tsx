import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";

const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));

export type Props = {
  kcContext: KcContext;
};

export default function KcApp({ kcContext }: Props) {
  const i18n = useI18n({ kcContext });

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  //NOTE: Locales not yet downloaded
  if (i18n === null) {
    return null;
  }

  const props = {
    i18n,
    ...defaultKcProps,
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: "'Lexend Deca', sans-serif",
          headings: {
            fontFamily: "'Lexend Deca', sans-serif",
          },
        }}
      >
        <Suspense>
          {(() => {
            switch (kcContext.pageId) {
              case "register.ftl":
                return <Register {...{ kcContext, ...props }} />;
              case "terms.ftl":
                return <Terms {...{ kcContext, ...props }} />;
              default:
                return <KcAppBase {...{ kcContext, ...props }} />;
            }
          })()}
        </Suspense>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
