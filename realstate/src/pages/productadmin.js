import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol,MDBInput } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { saveMenu, listMenu, deleteMenu } from '../actions/menuActions';
import Axios from 'axios';

function ProductAdmin  (props) {
    const [modal,setModal] = useState(false);
    const [id, setId] = useState('');
    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('');
    const [countInStock,setCountInStock] = useState('');
    const [price,setPrice] = useState('');
    const [uploading,setUploading]= useState(false);
    const dispatch = useDispatch();



    const menuList = useSelector(state =>state.menuList);
    const {loading,menus,error} =  menuList;

    const menuSave = useSelector((state)=>state.menuSave);
    const {  success: successSave } = menuSave;

      const menuDelete = useSelector((state)=>state.menuSave);
    const { success: successDelete } = menuDelete;

      useEffect(() => {
          if(successSave){
            setModal(false);
          };
          dispatch(listMenu());
        return () => {
          //
        };
      }, [successSave,successDelete]);

      const deleteHandler = (menu) => {
        dispatch(deleteMenu(menu._id));
      };


      const openModal = (menu) => {
        setModal(true);
        setId(menu._id);
        setName(menu.name);
        setPrice(menu.price);
        setDescription(menu.description);
        setImage(menu.image);
        setType(menu.type);
        setCountInStock(menu.countInStock);
      };

      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          saveMenu({
            _id: id,
            name,
            price,
            image,
            type,
            countInStock,
            description,
          })
        );
      };

  //    const uploadFileHandler = (e) => {
  //      const file = e.target.files[0];
  //      const bodyFormData = new FormData();
  //      bodyFormData.append('image', file);
  //      setUploading(true);
  //      Axios.post('/api/uploads', bodyFormData, {
  //          headers: {
  //            'Content-Type': 'multipart/form-data',
  //          },
  //        })
  //        .then((response) => {
  //          setImage(response.data);
  //          setUploading(false);
  //        })
  //        .catch((err) => {
  //          setUploading(false);
  //        });
  //    };

  return (
      <div className="container-fluid">
          <div className="row mb-4">
          <MDBBtn outline color="orange" onClick={openModal}>ADD PRODUCT</MDBBtn>
          </div>

          { modal && (<div className="row mt-2 mb-2">
          <div className="col-lg-5 offset-lg-4">
          <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>ADD NEW MENU</MDBCardTitle>
        <form onSubmit={submitHandler}>
        <div className="form-group">
     <MDBInput type="text" label="NAME" value={name} onChange={(e)=>setName(e.target.value)}/>
     <MDBInput type="text" label="TYPE" value={type} onChange={(e)=>setType(e.target.value)}/>
     <MDBInput type="number" label="PRICE" value={price} onChange={(e)=>setPrice(e.target.value)}/>
     <MDBInput  type="text" label="IMAGE" value={image} onChange={(e)=>setImage(e.target.value)}/>
     <div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroupFileAddon01">
      Upload
    </span>
  </div>
  <div className="custom-file">
    <input
      type="file"
      className="custom-file-input"
      onChange={uploadFileHandler}
      id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01"
    />
    <label className="custom-file-label" htmlFor="inputGroupFile01">
      Choose file
    </label>
  </div>
</div>
{uploading && <div>Uploading...</div>}
     <MDBInput type="number" label="QUANTITY IN STOCK" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}/>
     <MDBInput type="textarea" label="DESCRIPTION" value={description} onChange={(e)=>setDescription(e.target.value)} outline />
    </div>
    <div>
    <MDBBtn className="col-lg" type="submit" color="orange">{id? 'UPDATE' : 'ADD PRODUCT'}</MDBBtn>
    <MDBBtn className="col-lg" onClick={() => setModal(false)} color="orange">CLOSE</MDBBtn>
    </div>
        </form>
      </MDBCardBody>
    </MDBCard>
          </div>
          </div>)}

          <div className="row">
          <MDBCol>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>List Of Products</MDBCardTitle>
        <MDBTable>
      <MDBTableHead color="orange" textWhite>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>InStock</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
  { loading ? <div>loading...</div> : error ? <div>{error}</div> :
          menus.map((menu) =>(
          <tr key={menu._id}>
          <td>{menu._id}</td>
          <td>{menu.name}</td>
          <td>{menu.countInStock}</td>
          <td>{menu.price}</td>
          <td><MDBBtn onClick={()=>openModal(menu)} color="orange">Edit</MDBBtn></td>
          <td><MDBBtn onClick={()=>deleteHandler(menu)} color="orange">Delete</MDBBtn></td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
          </div>
      </div>
  );
}

export default ProductAdmin;
