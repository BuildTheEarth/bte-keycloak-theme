import { Alert, Button, Text, Title } from "@mantine/core";

import type { I18n } from "../i18n";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";

export default function LogoutConfirm(
  props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msgStr, msg } = i18n;

  const { url, client, logoutConfirm } = kcContext;

  return (
    <Layout
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
    >
      <Title color={"light"} sx={{ fontWeight: 700 }}>
        {msg("logoutConfirmTitle")}
      </Title>
      <Text color="dimmed" size="sm" mt={5} mb="xl">
        {msg("logoutConfirmHeader")}
      </Text>
      <form action={url.loginAction} method="post">
        <input type="hidden" name="session_code" value={logoutConfirm.code} />
        <Button fullWidth mt="xl" color={"white"} type="submit">
          {msgStr("doLogout")}
        </Button>
      </form>
      {!logoutConfirm.skipLink && client.baseUrl && (
        <Button component="a" variant="subtle" href={client.baseUrl} mt="md">
          {msg("backToApplication")}
        </Button>
      )}
    </Layout>
  );
}
