#!/bin/sh

set -e

react-env --path /var/.env --dest /usr/share/nginx/html

exec "$@"


