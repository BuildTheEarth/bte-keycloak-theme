import { Anchor } from "@mantine/core";
import { IconLink } from "@tabler/icons";
import type { I18n } from "keycloakify/login/i18n";
import type { KcContext } from "keycloakify/login/kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { LayoutTitle } from "login/components/LayoutTitle";

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

  const { url, realm, idpAlias } = kcContext;

  const { msg } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("emailLinkIdpTitle", idpAlias)}
    >
      <LayoutTitle icon={IconLink} color="green">
        {msg("emailLinkIdpTitle", idpAlias)}
      </LayoutTitle>
      <p id="instruction1" className="instruction">
        {msg("emailLinkIdp1", idpAlias, realm.displayName)}
      </p>
      <p id="instruction2" className="instruction">
        {msg("emailLinkIdp2")}{" "}
        <Anchor href={url.loginRestartFlowUrl}>{msg("doClickHere")}</Anchor>{" "}
        {msg("emailLinkIdp3")}
      </p>
      <p id="instruction3" className="instruction">
        {msg("emailLinkIdp4")}{" "}
        <Anchor href={url.loginAction}>{msg("doClickHere")}</Anchor>{" "}
        {msg("emailLinkIdp5")}
      </p>
    </Template>
  );
}
