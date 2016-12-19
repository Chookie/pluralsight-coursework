const mongoUser = 'rgrjs';
const mongoPwd = '9996896728';

export default {
  port: process.env.port || 3002,
  mongo: process.env.MONGO_URL || `mongodb://${mongoUser}:${mongoPwd}@ds019766.mlab.com:19766/rgrjs`
}
