import { useEffect } from "react";

export const Products = ({ apiBase, products, setProducts, setLoading, setError, auth, cart, setCart }) => {
    useEffect(() => {
        const fetcher = async () => {
            try {
                const res = await fetch(`http://localhost${apiBase}/products`);
                if (!res.ok) throw new Error(`API error ${res.status}`);
                const json = await res.json();
                console.log(json);

                setProducts(json.products || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetcher();
    }, []);

    const handleAddtoCart = (product) => {
        if (cart?.some(c => c?.id === product?.id)) {
            alert("This item is already in your cart");
            return;
        }

        setCart([...cart, product]);
        alert("The item is added to your cart");
    }


    return (<>
        <div className="grid">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={'/static/' + product.imagefile} alt={product.name} />
                    <div className="content">
                        <div>
                            <div>{product.name}</div>
                            <i className="pi pi-star-fill" style={{ color: "#eecc22" }} />{product.rating}
                            <label className="muted"> ({product.ratedby})</label>
                        </div>
                        <div style={{ justifyContent: "center" }}>
                            <div className="price" style={{ textAlign: "center" }}>${Number(product.price).toFixed(2)}</div>
                            <button className="button-yellow"
                                onClick={() => handleAddtoCart(product)}
                                disabled={!auth}
                            >
                                <i className='pi pi-fw pi-cart-plus' style={{ marginRight: ".5rem" }} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>)
}