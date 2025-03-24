#!/bin/bash

SERVICE_NAME="ttandco_website"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
NODE_APP_PATH="/usr/ttandco-website/.output/server/index.mjs"

# Stop the service if it is running
sudo systemctl stop $SERVICE_NAME

# Remove the existing service file if it exists
if [ -f "$SERVICE_FILE" ]; then
    sudo rm "$SERVICE_FILE"
fi

# Create the systemd service file
sudo bash -c "cat > $SERVICE_FILE" <<EOL
[Unit]
Description=ttandco web
After=network.target

[Service]
ExecStart=/root/.nvm/versions/node/v22.14.0/bin/node $NODE_APP_PATH
Restart=always
RestartSec=10
User=root
Group=root
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=$SERVICE_NAME

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd daemon to apply changes
sudo systemctl daemon-reload

# Start the service
sudo systemctl start $SERVICE_NAME

# Enable the service to start on boot
sudo systemctl enable $SERVICE_NAME

echo "Service $SERVICE_NAME has been created and started."