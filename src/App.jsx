import { use, useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";
import { data } from "./data";
import CartModal from "./components/CartModal";

function App() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function getCart() {
    const saveCart = localStorage.getItem("cart");
    if (saveCart) {
      return JSON.parse(saveCart);
    } else {
      return [];
    }
  }

  function addToCart(product) {
    const findProduct = cart.find((el) => el.id === product.id);
    if (findProduct) {
      setCart((prev) =>
        prev.map((el) =>
          el.id === product.id ? { ...el, count: el.count + 1 } : el
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, count: 1 }]);
    }
  }
  function minusCartProduct(product) {
    setCart((prev) =>
      prev.map((el) =>
        el.id === product.id ? { ...el, count: el.count - 1 } : el
      )
    );
  }

  function deleteCartProduct(product) {
    if (confirm("You want to delete?")) {
      setCart((prev) => prev.filter((el) => el.id != product.id));
    }
  }

  async function getProducts() {
    try {
      setLoading(true);
      setErrorMessage("");
      // const response = await fetch(`https://dummyjson.com/products`);
      // if (!response.ok) {
      //   throw new Error("Продукты не найдены");
      // }
      // const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setErrorMessage("Продукты не найдены");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchResult = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const categoryResult = category === "all" || product.category === category;
    return searchResult && categoryResult;
  });

  const sortedProducts = [...filteredProducts];
  if (sort === "cheap") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "expensive") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="products__top">
        <h1>Product Catalog</h1>
        <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
          Open Cart
        </button>
      </div>

      <Filters
        search={search}
        category={category}
        sort={sort}
        setSearch={setSearch}
        setCategory={setCategory}
        setSort={setSort}
      />

      <div className="products">
        {sortedProducts.map((product) => (
          <ProductCard
            addToCart={addToCart}
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <h2 className="products__empty">Products not found</h2>
      )}

      {modalOpen && (
        <CartModal
          addToCart={addToCart}
          minusCartProduct={minusCartProduct}
          cart={cart}
          closeModal={() => setModalOpen(false)}
          deleteCartProduct={deleteCartProduct}
        />
      )}
    </>
  );
}

export default App;
