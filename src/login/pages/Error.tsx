import { Alert, Button, Title, useMantineTheme } from "@mantine/core";

import type { I18n } from "../i18n";
import { IconAlertTriangle } from "@tabler/icons";
import { KcContext } from "login/kcContext";
import Layout from "../components/Layout";
import { PageProps } from "keycloakify/login";

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
}
