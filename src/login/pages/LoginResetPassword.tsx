import { Button, Text, TextInput, Title } from "@mantine/core";

import { useForm } from "@mantine/form";
import { IconBulb } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

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
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <LayoutTitle icon={IconBulb} color="lime">
        {msg("emailForgotTitle")}
      </LayoutTitle>
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
          // {...form.getInputProps("username")}
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
    </Layout>
  );
}
