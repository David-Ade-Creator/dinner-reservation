import React, { useEffect } from 'react';
import { MDBCardBody, MDBCardImage } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMenu } from '../actions/menuActions';
import Rating from '../components/rating';
import Loader from '../components/loader';



function MealPage(props) {
  const menuList = useSelector(state=>state.menuList);
  const {menus, loading, error} = menuList;
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(listMenu())
    return () => {
      //
    };
  }, [])

return loading ? <Loader/> : error? <div>{error}</div> :
(
    <div className="container-fluid mt-3">
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