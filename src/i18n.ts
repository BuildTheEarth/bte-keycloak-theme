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
        registerBackToLogin: "Already have an account? Login here.",
        loginTitle: "Hey! Welcome back.",
        loginText: "Please enter your details to continue!",
        or: "or",
        attemptedUsernameGreeting: "Hey, {0}",
        notYou: "Not you?",
      },
      de: {
        registerTitle: "Schön, dass du hier bist.",
        registerText: "Bitte gebe deine Daten unten ein, um loszulegen!",
        registerBackToLogin: "Du hast bereits einen Account? Hier einloggen.",
        loginTitle: "Hey! Willkommen zurück.",
        loginText: "Bitte gebe deine Daten unten ein, um fortzufahren!",
        or: "oder",
        attemptedUsernameGreeting: "Hey, {0}",
        notYou: "Nicht du?",
      },
    },
  });
}

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
