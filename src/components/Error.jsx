import { useRouteError } from "react-router-dom";

const error = () => {
  const routeError = useRouteError();
  console.log(routeError);
  return (
    <div>
      <h1>Oooops!!!</h1>
      <h2>Something went wrong (wrong or undefined route little nigga)</h2>
      <h3>{routeError?.status}</h3>
      <h3>{routeError?.statusText}</h3>
    </div>
  );
};

export default error;
