import { useLocation } from "react-router-dom";

const NotAuthorized = () => {
  const location = useLocation();

  return (
    <div className="bg-slate-950 text-white text-4xl flex flex-col h-screen w-full items-center justify-center gap-8">
      <h1>Not Authorized</h1>
      {location.state?.from && (
        <p>
          You tried to access:{" "}
          <span className="bg-red-600 px-4">
            {location.state.from.pathname}
          </span>
        </p>
      )}
    </div>
  );
};

export default NotAuthorized;
