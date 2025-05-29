  import React, { useEffect } from 'react';
  import axios from 'axios';

  const AllProducts = () => {
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/allproducts`,{ withCredentials: true })
        .then((response) => {
          console.log(response.data); // ✅ logs all products
        })
        .catch((error) => {
          console.log(error);
          console.error('Error fetching products:', error);
        });
    }, []); // Empty dependency array → runs only once when component mounts

    return (
      <div>
        <h2>Check console for all products</h2>
      </div>
    );
  };

  export default AllProducts;
