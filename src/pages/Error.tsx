import React, { memo } from "react";
import type { I18n } from "../i18n";
import Layout from "../components/Layout";
import { KcContextBase, KcProps } from "keycloakify";
import { Alert, Button, Title, useMantineTheme } from "@mantine/core";
import { IconAlertOctagon, IconAlertTriangle } from "@tabler/icons";

export type ErrorProps = KcProps & {
  kcContext: KcContextBase.Error;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const Error = memo((props: ErrorProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { message, client } = kcContext;

  const { msg } = i18n;

  const theme = useMantineTheme();

  return (
    <Layout
      {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
      displayMessage={false}
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
        <IconAlertTriangle color={theme.colors.red[8]} size={40} />{" "}
        {msg("errorTitle")}
      </Title>

      <Alert color="red" variant="outline" mt="md">
        {message.summary}
      </Alert>

      {client !== undefined && client.baseUrl !== undefined && (
        <Button variant="subtle" component="a" href={client.baseUrl} mt="md">
          {msg("backToApplication")}
        </Button>
      )}
    </Layout>
  );
});

export default Error;
