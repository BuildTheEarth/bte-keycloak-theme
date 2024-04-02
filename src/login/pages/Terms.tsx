import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
} from "@mantine/core";
import { PageProps, useDownloadTerms } from "keycloakify/login";

import { IconClipboard } from "@tabler/icons";
import { Evt } from "evt";
import { useRerenderOnStateChange } from "evt/hooks";
import { evtTermMarkdown } from "keycloakify/login/lib/useDownloadTerms";
import Layout from "login/components/Layout";
import { LayoutTitle } from "login/components/LayoutTitle";
import ReactMarkdown from "react-markdown";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import tos_en_url from "../terms/tos_en.md";

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
    <Layout {...{ kcContext, i18n, doUseDefaultCss, classes }}>
      <LayoutTitle icon={IconClipboard} color="gray">
        {msg("termsTitle")}
      </LayoutTitle>
      <ScrollArea h="50%">
        {evtTermMarkdown.state && (
          <TypographyStylesProvider>
            <ReactMarkdown>{evtTermMarkdown.state}</ReactMarkdown>
          </TypographyStylesProvider>
        )}
      </ScrollArea>
      <form className="form-actions" action={url.loginAction} method="POST">
        <Flex justify={"flex-end"} gap="sm" pt="md">
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
    </Layout>
  );
}
