import { Anchor, Button, Container, Text, Title } from "@mantine/core";

import { PageProps } from "keycloakify/login";
import AuthCode from "login/components/AuthCode";
import { LayoutTitle } from "login/components/LayoutTitle";
import { KcContext } from "login/kcContext";
import { useState } from "react";
import Layout from "../components/Layout";
import type { I18n } from "../i18n";

export default function LoginOtp(
  props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { otpLogin, url, auth } = kcContext;

  const { msg, msgStr } = i18n;

  const [result, setResult] = useState<string>();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <Layout
      hideLoggedIn={true}
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
    >
      <Text color={"dimmed"}>
        {msg("attemptedUsernameGreeting", auth?.attemptedUsername)}
        {", "}
        <Anchor href={url.loginRestartFlowUrl}>{msg("notYou")}</Anchor>
      </Text>
      <LayoutTitle >
        {msg("doLogIn")}
      </LayoutTitle>

      <Text mb="xs">{msg("loginOtpOneTime")}</Text>
      <AuthCode onChange={handleOnChange} allowedCharacters={"numeric"} />
      <form action={url.loginAction} method="post">
        <input
          name="otp"
          autoComplete="off"
          type="text"
          value={result}
          hidden
        />
        <Button fullWidth mt="xl" color={"white"} type="submit">
          {msgStr("doLogIn")}
        </Button>
      </form>
    </Layout>
  );
}
