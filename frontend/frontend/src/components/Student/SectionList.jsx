import React, { useState, useEffect } from "react";
import { getAllSections } from "../../hooks/getDeptInfo";

export default function SectionList() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const result = await getAllSections();
      console.log("RESULT", result);
    };

    fetchSections();
  }, []);

  return (
    <>
      <h1>Section List</h1>
      <p>Section list content</p>
    </>
  );
}
