import {
  Anchor,
  Container,
  Divider,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconClock } from "@tabler/icons";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";
import { KcContext } from "login/kcContext";
import React from "react";
import type { I18n } from "../i18n";


export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;


  const { url } = kcContext;

  const { msg } = i18n;

  const theme = useMantineTheme();

  return (
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
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
        <Title
          color={"light"}
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconClock color={theme.colors.red[8]} size={30} />{" "}
          {msg("pageExpiredTitle")}
        </Title>

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
      </Container>
    </Layout>
  );
}
