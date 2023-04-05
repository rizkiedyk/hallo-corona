import { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";

export default function MyArticle() {
  let [state] = useContext(UserContext);
  let id = state.user.id;

  let { data: articles, refetch } = useQuery("articlesCache", async () => {
    const response = await API.get("/articles/" + id);
    return response.data.data;
  });

  async function deleteArticle(deleteId) {
    try {
      const response = await API.delete("/article/" + deleteId);
      Swal.fire({
        title: "Success!",
        text: "Article berhasil dihapus",
        icon: "success",
        confirmButtonText: "Kembali",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Article gagal dihapus",
        icon: "Error",
        confirmButtonText: "Kembali",
      });
    }
  }

  return (
    <Container className="mt-5">
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th className="w-25">Action</th>
          </tr>
        </thead>
        <tbody>
          {articles?.length !== 0 &&
            articles?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <Link>
                    <Button
                      variant="danger"
                      className="ms-5 rounded-pill w-25"
                      onClick={() => deleteArticle(item.id)}
                    >
                      Delete
                    </Button>
                  </Link>
                  <Link to={"/doctor/edit-article/" + item.id}>
                    <Button
                      variant="success"
                      className="ms-5 rounded-pill w-25"
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
