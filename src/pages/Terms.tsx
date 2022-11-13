import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import { useDownloadTerms } from "keycloakify";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { evtTermMarkdown } from "keycloakify/lib/components/Terms";
import { useRerenderOnStateChange } from "evt/hooks";
import tos_en_url from "../terms/tos_en.md";
import tos_fr_url from "../terms/tos_fr.md";
import { clsx } from "keycloakify/lib/tools/clsx";
import Layout from "components/Layout";
import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";

/**
 * NOTE: Yo do not need to do all this to put your own Terms and conditions
 * this is if you want component level customization.
 * If the default works for you you can just use the useDownloadTerms hook
 * in the KcApp.tsx
 * Example: https://github.com/garronej/keycloakify-starter/blob/a20c21b2aae7c6dc6dbea294f3d321955ddf9355/src/KcApp/KcApp.tsx#L14-L30
 */

type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl" }>;

const Terms = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Terms; i18n: I18n } & KcProps) => {
    const { url } = kcContext;
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    useDownloadTerms({
      kcContext,
      downloadTermMarkdown: async ({ currentLanguageTag }) => {
        const markdownString = await fetch(
          (() => {
            switch (currentLanguageTag) {
              case "fr":
                return tos_fr_url;
              default:
                return tos_en_url;
            }
          })()
        ).then((response) => response.text());

        return markdownString;
      },
    });

    useRerenderOnStateChange(evtTermMarkdown);

    if (evtTermMarkdown.state === undefined) {
      return null;
    }

    const { msg, msgStr } = i18n;

    return (
      <Layout
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={false}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Title
            py="md"
            sx={(theme) => ({
              boxShadow: `5px -1px 26px 17px ${
                dark ? theme.colors.dark[7] : "white"
              }`,
              zIndex: 99,
            })}
          >
            {msg("termsTitle")}
          </Title>
          <ScrollArea
            sx={(theme) => ({
              flex: 1,
              height: "100%",
            })}
          >
            {evtTermMarkdown.state && (
              <TypographyStylesProvider>
                <Box my="xl">
                  <ReactMarkdown>{evtTermMarkdown.state}</ReactMarkdown>
                </Box>
              </TypographyStylesProvider>
            )}
          </ScrollArea>
          <form className="form-actions" action={url.loginAction} method="POST">
            <Flex
              justify={"flex-end"}
              gap="sm"
              pt="md"
              sx={(theme) => ({
                boxShadow: `5px -1px 26px 17px ${
                  dark ? theme.colors.dark[7] : "white"
                }`,
                zIndex: 99,
              })}
            >
              <Button
                color={"red"}
                variant="outline"
                name="cancel"
                id="kc-decline"
                type="submit"
              >
                {msgStr("doDecline")}
              </Button>
              <Button
                color={"green"}
                name="accept"
                id="kc-accept"
                type="submit"
              >
                {msgStr("doAccept")}
              </Button>
            </Flex>
          </form>
        </Box>
      </Layout>
    );
  }
);

export default Terms;
