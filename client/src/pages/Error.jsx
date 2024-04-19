import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "An error occured!";
    let message = "Something went wrong!";


    if (error.status === 404) {
        title = "Not found!";
        message = "Could not find resource or page.";
    };

    return (
        <div className="flex__column">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    );
}
