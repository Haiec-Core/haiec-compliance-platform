# You can use most Debian-based base images
FROM ubuntu:22.04

# Install dependencies and customize sandbox
RUN apt-get update && apt-get install -y git curl jq
# Install Node.js 22 (current LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs
RUN corepack enable


COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Set repository variables
ENV REPO_NAME=nextbase-component-kit
ENV REPO_PATH=/home/user/workspace/$REPO_NAME

# Copy environment file and set variables
COPY .env.sandbox.local /tmp/.env.sandbox.local
RUN set -a && . /tmp/.env.sandbox.local && set +a && \
    echo "TURBOPUFFER_WRITE_API_KEY=${TURBOPUFFER_WRITE_API_KEY}" >> /etc/environment && \
    echo "GITHUB_TOKEN=${GITHUB_TOKEN}" >> /etc/environment

# Fetch GitHub user details and configure git
RUN . /tmp/.env.sandbox.local && \
    # Clean the token (remove any trailing characters like % and whitespace)
    CLEAN_TOKEN=$(echo "$GITHUB_TOKEN" | tr -d '\r\n%' | xargs) && \
    if [ -z "$CLEAN_TOKEN" ]; then \
        echo "Error: GITHUB_TOKEN environment variable not set" && exit 1; \
    fi && \
    echo "Fetching GitHub user data..." && \
    USER_DATA=$(curl -s -f -H "Authorization: token $CLEAN_TOKEN" https://api.github.com/user) && \
    if [ $? -ne 0 ] || [ -z "$USER_DATA" ]; then \
        echo "Error: Failed to fetch GitHub user data" && exit 1; \
    fi && \
    echo "Parsing user data..." && \
    # Use grep and sed to extract values directly, avoiding jq control character issues
    GIT_LOGIN=$(echo "$USER_DATA" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/') && \
    GIT_NAME=$(echo "$USER_DATA" | grep -o '"name"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' | head -1) && \
    GIT_EMAIL=$(echo "$USER_DATA" | grep -o '"email"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"email"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' | head -1) && \
    # Use login as fallback for name if name is empty
    if [ -z "$GIT_NAME" ]; then \
        GIT_NAME="$GIT_LOGIN"; \
    fi && \
    # Use generated email if email is empty
    if [ -z "$GIT_EMAIL" ]; then \
        GIT_EMAIL="${GIT_LOGIN}@users.noreply.github.com"; \
    fi && \
    if [ -z "$GIT_LOGIN" ]; then \
        echo "Error: Could not extract GitHub login from API response" && \
        echo "API Response (first 500 chars):" && echo "$USER_DATA" | head -c 500 && exit 1; \
    fi && \
    echo "Configuring git for user: $GIT_NAME ($GIT_EMAIL)" && \
    git config --global user.name "$GIT_NAME" && \
    git config --global user.email "$GIT_EMAIL" && \
    git config --global init.defaultBranch main && \
    echo "REPO_URL=https://oauth2:$CLEAN_TOKEN@github.com/$GIT_LOGIN/nextbase-component-kit.git" >> /etc/environment && \
    echo "GITHUB_TOKEN=$CLEAN_TOKEN" >> /etc/environment

RUN mkdir -p workspace
WORKDIR /home/user/workspace

# Clone the repository
RUN . /etc/environment && \
    git clone "$REPO_URL"

WORKDIR $REPO_PATH

RUN corepack prepare pnpm@latest --activate
RUN pnpm install

RUN pnpm build --turbo

VOLUME /mnt/cache