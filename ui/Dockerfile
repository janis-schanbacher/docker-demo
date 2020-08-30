ARG NODE_VERSION=10.19.0
ARG YARN_VERSION=1.12.5
# ----------------------------------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine

# Install yarn
# RUN npm install -g yarn@${YARN_VERSION}

WORKDIR /app

COPY package.json yarn.lock ./

ARG YARN=unknown
RUN yarn install --non-interactive --check-files

# Copy app source code
COPY . ./app

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000

# Save timestamp of image building
RUN date -u > BUILD_TIME

# The main command to run when the container starts.
CMD yarn start

# Now build the image.
# We specify a tag via the -t option,
# so we can reference the image later on.
# docker build -t moviepilot_next:0.0.1 .
