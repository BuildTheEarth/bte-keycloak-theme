// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { memo } from "react";
import Template, { TemplateProps } from "keycloakify/lib/components/Template";
import type { KcContextBase, KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
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
} from "@mantine/core";
import Layout from "components/Layout";
import { useForm } from "@mantine/form";
import ReCAPTCHA from "react-google-recaptcha";

type KcContext_Register = Extract<KcContext, { pageId: "register.ftl" }>;

export type RegisterProps = KcProps & {
  kcContext: KcContextBase.Register;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const Register = memo((props: RegisterProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;
  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const form = useForm({
    initialValues: {
      email: register.formData.email ?? "",
      username: register.formData.username ?? "",
      password: "",
      "password-confirm": "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      "password-confirm": (value, { password }) => {
        if (value !== password) {
          return "Passwords do not match";
        }
      },
    },
  });

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
            {msg("registerTitle")}
          </Title>

          <Text color="dimmed" size="sm" mt={5} mb="xl">
            {msg("registerText")}
          </Text>

          <form
            action={url.registrationAction}
            method="post"
            onSubmit={(event) => {
              if (!form.isValid()) {
                form.validate();
                event.preventDefault();
              }
            }}
          >
            <input
              type="text"
              id="firstName"
              value={"a"}
              style={{ display: "none" }}
            />

            <input
              type="text"
              id="lastName"
              value={"b"}
              style={{ display: "none" }}
            />
            {!realm.registrationEmailAsUsername && (
              <TextInput
                label={msg("username")}
                autoComplete="username"
                required
                name="username"
                {...form.getInputProps("username")}
              />
            )}

            <TextInput
              label={msg("email")}
              required
              mt="md"
              name="email"
              {...form.getInputProps("email")}
            />

            {passwordRequired && (
              <>
                <PasswordInput
                  label={msg("password")}
                  placeholder=""
                  required
                  mt="md"
                  name="password"
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label={msg("passwordConfirm")}
                  placeholder=""
                  required
                  mt="md"
                  name="password-confirm"
                  {...form.getInputProps("password-confirm")}
                />
              </>
            )}

            {recaptchaRequired && (
              <ReCAPTCHA
                sitekey={recaptchaSiteKey || ""}
                onChange={(value) => console.log(value)}
              />
            )}

            <Button fullWidth mt="xl" color={"white"} type="submit">
              {msgStr("doRegister")}
            </Button>

            <Box mt="xl" sx={{ display: "flex", justifyContent: "center" }}>
              <Anchor href={url.loginUrl} color="white" size={"sm"}>
                {msgStr("backToLogin")}
              </Anchor>
            </Box>
          </form>
        </div>
      </Container>
    </Layout>
  );
});

export default Register;
