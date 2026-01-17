FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 8000

CMD ["sh", "-c", "npm run db:generate && npm run dev"]

