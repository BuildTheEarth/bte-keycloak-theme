import { Anchor, Divider, Text } from "@mantine/core";

import { IconClock } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

export default function LoginPageExpired(
  props: PageProps<
    Extract<KcContext, { pageId: "login-page-expired.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;

  const { url } = kcContext;

  const { msg } = i18n;

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <LayoutTitle icon={IconClock} color="red">
        {msg("pageExpiredTitle")}
      </LayoutTitle>

      <Text mt="xl">
        {msg("pageExpiredMsg1")}{" "}
        <Anchor id="loginRestartLink" href={url.loginRestartFlowUrl}>
          {msg("doClickHere")}
        </Anchor>
        .<Divider my="sm" />
        {msg("pageExpiredMsg2")}{" "}
        <Anchor id="loginContinueLink" href={url.loginAction}>
          {msg("doClickHere")}
        </Anchor>
        .
      </Text>
    </Layout>
  );
}
