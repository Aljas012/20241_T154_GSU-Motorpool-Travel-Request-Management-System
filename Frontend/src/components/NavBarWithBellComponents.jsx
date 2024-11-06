import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function NavBarWithBellComponent() {
  return (
    <Navbar
      style={{
        background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)",
        fontFamily: "Helvetica"
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <div className="text-left">
          <h4 className="text-white fw-bold mb-0">BUKSU</h4>
          <h4 className="text-white fw-bold mb-0">GSU MOTORPOOL</h4>
          <h5 className="text-white mb-0">Request Management System</h5>
        </div>
        <div>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => alert("Bell Icon Clicked!")}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 46 46"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path d="M40.061 28.9955L32.9885 40.5361C32.2118 41.8111 31.1546 42.8922 29.8972 43.697C28.6397 44.5018 27.2153 45.0092 25.7323 45.1805C25.3415 45.2269 24.9483 45.25 24.5548 45.2499C22.54 45.2471 20.5753 44.6217 18.9298 43.4593C17.2292 44.7333 15.1286 45.356 13.0085 45.2147C10.8884 45.0733 8.88907 44.1772 7.37272 42.6888C5.85638 41.2003 4.92335 39.2179 4.74268 37.1008C4.56201 34.9837 5.14566 32.8719 6.38788 31.148L3.92226 28.6861C2.86944 27.6333 2.06847 26.3558 1.57935 24.9495C1.09023 23.5432 0.925633 22.0444 1.09788 20.5654C1.27012 19.0865 1.77475 17.6656 2.57397 16.4094C3.37318 15.1531 4.44628 14.0939 5.71288 13.3111L16.526 6.62489C19.4552 4.7476 22.8998 3.83743 26.374 4.02279C29.8481 4.20816 33.1764 5.4797 35.8891 7.65802L38.9998 4.54739C39.1727 4.36831 39.3796 4.22547 39.6084 4.1272C39.8371 4.02894 40.0832 3.97721 40.3321 3.97505C40.5811 3.97289 40.828 4.02033 41.0584 4.1146C41.2888 4.20888 41.4982 4.3481 41.6742 4.52415C41.8503 4.7002 41.9895 4.90955 42.0838 5.13998C42.1781 5.37041 42.2255 5.61731 42.2234 5.86627C42.2212 6.11523 42.1695 6.36127 42.0712 6.59003C41.9729 6.81879 41.8301 7.02568 41.651 7.19864L38.5441 10.3074C40.6279 12.9178 41.8854 16.0907 42.1556 19.4199C42.4258 22.7491 41.6965 26.0832 40.061 28.9955ZM16.0723 40.838L9.09913 33.863C8.55421 34.8376 8.34404 35.964 8.50086 37.0695C8.65767 38.1749 9.17281 39.1985 9.96726 39.983C10.7687 40.7443 11.788 41.236 12.8827 41.3893C13.9773 41.5426 15.0925 41.3498 16.0723 40.838ZM34.6741 11.588C32.592 9.48584 29.8512 8.16244 26.9101 7.83922C23.9691 7.516 21.0062 8.21257 18.5173 9.8124L7.68538 16.4986C6.89983 16.9842 6.23432 17.6412 5.73868 18.4204C5.24303 19.1997 4.93011 20.0809 4.82334 20.9982C4.71656 21.9155 4.81871 22.8451 5.12212 23.7174C5.42554 24.5896 5.92236 25.3819 6.57538 26.0349L20.2441 39.7055C20.8982 40.3603 21.6922 40.8583 22.5665 41.162C23.4408 41.4657 24.3725 41.5673 25.2917 41.459C26.2108 41.3507 27.0935 41.0354 27.8732 40.5368C28.653 40.0383 29.3095 39.3694 29.7935 38.5805L36.8341 27.0961C38.2093 24.6263 38.7423 21.7756 38.3526 18.9757C37.9628 16.1758 36.6715 13.5791 34.6741 11.5786V11.588ZM37.0723 45.2499C36.6763 45.2506 36.2902 45.126 35.9695 44.8938C35.6487 44.6616 35.4097 44.3338 35.2866 43.9575C35.1636 43.5811 35.1629 43.1754 35.2846 42.7986C35.4063 42.4218 35.6442 42.0932 35.9641 41.8599C39.2473 39.3916 41.4692 35.7674 42.1798 31.7218C42.2296 31.4782 42.3273 31.247 42.4673 31.0416C42.6073 30.8362 42.7868 30.6607 42.9952 30.5252C43.2037 30.3898 43.437 30.2972 43.6816 30.2528C43.9261 30.2083 44.1771 30.213 44.4199 30.2664C44.6626 30.3199 44.8924 30.4211 45.0957 30.5641C45.299 30.7072 45.4718 30.8892 45.6041 31.0997C45.7364 31.3101 45.8255 31.5448 45.8663 31.79C45.9071 32.0352 45.8987 32.2861 45.8416 32.528C44.9229 37.4624 42.188 41.8731 38.1766 44.8899C37.968 45.0439 37.7199 45.1637 37.4542 45.2438C37.3274 45.2549 37.1999 45.2498 37.0723 45.2499V45.2499Z" />
            </svg>
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBarWithBellComponent;
