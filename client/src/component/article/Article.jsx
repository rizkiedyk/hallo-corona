import { Container, Col, Row, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../../config/api";

function Article() {
  let { data: articles } = useQuery("articlessCache", async () => {
    const response = await API.get("/articles");
    // console.log(response);
    return response.data.data;
  });

  return (
    <Container>
      {articles?.length !== 0 ? (
        <Row className="">
          {articles?.map((item, index) => (
            <Col md={3} sm={6} xs={12} className="mb-5" key={index}>
              <Card className="h-100">
                <Card.Img variant="top" src={item.image} />
                <Link
                  to={`/article/${item.id}`}
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text style={{ color: "#6C6C6C" }}>
                      {item.desc}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <p className="category px-3 py-1 rounded-pill ms-3">
                  {item.category}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
}
export default Article;
