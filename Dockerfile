FROM node:10.12.0

RUN apt-get update && apt-get install -y cron logrotate

RUN mkdir -p /usr/src/app
COPY lib /usr/src/app/lib
COPY index.js /usr/src/app/
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

COPY ./scripts/log-rotation /etc/logrotate.d/my-cron-job

COPY ./scripts/crontab /tmp/crontab

RUN touch /etc/cron.d/my-cron-job
RUN chmod 0644 /etc/cron.d/my-cron-job
RUN touch /var/log/cron.log

COPY ./scripts/setupCron.sh /tmp/setupCron.sh
RUN chmod +x /tmp/setupCron.sh

CMD ["/tmp/setupCron.sh"]
