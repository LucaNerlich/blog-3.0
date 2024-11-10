# https://sreyaj.dev/deploy-nodejs-applications-on-a-vps-using-coolify-with-dockerfile
FROM node:20-alpine

ARG PORT

ENV PORT=$PORT

# https://stackoverflow.com/a/65443098/4034811
WORKDIR /app
# starts in repo root
COPY . /app

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run generate
RUN npm run coolify-build

# Expose port
EXPOSE $PORT

# Start the Docusaurus application
CMD ["npm", "run", "coolify"]
