import React, { memo } from "react";
import type { I18n } from "../i18n";
import { KcContextBase, KcProps } from "keycloakify";
import Layout from "../components/Layout";
import { Container, TextInput, Title, Text, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export type LoginResetPasswordProps = KcProps & {
  kcContext: KcContextBase.LoginResetPassword;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const LoginResetPassword = memo((props: LoginResetPasswordProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  const form = useForm({
    initialValues: {
      username:
        auth !== undefined && auth.showUsername ? auth.attemptedUsername : "",
    },

    validate: {
      username: (value: string) =>
        realm.loginWithEmailAllowed && realm.registrationEmailAsUsername
          ? /^\S+@\S+$/.test(value)
            ? null
            : "Invalid email"
          : true,
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
        <Title color={"light"} sx={{ fontWeight: 700 }}>
          {msg("emailForgotTitle")}
        </Title>
        <Text color="dimmed">{msg("emailInstruction")}</Text>
        <form
          action={url.loginAction}
          method="post"
          onSubmit={(event) => {
            if (!form.isValid()) {
              form.validate();
              event.preventDefault();
            }
          }}
        >
          <TextInput
            label={
              !realm.loginWithEmailAllowed
                ? msg("username")
                : !realm.registrationEmailAsUsername
                ? msg("usernameOrEmail")
                : msg("email")
            }
            required
            mt="md"
            name="username"
            {...form.getInputProps("username")}
          />

          <Button type="submit" fullWidth mt="xl">
            {msgStr("doSubmit")}
          </Button>

          <Button
            component="a"
            href={url.loginUrl}
            variant="outline"
            fullWidth
            mt="xl"
          >
            {msg("backToLogin")}
          </Button>
        </form>
      </Container>
    </Layout>
  );
});

export default LoginResetPassword;
