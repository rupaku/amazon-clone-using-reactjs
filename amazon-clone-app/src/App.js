import React, { useEffect } from "react"
import Header from "./Header"
import "./App.css"
import Home from "./Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Checkout from "./Checkout"
import Login from "./Login"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider"
import Payment from "./Payment"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./Orders"

//publish key from stripe.com developer->API section
const promise = loadStripe(
  "pk_test_51HPyJUGFsh8r2spj1QJo6Wsyn3k6kk89Z0bRUE9Fhbm2zpmrjcUaYumFIDI2IouN5u0B2kAqcqLQIHfpXNwj3ngV00Rpc2HXfR"
)

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    //will run on app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser)
      if (authUser) {
        //user logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, [])
  return (
    //BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
