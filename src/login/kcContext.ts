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
  mockPageId: "login-reset-password.ftl",
  mockData: [
    {
      pageId: "login-idp-link-email.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-idp-link-confirm.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "idp-review-user-profile.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-page-expired.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-verify-email.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-reset-password.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "terms.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login-otp.ftl", // Done
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
      pageId: "error.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "login.ftl", // Done
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
        ],
      },
      locale: {
        currentLanguageTag: "en",
      },
    },
    {
      pageId: "register.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "info.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
    {
      pageId: "logout-confirm.ftl", // Done
      realm: {
        displayNameHtml: "/keycloak_static/resources/img/logo.png",
        displayName: "BuildTheEarth",
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
