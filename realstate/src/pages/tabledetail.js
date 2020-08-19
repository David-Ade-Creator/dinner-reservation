import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardImage,  MDBBtn } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux';
import { detailsTable } from '../actions/tableActions';
import {Link} from 'react-router-dom';
import Loader from '../components/loader';
import Rating from '../components/rating';
import { saveTableReview } from '../actions/tableActions';
import { TABLE_REVIEW_SAVE_RESET } from '../constants/tableConstants';





function Productdetails(props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [size,setSize] = useState('1')

 
const today = new Date()
//const yesterday = new Date(today)

//yesterday.setDate(yesterday.getDate() - 1)

const min = today.toDateString()
//yesterday.toDateString()



  const tableDetails = useSelector((state) => state.tableDetails);
  const {table, loading, error} = tableDetails;

  const tableReviewSave = useSelector((state) => state.tableReviewSave);
  const { success: tableSaveSuccess } = tableReviewSave;
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (tableSaveSuccess) {
      setRating(0);
      setComment('');
      dispatch({ type: TABLE_REVIEW_SAVE_RESET });
    }
    dispatch(detailsTable(props.match.params.id));
    return () => {
      //
    };
  },[]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveTableReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  
  const handleAddToCart = () => {
    
    props.history.push("/reservations/" + props.match.params.id + "?date=" + date );
    
  }



   return loading ? <div><Loader/></div> : error? <div>loading...</div>: (
     <div className="container mt-5 mb-5">
     <div className="row">
       <div className="col-lg-4">
       <MDBCard>
       <MDBCardImage className="img-fluid img-detail" src={table.image} waves />
     </MDBCard>
     <h4 className="mt-5 mb-2"><strong>Name</strong>:{table.name}</h4>
         <h5 className="mt-2 mb-2"><strong>Type</strong>:{table.category}</h5>
         <p className="mt-2 mb-2"><strong>Price</strong>:${table.price}</p>
       </div>
       <div className="col-lg-4">
   <h5 className="mt-2 mb-2">Status:{table.countInStock > 0 ? "Available":"Not Available"}</h5>
   <p>Select a Date and time</p>
   <input type="datetime-local" id="reservation-time"
       name="reservation-time"
       onChange={(e)=>setDate(e.target.value)}
       min={min} max="2020-12-31T00:00" />
     {table.countInStock > 0 ?
       <MDBBtn onClick={handleAddToCart} color="orange" >
                   Reserve Table
                 </MDBBtn> : <div>Not Available</div>}
 
                 <p className="mt-2 mb-2"><strong>Description</strong>:{table.description}</p>
         <p>Note:All customers should come within reserved time. If customers fail to keep to time,
         there won't be any refunds neither will they be given another seat. As this are one of the rules to abide by</p>
           <Rating value={table.rating} text={table.numReviews + ' reviews'}/>
                </div>
     <div className="col-lg-4">
     <h5 className="mt-5 mb-2">Can add <a href="/meals">meals</a> to your table from our varieties of dishes and also some of the best served classic <a href="/drinks">drinks</a>.</h5>
         <p className="mt-2 mb-2">Reservations are only opened from 4:30pm to 11:30pm. Reservations cannot be made outside this time. And we also serve both veg and non veg dishes</p>
 
     </div>
     </div>
 
     <div className="row">
      <div className="col-lg-6 col-md-6 offset-md-1 offset-lg-1">
      {!table.reviews.length && <h5 className="text-center">There is no review</h5>}
      </div>
      <div className="mt-4 col-lg-6 col-md-6 offset-md-1 offset-lg-1">
    {table.reviews.length > 0 && <h5 className="text-center">Customer Reviews</h5> }
        {table.reviews.slice(0, size).map((review) => (
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
       {table.reviews.length > 0 && <div className="showreview">
        <span onClick={() => setSize(size + 1)}>Show more</span>
        {size > 2 && <span onClick={() => setSize(size - 1)}>Show less</span> }
        </div>}
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
       <textarea className="form-control" placeholder="Comment" onChange={(e)=>setComment(e.target.value)}></textarea>
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

export default Productdetails;