import { Button, Text } from "@mantine/core";

import { IconLogout } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

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
      <LayoutTitle icon={IconLogout} color="yellow">
        {msg("logoutConfirmTitle")}
      </LayoutTitle>
      <Text mb="xl">{msg("logoutConfirmHeader")}</Text>
      <form action={url.loginAction} method="post">
        <input type="hidden" name="session_code" value={logoutConfirm.code} />
        <Button fullWidth mt="xl" color={"white"} type="submit">
          {msgStr("doLogout")}
        </Button>
      </form>
      {!logoutConfirm.skipLink && client.baseUrl && (
        <Button
          component="a"
          variant="outline"
          href={client.baseUrl}
          mt="md"
          fullWidth
        >
          {msg("backToApplication")}
        </Button>
      )}
    </Layout>
  );
}
