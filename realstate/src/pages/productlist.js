import React, { useEffect } from 'react';
import { MDBCardBody, MDBCardImage } from 'mdbreact';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';



function ProductPage(props) {

  const productList = useSelector(state =>state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() =>{
      dispatch(listProducts());

    return () => {
     //
    };
  }, [])


  return loading ? <div>Loading...</div> : 
error? <div>{error}</div> : (
    <div className="container-fluid mt-3">
      <div className="row">
        {
          products.map(product =>
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 card-edge">
              <Link to={'/table/' + product._id}>
          <div className="card-edge">
      <div>
        <MDBCardImage className="img-fluid card-img" src={product.image} waves />
        <MDBCardBody>
        <h5>{product.name}</h5>
          <h6>${product.price}</h6>
        </MDBCardBody>
      </div>
    </div>
    </Link>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default ProductPage;