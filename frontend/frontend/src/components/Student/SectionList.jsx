import React, { useState, useEffect } from "react";
import { getAllSections } from "../../hooks/getDeptInfo";

export default function SectionList() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      // Check if we have the data in local storage
      const cachedSections = localStorage.getItem("sections");

      if (cachedSections) {
        // If data is found in local storage, use it
        setSections(JSON.parse(cachedSections));
      } else {
        // If not, fetch the data from the API
        const result = await getAllSections();
        setSections(result);
        // Cache the data in local storage
        localStorage.setItem("sections", JSON.stringify(result));
      }
    };

    fetchSections();
  }, []);

  return (
    <>
      <h1>Section List</h1>
      {sections}
    </>
  );
}
