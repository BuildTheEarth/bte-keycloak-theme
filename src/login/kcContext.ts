import { getKcContext } from "keycloakify/login";

export const { kcContext } = getKcContext<{
  pageId: "register.ftl";
  authorizedMailDomains: string[];
}>({
  mockPageId: "idp-review-user-profile.ftl",
  mockData: [
    {
      pageId: "login-idp-link-email.ftl",
      realm: {
        displayNameHtml:
            "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "idp-review-user-profile.ftl",
      realm: {
        displayNameHtml:
            "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-idp-link-confirm.ftl",
      realm: {
        displayNameHtml:
            "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-page-expired.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-verify-email.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-reset-password.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "terms.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-otp.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
      auth: {
        showTryAnotherWayLink: true,
        showUsername: true,
        attemptedUsername: "Nachwahl",
      },
    },
    {
      pageId: "error.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "webauthn-authenticate.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
      message: {
        type: "error",
      },
      auth: {
        showTryAnotherWayLink: true,
        showUsername: true,
        attemptedUsername: "Nachwahl",
      },
      authenticators: {
        authenticators: [
          {
            label: "WebAuthn",
            createdAt: "2021-03-01T00:00:00.000Z",
            credentialId: "credentialId",
          },
        ],
      },
    },
    {
      pageId: "login.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
      social: {
        providers: [
          {
            alias: "discord",
            displayName: "Discord",
          },
          {
            alias: "github",
            displayName: "GitHub",
          },
        ],
      },
      locale: {
        currentLanguageTag: "en",
      },
    },
    {
      pageId: "register.ftl",
      realm: {
        displayNameHtml:
          "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
        displayName: "Build the Earth",
      },
      recaptchaRequired: true,
      recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
