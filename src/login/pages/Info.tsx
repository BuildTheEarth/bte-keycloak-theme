import { Alert, Button, Text, Title } from "@mantine/core";

import { IconInfoCircle } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

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
      <LayoutTitle icon={IconInfoCircle} color="blue">
        {messageHeader !== undefined ? (
          <>{messageHeader}</>
        ) : (
          <>{message?.summary}</>
        )}
      </LayoutTitle>

      <Text>{message?.summary}</Text>

      {requiredActions !== undefined && (
        <b>
          {requiredActions
            .map((requiredAction) =>
              msgStr(`requiredAction.${requiredAction}` as const)
            )
            .join(",")}
        </b>
      )}

      {!skipLink && pageRedirectUri !== undefined ? (
        <Button component="a" href={pageRedirectUri} mt="md" fullWidth>
          {msg("backToApplication")}
        </Button>
      ) : actionUri !== undefined ? (
        <Button component="a" href={actionUri} mt="md" fullWidth>
          {msg("proceedWithAction")}
        </Button>
      ) : (
        client.baseUrl !== undefined && (
          <Button component="a" href={pageRedirectUri} mt="md" fullWidth>
            {msg("backToApplication")}
          </Button>
        )
      )}
    </Layout>
  );
}
