import { getKcContext } from "keycloakify/login";

export const { kcContext } = getKcContext<{
  pageId: "register.ftl";
  authorizedMailDomains: string[];
}>({
  /*
  TODO:
  - login-update-password
  - login-update-profile
  - saml-post-form
  - update-email
  - update-user-profile
  */
  mockPageId: "logout-confirm.ftl",
  mockData: [
    {
      pageId: "login-idp-link-email.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "idp-review-user-profile.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-idp-link-confirm.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-page-expired.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-verify-email.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-reset-password.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "terms.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-otp.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
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
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "webauthn-authenticate.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
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
        displayName: "BuildTheEarth",
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
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "info.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "logout-confirm.ftl",
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
