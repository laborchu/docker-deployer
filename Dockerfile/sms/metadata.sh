#!/bin/sh

#480p
#ffmpeg -y -i /home/sms/recorder/live/480p/$1.flv -c copy  /home/sms/recorder/vod/480p/$1.flv

#720p
ffmpeg -y -i /home/sms/recorder/live/720p/$1.flv -vcodec copy -acodec aac -ac 2 -strict -2 /home/sms/recorder/vod/720p/$1.mp4
