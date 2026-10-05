const { fork } = require('child_process');
const path = require('path');

const gatewayPath = path.join(__dirname, 'dist/apps/api-gateway/apps/api-gateway/src/main.js');
const notificationPath = path.join(__dirname, 'dist/apps/notification-service/apps/notification-service/src/main.js');

console.log('[Runner] Starting API Gateway HTTP service...');
const gateway = fork(gatewayPath);

if (process.env.RABBITMQ_URL) {
  console.log('[Runner] Starting Notification Microservice...');
  const notification = fork(notificationPath);

  notification.on('error', (err) => {
    console.error('[Notification Service Error]', err);
  });

  notification.on('exit', (code) => {
    console.warn(`[Notification Service Exited] code ${code}`);
  });
} else {
  console.warn('[Runner] RABBITMQ_URL is not set; notification microservice not started.');
}

gateway.on('exit', (code) => {
  console.error(`[API Gateway Exited] code ${code}`);
  process.exit(code || 0);
});
