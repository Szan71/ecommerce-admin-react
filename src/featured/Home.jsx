import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/action";

const Home = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const regUrl =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const [addProductForm, setProductForm] = useState({
    id: "",
    productName: "",
    quantity: "",
    imageUrl: "",
    description: "",
  });

  const [accessBtn, setAccessBtn] = useState({
    save: true,
    update: false,
    cancel: true,
  });

  const [tableData, setTableData] = useState([
    {
      id: "1",
      productName: "iPhone 13",
      description: "Apple iPhone 13 Pro 256GB Matte Black",
      imageUrl: "www.apple.com/iPhone13",
      quantity: "5",
    },
  ]);

  const onValidation = yup.object().shape({
    id: yup.number().required("Id is required"),
    productName: yup.string().required("Name is required"),
    quantity: yup.number().required("Quantity is required"),
    imageUrl: yup.string().matches(regUrl, "Should be a valid URL"),
    description: yup
      .string()
      .max(256, "Too Long!")
      .required("Description is required"),
  });

  const onSubmit = (values) => {
    if (formikForm.values["id"]) {
      setTableData([
        ...tableData.filter((el) => el["id"] !== formikForm.values["id"]),
        formikForm.values,
      ]);
    } else {
      setTableData([...tableData, values]);
    }
    // setTableData([...tableData, formikForm.values]);

    setAccessBtn({
      save: true,
      update: false,
      cancel: true,
    });

    formikForm.resetForm();
  };

  const onEdit = (el) => {
    setAccessBtn({
      save: false,
      update: true,
      cancel: true,
    });
    formikForm.setValues(el).then((res) => {});
  };

  const onDelete = (el) => {
    console.log(el);
    setTableData(tableData.filter((data) => data["id"] !== el["id"]));
  };

  const onView = (el) => {
    setAccessBtn({
      save: false,
      update: false,
      cancel: true,
    });
    formikForm.setValues(el).then((res) => {});
  };


  const formikForm = useFormik({
    initialValues: addProductForm,
    onSubmit,
    validationSchema: onValidation,
  });

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="container">
      <div
        className="layout"
        style={{
          height: "100px",
          backgroundColor: "RGB(86, 62, 124)",
          padding: "30px 20px 20px 0px",
        }}
      >
        <button
          type="button"
          className="btn btn-danger"
          style={{ float: "right", marginLeft: "10px" }}
          onClick={logout}
        >
          Logout
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShow}
          style={{ float: "right", marginLeft: "10px" }}
        >
          Add products
        </button>
      </div>
      <form onSubmit={formikForm.handleSubmit}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Id input */}
            <div className="form-outline">
              <label className="form-label" htmlFor="id">
                id
              </label>
              <input
                type="number"
                id="id"
                name="id"
                className="form-control form-control-lg"
                placeholder="Enter product id"
                value={formikForm?.values.id}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.id
                ? formikForm.touched.id && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.id}
                    </span>
                  )
                : null}
              <br />
            </div>

            {/* Name input */}
            <div className="form-outline">
              <label className="form-label" htmlFor="product-name">
                Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="form-control form-control-lg"
                placeholder="Enter the product name"
                value={formikForm?.values.productName}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.productName
                ? formikForm.touched.productName && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.productName}
                    </span>
                  )
                : null}
              <br />
            </div>

            {/* Quantity input */}
            <div className="form-outline">
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control form-control-lg"
                placeholder="Enter the quantity"
                value={formikForm?.values.quantity}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.quantity
                ? formikForm.touched.quantity && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.quantity}
                    </span>
                  )
                : null}
              <br />
            </div>

            {/* Image input */}
            <div className="form-outline">
              <label className="form-label" htmlFor="image-url">
                Image link
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="form-control form-control-lg"
                placeholder="Enter a valid image link"
                value={formikForm?.values.imageUrl}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.imageUrl
                ? formikForm.touched.imageUrl && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.imageUrl}
                    </span>
                  )
                : null}
              <br />
            </div>

            {/* Description input */}
            <div className="form-outline">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                className="form-control form-control-lg"
                placeholder="Say something about this product..."
                value={formikForm?.values.description}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.description
                ? formikForm.touched.description && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.description}
                    </span>
                  )
                : null}

              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {accessBtn.cancel && (
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            )}

            {accessBtn.update && (
              <Button variant="success" onClick={onSubmit}>
                Update
              </Button>
            )}

            {accessBtn.save && (
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                disabled={!formikForm.isValid}
              >
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </form>

      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Product Table</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Image URL</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.productName}</td>
                <td>{el.quantity}</td>
                <td>{el.imageUrl}</td>
                <td>{el.description}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      onEdit(el);
                      handleShow();
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>

                  <button
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      onView(el);
                      handleShow();
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      onDelete(el);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
