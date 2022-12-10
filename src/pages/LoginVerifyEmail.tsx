import {
  Anchor,
  Container,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { IconMailbox } from "@tabler/icons";
import Layout from "components/Layout";
import { KcContextBase, KcProps } from "keycloakify";
import React, { memo } from "react";
import type { I18n } from "../i18n";

export type LoginVerifyEmailProps = KcProps & {
  kcContext: KcContextBase.LoginVerifyEmail;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const LoginVerifyEmail = memo((props: LoginVerifyEmailProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  const theme = useMantineTheme();

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
      </Container>
    </Layout>
  );
});

export default LoginVerifyEmail;
