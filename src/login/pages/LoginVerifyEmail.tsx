import {
  Anchor,
  Container,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import React, { memo } from "react";

import type { I18n } from "../i18n";
import { IconMailbox } from "@tabler/icons";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  const theme = useMantineTheme();

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <Title
        color={"light"}
        sx={{
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <IconMailbox color={theme.colors[theme.primaryColor][6]} size={30} />{" "}
        {msg("emailVerifyTitle")}
      </Title>
      <Text color="dimmed" className="instruction" mt="xl">
        {msg("emailVerifyInstruction1", user?.email)}
      </Text>
      <Text color="dimmed" className="instruction" mt="xl">
        <b>{msg("emailVerifyInstruction2")}</b>
        <br />
        <Anchor href={url.loginAction}>{msg("doClickHere")}</Anchor>
        &nbsp;
        {msg("emailVerifyInstruction3")}
      </Text>
    </Layout>
  );
}
