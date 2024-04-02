import { Anchor, Text } from "@mantine/core";

import { IconMailbox } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <LayoutTitle icon={IconMailbox} color="blue">
        {msg("emailVerifyTitle")}
      </LayoutTitle>
      <Text className="instruction" mt="xl">
        {msg("emailVerifyInstruction1", user?.email)}
      </Text>
      <Text className="instruction" mt="xl">
        <b>{msg("emailVerifyInstruction2")}</b>
        <br />
        <Anchor href={url.loginAction}>{msg("doClickHere")}</Anchor>
        &nbsp;
        {msg("emailVerifyInstruction3")}
      </Text>
    </Layout>
  );
}
