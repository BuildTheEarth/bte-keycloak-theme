import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
  en: {
    registerTitle: "Nice to have you here.",
    registerText: "Please enter your details to get started!",
    registerBackToLogin: "Already have an account? Login here.",
    loginTitle: "Hey! Welcome back.",
    loginText: "Please enter your details to continue!",
    or: "or",
    attemptedUsernameGreeting: "Hey, {0}",
    notYou: "not you?",
    emailLinkIdp1:
      "An email with instructions to link your {0} account with your {1} account has been sent to you.",
    loginIdpReviewProfileTitle: "Update Account",
    usernameOrEmail: "Username or Email",
    registerBackToLogin1: "Already have an account? ",
    registerBackToLogin2: "Login here",
    proceedWithAction: "Click here to proceed",
    backToApplication: "Back to Application",
    copyright: "Copyright © 2024 BuildTheEarth",
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
