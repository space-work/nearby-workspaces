import { amenitiesService, photoService, descriptionService} from '../data/data.js';
import axios from 'axios';
const nearbyAPI = 'http://localhost:5001/api/nearbyworkspaces-api';
const amenitiesAPI = '';
const descriptionAPI = 'http://localhost:6060/api/workspace-description';
const ratesAPI = 'http://localhost:4000/workspace-api/workspace';
const photoAPI = '';

export const getWorkspaces = (url) => {
  return new Promise(async (resolve, reject) => {
    const id = parseInt(url.split('/')[2]);
    if (typeof id !== 'number') {
      resolve(false);
    }
    try {
      const { data: { nearbyWorkspaces }} = await axios.get(`${nearbyAPI}/buildings/${id}`);
      resolve(nearbyWorkspaces);
    } catch (error) {
      reject(error);
    }
  })
  .catch(error => console.log(error));
};

export const getDescription = (id) => {
  return axios.get(`${descriptionAPI}/${id}`);
};

export const getPhoto = (id) => {
  return new Promise( async (resolve, reject) => {
    const photo = {};
    photo.data = photoService.filter(pic => pic.workspaceId === id)[0];
    resolve(photo);
  });
};

export const getAmenities = async (id) => {
  return new Promise( async (resolve, reject) => {
    const amenities = {};
    amenities.data = amenitiesService.filter(am => am.workspaceId === id)[0];
    resolve(amenities);
  });
};

export const getRates = (id) => {
  return axios.get(`${ratesAPI}/${id}`);
}

export const getWorkspaceInfo = (id) => {
  return new Promise( async (resolve, reject) => {
    try {
      const description = await getDescription(id);
      const photo = await getPhoto(id);
      const amenities = await getAmenities(id);
      const rates = await getRates(id);
      const info = {
        description: description.data,
        photo: photo.data,
        amenities: amenities.data,
        rates: rates.data[0]
      };
      resolve(info);
    } catch (error) {
      reject(error);
    }
  })
    .catch(err => err);
};