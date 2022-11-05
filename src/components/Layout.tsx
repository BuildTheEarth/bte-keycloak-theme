import {
  Alert,
  Box,
  Container,
  createStyles,
  Group,
  MediaQuery,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from "@tabler/icons";
import { from } from "evt/lib/Evt.from";
import { I18n, KcContextBase, KcTemplateProps } from "keycloakify";
import React, {
  PropsWithChildren,
  ReactComponentElement,
  ReactNode,
} from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
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

export type TemplateProps = {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  displayWide?: boolean;
  showAnotherWayIfPresent?: boolean;
  showUsernameNode?: ReactNode;
  infoNode?: ReactNode;
  doFetchDefaultThemeResources: boolean;
} & { kcContext: KcContextBase; i18n: I18n } & KcTemplateProps &
  PropsWithChildren<{}>;

export default function Layout(props: TemplateProps) {
  const { classes } = useStyles();
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doFetchDefaultThemeResources,
    children,
  } = props;

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;
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
          <Group position="apart">
            <Group>
              <Box>{msg("loginTitleHtml", realm.displayNameHtml)}</Box>

              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Text size="xl" weight={400}>
                  {realm.displayName}
                </Text>
              </MediaQuery>
            </Group>
            <Group>
              <LanguageSwitcher i18n={i18n} kcContext={kcContext} />
              <ThemeSwitchButton />
            </Group>
          </Group>

          <Box mt="md">
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div>
                  {message.type === "success" && (
                    <Alert icon={<IconCircleCheck size={16} />} color="lime">
                      <span
                        className="kc-feedback-text"
                        dangerouslySetInnerHTML={{
                          __html: message.summary,
                        }}
                      />
                    </Alert>
                  )}
                  {message.type === "warning" && (
                    <Alert
                      icon={<IconAlertTriangle size={16} />}
                      color="yellow"
                    >
                      <span
                        className="kc-feedback-text"
                        dangerouslySetInnerHTML={{
                          __html: message.summary,
                        }}
                      />
                    </Alert>
                  )}
                  {message.type === "error" && (
                    <Alert icon={<IconCircleX size={16} />} color="red">
                      <span
                        className="kc-feedback-text"
                        dangerouslySetInnerHTML={{
                          __html: message.summary,
                        }}
                      />
                    </Alert>
                  )}
                  {message.type === "info" && (
                    <Alert icon={<IconInfoCircle size={16} />}>
                      <span
                        className="kc-feedback-text"
                        dangerouslySetInnerHTML={{
                          __html: message.summary,
                        }}
                      />
                    </Alert>
                  )}
                </div>
              )}
          </Box>

          {children}
        </Box>
      </Paper>

      <Box
        sx={{
          flex: 1,
          backgroundImage: "url('/keycloak_static/resources/img/bg.png')",
          backgroundPosition: "center",
        }}
      ></Box>
    </Box>
  );
}
