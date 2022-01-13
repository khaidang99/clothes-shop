import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/modal/Modal";
import "./ItemProduct.style.scss";

ItemProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

function ItemProduct(props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const handleQuickView = (event) => {
    setVisibleModal(true);
  };

  const { name, price, image, description, brand, size } = props;

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  const listSize = size.map((item) => (
    <span key={item} className="option-size">
      {item}
    </span>
  ));

  return (
    <li className="product-item col-xxl-3 col-lg-4">
      <div className="product-make3D">
        <div className="product-front">
          <img className="product-img" src={image[0]} />
          <div className="product-image_overlay"></div>
          <button className="add_to_cart">Add to cart</button>
          <Modal
            setVisibleModal={setVisibleModal}
            visible={visibleModal}
            images={image}
            {...props}
          />
          <button className="view_gallery" onClick={handleQuickView}>
            View Gallery
          </button>
          <div className="stats">
            <div className="stats-container">
              <span className="product_price">
                {currencyFormat(price.toString())}
              </span>
              <span className="product_name">{name}</span>
              <p className="product-name-sub">{brand}</p>
              <div className="product-options">
                <strong className="product-sizes">SIZES</strong>
                <div className="wrapper-option-sizes">{listSize}</div>
                <p className="product-colors">COLORS</p>
                <div className="colors">
                  <div className="option-color c-blue">
                    <span></span>
                  </div>
                  <div className="option-color c-red">
                    <span></span>
                  </div>
                  <div className="option-color c-white">
                    <span></span>
                  </div>
                  <div className="option-colorc-green">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ItemProduct;
