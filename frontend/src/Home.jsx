
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Login } from './Login';
import { Products } from './Products';

export const Home = ({ apiBase }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    return (<>
        <div className="app">
            <Header />

            <Login apiBase={apiBase} auth={auth} setAuth={setAuth} cart={cart} setCart={setCart} />
            <Products apiBase={apiBase}
                products={products} setProducts={setProducts}
                setLoading={setLoading} setError={setError}
                auth={auth} cart={cart} setCart={setCart}
            />
        </div>

        <Footer apiBase={apiBase} error={error} loading={loading} />
    </>);
}