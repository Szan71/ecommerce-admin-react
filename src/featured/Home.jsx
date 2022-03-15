import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  logoutAction,
  getAllProductAction,
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "../store/action";

const Home = () => {
  const { data, isCreate } = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const regUrl =
  // /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const [addProductForm, setProductForm] = useState({
    id: "",
    name: "",
    quantity: "",
    image: "",
    description: "",
  });

  const [disableForm, setDisableForm] = useState(false);

  const [accessBtn, setAccessBtn] = useState({
    save: true,
    update: false,
    cancel: true,
  });

  const onValidation = yup.object().shape({
    // id: yup.number().required("Id is required"),
    name: yup.string().required("Name is required"),
    quantity: yup.number().required("Quantity is required"),
    image: yup.string().required("Should be a valid URL"),
    description: yup
      .string()
      .max(256, "Too Long!")
      .required("Description is required"),
  });

  const onSubmit = async () => {
    // if (formikForm.values["id"]) {
    //   setTableData([
    //     ...tableData.filter((el) => el["id"] !== formikForm.values["id"]),
    //     formikForm.values,
    //   ]);
    // } else {
    //   setTableData([...tableData, values]);
    // }

    setAccessBtn({
      save: true,
      update: false,
      cancel: true,
    });

    setDisableForm(false);

    if (!formikForm.values.id) {
      delete formikForm.values.id;
      dispatch(createProductAction(formikForm.values));
      await dispatch(getAllProductAction());
    } else {
      dispatch(updateProductAction(formikForm.values));
    }

    formikForm.resetForm();
  };

  const formikForm = useFormik({
    initialValues: addProductForm,
    onSubmit,
    validationSchema: onValidation,
  });

  const onEdit = (el) => {
    setAccessBtn({
      save: false,
      update: true,
      cancel: true,
    });
    setDisableForm(false);

    formikForm.setValues(el).then((res) => {});
  };

  const onDelete = async (el) => {
    // setTableData(tableData.filter((data) => data["id"] !== el["id"]));
    await dispatch(deleteProductAction(el["id"]));
    dispatch(getAllProductAction());
  };

  const onView = (el) => {
    setAccessBtn({
      save: false,
      update: false,
      cancel: true,
    });
    setDisableForm(true);

    formikForm.setValues(el).then((res) => {});
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    dispatch(getAllProductAction()); //to get first list of products
  }, []);

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
            {/* Name input */}
            <div className="form-outline m-10">
              <label className="form-label" htmlFor="product-name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                disabled={disableForm}
                className="form-control form-control-lg"
                placeholder="Enter the product name"
                value={formikForm?.values.name}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.name
                ? formikForm.touched.name && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.name}
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
                disabled={disableForm}
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
                id="image"
                name="image"
                disabled={disableForm}
                className="form-control form-control-lg"
                placeholder="Enter a valid image link"
                value={formikForm?.values.image}
                onBlur={formikForm.handleBlur}
                onChange={formikForm.handleChange}
              />
              {formikForm.errors.image
                ? formikForm.touched.image && (
                    <span className="text-danger ml-3">
                      {formikForm.errors.image}
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
                disabled={disableForm}
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
          {data.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.quantity}</td>
                <td>{el.image}</td>
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
