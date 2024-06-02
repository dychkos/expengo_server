FROM node:20.14.0 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:20.14.0 as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [ "npm", "run", "start:migrate:prod" ]

#FROM node:20.11.1 as build
#
#WORKDIR /app
#RUN apt-get install -y openssl
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#COPY . .
#RUN npx prisma generate
#COPY prisma ./prisma/
#RUN npm run build
#
#FROM node:20.11.1
#WORKDIR /app
#COPY --chown=node:node --from=build /app/dist ./dist
#COPY --chown=node:node --from=build /app/.env .env
#COPY --chown=node:node --from=build /app/package.json .
#COPY --chown=node:node --from=build /app/package-lock.json .
#RUN npm install --omit=dev
#COPY --chown=node:node --from=build /app/node_modules/.prisma/client  ./node_modules/.prisma/client
#
#ENV NODE_ENV production
#EXPOSE 3000
#CMD ["npm", "run","start:migrate:prod"]

