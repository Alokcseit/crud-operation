import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
const validateProduct = (Insertdata) => {
  const errors = {};
  if (!Insertdata.Id) {
    errors.Id = "Please Enter Product Id";
  } else if (!/^[A-Z]{3}[0-9]{3}$/.test(Insertdata.Id)) {
    errors.Id =
      "Product Id should be 6 letters first 3 alpha next 3 digits total 6";
  }
  if (!Insertdata.ProductName) {
    errors.ProductName = "Please Enter Product Name";
  } else if (Insertdata.ProductName.length > 20) {
    errors.ProductName =
      "Product Name size should not be greater than 20 letters";
  }
  if (!Insertdata.Description) {
    errors.Description = "Please Enter Product Description";
  } else if (Insertdata.Description.length > 30) {
    errors.Description =
      "Product Description size should not be greater than 30 letters";
  }
  if (!Insertdata.Qty) {
    errors.Qty = "Quantity  should not be empty";
  } else if (Insertdata.Qty > 10) {
    errors.Qty = "Quantity shoud not be non zero and non negative";
  }
  if (!Insertdata.Price) {
    errors.Price = "Product Price should not be empty";
  } else if (Insertdata.Price <= 0) {
    errors.Price = "Price shoud not be non zero and non negative";
  }
  if (!Insertdata.Status) {
    errors.Status = "Product Price should not be empty";
  } else if (Insertdata.Status > 10) {
    errors.Status = "Price shoud not be non zero and non negative";
  }

  return errors;
};

function Insertdata() {
  const formik = useFormik({
    initialValues: {
      Id: "",
      ProductName: "",
      Description: "",
      Qty: "",
      Price: "",
      Status: "",
    },
    validate: validateProduct,

    onSubmit: async (values, { resetForm }) => {
      delete values.Id;
      console.log(JSON.stringify(values));

      await axios
        .post("https://myservicesapi.com/api/Products", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            console.log("Product created");
            alert("Product created successfully");
            resetForm();
            console.log("Form has been reset.");
            return response;
          } else {
            console.log(response.status);
          }
        })

        .catch((error) => {
          console.error("Error creating product:", error);
        });
    },
  });
  return (
    <div>
      <Form>
        <FormGroup floating>
          {formik.touched.Id && formik.errors.Id ? (
            <span style={{ color: "red" }}> {formik.errors.Id}</span>
          ) : null}
          <Input
            id="exampleId"
            name="Id"
            placeholder="Id"
            type="Id"
            onChange={formik.handleChange}
            value={formik.values.Id}
            onBlur={formik.handleBlur}
          />
          <Label for="exampleId">Id</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          {formik.touched.ProductName && formik.errors.ProductName ? (
            <span style={{ color: "red" }}>{formik.errors.ProductName}</span>
          ) : null}
          <Input
            id="exampleProductName"
            name="ProductName"
            placeholder="ProductName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.ProductName}
            onBlur={formik.handleBlur}
          />
          <Label for="exampleProductName">Product Name</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          {formik.touched.Description && formik.errors.Description ? (
            <span style={{ color: "red" }}>{formik.errors.Description}</span>
          ) : null}

          <Input
            id="exampleDescription"
            name="Description"
            placeholder="Description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Description}
            onBlur={formik.handleBlur}
          />
          <Label for="exampleDescription">Description</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          {formik.touched.Qty && formik.errors.Qty ? (
            <span style={{ color: "red" }}>{formik.errors.Qty}</span>
          ) : null}

          <Input
            id="exampleQty"
            name="Qty"
            placeholder="Quantity"
            type="text"
            value={formik.values.Qty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Label for="exampleQty">Quantity</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          {formik.touched.Price && formik.errors.Price ? (
            <span style={{ color: "red" }}>{formik.errors.Price}</span>
          ) : null}

          <Input
            id="examplePrice"
            name="Price"
            placeholder="Price"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Price}
            onBlur={formik.handleBlur}
          />
          <Label for="examplePrice">Price</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          {formik.touched.Status && formik.errors.Status ? (
            <span style={{ color: "red" }}>{formik.errors.Status}</span>
          ) : null}
          <Input
            id="exampleStatus"
            name="Status"
            placeholder="Status"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Status}
            onBlur={formik.handleBlur}
          />
          <Label for="exampleStatus">Status</Label>
        </FormGroup>{" "}
        <Button name="submit" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Insertdata;
