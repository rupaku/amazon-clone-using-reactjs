import React, { useState, useEffect } from "react"
import "./Payment.css"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import { Link, useHistory } from "react-router-dom"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import Axios from "axios"
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "./reducer"
import { db } from "./firebase"

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()

  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState("")
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    // generate the special stripe secret which allow us to charge a customer
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      })
      setClientSecret(response.data.clientSecret)
      console.log("secret is -> ", clientSecret)
    }

    getClientSecret()
  }, [basket])

  const handleSubmit = async (e) => {
    // for all fancy stripe
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // payment intent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type: "EMPTY_BASKET",
        })

        history.replace("/orders")
      })
  }

  const handleChange = (e) => {
    // llisten for change of cardemelement
    // and display error
    setDisabled(false)
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="">{basket?.length} items</Link>)
        </h1>

        {/* Delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123, React Lane</p>
            <p>Magarpatta, Pune</p>
          </div>
        </div>
        {/* review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        {/* payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>

              {error && <div>error</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
