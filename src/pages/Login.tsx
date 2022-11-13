// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { memo, useEffect } from "react";
import Template, { TemplateProps } from "keycloakify/lib/components/Template";
import type { KcContextBase, KcProps } from "keycloakify";
import type { KcContext } from "../kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "../i18n";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Divider,
  Flex,
  SimpleGrid,
} from "@mantine/core";
import Layout from "components/Layout";
import { useForm } from "@mantine/form";
import {
  IconBox,
  IconBrandApple,
  IconBrandDiscord,
  IconBrandGoogle,
} from "@tabler/icons";

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

export type LoginProps = KcProps & {
  kcContext: KcContextBase.Login;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const Login = memo((props: LoginProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

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
      default:
        return <IconBox />;
    }
  };

  return (
    <Layout {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}>
      <Container
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
        size="xs"
      >
        <div>
          <Title color={"light"} sx={{ fontWeight: 700 }}>
            {msg("loginTitle")}
          </Title>

          <Text color="dimmed" size="sm" mt={5} mb="xl">
            {msg("loginText")}
          </Text>

          <form
            action={url.loginAction}
            method="post"
          >
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
      </Container>
    </Layout>
  );
});

export default Login;
