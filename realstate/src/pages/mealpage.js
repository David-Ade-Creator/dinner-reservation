import React, { useEffect, useState } from 'react';
import { MDBCardBody, MDBCardImage, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMenu } from '../actions/menuActions';
import Rating from '../components/rating';
import Loader from '../components/loader';



function MealPage(props) {
  const [searchKeyword,setSearchKeyword] = useState('');
  const [sortOrder,setSortOrder] = useState('');
  const type = props.match.params.id ? props.match.params.id : '';
  const menuList = useSelector(state=>state.menuList);
  const {menus, loading, error} = menuList;
  const dispatch = useDispatch();
  

  useEffect(() =>{
    dispatch(listMenu(type))
    return () => {
      //
    };
  }, [dispatch,type])

 const submitHandler = (e) => {
   e.preventDefault();
   dispatch(listMenu(type, searchKeyword,sortOrder))
  }

 const sortHandler = (e) => {
   setSortOrder(e.target.value);
   dispatch(listMenu(type, searchKeyword,sortOrder))
 }

return loading ? <Loader/> : error? <div>{error}</div> :
(
    <div className="container-fluid mt-3">
      <div className="row">
<div className="col-lg-4 offset-lg-2 offset-md-2 col-md-4 col-sm-4 col-8">
  <form className="searchform" onSubmit={submitHandler}>
  <input
        type="text"
        className="form-control"
        name="searchKeyword"
        id="formGroupExampleInput"
        onChange={(e)=>setSearchKeyword(e.target.value)}
      />
 <MDBBtn type="submit" className="searchbtn" color="orange">Search</MDBBtn>
  </form>
</div>
      <div className="col-lg-2 col-md-2 col-sm-2 col-4 sort">
  <select className="form-control" onChange={sortHandler}>
    <option value="">Newest</option>
    <option value="lowest">Lowest</option>
    <option value="highest">Highest</option>
  </select>
      </div>
      </div>


      <div className="row">
        {
          menus.map(menu =>
            <div key={menu._id} className="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 card-edge">
              <Link to={'/menu/' + menu._id}>
          <div className="card-edge">
      <div>
        <MDBCardImage className="img-fluid card-img" src={menu.image} waves />
        <MDBCardBody>
        <h5>{menu.name}</h5>
          <h6>${menu.price}</h6>
          <Rating value={menu.rating} />
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

export default MealPage;