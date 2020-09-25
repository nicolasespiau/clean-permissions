FROM node

COPY . /var/www
WORKDIR /var/www

RUN npm i

CMD ["node", "index.js", "--trace-warnings", "--unhandled-rejections=strict", "--config", "/var/www/config/app.conf.json"]