import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = {
    margin: "auto",
};

function Loader() {
    // eslint-disable-next-line
    let [loading, setLoading] = useState(true);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="sweet-loading">
                <PacmanLoader
                    color='black'
                    loading={loading}
                    cssOverride={override}
                    size={25}
                    speedMultiplier={2}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loader;
