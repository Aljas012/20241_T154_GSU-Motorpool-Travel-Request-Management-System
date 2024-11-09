// OFFICE CODE
const officeOptions = [
  { value: "", label: "Select Office" },
  /** A */
  { value: "", label: "A", disabled: true },
  {
    value: "A101-4F2D1E8C9B | Accounting Unit (Assessment) - 101",
    label: "Accounting Unit (Account) ",
  },
  {
    value: "A102-7D4C1A0E3B | Accounting Unit (Assessment) - 102",
    label: "Accounting Unit (Assessment) ",
  },
  {
    value:
      "A314-5E2F1D0B4A | Admission and Testing Unit (ATU) / Student Welfare and Engagement Unit (SWEU)",
    label:
      "Admission and Testing Unit (ATU) / Student Welfare and Engagement Unit (SWEU) ",
  },

  /** B */
  { value: "", label: "B", disabled: true },
  {
    value:
      "B168-9F1C2A4D7D | Bids & Awards Committee (BAC) / Procurement Unit (PU)",
    label: "Bids & Awards Committee (BAC) / Procurement Unit (PU)",
  },

  {
    value: "B193-2B3D5F6E8E | Board Room",
    label: "Board Room",
  },

  {
    value: "B194-A3D5E9F8F7 | Board Secretary",
    label: "Board Secretary",
  },

  {
    value: "B312-4E7D1A2B3D | Botanical Gardens and Herbarium (BGH)",
    label: "Botanical Gardens and Herbarium (BGH)",
  },

  {
    value: "B114-2D4F1A8C6A | Budget Unit",
    label: "Budget Unit",
  },

  {
    value: "B342-9F2E1B6D3B | Bukidnon Study Center (BSC) / University Museum",
    label: "Bukidnon Study Center (BSC) / University Museum",
  },

  {
    value: "B307-1A5F3E8D6C | BukSU Cooperative",
    label: "BukSU Cooperative",
  },

  {
    value: "B308-F9E1B2A7D8 | BukSU Faculty Association (BSUFA)",
    label: "BukSU Faculty Association (BSUFA)",
  },

  {
    value: "B314-A6D4C1F7E9 | Business Affairs Unit (BAU)",
    label: "Business Affairs Unit (BAU)",
  },

  /** C */
  { value: "", label: "C", disabled: true },

  {
    value: "C109-8E2D3B7F5C | COLLEGE OF ARTS AND SCIENCES",
    label: "COLLEGE OF ARTS AND SCIENCES",
  },

  {
    value: "C103-9F2E1A6D3D | Cashiering Unit (Window 1 & 2)",
    label: "Cashiering Unit (Window 1 & 2)",
  },

  {
    value:
      "C139-3F1D8B2E9D | Center for Innovative Teaching and Learning (CITL)",
    label: "Center for Innovative Teaching and Learning (CITL)",
  },

  {
    value: "C137-7F2D5E8C1A | Chief Administrative Office (CAO) Admin",
    label: "Chief Administrative Office (CAO) Admin",
  },

  {
    value: "C129-9E3D1A6B8C | Chief Administrative Office (CAO) Finance",
    label: "Chief Administrative Office (CAO) Finance",
  },

  {
    value:
      "C185-1D4F9E2B4A | Chief Administrative Office (CAO) Finance Officer",
    label: "Chief Administrative Office (CAO) Finance Officer",
  },

  {
    value: "C182-5F1D9E3B6A | COLLEGE OF ARTS AND SCIENCES",
    label: "College of Arts and Sciences (CAS) Dean's Office",
  },

  {
    value: "C145-7E2D9F1B2B | COLLEGE OF BUSINESS",
    label: "College of Business (COB) Dean's Office",
  },

  {
    value: "C157-A8F6D3B2C5 | COLLEGE OF EDUCATION",
    label: "College of Education (COE) Dean's Office ",
  },

  {
    value: "C145-1D9F8A4B7D | COLLEGE OF LAW",
    label: "College of Law (COL) Dean's Office & Faculty ",
  },

  {
    value: "C172-6F3D8E1A4F | COLLEGE OF MEDICINE",
    label: "College of Medicine (COM) Dean's Office thru CON ",
  },

  {
    value: "C172-9E2D1F8A3D | COLLEGE OF NURSING",
    label: "College of Nursing (CON) Dean's Office & Faculty ",
  },

  {
    value: "C184-5A7D9F1B2D | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE",
    label:
      "College of Public Administration and Governance (CPAG) Dean's Office",
  },

  {
    value: "C183-9F1D4B7A8C | COLLEGE OF TECHNOLOGY",
    label: "College of Technology (COT) Dean's Office",
  },

  {
    value: "C106-7A9D1F2B4A  | Commission on Audit (COA)",
    label: "Commission on Audit (COA) ",
  },

  /** D */
  { value: "", label: "D", disabled: true },

  {
    value: "D415-8E1D4F7C5D | Dental Clinic",
    label: "Dental Clinic",
  },

  {
    value:
      "D411-6F2D5A1C8E |  Disaster Risk Reduction & Management Unit (DRRM)",
    label: "Disaster Risk Reduction & Management Unit (DRRM)",
  },

  {
    value: "D205-7A9E4F1B6D | Dormitory - Hostel",
    label: "Dormitory - Hostel",
  },

  {
    value: "D171-1A9E3D5C7A | Dormitory - Kalala",
    label: "Dormitory - Kalala",
  },

  {
    value: "D180-5F3D9B4C2D | Dormitory - Mahogany",
    label: "Dormitory - Mahogany",
  },

  {
    value: "D197-7E2D5F1C3D | Dormitory - Rubia",
    label: "Dormitory - Rubia",
  },

  {
    value: "D195-4A8D2F1B6D | Dormitory - Rubia Cafeteria",
    label: "Dormitory - Rubia Cafeteria",
  },

  {
    value: "D165-2F7E9A3C1D | DXBU",
    label: "DXBU",
  },

  /** E */
  { value: "", label: "E", disabled: true },

  {
    value: "E122-3F1D5B9E7A | Economic Enterprise Unit (EEU)",
    label: "Economic Enterprise Unit (EEU) ",
  },

  {
    value: "E141-1D5A7B9C2A | Elementary Laboratory School",
    label: "Elementary Laboratory School ",
  },

  {
    value: "E144-3D7F8A5B1D | Environmental Health & Safety Office (EHSO)",
    label: "Environmental Health & Safety Office (EHSO) ",
  },

  {
    value: "E176-9F1D3A5B2D | Extension Director",
    label: "Extension Director ",
  },

  /** F */
  { value: "", label: "F", disabled: true },

  {
    value: "F200-2D7E1F9B5A | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS DevCom & ComDev Department ",
  },

  {
    value: "F147-8A9D1F3C4B | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS Economics Department ",
  },

  {
    value: "F128-7D4E1A5B9C | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS General Education Department ",
  },

  {
    value: "F148-9E1D3F5B7D | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS General Science Department ",
  },

  {
    value: "F124-1D9E3B7C8A | COLLEGE OF ARTS AND SCIENCES",
    label:
      "Faculty - CAS Language and Letters Department (LLD), English & Filipino, Graduate Studies ",
  },

  {
    value: "F148-5A3F9E2D1A | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS Mathematics Department",
  },

  {
    value: "F128-9D5A1E3B6D | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS Natural Science Department ",
  },

  {
    value: "F148-1B7E3D5C9D | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS Philosophy Department ",
  },

  {
    value: "F103-9E1D7B5C8A | COLLEGE OF ARTS AND SCIENCES",
    label: "Faculty - CAS Social Science Department ",
  },

  {
    value: "F189-2D7E1A6B5A | COLLEGE OF BUSINESS",
    label: "Faculty - COB Accountancy Department",
  },

  {
    value: "F182-9D5A1E3B6A | COLLEGE OF BUSINESS",
    label: "Faculty - COB Business Administration Department ",
  },

  {
    value: "F103-7A9D1F6C3D | COLLEGE OF BUSINESS",
    label: "Faculty - COB Hospitality Management Department ",
  },

  {
    value: "F172-4D3E1F7B9D | COLLEGE OF EDUCATION",
    label: "Faculty - COE Elementary Laboratory School ",
  },

  {
    value: "F187-1F2D5A9C4D | COLLEGE OF EDUCATION",
    label: "Faculty - COE P. E. Chairperson ",
  },

  {
    value: "F137-7D3F8A1C2B | COLLEGE OF EDUCATION",
    label: "Faculty - COE P. E. Department ",
  },

  {
    value: "F178-5A9D1E2F6D | COLLEGE OF EDUCATION",
    label: "Faculty - COE Secondary Laboratory School ",
  },

  {
    value: "F179-4D3E1B7A8C | COLLEGE OF TECHNOLOGY",
    label: "Faculty - COT Automotive Department ",
  },

  {
    value: "F184-6A7F3D9B1A | COLLEGE OF TECHNOLOGY",
    label: "Faculty - COT Food Technology ",
  },

  {
    value: "F203-8B1D9F7E5A | COLLEGE OF TECHNOLOGY",
    label: "Faculty - COT IT, Electronics Department ",
  },

  {
    value: "F203-1D5E8A7F9A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE",
    label: "Faculty - CPAG Bachelor of Public Administration (BPA) Department",
  },

  {
    value: "F203-7D9A1E5B6A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE",
    label: "Faculty - CPAG Chairperson of DPA and MPA",
  },

  /** G */
  { value: "", label: "G", disabled: true },

  {
    value: "G107-2D9A5B7F1C | Gender & Development (GAD) Unit",
    label: "Gender & Development (GAD) Unit ",
  },

  {
    value: "G147-1F9D2A3B8C | General Services Unit (GSU)",
    label: "General Services Unit (GSU) ",
  },

  {
    value: "G097-7F2D1A9C5A | Graduate Studies Office Ms. Margarita",
    label: " Graduate Studies Office Ms. Margarita ",
  },

  {
    value: "G104-8F2D1E9A6D | Guard House 1 (Near BNHS)",
    label: "Guard House 1 (Near BNHS) ",
  },

  {
    value: "G106-9E5D3A1F4D |  Guard House 2 (Main Gate)",
    label: "Guard House 2 (Main Gate) ",
  },

  {
    value: "G106-2D9E4B1A5C |  Guard House 3 (Near Zeta)",
    label: "Guard House 3 (Near Zeta) ",
  },

  {
    value: "G116-5F1D7A3E9B |  Guidance Office",
    label: "Guidance Office",
  },

  /** H */
  { value: "", label: "H", disabled: true },

  {
    value: "H141-2D3E5F9B6C |  HRMU Learning and Development",
    label: "HRMU Learning and Development",
  },

  {
    value: "H739-4D8F2A7B1E | Hotel Laboratory, Casisang",
    label: "Hotel Laboratory, Casisang",
  },

  {
    value: "H306-9D1A5F7C3D | HRMU Performance Management",
    label: "HRMU Performance Management ",
  },

  {
    value: "H191-7E2D5A8C3A | HRMU Staff",
    label: "HRMU Staff - 191",
  },

  /** I */
  { value: "", label: "I", disabled: true },

  {
    value: "I179-4C7D9E1B5F | ICTU Audio Visual Center (AVC)",
    label: "ICTU Audio Visual Center (AVC)",
  },

  {
    value: "I121-3E2F5A9B6C | ICTU Computer Laboratory-Telephone Concerns",
    label: "ICTU Computer Laboratory-Telephone Concerns",
  },

  {
    value: "I131-7B3D9F1A5D | ICTU Data Center",
    label: "ICTU Data Center ",
  },

  {
    value: "I198-5A7F2D9B6A | ICTU Mini-Theater",
    label: "ICTU Mini-Theater ",
  },

  {
    value: "I128-3D2E1F9C8B | ICTU Officer",
    label: "ICTU Officer",
  },

  {
    value: "I311-9F7A4C2D1A | Information Unit (IU)",
    label: "Information Unit (IU) ",
  },

  {
    value:
      "I110-2F9A6D3B7A | Intellectual Property & Technology Transfer Unit (IPTTU)",
    label: "Intellectual Property & Technology Transfer Unit (IPTTU)",
  },

  {
    value: "I300-5D1F7A9C3A | Internal Audit Unit (IAU)",
    label: "Internal Audit Unit (IAU) ",
  },

  {
    value:
      "I313-4F8D1A7B9A |  International Affairs & Linkages Unit (IALU) & Alumni Relations Unit (ARU)",
    label:
      "International Affairs & Linkages Unit (IALU) & Alumni Relations Unit (ARU) ",
  },

  /** L */
  { value: "", label: "L", disabled: true },

  {
    value: "L141-1F9D3A7B8A | Legal Unit",
    label: "Legal Unit - 141",
  },

  {
    value: "L302-8A9D1F7E3D | Library - 1st Floor (Learning Commons)",
    label: "Library - 1st Floor (Learning Commons) ",
  },

  {
    value: "L303-2E7D5F1A8D |  Library - 2nd Floor (Office of the University Librarian)",
    label: "Library - 2nd Floor (Office of the University Librarian)",
  },

  {
    value: "L303-7F2D8A9C5D |  Library - 3rd Floor (Sentro ng Wika at Kultura)",
    label: "Library - 3rd Floor (Sentro ng Wika at Kultura) ",
  },

  {
    value: "L174-4F1D2E3C8B |  Library - Basement (Graduate School Lawang)",
    label: "Library - Basement (Graduate School Lawang) "
  },

  /** TO BE CONTINUE / UPDATEEEEEEEEEEEEEESSSSSSSSSSSSSSS */
];

export default officeOptions;
