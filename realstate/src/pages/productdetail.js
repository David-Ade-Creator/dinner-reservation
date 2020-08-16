import React, { useEffect } from 'react';
import { MDBCard, MDBCardImage,  MDBBtn } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';




function Productdetails(props) {
 
  const productDetails = useSelector((state) => state.productDetails);
  const {product, loading, error} = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  },[])
  
  return loading ? <div>loading...</div> : 
  error ? <div>{error}</div> :
   (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
        <MDBCard>
        <MDBCardImage className="img-fluid img-detail" src={product.image} waves />
      </MDBCard>
        </div>
      </div>
      <div className="button-row mt-4">  
      <h5 className="mt-2 mb-2">Status:</h5>
      <MDBBtn color="indigo" >
                    Make reservation
                  </MDBBtn>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">
        <h4 className="mt-5 mb-2"><strong>Name</strong>:{product.name}</h4>
          <h5 className="mt-2 mb-2"><strong>Type</strong>:{product.type}</h5>
          <p className="mt-2 mb-2"><strong>Price</strong>:${product.price}</p>
          <p className="mt-2 mb-2"><strong>Description</strong>:{product.description}</p>
          <p>Note:All customers should come within reserved time. If customers fail to keep to time,
          there won't be any refunds neither will they be given another seat. As this are one of the rules to abide by</p>
        </div>
        <div className="col-lg-6 col-md-6">
          <h5 className="mt-5 mb-2">- Can add <a href="/meals">meals</a> to your table from our varieties of dishes and also some of the best served classic <a href="/drinks">drinks</a>.</h5>
          <p className="mt-2 mb-2">Reservations are only opened from 4:30pm to 11:30pm. Reservations cannot be made outside this time. And we also serve both veg and non veg dishes</p>
          <h6 className="mt-2 mb-2">{product.rating}</h6>
          <h6 className="mt-2 mb-2">{product.numReviews}</h6>
        </div>
      </div>
    </div>
  );
}

export default Productdetails;