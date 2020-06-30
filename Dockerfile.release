# Build
FROM cypress/browsers:node12.13.0-chrome80-ff74
USER root
ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code
RUN npm i yarn -g \
  && npm i http-server -g \
  && yarn


ARG gitCommit
ENV GIT_COMMIT ${gitCommit}

CMD ["/code/start.sh"]