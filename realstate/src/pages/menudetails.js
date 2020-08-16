import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardImage,  MDBBtn } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import {Link } from 'react-router-dom';
import { detailsMenu, saveMenuReview } from '../actions/menuActions';
import Rating from '../components/rating';
import { MENU_REVIEW_SAVE_RESET } from '../constants/menuConstants';
import Loader from '../components/loader';



function Menudetails(props) {
  const [qty,setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const menuDetails = useSelector((state => state.menuDetails));
  const {menu, loading, error} = menuDetails;

  const menuReviewSave = useSelector((state) => state.menuReviewSave);
  const { success: menuSaveSuccess } = menuReviewSave;

  const dispatch = useDispatch();

  useEffect(() =>{
    if (menuSaveSuccess) {
      setRating(0);
      setComment('');
      dispatch({ type: MENU_REVIEW_SAVE_RESET });
    }
    dispatch(detailsMenu(props.match.params.id));
    return () =>{
      //
    };
  }, [menuSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveMenuReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };

 const handleAddToCart = () => {
   props.history.push("/reservations/" + props.match.params.id + "?qty=" + qty )
 }
 
  return loading ? <div><Loader/></div> : error? <div>loading...</div>: (
    <div className="container mt-5 mb-5">
    <div className="row">
      <div className="col-lg-4">
      <MDBCard>
      <MDBCardImage className="img-fluid img-detail" src={menu.image} waves />
    </MDBCard>
    <h4 className="mt-5 mb-2"><strong>Name</strong>:{menu.name}</h4>
        <h5 className="mt-2 mb-2"><strong>Type</strong>:{menu.type}</h5>
        <p className="mt-2 mb-2"><strong>Price</strong>:${menu.price}</p>
      </div>
      <div className="col-lg-4">
  <h5 className="mt-2 mb-2">Status:{menu.countInStock > 0 ? "In Stock":"Out Of Stock"}</h5>
      <h6><strong>Qty</strong> : 
      
      <select value={qty} onChange={(e) =>{ setQty(e.target.value)}}>
          {[...Array(menu.countInStock).keys()].map(x=>
          <option key={x+1} value={x+1}>{x+1}</option>
            )}
        </select>
        </h6>
    {menu.countInStock > 0 ?
      <MDBBtn onClick={handleAddToCart} color="orange" >
                  add to reservation
                </MDBBtn> : <div>Out of stock</div>}

                <p className="mt-2 mb-2"><strong>Description</strong>:{menu.description}</p>
        <p>Note:All customers should come within reserved time. If customers fail to keep to time,
        there won't be any refunds neither will they be given another seat. As this are one of the rules to abide by</p>
          <Rating value={menu.rating} text={menu.numReviews + ' reviews'}/>
               </div>
    <div className="col-lg-4">
    <h5 className="mt-5 mb-2">Can add <a href="/meals">meals</a> to your table from our varieties of dishes and also some of the best served classic <a href="/drinks">drinks</a>.</h5>
        <p className="mt-2 mb-2">Reservations are only opened from 4:30pm to 11:30pm. Reservations cannot be made outside this time. And we also serve both veg and non veg dishes</p>

    </div>
    </div>

    <div className="row">
      <div className="col-lg-6 col-md-6 offset-md-1 offset-lg-1">
      {!menu.reviews.length && <h5 className="text-center">There is no review</h5>}
      </div>
      <div className="mt-4 col-lg-6 col-md-6 offset-md-1 offset-lg-1">
        <h5 className="text-center">Customer Reviews</h5>
        {menu.reviews.map((review) => (
          <div key={review._id}>
          <h5>{review.name}</h5>
          <div>
            <Rating value={review.rating}></Rating>
          </div>
          <div>
          {review.comment}
            </div>
          <div className="text-right">
            <p>{review.createdAt.substring(0,10)}</p>
          </div>
        </div>
        ))}
      </div>
      </div>

      <div className="row mt-3">
      <div className="col-lg-6 col-md-6 offset-md-1 offset-lg-1">
       <h5 className="text-center">Write a review</h5>
       <div>
         {userInfo ? (<form onSubmit={submitHandler}>

           <div className="form-group">
         <select value={rating} className="browser-default custom-select" onChange={(e)=>setRating(e.target.value)}>
          <option>Give rating</option>
          <option value="1">1- Poor</option>
          <option value="2">2- Fair</option>
          <option value="3">3- Good</option>
          <option value="4">4- Very Good</option>
          <option value="5">5- Excellent</option>
        </select>
        </div>

        <div className="form-group">
      <textarea className="form-control" value={comment} placeholder="Comment" onChange={(e)=>setComment(e.target.value)}></textarea>
    </div>

    <div>
    <MDBBtn type="submit" color="orange">Comment</MDBBtn>
    </div>
         </form>) :
         <div>
           <h6>Please<Link to="/signin">Sign-In</Link></h6> to write a review.
           </div>
         }
       </div>
      </div>
      </div>

  </div>
  );
}

export default Menudetails;