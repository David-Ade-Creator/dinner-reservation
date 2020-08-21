import React, { useEffect } from 'react';
import { MDBCardBody, MDBCardImage } from 'mdbreact';
import {listTables} from '../actions/tableActions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/loader';
import Rating from '../components/rating';



function TablePage(props) {

  const tableList = useSelector(state =>state.tableList);
  const {tables, loading, error} = tableList;
  const dispatch = useDispatch();

  useEffect(() =>{
      dispatch(listTables());

    return () => {
     //
    };
  }, [dispatch])


  return loading ? <div><Loader/></div> : 
error? <div>{error}</div> : (
    <div className="container-fluid mt-3">
      <div className="row">
        {
          tables.map(table =>
            <div key={table._id} className="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 card-edge">
              <Link to={'/table/' + table._id}>
          <div className="card-edge">
      <div>
        <MDBCardImage className="img-fluid card-img" src={table.image} waves />
        <MDBCardBody>
        <h5>{table.name}</h5>
          <h6>${table.price}</h6>
          <Rating value={table.rating} />
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

export default TablePage;