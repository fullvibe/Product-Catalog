import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product__card">
      <div className="product__media">
        <img className="product__img" src={product.thumbnail} alt="" />
      </div>
      <div className="product__body">
        <h2 className="product__title">{product.title}</h2>
        <p className="product__price">$ {product.price}</p>
        <p className="product__category">{product.category}</p>
        <button onClick={() => addToCart(product)} className="product__btn">
          Add to cart
        </button>
      </div>
    </div>
  );
}
