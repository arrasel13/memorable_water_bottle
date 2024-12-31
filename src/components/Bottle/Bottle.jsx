import PropTypes from "prop-types";

import "./Bottle.css";

const Bottle = ({ bottle, handleAddToCart }) => {
  //   console.log(bottle);
  const { name, img, price } = bottle;

  return (
    <div className="bottle">
      <h3>Single Bottle: {name}</h3>
      <img src={img} alt="" />
      <p>Price: ${price}</p>
      <button onClick={() => handleAddToCart(bottle)} className="button">
        Add to Cart
      </button>
    </div>
  );
};

Bottle.propTypes = {
  bottle: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Bottle;
