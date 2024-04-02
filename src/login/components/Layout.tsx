/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Container,
  Group,
  MediaQuery,
  Paper,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons";

import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { TemplateProps } from "../TemplateProps";
import { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

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

  const theme = useMantineTheme();

  console.log(kcContext);

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
        <Box
          sx={{
            height: "100%",
            marginTop: `calc(${theme.spacing.xl}px * 5)`,
            marginLeft: `calc(${theme.spacing.xl}px * 3)`,
            marginRight: `calc(${theme.spacing.xl}px * 3)`,
          }}
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
                width="48px"
              />

              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Text size="lg" weight={400} ff="Minecraft">
                  {realm.displayName}
                </Text>
              </MediaQuery>
            </Group>
            <Group>
              {/* <LanguageSwitcher i18n={i18n} kcContext={kcContext} /> */}
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
                <Button mt="md" variant="outline" type={"submit"} fullWidth>
                  {msg("doTryAnotherWay")}
                </Button>
              </form>
            )}
          </Wrapper>
        </Box>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            {msg("copyright")}
          </Text>
          <Anchor
            color="dimmed"
            component="a"
            fz="xs"
            href="https://buildtheearth.net/contact"
          >
            Contact
          </Anchor>
        </Group>
      </Paper>

      <BackgroundImage
        src="https://cdn.buildtheearth.net/static/thumbnails/auth.webp"
        style={{ flex: 1 }}
      />
    </Box>
  );
}
