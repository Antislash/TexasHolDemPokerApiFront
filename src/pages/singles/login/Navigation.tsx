import { Login } from "./Login";

export function Navigation() {
    return <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Navbar</a>
            <Login />
        </nav>;
}