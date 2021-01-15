const nearbyAPI = 'http://localhost:5001/nearbyworkspaces-api';
const amenitiesAPI = '';
const descriptionAPI = '';
const photoAPI = '';

export const getIdFromParam = () => {
  console.log(window.location)
}

export const getWorkspaces = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: { nearbyWorkspaces }} = await axios.get(`${nearbyAPI}/buildings/1`);
      console.log(nearbyWorkspaces);
      resolve(nearbyWorkspaces);
    } catch (error) {
      reject(error);
    }
  })
  .catch(error => console.log(error));
};

export const getWorkspace = (id) => {

};