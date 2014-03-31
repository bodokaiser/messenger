exports.server = {
  ip: process.env.OPENSHIFT_NODEJS_IP || null,
  port: process.env.OPENSHIFT_NODEJS_PORT || 80
};
