#!/bin/bash
echo "Starting node-cron"


cp /etc/cron.daily/logrotate /etc/cron.hourly/logrotate


if [ -z "$TASK_SCHEDULE" ]; then
    TASK_SCHEDULE='* * * * *'
fi
echo "TASK_SCHEDULE => $TASK_SCHEDULE"


if [ -z "$NPM_COMMAND" ]; then
    NPM_COMMAND='start'
fi
export NPM_COMMAND=$NPM_COMMAND
echo "npm $NPM_COMMAND"


env                                           >> /tmp/.env
cat /tmp/.env                                 >> /etc/cron.d/my-cron-job
echo -n "$TASK_SCHEDULE" | cat - /tmp/crontab >> /etc/cron.d/my-cron-job


echo "Running cron"
touch /var/log/cron.log && cron && tail -f /var/log/cron.log
