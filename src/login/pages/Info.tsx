import { Alert, Button, Title } from "@mantine/core";

import type { I18n } from "../i18n";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";

export default function Info(
  props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

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
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
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
}
