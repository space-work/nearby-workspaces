const { useState, useEffect } = React;
import { getWorkspaces, getIdFromParam } from './actions/'
//components
import Title from './components/Title.jsx';
import WorkspaceContainer from './components/WorkspaceContainer.jsx';

const App = () => {
  const [locs, setLocs] = useState(null);

  // get workspaces and set to state
  useEffect( async () => {
    let mnt = true;
    getIdFromParam();
    const locations = await getWorkspaces();
    if (mnt) {
      setLocs(locations);
    }
    return () => mnt = false;
  }, []);

  return (
    <div className="">
      <Title />
      <WorkspaceContainer locations={ locs }/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));