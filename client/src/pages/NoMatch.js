import React from 'react';

const NoMatch = () => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-xl w-[70%] font-[Poppins] mt-20 text-center mx-auto'>
      <h1 className="font-bold text-8xl text-center mt-3">Oops!</h1> 
      <p className='mt-5'>we couldn't find that page.</p>
    </div>
  );
};

export default NoMatch;