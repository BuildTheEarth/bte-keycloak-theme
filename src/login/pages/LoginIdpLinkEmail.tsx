import { Anchor, Container, Title, useMantineTheme } from "@mantine/core";

import type { I18n } from "keycloakify/login/i18n";
import { IconLink } from "@tabler/icons";
import type { KcContext } from "keycloakify/login/kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";

export default function LoginIdpLinkEmail(
  props: PageProps<
    Extract<
      KcContext,
      {
        pageId: "login-idp-link-email.ftl";
      }
    >,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, realm, brokerContext, idpAlias } = kcContext;

  const { msg } = i18n;

  const theme = useMantineTheme();

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("emailLinkIdpTitle", idpAlias)}
    >
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
          my="md"
        >
          <IconLink color={theme.colors.green[8]} size={50} />
          {msg("emailLinkIdpTitle", idpAlias)}
        </Title>
        <p id="instruction1" className="instruction">
          {msg(
            "emailLinkIdp1",
            idpAlias,
            brokerContext.username,
            realm.displayName
          )}
        </p>
        <p id="instruction2" className="instruction">
          {msg("emailLinkIdp2")}{" "}
          <Anchor href={url.loginAction}>{msg("doClickHere")}</Anchor>{" "}
          {msg("emailLinkIdp3")}
        </p>
        <p id="instruction3" className="instruction">
          {msg("emailLinkIdp4")}{" "}
          <Anchor href={url.loginAction}>{msg("doClickHere")}</Anchor>{" "}
          {msg("emailLinkIdp5")}
        </p>
      </Container>
    </Template>
  );
}
