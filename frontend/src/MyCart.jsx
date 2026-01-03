import { useRef } from "react";

export const MyCart = ({ cart, setCart }) => {
    const dialogRef = useRef(null);

    const removeFromCart = (product) => {
        if (cart?.some(c => c?.id === product?.id)) {
            setCart(cart.filter(c => c?.id !== product?.id))
        }
    }

    return (<>
        <button
            onClick={() => dialogRef.current?.showModal()}
            style={{ display: "flex", flex: ".5", height: "3rem", alignItems: "center", justifyContent: "space-around" }}
            className="button-yellow"
        >
            <i className="pi pi-fw pi-shopping-cart"></i>
            My Cart
            <b>{cart?.length ?? 0}</b>
        </button>

        <dialog ref={dialogRef} className="dialog">
            <h2>My Cart</h2>
            <p className="muted">This is a list of products you have added to your cart.</p>

            {!(cart?.length > 0) &&
                <p> Your cart is currently empty.</p>
            }

            {cart.map((product) => (
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
                            <button className="button-red"
                                onClick={() => removeFromCart(product)}
                            >
                                <i className='pi pi-fw pi-cart-minus' style={{ marginRight: ".5rem" }} />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}


            <div className="price" style={{ textAlign: "center", margin:"1rem 1rem" }}>
               Your total: ${Number(cart?.reduce((acc, a) => acc + a?.price, 0.0)).toFixed(2)}
            </div>
            <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => dialogRef.current?.close()} className="button-blue">
                    <i className='pi pi-fw pi-times' style={{ marginRight: ".5rem" }} />
                    Close
                </button>
                <button onClick={() => dialogRef.current?.close()} className="button-yellow">
                    <i className='pi pi-fw pi-dollar' style={{ marginRight: ".5rem" }} />
                    Checkout
                </button>
            </div>
        </dialog>
    </>);
}