import { getKcContext } from "keycloakify/login";

export const { kcContext } = getKcContext<{
  pageId: "register.ftl";
  authorizedMailDomains: string[];
}>({
  /*
  TODO:
  - login-update-password
  - login-update-profile
  - logout-confirm
  - saml-post-form
  - update-email
  - update-user-profile
  */
  mockPageId: "login-reset-password.ftl",
  mockData: [
    {
      pageId: "login-idp-link-email.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "idp-review-user-profile.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-idp-link-confirm.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-page-expired.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-verify-email.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-reset-password.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "terms.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "login-otp.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
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
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
    {
      pageId: "webauthn-authenticate.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
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
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
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
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "Build the Earth",
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
