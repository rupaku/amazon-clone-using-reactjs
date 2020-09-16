const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(
  "sk_test_51HPyJUGFsh8r2spjijttjXK0fL9Wd2Q6PFM2SSQTQRD5lVGuhgy7dIcKSB8ui7v3ysg5bFUyZaIXUW6qiRHCMJCH00cg7OS2BA"
) //secret key from stripe website API key section

//API

//App config
const app = express()

//Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"))
app.post("/payments/create", async (request, response) => {
  const total = request.query.total
  console.log("Payment request received BOOM!!!", total)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  })
})

//Listen command
exports.api = functions.https.onRequest(app)
