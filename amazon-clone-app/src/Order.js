import React from "react"
import "./Order.css"
import moment from "moment"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import CurrencyFormat from "react-currency-format"

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue()
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM DD YYYY, h:m")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>

      {basket.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total :{value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount} //homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  )
}

export default Order
