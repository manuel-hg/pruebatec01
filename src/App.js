import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Login, Listado} from "./screens";

export default() => {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/usuarios"
                        element={<Listado />}
                    />
                </Routes>
            </Router>
        </>
    );
}