import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { LayoutTitle } from "login/components/LayoutTitle";
import { useState } from "react";
import { UserProfileFormFields } from "../components/UserProfileFormFields";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

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
      <LayoutTitle icon={IconEdit} color="blue">
        {msg("loginIdpReviewProfileTitle")}
      </LayoutTitle>
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
          <Button type="submit" fullWidth>
            {msgStr("doSubmit")}
          </Button>
        </div>
      </form>
    </Template>
  );
}
