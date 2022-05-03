import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Search from '../Search';
import spinner from '../../assets/spinner.gif';


function ImageCards() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="mx-auto">
    <div  className="my-9">
      <Search searchText={(text) => setTerm(text)} />
    </div>
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">{spinner}Loading...</h1> : <div className="grid sm:grid-cols-3 gap-4">
        {images.map(image => (
          <Card key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default ImageCards;