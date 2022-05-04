import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { Table } from "@mui/material";

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

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

      <div className='w-screen h-[100%] flex flex-col justify-between md:h-screen'>
        <div className='w-screen grid md:grid-cols-2 max-w-[1980px] sm:m-auto sm:bg-white md:drop-shadow-lg'>
            <div className='w-full h-[100%] md:h-screen'>
              <img 
              className='w-full h-[100%] object-cover' 
              alt='picture-random' 
              src="https://source.unsplash.com/1600x900/?elder" 

              />
            </div>
            <div className='flex flex-col justify-center md:items-start w-full px-12 py-8 font-[Poppins]'>
                <div className="rounded-full bg-black w-20 h-1">
                </div>   
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>
                  Donation
                </h1>
                <p className='text-2xl'>
                We Appreciate Any Donation Amount.  Thank You For Keeping Silver Socials Active and Social
                </p>


                  <button className="mt-4 ml-16 animate-bounce w-10 h-10 text-cyan-600 rounded-full border border-2 border-cyan-600">▽</button>
                  {/* <svg className="animate-bounce w-6 h-6 border border-2 border-cyan-600">
                  </svg> */}
                 
                <button 
                onClick={handleSubmit}
                className='drop-shadow-lg text-center py-3 px-6 w-[45%] md:w-[45%] lg:w-[40%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500'
                >
                Donate Now
                </button>
            </div>
            
        </div>
    </div>

      {/* <div
        maxWidth="lg"
        className="mt-10 h-full flex-row flex-wrap justify-space-between mx-8"
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
      </div> */}

      <div className=" md:-mt-24">
      <Footer />
      </div>
      
    </main>
  );
}

export default CheckoutForm;

// https://unsplash.com/s/photos/elder