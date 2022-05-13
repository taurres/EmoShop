# syntax=docker/dockerfile:1

FROM node:16-alpine as builder
WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/
RUN npm install --prefix frontend

COPY ./frontend ./frontend
RUN npm run build --prefix frontend


FROM node:16-alpine
EXPOSE 4000
ENV NODE_ENV=production
WORKDIR /app

COPY ./backend ./backend
COPY ./package.json ./package-lock.json ./
COPY --from=builder /app/frontend/build/ ./frontend/build/
RUN npm install

CMD ["npm", "start"]