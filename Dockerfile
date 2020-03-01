FROM ubuntu:16.04

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python \
    apt-utils \
    ca-certificates \
    apt-transport-https \
    openjdk-8-jre-headless \
    libgconf-2-4 \
    curl \
    xz-utils \
    unzip \
    bzip2 \
    wget \
    openssh-server \
    && rm -rf /var/lib/apt/lists/*

#==========
# Chrome
#==========
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install google-chrome-unstable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 10.2.1

#==========
# NodeJS
#==========
RUN curl -SLO https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz \
  && tar -xJf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 \
  && rm node-v$NODE_VERSION-linux-x64.tar.xz 

# Following line fixes
# https://github.com/SeleniumHQ/docker-selenium/issues/87
RUN echo "DBUS_SESSION_BUS_ADDRESS=/dev/null" >> /etc/environment

EXPOSE 4444

RUN ln -s /usr/lib/x86_64-linux-gnu/libnss3.so /usr/lib/libnss3.so

RUN mkdir -p /uitest \
    && cd /uitest
ADD package.json /uitest

WORKDIR /uitest
RUN npm install --production
ADD . /uitest
RUN /uitest/installpackages.sh

ENTRYPOINT  ["/uitest/local_run.sh"]