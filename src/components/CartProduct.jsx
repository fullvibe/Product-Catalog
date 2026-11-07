import React from "react";

export default function CartProduct({
  product,
  addToCart,
  minusCartProduct,
  deleteCartProduct,
}) {
  return (
    <div className="modal__item">
      <div className="modal__left">
        <img className="modal__thumb" src={product.thumbnail} alt="" />
        <h3 className="modal__title">{product.title}</h3>
      </div>
      <div className="modal__right">
        <p className="modal__price">$ {product.price}</p>
        <button
          className="qty__btn"
          disabled={product.count === 1}
          onClick={() => minusCartProduct(product)}
        >
          -
        </button>
        <p className="qty__value">{product.count}</p>
        <button
          className="qty__btn"
          disabled={product.count === 10}
          onClick={() => addToCart(product)}
        >
          +
        </button>
        <button
          className="qty__btn qty__btn--danger"
          onClick={() => deleteCartProduct(product)}
        >
          x
        </button>
      </div>
    </div>
  );
}
