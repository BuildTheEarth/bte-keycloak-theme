import React, { useRef, useState, memo } from "react";
import { base64url } from "rfc4648";
import { useConstCallback } from "powerhooks/useConstCallback";
import Layout, { TemplateProps } from "components/Layout";
import { KcContextBase, KcProps, MessageKeyBase } from "keycloakify";
import { Box, Button, Title } from "@mantine/core";
import * as securityKeyAnimation from "../animations/fido.json";
import Lottie from "react-lottie";
import {I18n} from "../i18n";

export type WebauthnAuthenticateProps = KcProps & {
  kcContext: KcContextBase.WebauthnAuthenticate;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
  Template?: (props: TemplateProps) => JSX.Element | null;
};

const WebauthnAuthenticate = memo((props: WebauthnAuthenticateProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    ...kcProps
  } = props;

  const { url } = kcContext;

  const { msg, msgStr } = i18n;

  const {
    authenticators,
    challenge,
    shouldDisplayAuthenticators,
    userVerification,
    rpId,
  } = kcContext;
  const createTimeout = Number(kcContext.createTimeout);
  const isUserIdentified = kcContext.isUserIdentified == "true";

  const webAuthnAuthenticate = async () => {
    if (!isUserIdentified) {
      return;
    }
    const allowCredentials = authenticators.authenticators.map(
      (authenticator: any) =>
        ({
          id: base64url.parse(authenticator.credentialId, { loose: true }),
          type: "public-key",
        } as PublicKeyCredentialDescriptor)
    );
    // Check if WebAuthn is supported by this browser
    if (!window.PublicKeyCredential) {
      setError(msgStr("webauthn-unsupported-browser-text"));
      submitForm();
      return;
    }

    const publicKey: PublicKeyCredentialRequestOptions = {
      rpId,
      challenge: base64url.parse(challenge, { loose: true }),
    };

    if (createTimeout !== 0) {
      publicKey.timeout = createTimeout * 1000;
    }

    if (allowCredentials.length) {
      publicKey.allowCredentials = allowCredentials;
    }

    if (userVerification !== "not specified") {
      publicKey.userVerification = userVerification;
    }

    try {
      const resultRaw = await navigator.credentials.get({ publicKey });
      if (!resultRaw || resultRaw.type != "public-key") return;
      const result = resultRaw as PublicKeyCredential;
      if (!("authenticatorData" in result.response)) return;
      const response = result.response as AuthenticatorAssertionResponse;
      const clientDataJSON = response.clientDataJSON;
      const authenticatorData = response.authenticatorData;
      const signature = response.signature;

      setClientDataJSON(
        base64url.stringify(new Uint8Array(clientDataJSON), { pad: false })
      );
      setAuthenticatorData(
        base64url.stringify(new Uint8Array(authenticatorData), { pad: false })
      );
      setSignature(
        base64url.stringify(new Uint8Array(signature), { pad: false })
      );
      setCredentialId(result.id);
      setUserHandle(
        base64url.stringify(new Uint8Array(response.userHandle!), {
          pad: false,
        })
      );
      submitForm();
    } catch (err) {
      setError(String(err));
      submitForm();
    }
  };

  const webAuthForm = useRef<HTMLFormElement>(null);
  const submitForm = useConstCallback(() => {
    webAuthForm.current!.submit();
  });

  const [clientDataJSON, setClientDataJSON] = useState("");
  const [authenticatorData, setAuthenticatorData] = useState("");
  const [signature, setSignature] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [error, setError] = useState("");

  return (
    <Layout {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}>
      <Title>{msg("webauthn-login-title")}</Title>
      <Box my="md">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: securityKeyAnimation
          }}
          height={250}
          isClickToPauseDisabled={true}
        />
      </Box>
      <form
        id="webauth"
        action={url.loginAction}
        ref={webAuthForm}
        method="post"
      >
        <input
          type="hidden"
          id="clientDataJSON"
          name="clientDataJSON"
          value={clientDataJSON}
        />
        <input
          type="hidden"
          id="authenticatorData"
          name="authenticatorData"
          value={authenticatorData}
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={signature}
        />
        <input
          type="hidden"
          id="credentialId"
          name="credentialId"
          value={credentialId}
        />
        <input
          type="hidden"
          id="userHandle"
          name="userHandle"
          value={userHandle}
        />
        <input type="hidden" id="error" name="error" value={error} />
      </form>
      {authenticators &&
        (() => (
          <form id="authn_select">
            {authenticators.authenticators.map((authenticator) => (
              <input
                type="hidden"
                name="authn_use_chk"
                value={authenticator.credentialId}
                key={authenticator.credentialId}
              />
            ))}
          </form>
        ))()}
      {authenticators &&
        shouldDisplayAuthenticators &&
        (() => (
          <>
            {authenticators.authenticators.length > 1 && (
              <p>{msg("webauthn-available-authenticators")}</p>
            )}
            <div>
              {authenticators.authenticators.map((authenticator) => (
                <div id="kc-webauthn-authenticator">
                  <div>
                    <i />
                  </div>
                  <div>
                    <div id="kc-webauthn-authenticator-label">
                      {authenticator.label}
                    </div>

                    {authenticator.transports &&
                      authenticator.transports.displayNameProperties.length && (
                        <div id="kc-webauthn-authenticator-transport">
                          {authenticator.transports.displayNameProperties.map(
                            (transport: MessageKeyBase, index: number) => (
                              <>
                                <span>{msg(transport)}</span>
                                {index <
                                  authenticator.transports.displayNameProperties
                                    .length -
                                    1 && <span>{", "}</span>}
                              </>
                            )
                          )}
                        </div>
                      )}

                    <div>
                      <span id="kc-webauthn-authenticator-created-label">
                        {msg("webauthn-createdAt-label")}
                      </span>
                      <span id="kc-webauthn-authenticator-created">
                        {authenticator.createdAt}
                      </span>
                    </div>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </>
        ))()}
      <Button
        onClick={() => webAuthnAuthenticate()}
        autoFocus={true}
        id="authenticateWebAuthnButton"
      >
        {msgStr("webauthn-doAuthenticate")}
      </Button>

    </Layout>
  );
});

export default WebauthnAuthenticate;
