FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npx prisma generate

EXPOSE 8000


CMD ["npm", "run", "dev"]

