import { Button, Container, Title } from "@mantine/core";

import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { UserProfileFormFields } from "../components/UserProfileFormFields";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { useState } from "react";

export default function IdpReviewUserProfile(
  props: PageProps<
    Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { msg, msgStr } = i18n;

  const { url } = kcContext;

  const [isFomSubmittable, setIsFomSubmittable] = useState(false);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("loginIdpReviewProfileTitle")}
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
        <Title color={"light"} sx={{ fontWeight: 700 }} mb={"md"}>
          {msg("loginIdpReviewProfileTitle")}
        </Title>
        <form action={url.loginAction} method="post">
          <UserProfileFormFields
            kcContext={kcContext}
            onIsFormSubmittableValueChange={setIsFomSubmittable}
            i18n={i18n}
            getClassName={getClassName}
          />
          <div className={getClassName("kcFormGroupClass")}>
            <div
              id="kc-form-options"
              className={getClassName("kcFormOptionsClass")}
            >
              <div className={getClassName("kcFormOptionsWrapperClass")} />
            </div>
            <Button type="submit" disabled={!isFomSubmittable}>
              {msgStr("doSubmit")}
            </Button>
          </div>
        </form>
      </Container>
    </Template>
  );
}
