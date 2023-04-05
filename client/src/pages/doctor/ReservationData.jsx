import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import ModalGiveResponse from "./DetReserv";
import { API } from "../../config/api";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ReservationData() {
  let { data: consultations } = useQuery("cacheConsultations", async () => {
    const response = await API.get("/consultations");
    return response.data.data;
  });

  return (
    <Container>
      <h2 className="fw-bold text-primary-color mt-5">Reservasi Data</h2>
      {consultations?.length != 0 ? (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Subject</th>
              <th>Date of complaint</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {consultations?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.user.fullname}</td>
                <td>{item.subject}</td>
                <td>{moment(item.createdAt).format("DD MMMM YYYY")}</td>
                <td
                  className={
                    item.status == "waiting"
                      ? "text-success"
                      : item.status == "pending"
                      ? "text-warning"
                      : "text-danger"
                  }
                >
                  {item.status == "waiting"
                    ? "Waiting Live Consultation"
                    : item.status == "pending"
                    ? "Waiting Approved Consultation Live"
                    : "Cancel"}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img
                        src="/assets/img/Vectoractmale.png"
                        alt="search"
                        style={{ width: "20px" }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={`/doctor/reservation-detail/${item.id}`}>
                          <Button variant="success">Give Response</Button>
                        </Link>
                      </Dropdown.Item>
                      {/* <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        ""
      )}
    </Container>
  );
}
