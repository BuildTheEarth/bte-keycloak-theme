import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { memo, useEffect } from "react";

import type { I18n } from "../i18n";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "@mantine/form";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
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

  useEffect(() => {
    if (!recaptchaRequired) return;

    try {
      //@ts-ignore
      grecaptcha.render("captcha", {
        sitekey: recaptchaSiteKey,
        theme: "dark",
      });
    } catch (e) {
      console.log("error", e);
    }

    //@ts-ignore
    return grecaptcha.reset();
  }, []);

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <div>
        <Title color={"light"} sx={{ fontWeight: 700 }}>
          {msg("registerTitle")}
        </Title>

        <Text color="dimmed" size="sm" mt={5} mb="xl">
          {msg("registerText")}
        </Text>

        <form action={url.registrationAction} method="post">
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
              // {...form.getInputProps("username")}
            />
          )}

          <TextInput
            label={msg("email")}
            required
            mt="md"
            name="email"
            // {...form.getInputProps("email")}
          />

          {passwordRequired && (
            <>
              <PasswordInput
                label={msg("password")}
                placeholder=""
                required
                mt="md"
                name="password"
                autoComplete="new-password"
                // {...form.getInputProps("password")}
              />
              <PasswordInput
                label={msg("passwordConfirm")}
                placeholder=""
                required
                mt="md"
                name="password-confirm"
                autoComplete="new-password"
                // {...form.getInputProps("password-confirm")}
              />
            </>
          )}

          {recaptchaRequired && (
            <Box mt="lg">
              <div id="captcha" />
            </Box>
          )}

          <Button fullWidth mt="xl" color={"white"} type="submit">
            {msgStr("doRegister")}
          </Button>

          <Box mt="xl" sx={{ display: "flex", justifyContent: "center" }}>
            <Anchor href={url.loginUrl} color="white" size={"sm"}>
              {msgStr("registerBackToLogin")}
            </Anchor>
          </Box>
        </form>
      </div>
    </Layout>
  );
}
