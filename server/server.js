const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
require('./db');
const { workspaceRouter, notFound, errorHandler} = require('./controllers');
const placeholderData = require('./placeholderData');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));

//Main Route
app.use('/api/nearbyworkspaces/buildings', workspaceRouter);

//Service Data Dependencies
app.get('/workspace-api/workspace/:id', (req, res) => {
  res.json(placeholderData.workspaceData);
});

app.get('/api/workspace-description/:id', (req, res) => {
  res.json(placeholderData.workspaceDescriptionData);
});

app.get('/api/photos/:id', (req, res) => {
  //***keeping this code around since Becky has this service***
  // const { id } = req.params;
  // const API = `http://localhost:6001/api/photos/${id}`;
  // try {
  //   const{ data } = await axios.get(API);
  //     res.json(data);
  // } catch (error) {
  //   res.status(404).json();
  // }
  res.json(placeholderData.photosData);
});

app.get('/amenities-api/amenity/:id', (req, res) => {
  res.json(placeholderData.amenitiesData);
});

app.use('*', notFound);

app.use(errorHandler);

module.exports = app;
