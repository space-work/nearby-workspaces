const nearbyAPI = 'http://localhost:5001/nearbyworkspaces-api';
const amenitiesAPI = '';
const descriptionAPI = '';
const photoAPI = '';

export const getWorkspaces = () => {
  return new Promise(async (resolve, reject) => {
    const id = parseInt(window.location.pathname.split('/')[2]);
    if (typeof id !== 'number') {
      resolve(false);
    }
    try {
      const { data: { nearbyWorkspaces }} = await axios.get(`${nearbyAPI}/buildings/${id}`);
      console.log(nearbyWorkspaces);
      resolve(nearbyWorkspaces);
    } catch (error) {
      reject(error);
    }
  })
  .catch(error => console.log(error));
};

const getWorkspace = (id) => {

};

const getPhoto = (id) => {

};

const getAmenities = (id) => {

};

export const getWorkspaceInfo = (id) => {
  return new Promise( async (resolve, reject) => {
    try {
      const description = await getWorkspace(id);
      const photo = await getPhoto(id);
      const amenities = await getAmenities(id);
      const info = {
        description: description.data,
        photo: photo.data,
        amenities: amenities.data
      };
      resolve(info);
    } catch (error) {
      reject(error);
    }
  })
    .catch(err => console.log(err));
};