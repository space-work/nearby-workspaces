const mongoose = require('mongoose');

const pointSchema = mongoose.Schema({
  type: {type: String, default: 'Point'},
  coordinates: {type: [Number]}
});

const workspaceLocationSchema = mongoose.Schema({
    workspaceSlug: String,
    workspaceId: Number,
    rawAddress: {
      type: String,
      required: true
    },
    geometry: pointSchema,
    coordinates: [Number],
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    country: String
});

workspaceLocationSchema.index({geometry: '2dsphere'});

module.exports = mongoose.model('WorkspaceLocation', workspaceLocationSchema);