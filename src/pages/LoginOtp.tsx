import { Group, Input, Title, Text } from "@mantine/core";
import AuthCode from "components/AuthCode";
import Layout from "components/Layout";
import { KcContextBase, KcProps } from "keycloakify";
import React, { useEffect, memo, useState } from "react";
import type { I18n } from "../i18n";

export type LoginOtpProps = KcProps & {
  kcContext: KcContextBase.LoginOtp;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
};

const LoginOtp = memo((props: LoginOtpProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { otpLogin, url } = kcContext;

  const { msg, msgStr } = i18n;

  const [result, setResult] = useState<string>();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <Layout {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}>
      <Title color={"light"} sx={{ fontWeight: 700 }} mb="md">
        {msg("doLogIn")}
      </Title>

      <Text mb="xs">{msg("loginOtpOneTime")}</Text>
      <AuthCode onChange={handleOnChange} />
    </Layout>
  );
});

export default LoginOtp;
