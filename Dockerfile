FROM node:18.12
WORKDIR /user/src/app
COPY . /user/src/app
RUN npm install
RUN npm run build
EXPOSE 4173
