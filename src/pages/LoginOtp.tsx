import {Group, Input, Title, Text, Button, Container, Anchor} from "@mantine/core";
import AuthCode from "components/AuthCode";
import Layout from "components/Layout";
import {KcContextBase, KcProps} from "keycloakify";
import React, {useEffect, memo, useState} from "react";
import type {I18n} from "../i18n";

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

    const {otpLogin, url, auth} = kcContext;

    const {msg, msgStr} = i18n;

    const [result, setResult] = useState<string>();
    const handleOnChange = (res: string) => {
        setResult(res);
    };

    return (
        <Layout hideLoggedIn={true} {...{kcContext, i18n, doFetchDefaultThemeResources, ...kcProps}}>
            <Container
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "100%",
                }}
                size="xs"
            >
                <Text color={"dimmed"}>{msg("attemptedUsernameGreeting", auth?.attemptedUsername)} <Anchor
                    href={url.loginRestartFlowUrl}>{msg("notYou")}</Anchor></Text>
                <Title color={"light"} sx={{fontWeight: 700}} mb="md">
                    {msg("doLogIn")}
                </Title>

                <Text mb="xs">{msg("loginOtpOneTime")}</Text>
                <AuthCode onChange={handleOnChange} allowedCharacters={"numeric"} />
                <form action={url.loginAction} method="post">
                    <input name="otp" autoComplete="off" type="text" value={result} hidden/>
                    <Button fullWidth mt="xl" color={"white"} type="submit">
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            </Container>

        </Layout>
    );
});

export default LoginOtp;
