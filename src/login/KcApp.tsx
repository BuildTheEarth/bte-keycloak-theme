import "./KcApp.css";
import React, { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import Error from "./pages/Error";
import Info from "./pages/Info";
import LoginOtp from "./pages/LoginOtp";
import LoginResetPassword from "./pages/LoginResetPassword";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import LoginPageExpired from "./pages/LoginPageExpired";
import Fallback from "keycloakify/login";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));

const Template = lazy(() => import("./components/Layout.tsx"));

export type Props = {
  kcContext: KcContext;
};

const classes: PageProps<any, any>["classes"] = {
    
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
        <NotificationsProvider position={"top-right"} autoClose={5000}>
          <Suspense>
            {(() => {
              switch (kcContext.pageId) {
                case "register.ftl":
                  return <Register {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "login.ftl":
                  return <Login {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "terms.ftl":
                  return <Terms {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "error.ftl":
                  return <Error {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "info.ftl":
                  return <Info {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "login-otp.ftl":
                  return <LoginOtp {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "login-reset-password.ftl":
                  return <LoginResetPassword {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "login-verify-email.ftl":
                  return <LoginVerifyEmail {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                case "login-page-expired.ftl":
                  return <LoginPageExpired {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                default: return <p>This page is not implemented yet: ${kcContext.pageId}</p>;
              }
            })()}
          </Suspense>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
