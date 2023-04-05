import React, { useContext, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import jwt from "jwt-decode";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

export default function ImageModal(props) {
  const [preview, setPreview] = useState();
  const [state, dispatch] = useContext(UserContext);
  const id = state.user.id;

  const token = localStorage.getItem("token");
  const tkn = jwt(token);

  const [form, setForm] = useState({
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }

      // Insert product data
      const response = await API.patch("/change-image/" + tkn.id, formData);

      alert("successfully change your image!");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal {...props} size="md" centered>
      <Modal.Body className="m-3">
        <h1 className="text-center mt-3 mb-5 fw-bold">
          Change Profile Picture
        </h1>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div>
              <Image
                src={preview}
                style={{
                  width: "435px",
                  height: "400px",
                  objectFit: "cover",
                  marginBottom: 10,
                }}
                alt={"ini alt"}
                rounded
              />
            </div>
          )}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="image" className="fw-bold fs-4">
              Upload New Picture
            </Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              size="lg"
            />
          </Form.Group>
          <Form.Group className="ms-autp mb-4">
            <Button
              variant="light"
              size="lg"
              type="submit"
              className="mt-4 py-3 px-4 w-100 button2"
            >
              Change Profile Picture
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
