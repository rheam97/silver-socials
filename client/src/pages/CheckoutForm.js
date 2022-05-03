import React, {useEffect} from "react";
//import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLazyQuery } from "@apollo/client";
import {QUERY_CHECKOUT} from "../utils/queries"
//import { Elements } from "@stripe/react-stripe-js";
//import CardSection from "../pages/CardSection";
//const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const stripePromise = loadStripe("pk_test_51KvRkLEDHZQbCChzQC1hHfBg735yXRg7427DE09OGe3HfMaHBdtAKif7LCIX9nFoQPziBLx1ZWy4hQonNTNYjKuY00Acd9p2VE");
//pk_test_51KvRkLEDHZQbCChzQC1hHfBg735yXRg7427DE09OGe3HfMaHBdtAKif7LCIX9nFoQPziBLx1ZWy4hQonNTNYjKuY00Acd9p2VE
//pk_test_TYooMQauvdEDq54NiTphI7jx
//const stripe = useStripe();
//const elements = useElements();



function CheckoutForm() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(async () => {
    console.log("data", data);
    if (data) {
      const res = await stripePromise;
      res.redirectToCheckout({ sessionId: data.checkout.session });
    }
  }, [data]);

  
  // function submitCheckout() {
  //   const productIds = [];

  //   state.cart.forEach((item) => {
  //     for (let i = 0; i < item.purchaseQuantity; i++) {
  //       productIds.push(item._id);
  //     }
  //   });

  // }

  let handleSubmit = async (event) => {
    //event.preventDefault();
    getCheckout({
      variables: { donationAmtDollars: 10.00 },
    });
    // const { stripe, elements } = this.props;
    // if (!stripe || !elements) {
    //   return;
    // }

    //const card = elements.getElement(CardElement);
    //const result = await stripe.createToken(card);
    // if (result.error) {
    //   console.log(result.error.message);
    // } else {
    //   console.log(result.token);
    // }
  };

  return (
    <div>
      <div className="product-info">
        <h3 className="product-title">Donations</h3>
        <h4 className="product-price">$10.00</h4>
      </div>
      <button onClick={handleSubmit}>Donate Now</button>
  

    </div>




  );
}

export default CheckoutForm;
// export default function InjectedCheckoutForm() {
//   return (
//     <Elements>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements} />
//       )}
//     </Elements>
//   );
//}
