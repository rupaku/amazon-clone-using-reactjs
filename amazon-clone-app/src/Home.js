import React from "react"
import "./Home.css"
import Product from "./Product"

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonDevices/2019/Post_AugArt/GW_Echo_PC_2x_V2._CB405879256_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="1"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
          <Product
            id="2"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="3"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
          <Product
            id="4"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
          <Product
            id="5"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="6"
            title="The lean startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41RLXO5JUhL._AC_SX368_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
