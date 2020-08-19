import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol,MDBInput } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { saveTable, deleteTable, listTables } from '../actions/tableActions';

function TableAdmin  (props) {
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

    

    const tableList = useSelector(state =>state.tableList);
    const {loading,tables,error} =  tableList;

    const tableSave = useSelector((state)=>state.tableSave);
    const {  success: successSave } = tableSave;

      const tableDelete = useSelector((state)=>state.tableSave);
    const { success: successDelete } = tableDelete;

      useEffect(() => {
          if(successSave){
            setModal(false);
          };
          dispatch(listTables());
        return () => {
          //
        };
      }, [successSave,successDelete]);

      const deleteHandler = (table) => {
        dispatch(deleteTable(table._id));
      };


      const openModal = (table) => {
        setModal(true);
        setId(table._id);
        setName(table.name);
        setPrice(table.price);
        setDescription(table.description);
        setImage(table.image);
        setType(table.type);
        setCountInStock(table.countInStock);
      };

      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          saveTable({
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

      const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        Axios.post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            setUploading(false);
          });
      };

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
        <MDBCardTitle>List Of Tables</MDBCardTitle>
        <MDBTable>
      <MDBTableHead color="orange" textWhite>
        <tr>
          <th>Table ID</th>
          <th>Name</th>
          <th>InStock</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
  { loading ? <div>loading...</div> : error ? <div>{error}</div> :
          tables.map((table) =>(
          <tr key={table._id}>
          <td>{table._id}</td>
          <td>{table.name}</td>
          <td>{table.countInStock}</td>
          <td>{table.price}</td>
          <td><MDBBtn onClick={()=>openModal(table)} color="orange">Edit</MDBBtn></td>
          <td><MDBBtn onClick={()=>deleteHandler(table)} color="orange">Delete</MDBBtn></td>
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

export default TableAdmin;