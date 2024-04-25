# RubyのバージョンをARGで定義
ARG RUBY_VERSION=ruby:3.2.2

# Node.jsのバージョンをARGで定義
ARG NODE_VERSION=19

FROM $RUBY_VERSION
ARG NODE_VERSION
ENV LANG=C.UTF-8 TZ=Asia/Tokyo
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq \
    && apt-get install -y build-essential nodejs yarn libvips postgresql-client \
    && apt-get clean
WORKDIR /app
RUN gem install bundler
COPY Gemfile Gemfile.lock yarn.lock /app/
RUN bundle install
RUN yarn install
COPY . /app