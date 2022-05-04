import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { Table } from "@mui/material";
const stripePromise = loadStripe(
  "pk_test_51KvRkLEDHZQbCChzQC1hHfBg735yXRg7427DE09OGe3HfMaHBdtAKif7LCIX9nFoQPziBLx1ZWy4hQonNTNYjKuY00Acd9p2VE"
);

function CheckoutForm() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(async () => {
    console.log("data", data);
    if (data) {
      const res = await stripePromise;
      res.redirectToCheckout({ sessionId: data.checkout.session });
    }
  }, [data]);

  let handleSubmit = async (event) => {
    //event.preventDefault();
    getCheckout({
      variables: { donationAmtDollars: 10.0 },
    });
  };

  return (
    <main>
      <Header />

      <div
        maxWidth="lg"
        className="mt-10 flex-row flex-wrap justify-space-between mx-8"
      >
        <div className="product-info">
          <div className="text-xl">
          <h1 className="product-title">We Appreciate Any Donation Amount.  Thank You For Keeping Silver Socials Active and Social.</h1>
          </div>
          <br></br>
          <h4 className="product-price"></h4>
          <div className='flex flex-col my-4 mb-8'>
          <div className="text-center text-xl px-2 py-3 rounded-full duration-500 text-white bg-cyan-600 hover:bg-cyan-900 ">
            <button onClick={handleSubmit}>Donate Now</button>
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default CheckoutForm;
