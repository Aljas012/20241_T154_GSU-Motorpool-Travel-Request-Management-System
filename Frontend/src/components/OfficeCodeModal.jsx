import React, { useState } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

const OfficeCodeModal = ({ officeShow, officeClose, customStyles }) => {
  /******************************************* SA OFFICE CODE DATA TABLE NI SYA ************/
  // State to hold table data
  const [officeCodeData] = useState([
    { officeName: "Office ni Boss Amo Davy", code: "69696969" },
    { officeName: "Office ni Boss Amo Mart", code: "96969696" },
  ]);

  // Columns configuration
  const officeCodeColumns = [
    {
      name: "Office Name",
      selector: (row) => row.officeName,
    },
    {
      name: "Code",
      selector: (row) => row.code,
    },
  ];
  return (
    <Modal
      show={officeShow}
      onHide={officeClose}
      size="xl"
   
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
          BukSU Office Code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body>
                <div>
                  <DataTable
                    columns={officeCodeColumns}
                    data={officeCodeData}
                    customStyles={customStyles}
                    //progressPending={loading} // Show a loading spinner while fetching data
                    highlightOnHover
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default OfficeCodeModal;
