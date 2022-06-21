#!/bin/bash
sudo amazon-linux-extras install epel -y
sudo yum install -y certbot python2-certbot-nginx

echo "Copying over SQLite db..."
sudo aws s3 cp s3://affix-db/AffixDb.db /var/app/current/AffixDb.db
echo "Setting permissions..."
sudo chown -R webapp:webapp /var/app/current/AffixDb.db
sudo chmod -R 777 /var/app
sudo chmod -R 777 /var/app/current
echo "Permissons set."
echo "Restarting nginx..."
sudo systemctl restart nginx
echo "Successfully executed 01_cerbot.sh."