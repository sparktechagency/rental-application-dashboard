import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-600">We couldn&apos;t find the page you&apos;re looking for.</p>
            {error && <p className="text-red-500 mt-2">Error: {error.statusText || error.message}</p>}
            <a href="/" className="mt-4 px-6 py-2 bg-primary text-white rounded-lg  transition">Go to Homepage</a>
        </div>
    );
};

export default ErrorPage;