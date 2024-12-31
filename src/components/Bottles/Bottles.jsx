import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLocalStorage,
  getStoredCart,
  removeFromLocalStorage,
} from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  // Load cart from local storage
  useEffect(() => {
    // console.log(bottles.length);
    if (bottles.length) {
      const storedCart = getStoredCart();
      // console.log(storedCart, bottles);
      const savedCart = [];

      for (const id of storedCart) {
        // console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }

        // console.log(savedCart);
        setCart(savedCart);
      }
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    // console.log(bottle);
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLocalStorage(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    //visual remove
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    //remove from local storage
    removeFromLocalStorage(id);
  };

  return (
    <div>
      <h2>Total Bottles: {bottles.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />

      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Bottles;
