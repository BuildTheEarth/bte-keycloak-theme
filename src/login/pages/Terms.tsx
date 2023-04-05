import {
    evtTermMarkdown,
    useDownloadTerms
} from "keycloakify/login/lib/useDownloadTerms";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useRerenderOnStateChange } from "evt/hooks";
import tos_en_url from "../terms/tos_en.md";
import tos_fr_url from "../terms/tos_fr.md";

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
import { PageProps } from "keycloakify/login";
import Layout from "login/components/Layout";


type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl" }>;

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;


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
      <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
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
