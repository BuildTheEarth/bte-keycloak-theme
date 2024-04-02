import { Box, Button, Title, useMantineTheme } from "@mantine/core";

import { IconAlertTriangle } from "@tabler/icons";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { LayoutTitle } from "login/components/LayoutTitle";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginIdpLinkConfirm(
  props: PageProps<
    Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, idpAlias } = kcContext;

  const { msg } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("confirmLinkIdpTitle")}
    >
      <LayoutTitle icon={IconAlertTriangle} color="orange">
        {msg("confirmLinkIdpTitle")}
      </LayoutTitle>
      <form id="kc-register-form" action={url.loginAction} method="post">
        <Box mt={"xl"}>
          <Button
            fullWidth
            type={"submit"}
            name="submitAction"
            value="updateProfile"
          >
            {msg("confirmLinkIdpReviewProfile")}
          </Button>

          <Button
            fullWidth
            type={"submit"}
            name="submitAction"
            value="linkAccount"
            mt={"md"}
            variant="outline"
          >
            {msg("confirmLinkIdpContinue", idpAlias)}
          </Button>
        </Box>
      </form>
    </Template>
  );
}
