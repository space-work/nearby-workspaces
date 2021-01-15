import Workspace from './workspace/workspace.jsx';

export default ({ locations }) => {

  if (locations === null) {
    return <div></div>
  }
  return (
    <div>
      { locations.map(location => <Workspace location={ location } />)}
    </div>
  );
};