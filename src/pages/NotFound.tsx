import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumb pageName="" />

      <div className="bg-background flex max-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Oops, page not found!
          </h1>
          <p className="text-muted-foreground mt-4">
            The page you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <button
              onClick={goBack}
              className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
