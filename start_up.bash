#!/bin/bash

SERVICE_NAME="ttandco_website"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
NODE_APP_PATH="/usr/ttandco-website/.output/server/index.mjs"

# Remove the existing service file if it exists
if [ -f "$SERVICE_FILE" ]; then
    sudo rm "$SERVICE_FILE"
fi

# Create the systemd service file
sudo bash -c "cat > $SERVICE_FILE" <<EOL
[Unit]
Description=Node.js Application
After=network.target

[Service]
Environment=PORT=80
ExecStart=/usr/bin/node $NODE_APP_PATH
Restart=always
RestartSec=10
User=nobody
Group=nogroup
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