import React from "react";
import Insertdata from "./Insertdata";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const baseurl = "https://myservicesapi.com/api/Products";
function AllOperation(args) {
  const [modal, setmodal] = useState(false);
  const [products, setproducts] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [toggle2, settoggle2] = useState(false);
  const [product, setproduct] = useState({
    Id: "",
    ProductName: "",
    Description: "",
    Qty: "",
    Price: "",
    Status: "",
  });
  const [message, setmessage] = useState("");
  const toggl = () => {
    setmodal(!modal);
  };
  useEffect(() => {
    axios
      .get(baseurl)
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [toggle]);
  console.log(products);
  const onfindhandler = async () => {
    try {
      await axios
        .get(baseurl + "/" + product.Id)
        .then((response) => {
          setproduct(response.data);
        })
        .catch((error) => {
          console.log(error);
          setmessage("Product not found with this id");
        });
    } catch (error) {}
    settoggle2(!toggle2);
    settoggle(toggle);
  };
  const onchangehandler = (event) => {
    const cname = event.target.name;
    const cvalue = event.target.value;
    setproduct((prevstate) => ({ ...prevstate, [cname]: cvalue }));
    setmessage("");
  };
  const ondeletehandler = async ({ resetForm }) => {
    try {
      await axios
        .delete(baseurl + "/" + product.Id)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            alert("Product deleted successfully");
          });
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          setmessage("Product not found with this id");
        });
    } catch (error) {
      console.log(error);
      console.log();
    }
    settoggle2(!toggle2);
    settoggle(toggle);
  };
  const updatehandler = async ({ resetForm }) => {
    try {
      await axios
        .put(baseurl + "/" + product.Id, product)
        .then((response) => {
          console.log(response);
          alert("Product updated successfully");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          setmessage("Product not found with this id");
        });
    } catch (error) {
      console.log(error);
    }
    settoggle2(!toggle2);
    settoggle(toggle);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "2px",
              backgroundColor: "lightgray",
            }}
          >
            <label>Product Id</label>
            <input
              type="text"
              name="Id"
              placeholder="product id"
              value={product.Id}
              onChange={onchangehandler}
            />
            <label>Product name</label>
            <input
              type="text"
              name="ProductName"
              placeholder="product name"
              value={product.ProductName}
              onChange={onchangehandler}
            />
            <label>Description</label>
            <input
              type="text"
              name="Description"
              placeholder="description"
              value={product.Description}
              onChange={onchangehandler}
            />
            <label>Quantity</label>
            <input
              type="text"
              placeholder="quantity"
              name="Qty"
              value={product.Qty}
              onChange={onchangehandler}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder="price"
              name="Price"
              value={product.Price}
              onChange={onchangehandler}
            />
            <label>Status</label>
            <input
              type="text"
              placeholder="status"
              name="Status"
              value={product.Status}
              onChange={onchangehandler}
            />
          </div>
          <div>
            <button onClick={() => settoggle(!toggle)}>View/Hide All</button>
            <button onClick={toggl}>Create</button>
            <button onClick={ondeletehandler}>Delete</button>
            <button onClick={updatehandler}>Update</button>
            <button onClick={onfindhandler}>Find</button>
          </div>
        </div>
      </div>
      <div>
        {message.length > 0 ? (
          <div style={{ color: "red" }}> Product not found with this id </div>
        ) : null}
      </div>
      <Modal isOpen={modal} toggle={toggl} {...args}>
        <ModalHeader toggle={toggl}>Modal title</ModalHeader>
        <ModalBody>
          <Insertdata></Insertdata>
        </ModalBody>
      </Modal>
      <div>
        {toggle ? (
          <table className="styled-table">
            <tbody>
              <th>
                <td>ID</td>
              </th>
              <th>
                <td>name</td>
              </th>
              <th>
                <td>description</td>
              </th>
              <th>
                <td>quantity</td>
              </th>
              <th>
                <td>price</td>
              </th>
              <th>
                <td>status</td>
              </th>
              {products.map((product) => (
                <tr key={product.Id}>
                  <td>{product.Id}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.Description}</td>
                  <td>{product.Qty}</td>
                  <td>{product.Price}</td>
                  <td>{product.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      {toggle2 && !toggle && message.length === 0 ? (
        <table className="styled-table">
          <tbody>
            <th>
              <td>ID</td>
            </th>
            <th>
              <td>name</td>
            </th>
            <th>
              <td>description</td>
            </th>
            <th>
              <td>quantity</td>
            </th>
            <th>
              <td>price</td>
            </th>
            <th>
              <td>status</td>
            </th>

            <tr>
              <td>{product.Id}</td>
              <td>{product.ProductName}</td>
              <td>{product.Description}</td>
              <td>{product.Qty}</td>
              <td>{product.Price}</td>
              <td>{product.Status}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default AllOperation;
