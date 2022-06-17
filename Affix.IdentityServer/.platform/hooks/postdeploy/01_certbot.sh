#!/bin/bash
echo "Executing 01_cerbot.sh."
# Install certbot dependencies
sudo amazon-linux-extras install epel -y
sudo yum install -y certbot python2-certbot-nginx
# Create the directory for the SQLite db
DIR="/var/app/current/Data"
echo "Checking if SQLite directory exists..."
if [ -d "$DIR" ]
then
    echo "SQLite directory already exists."
else
    echo "Creating SQLite directory..."
    sudo mkdir -m 777 "$DIR"
    echo "Successfully created SQLite directory"
fi

DIR2="/etc/keys"
echo "Checking if keys directory exists..."
if [ -d "$DIR2" ]
then
    echo "Keys directory already exists."
else
    echo "Creating keys directory..."
    sudo mkdir -m 777 "$DIR2"
    echo "Successfully created keys directory"
fi

echo "Copying over SQLite db..."
sudo aws s3 cp s3://affix-is-db/AffixIdentityDb.db /var/app/current/AffixIdentityDb.db
echo "Setting permissions..."
sudo chown -R webapp:webapp /var/app/current/AffixIdentityDb.db
sudo chmod -R 777 /var/app
sudo chmod -R 777 /var/app/current
sudo chmod -R 777 /etc/keys
sudo chown -R webapp:webapp /etc/keys
echo "Permissons set."
echo "Restarting nginx..."
sudo systemctl restart nginx
echo "Successfully executed 01_cerbot.sh."