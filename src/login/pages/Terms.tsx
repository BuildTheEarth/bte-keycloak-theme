import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
} from "@mantine/core";

import { Evt } from "evt";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import Layout from "login/components/Layout";
import { PageProps } from "keycloakify/login";
import ReactMarkdown from "react-markdown";
import { evtTermMarkdown } from "keycloakify/login/lib/useDownloadTerms";
import tos_en_url from "../terms/tos_en.md";
import { useDownloadTerms } from "keycloakify/login";
import { useRerenderOnStateChange } from "evt/hooks";

type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl" }>;

const evtTickCount = Evt.create(0);

setInterval(() => evtTickCount.state++, 1000);
export default function Terms(
  props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg, msgStr } = i18n;
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  useDownloadTerms({
    kcContext,
    downloadTermMarkdown: async ({ currentLanguageTag }) => {
      const resource = tos_en_url;

      if (resource.includes("\n")) return resource;

      const response = await fetch(resource);
      return response.text();
    },
  });

  useRerenderOnStateChange(evtTermMarkdown);

  const { url } = kcContext;

  const termMarkdown = evtTermMarkdown.state;

  if (termMarkdown === undefined) {
    return (
      <Layout
        {...{ kcContext, i18n, doUseDefaultCss, classes }}
        centeredContent={false}
        children={undefined}
      />
    );
  }

  return (
    <Layout
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      centeredContent={false}
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
            <Button color={"green"} name="accept" id="kc-accept" type="submit">
              {msgStr("doAccept")}
            </Button>
          </Flex>
        </form>
      </Box>
    </Layout>
  );
}
