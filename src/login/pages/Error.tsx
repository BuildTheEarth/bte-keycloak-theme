import { Alert, Button, Title, useMantineTheme } from "@mantine/core";

import { IconAlertTriangle } from "@tabler/icons";
import { PageProps } from "keycloakify/login";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

export default function Error(
  props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { message, client } = kcContext;

  const { msg } = i18n;

  const theme = useMantineTheme();

  return (
    <Layout
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
    >
      <LayoutTitle icon={IconAlertTriangle} color="red">
        {msg("errorTitle")}
      </LayoutTitle>

      <Alert color="red" variant="light" mt="md">
        {message.summary}
      </Alert>

      {client !== undefined && client.baseUrl !== undefined && (
        <Button
          variant="outline"
          component="a"
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
