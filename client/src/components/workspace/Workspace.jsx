const { useEffect, useState } = React;

export default ({ location: { workspaceId } } ) => {
  const [space, setSpace] = useState(null);
  useEffect(async () => {
    let mnt = true;

    return () => mnt = false;
  })
  return (
    <div>
      <h4>{ workspaceId }</h4>
    </div>
  )
}