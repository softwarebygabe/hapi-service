FROM node:7.0.0

WORKDIR /code

COPY package.json /code/package.json
RUN npm install --production

COPY . /code

EXPOSE 8080

CMD ["node", "index.js", "8080"]
