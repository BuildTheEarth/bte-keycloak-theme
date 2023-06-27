import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  MediaQuery,
  Paper,
  Text,
  createStyles,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
  IconX,
} from "@tabler/icons";
import React, {
  PropsWithChildren,
  ReactComponentElement,
  ReactNode,
  useEffect,
} from "react";

import { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TemplateProps } from "../TemplateProps";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { from } from "evt/lib/Evt.from";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  loginSidebar: {
    width: "40%",
    marginTop: "2%",
    marginBottom: "2%",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "80%",
    },

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
  },
}));

export default function Layout(props: TemplateProps<KcContext, I18n>) {
  const { classes } = useStyles();
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    showUsernameNode = null,
    infoNode = null,
    hideLoggedIn = false,
    kcContext,
    i18n,
    doUseDefaultCss,
    children,
    headerNode,
    centeredContent = true,
  } = props;

  const {
    msg,
    changeLocale,
    labelBySupportedLanguageTag,
    currentLanguageTag,
    msgStr,
  } = i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  let didInit = false;

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      if (displayMessage) {
        switch (message?.type) {
          case "success":
            showNotification({
              color: "green",
              message: message?.summary,
              icon: <IconCheck size={18} />,
            });
            break;
          case "info":
            showNotification({
              color: "blue",
              message: message?.summary,
            });
            break;
          case "warning":
            showNotification({
              color: "yellow",
              message: message?.summary,
              icon: <IconAlertTriangle size={18} />,
            });
            break;
          case "error":
            showNotification({
              color: "red",
              message: message?.summary,
              icon: <IconX size={18} />,
            });
            break;
        }
      }
    }
  }, []);

  const Wrapper = ({ children }: any) => {
    if (centeredContent)
      return (
        <Container
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
          size="xs"
          children={children}
        />
      );
    return <>{children}</>;
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Paper px="lg" className={classes.loginSidebar}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Group position="apart" mb={"lg"}>
            <Group>
              <img
                src={
                  msg("loginTitleHtml", realm.displayNameHtml).props.children
                }
                alt="Logo"
                width="50px"
              />

              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Text size="xl" weight={400}>
                  {realm.displayName}
                </Text>
              </MediaQuery>
            </Group>
            <Group>
              {/*<LanguageSwitcher i18n={i18n} kcContext={kcContext} />*/}
              <ThemeSwitchButton />
            </Group>
          </Group>
          <Wrapper>
            {auth?.showUsername && !hideLoggedIn && (
              <Text color={"dimmed"}>
                {msg("attemptedUsernameGreeting", auth?.attemptedUsername)}{" "}
                <Anchor href={url.loginRestartFlowUrl}>{msg("notYou")}</Anchor>
              </Text>
            )}

            {children}
            {auth?.showTryAnotherWayLink && showAnotherWayIfPresent && (
              <form action={url.loginAction} method="post">
                <input type="hidden" name="tryAnotherWay" value="on" />
                <Button mt="md" variant="subtle" type={"submit"} fullWidth>
                  {msg("doTryAnotherWay")}
                </Button>
              </form>
            )}
          </Wrapper>
        </Box>
      </Paper>

      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "url('https://cms.bte-germany.de/assets/0460d0cd-de39-4172-8fa3-b227e9eec111?format=webp&q=50')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
    </Box>
  );
}
