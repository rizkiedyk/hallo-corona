import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import Swal from "sweetalert2";

export default function EditArticle() {
  let navigate = useNavigate();

  //    get article id
  let { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    title: "",
    ctg: "",
    image: "",
    desc: "",
    category: "",
  }); // store article data

  async function getUpdate() {
    const response = await API.get("/article/" + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      title: response.data.data.title,
      desc: response.data.data.desc,
    });
    setIsloading(false);
  }

  useEffect(() => {
    getUpdate();
  }, []);

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

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form.image[0], form.image[0].name);
      }
      formData.set("title", form.title);
      formData.set("ctg", form.ctg);
      formData.set("desc", form.desc);
      formData.set("category", form.category);

      const response = await API.patch("/article/" + id, formData, config);
      Swal.fire({
        title: "Success!",
        text: "Article berhasil diedit",
        icon: "success",
        confirmButtonText: "Kembali",
      });
      navigate(`/article/${id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Article gagal diedit",
        icon: "error",
        confirmButtonText: "Kembali",
      });
      console.log(error);
    }
  });

  return (
    <Container>
      <h2 className="fw-bold text-primary-color mt-5">Add Article</h2>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
            value={form?.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {preview && (
            <div style={{ width: "500px" }}>
              <img src={preview} className="w-100" alt={preview} />
            </div>
          )}
          <Form.Label for="image" type="file" className="fw-bold">
            Upload Image
          </Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Category">
          <Form.Label className="fw-bold">Category</Form.Label>
          <Form.Select
            style={{ backgroundColor: "white" }}
            onChange={handleChange}
            className="bgad"
            name="category"
            value={form?.category}
            aria-label="Default select example"
          >
            <option></option>
            <option value="Corona Virus">Corona Virus</option>
            <option value="Hidup Sehat">Hidup Sehat</option>
            <option value="Jantung">Jantung</option>
            <option value="Batu Ginjal">Batu Ginjal</option>
            <option value="Diet">Diet dan Nutrisi</option>
            <option value="Demam">Demam</option>
            <option value="Demam Anak">Demam pada Anak</option>
            <option value="Olahraga">Olahraga</option>
            <option value="Kolestrol">Kolestrol</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            name="desc"
            value={form?.desc}
            onChange={handleChange}
            style={{ height: "200px" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
          <Button
            style={{
              background: "#ff6185",
              border: "1px solid #ff6185",
              height: "35px",
              width: "15rem",
              fontWeight: "700",
            }}
            type="submit"
          >
            Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}
