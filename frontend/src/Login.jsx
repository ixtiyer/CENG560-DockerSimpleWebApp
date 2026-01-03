import { useState } from "react";
import { MyCart } from "./MyCart";

export const Login = ({ apiBase, auth, setAuth, cart, setCart }) => {
    const [name, setName] = useState('Mr.Shopper');
    const [email, setEmail] = useState('demo@shop.com');
    const [password, setPassword] = useState('password123');
    const [authError, setAuthError] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            const res = await fetch(`http://localhost${apiBase}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || `Login failed (${res.status})`);
            }
            const json = await res.json();
            setAuth(json);
            setExpanded(false);
        } catch (err) {
            setAuthError(err.message);
        }
    }

    const handleSignUpFormSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            const res = await fetch(`http://localhost${apiBase}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || `Signup failed (${res.status})`);
            }
            const json = await res.json();
            setAuth(json);
            alert("You have succesfully signed in!");
            setExpanded(false);
        } catch (err) {
            setAuthError(err.message);
        }
    }

    return (<>
        <div className="card form-card" style={{
            height: expanded ? "15rem" : auth ? "3rem" : "2rem",
            padding: auth ? "0.5rem 1rem 0.5rem 0.5rem" : "",
            transition: "all .2s ease-in-out"
        }}>
            {auth &&
                <div className="auth-status">
                    <MyCart cart={cart} setCart={setCart} />

                    <div style={{ display: "flex", flex: "1", justifyContent: "end" }}>
                        <div style={{ display: "grid", margin: "0 1rem 0 0" }} >
                            <small className="muted"> Logged in as</small>
                            <b>{auth.user.name}</b>
                        </div>

                        <button
                            onClick={() => {
                                setAuth(null);
                                setAuthError('');
                                setExpanded(false);
                            }}
                            style={{
                            }}
                            className="button-red"
                        >
                            <i className='pi pi-fw pi-sign-out' style={{ marginRight: ".5rem" }} />
                            Secure Logout
                        </button>
                    </div>
                </div>
            }

            {!auth && !expanded && <div className="auth-status">
                <label className="muted">You have not logged in yet! </label>
                <button className="button-blue" style={{}} onClick={() => setExpanded(true)}>
                    <i className='pi pi-fw pi-expand' style={{ marginRight: ".5rem" }} />
                    Open Login Panel
                </button>
            </div>}

            {!auth && expanded && <div className=""
                style={{ display: "grid", gridTemplateColumns: "calc(50%) calc(50%)" }}>
                <form
                    className="login-form"
                    onSubmit={handleLoginFormSubmit}
                    style={{ borderRight: "2px solid #afafaf" }}
                >
                    <label className="muted">You can use demo@shop.com / password123</label>
                    <div className="field">
                        <label style={{ margin: "-.25rem .5rem" }}>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </div>
                    <div className="field">
                        <label style={{ margin: "-.25rem .5rem" }}>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" style={{ width: "100%" }} className="button-green">
                            <i className='pi pi-fw pi-sign-in' style={{ marginRight: ".5rem" }} />
                            Login to Shop
                        </button>
                        {authError && <span className="error">{authError}</span>}
                    </div>
                </form>

                <form
                    className="signup-form"
                    onSubmit={handleSignUpFormSubmit}
                >
                    <div className="field">
                        <label style={{ margin: "-.25rem .5rem" }}>Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className="field">
                        <label style={{ margin: "-.25rem .5rem" }}>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </div>
                    <div className="field">
                        <label style={{ margin: "-.25rem .5rem" }}>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" style={{ width: "100%" }} className="button-blue">
                            <i className='pi pi-fw pi-user-plus' style={{ marginRight: ".5rem" }} />
                            Sign Up to Shop
                        </button>
                        {authError && <span className="error">{authError}</span>}
                    </div>
                </form>
            </div>}
        </div>
    </>);
}