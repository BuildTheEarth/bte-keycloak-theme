#!/usr/bin/env bash

docker rm keycloak-testing-container || true

cd "T:/Dev/bte/website/bte-keycloak-theme/build_keycloak"

docker run \
   -p 8080:8080 \
   --name keycloak-testing-container \
   -e KEYCLOAK_ADMIN=admin \
   -e KEYCLOAK_ADMIN_PASSWORD=admin \
   -e JAVA_OPTS=-Dkeycloak.profile=preview \
   -v "T:/Dev/bte/website/bte-keycloak-theme/build_keycloak/src/main/resources/theme/bte-theme":"/opt/keycloak/themes/bte-theme":rw \
   -it quay.io/keycloak/keycloak:20.0.1 \
   start-dev
