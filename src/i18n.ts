import { useI18n as useI18nBase } from "keycloakify";

type Props = Omit<Parameters<typeof useI18nBase>[0], "extraMessages">;

export function useI18n(props: Props) {
  const { kcContext } = props;
  return useI18nBase({
    kcContext,
    extraMessages: {
      en: {
        registerTitle: "Nice to have you here.",
        registerText: "Please enter your details to get started!",
        backToLogin: "Already have an account? Login here.",
      },
      de: {
        registerTitle: "Schön, dass du hier bist.",
        registerText: "Bitte gebe deine Daten unten ein, um loszulegen!",
        backToLogin: "Du hast bereits einen Account? Hier einloggen.",
      },
    },
  });
}

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
