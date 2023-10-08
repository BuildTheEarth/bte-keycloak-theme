// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Divider,
  PasswordInput,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBox,
  IconBrandApple,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons";

import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import Layout from "login/components/Layout";
import { PageProps } from "keycloakify/login";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const {
    social,
    realm,
    url,
    usernameEditDisabled,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const getSocialIcon = (provider: string) => {
    switch (provider) {
      case "discord":
        return <IconBrandDiscord />;
      case "google":
        return <IconBrandGoogle />;
      case "apple":
        return <IconBrandApple />;
      case "github":
        return <IconBrandGithub />;
      default:
        return <IconBox />;
    }
  };

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <div>
        <Title color={"light"} sx={{ fontWeight: 700 }}>
          {msg("loginTitle")}
        </Title>

        <Text color="dimmed" size="sm" mt={5} mb="xl">
          {msg("loginText")}
        </Text>

        <form action={url.loginAction} method="post">
          {(() => {
            const label = !realm.loginWithEmailAllowed
              ? "username"
              : realm.registrationEmailAsUsername
              ? "email"
              : "usernameOrEmail";

            const autoCompleteHelper: typeof label =
              label === "usernameOrEmail" ? "username" : label;

            return (
              <>
                <TextInput
                  label={msg(label)}
                  {...(usernameEditDisabled
                    ? { disabled: true }
                    : {
                        autoFocus: true,
                        autoComplete: "off",
                      })}
                  required
                  name={autoCompleteHelper}
                  id={autoCompleteHelper}
                  defaultValue={login.username ?? ""}
                />
              </>
            );
          })()}
          <PasswordInput
            label={msg("password")}
            required
            mt="md"
            name="password"
            autoComplete="off"
          />
          <Anchor href={url.loginResetCredentialsUrl} size="sm">
            {msg("doForgotPassword")}
          </Anchor>

          {realm.rememberMe && !usernameEditDisabled && (
            <div className="checkbox">
              <Checkbox
                mt="md"
                name="rememberMe"
                label={msg("rememberMe")}
                {...(login.rememberMe
                  ? {
                      checked: true,
                    }
                  : {})}
              />
            </div>
          )}

          <Button fullWidth mt="xl" color={"white"} type="submit">
            {msgStr("doLogIn")}
          </Button>
          {realm.password &&
            realm.registrationAllowed &&
            !registrationDisabled && (
              <Box mt="xl" sx={{ display: "flex", justifyContent: "center" }}>
                <Text size={"sm"}>{msgStr("noAccount")}</Text>
                <Anchor
                  href={url.registrationUrl}
                  color="white"
                  size={"sm"}
                  ml="xs"
                >
                  {msg("doRegister")}
                </Anchor>
              </Box>
            )}
        </form>

        {realm.password && social.providers !== undefined && (
          <Box>
            <Divider my="sm" label={msgStr("or")} labelPosition="center" />
            <SimpleGrid cols={social.providers.length >= 4 ? 2 : 1}>
              {social.providers.map((p) => (
                <Button
                  variant="outline"
                  color="gray"
                  key={p.providerId}
                  id={`social-${p.alias}`}
                  component="a"
                  href={p.loginUrl}
                  leftIcon={getSocialIcon(p.alias)}
                >
                  {p.displayName}
                </Button>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </div>
    </Layout>
  );
}
