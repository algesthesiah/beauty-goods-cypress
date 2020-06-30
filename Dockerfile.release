# Build
FROM cypress/browsers:node12.13.0-chrome80-ff74

ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code
RUN npm i yarn -g \
  && yarn


ARG gitCommit
ENV GIT_COMMIT ${gitCommit}

CMD ["node","/code/scripts/cypress.js"]
