import React from "react";
import CartProduct from "./CartProduct";

export default function CartModal({
  closeModal,
  cart,
  addToCart,
  minusCartProduct,
  deleteCartProduct,
}) {
  const fullPrice = cart.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__top">
          <h1>Product Cart</h1>
          <button className="modal__close" onClick={closeModal}>
            x
          </button>
        </div>
        <div className="modal__body">
          {cart.map((product) => (
            <CartProduct
              addToCart={addToCart}
              key={product.id}
              product={product}
              minusCartProduct={minusCartProduct}
              deleteCartProduct={deleteCartProduct}
            />
          ))}
        </div>
        {cart.length === 0 && <p>Cart Empty...</p>}
        <div className="modal__bottom">
          <h2>Full Price: $ {fullPrice.toFixed(2)}</h2>
          <button className="btn btn--primary">Buy</button>
        </div>
      </div>
    </div>
  );
}
