import React, { memo } from "react";
import type { I18n } from "../i18n";
import Layout from "../components/Layout";
import { KcContextBase, KcProps } from "keycloakify";
import { Alert, Button, Text, Title, useMantineTheme } from "@mantine/core";
import { IconAlertOctagon, IconAlertTriangle } from "@tabler/icons";

export type InfoProps = KcProps & {
  kcContext: KcContextBase.Info;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const Info = memo((props: InfoProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { msgStr, msg } = i18n;

  const {
    messageHeader,
    message,
    requiredActions,
    skipLink,
    pageRedirectUri,
    actionUri,
    client,
  } = kcContext;

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
        {messageHeader !== undefined ? (
          <>{messageHeader}</>
        ) : (
          <>{message?.summary}</>
        )}
      </Title>
      <Alert variant="outline" mt="md">
        {message?.summary}

        {requiredActions !== undefined && (
          <b>
            {requiredActions
              .map((requiredAction) =>
                msgStr(`requiredAction.${requiredAction}` as const)
              )
              .join(",")}
          </b>
        )}
      </Alert>

      {!skipLink && pageRedirectUri !== undefined ? (
        <Button component="a" href={pageRedirectUri} mt="md">
          {msg("backToApplication")}
        </Button>
      ) : actionUri !== undefined ? (
        <Button component="a" href={actionUri} mt="md">
          {msg("proceedWithAction")}
        </Button>
      ) : (
        client.baseUrl !== undefined && (
          <Button component="a" href={pageRedirectUri} mt="md">
            {msg("backToApplication")}
          </Button>
        )
      )}
    </Layout>
  );
});

export default Info;
