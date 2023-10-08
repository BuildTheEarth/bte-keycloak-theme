import { Box, Button, Container, Title, useMantineTheme } from "@mantine/core";

import type { I18n } from "../i18n";
import { IconAlertTriangle } from "@tabler/icons";
import type { KcContext } from "../kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";

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

  const theme = useMantineTheme();

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("confirmLinkIdpTitle")}
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
          <IconAlertTriangle color={theme.colors.orange[8]} size={40} />{" "}
          {msg("confirmLinkIdpTitle")}
        </Title>
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
      </Container>
    </Template>
  );
}
