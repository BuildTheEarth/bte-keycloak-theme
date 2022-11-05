import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } =
  getKcContext<// NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
  // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
  // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
  { pageId: "register.ftl"; authorizedMailDomains: string[] }>({
    // Uncomment to test the login page for development.
    mockPageId: "register.ftl",
    mockData: [
      {
        pageId: "login.ftl",
        locale: {
          //When we test the login page we do it in french
          currentLanguageTag: "en",
        },
      },
      {
        //NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
        pageId: "register.ftl",
        realm: {
          displayNameHtml:
            "<img src='/keycloak_static/resources/img/logo.png' width='50px'>",
          displayName: "Build the Earth",
        },
        recaptchaRequired: true,
        recaptchaSiteKey: "6Ldfnt0iAAAAACDXEj3_nf_fwpUl3MA9OuTjiMDA",
      },
    ],
  });

export type KcContext = NonNullable<typeof kcContext>;
