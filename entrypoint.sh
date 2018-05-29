#!/usr/bin/env sh
bash
yarn global add create-react-app@1.3.3
create-react-app fe --scripts-version custom-react-scripts
cd fe
chown node:node -R .
yarn install
yarn start