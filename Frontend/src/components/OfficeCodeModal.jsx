import React, { useState } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

const OfficeCodeModal = ({ officeShow, officeClose, customStyles }) => {
  /******************************************* SA OFFICE CODE DATA TABLE NI SYA ************/
  // State to hold table data
  const [officeCodeData] = useState([
    { officeName: "Accounting Unit (Account)", code: "A101-4F2D1E8C9B" },
    { officeName: "Accounting Unit (Assessment)", code: "A102-7D4C1A0E3B" },
    {
      officeName: "Admission and Testing Unit (ATU) / Student Welfare and Engagement Unit (SWEU)",
      code: "A314-5E2F1D0B4A",
    },
    { officeName: "Bids & Awards Committee (BAC) / Procurement Unit (PU)", code: "B168-9F1C2A4D7D" },
    { officeName: "Board Room", code: "B193-2B3D5F6E8E" },
    { officeName: "Board Secretary", code: "B194-A3D5E9F8F7" },
    { officeName: "Botanical Gardens and Herbarium (BGH)", code: "B312-4E7D1A2B3D" },
    { officeName: "Budget Unit", code: "B114-2D4F1A8C6A" },
    { officeName: "Bukidnon Study Center (BSC) / University Museum", code: "B342-9F2E1B6D3B" },
    { officeName: "BukSU Cooperative", code: "B307-1A5F3E8D6C" },
    { officeName: "BukSU Faculty Association (BSUFA)", code: "B308-F9E1B2A7D8" },
    { officeName: "Business Affairs Unit (BAU)", code: "B314-A6D4C1F7E9" },
    { officeName: "CAS Guidance", code: "C109-8E2D3B7F5C" },
    { officeName: "Cashiering Unit (Window 1 & 2)", code: "C103-9F2E1A6D3D" },
    {
      officeName: "Center for Innovative Teaching and Learning (CITL)",
      code: "C139-3F1D8B2E9D",
    },
    {
      officeName: "Chief Administrative Office (CAO) Admin",
      code: "C137-7F2D5E8C1A",
    },
    {
      officeName: "Chief Administrative Office (CAO) Finance",
      code: "C129-9E3D1A6B8C",
    },
    {
      officeName: "Chief Administrative Office (CAO) Finance Officer",
      code: "C185-1D4F9E2B4A",
    },
    {
      officeName: "College of Arts and Sciences (CAS) Dean’s Office",
      code: "C182-5F1D9E3B6A",
    },
    {
      officeName: "College of Business (COB) Dean’s Office",
      code: "C145-7E2D9F1B2B",
    },
    {
      officeName: "College of Education (COE) Dean’s Office",
      code: "C157-A8F6D3B2C5",
    },
    {
      officeName: "College of Law (COL) Dean’s Office & Faculty",
      code: "C145-1D9F8A4B7D",
    },
    {officeName: "College of Medicine (COM) Dean’s Office thru CON",code: "C172-6F3D8E1A4F",},
    { officeName: "College of Nursing (CON) Dean’s Office & Faculty",code: "C172-9E2D1F8A3D", },
    {officeName: "College of Public Administration and Governance (CPAG) Dean’s Office",code: "C184-5A7D9F1B2D", },
    {officeName: "College of Technology (COT) Dean’s Office", code: "C183-9F1D4B7A8C", },
    { officeName: "Commission on Audit (COA)", code: "C106-7A9D1F2B4A" },
    { officeName: "Dental Clinic", code: "D415-8E1D4F7C5D" },
    { officeName: "Disaster Risk Reduction & Management Unit (DRRM)", code: "D411-6F2D5A1C8E", }, { officeName: "Dormitory - Hostel", code: "D205-7A9E4F1B6D" },
    { officeName: "Dormitory - Kalala", code: "D171-1A9E3D5C7A" },
    { officeName: "Dormitory - Mahogany", code: "D180-5F3D9B4C2D" },
    { officeName: "Dormitory - Rubia", code: "D197-7E2D5F1C3D" },
    { officeName: "Dormitory - Rubia Cafeteria", code: "D195-4A8D2F1B6D" },
    { officeName: "DXBU", code: "D165-2F7E9A3C1D" },
    { officeName: "Economic Enterprise Unit (EEU)", code: "E122-3F1D5B9E7A" },
    {officeName: "Elementary Laboratory School",code: "E141-1D5A7B9C2A",},
    {officeName: "Environmental Health & Safety Office (EHSO)",code: "E144-3D7F8A5B1D",},
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
