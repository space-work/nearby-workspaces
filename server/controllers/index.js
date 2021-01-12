const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const WorkspaceLocation = require('../db/models/WorkspaceLocation');

exports.getAddress = asyncHandler( async (req, res, next) => {
  const { workspaceId } = req.params;
  const workspaceLocation = await WorkspaceLocation.findOne({workspaceId});

  if (!workspaceLocation) {
    const err = new Error('No record associated to this id');
    err.status = 404;
    throw err;
  }

  res.status(200).json(workspaceLocation);

});

exports.getNearbyBuildings = asyncHandler( async (req, res, next) => {
  res.json(`buildings for id ${req.params.workspaceId}`);
});

exports.notFound = asyncHandler( async (req, res, next) => {
  const err = new Error('Endpoint does not exist');
  err.status = 404;
  throw err;
})

exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ status: err.status || 500, message: err.message});
};
