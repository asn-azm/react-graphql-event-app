const userResolver = require('./user');
const eventsResolver = require('./events');
const bookingResolver = require('./bookings');

const rootResolver = {
    ...userResolver,
    ...eventsResolver,
    ...bookingResolver
}

module.exports = rootResolver;