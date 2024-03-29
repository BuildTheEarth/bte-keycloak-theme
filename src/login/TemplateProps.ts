import type { I18n } from "./i18n";
import type { KcContext } from "keycloakify/login/kcContext";
import type { ReactNode } from "react";

export type TemplateProps<
  KcContext extends KcContext.Common,
  I18nExtended extends I18n
> = {
  kcContext: KcContext;
  i18n: I18nExtended;
  doUseDefaultCss: boolean;
  headerNode?: ReactNode;
  hideLoggedIn?: boolean;
  classes?: Partial<Record<ClassKey, string>>;
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  displayWide?: boolean;
  showAnotherWayIfPresent?: boolean;
  showUsernameNode?: ReactNode;
  infoNode?: ReactNode;
  children: ReactNode;
  centeredContent?: boolean;
};
export type ClassKey =
  | "kcHtmlClass"
  | "kcLoginClass"
  | "kcHeaderClass"
  | "kcHeaderWrapperClass"
  | "kcFormCardClass"
  | "kcFormCardAccountClass"
  | "kcFormHeaderClass"
  | "kcLocaleWrapperClass"
  | "kcContentWrapperClass"
  | "kcLabelWrapperClass"
  | "kcFormGroupClass"
  | "kcResetFlowIcon"
  | "kcFeedbackSuccessIcon"
  | "kcFeedbackWarningIcon"
  | "kcFeedbackErrorIcon"
  | "kcFeedbackInfoIcon"
  | "kcFormSocialAccountContentClass"
  | "kcFormSocialAccountClass"
  | "kcSignUpClass"
  | "kcInfoAreaWrapperClass"
  | "kcLogoClass"
  | "kcContainerClass"
  | "kcContentClass"
  | "kcFeedbackAreaClass"
  | "kcLocaleClass"
  | "kcAlertIconClasserror"
  | "kcFormAreaClass"
  | "kcFormSocialAccountListClass"
  | "kcFormSocialAccountDoubleListClass"
  | "kcFormSocialAccountListLinkClass"
  | "kcWebAuthnKeyIcon"
  | "kcWebAuthnDefaultIcon"
  | "kcFormClass"
  | "kcFormGroupErrorClass"
  | "kcLabelClass"
  | "kcInputClass"
  | "kcInputErrorMessageClass"
  | "kcInputWrapperClass"
  | "kcFormOptionsClass"
  | "kcFormButtonsClass"
  | "kcFormSettingClass"
  | "kcTextareaClass"
  | "kcInfoAreaClass"
  | "kcFormGroupHeader"
  | "kcButtonClass"
  | "kcButtonPrimaryClass"
  | "kcButtonDefaultClass"
  | "kcButtonLargeClass"
  | "kcButtonBlockClass"
  | "kcInputLargeClass"
  | "kcSrOnlyClass"
  | "kcSelectAuthListClass"
  | "kcSelectAuthListItemClass"
  | "kcSelectAuthListItemFillClass"
  | "kcSelectAuthListItemInfoClass"
  | "kcSelectAuthListItemLeftClass"
  | "kcSelectAuthListItemBodyClass"
  | "kcSelectAuthListItemDescriptionClass"
  | "kcSelectAuthListItemHeadingClass"
  | "kcSelectAuthListItemHelpTextClass"
  | "kcSelectAuthListItemIconPropertyClass"
  | "kcSelectAuthListItemIconClass"
  | "kcSelectAuthListItemTitle"
  | "kcAuthenticatorDefaultClass"
  | "kcAuthenticatorPasswordClass"
  | "kcAuthenticatorOTPClass"
  | "kcAuthenticatorWebAuthnClass"
  | "kcAuthenticatorWebAuthnPasswordlessClass"
  | "kcSelectOTPListClass"
  | "kcSelectOTPListItemClass"
  | "kcAuthenticatorOtpCircleClass"
  | "kcSelectOTPItemHeadingClass"
  | "kcFormOptionsWrapperClass";
