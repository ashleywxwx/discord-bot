FROM keymetrics/pm2:18-alpine

COPY src src/
COPY package*.json .
COPY ecosystem.config.js .

RUN npm install --omit=dev

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
