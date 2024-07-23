import axios from "axios";

export const getAllDept = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/get_subject_codes/"
    );
    return response.data.message;
  } catch (error) {
    console.error(`Get all department error:${error}`);
  }
};

export const getAllDeptCourseCode = async (subject_code) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/get_catalog_numbers/",
      {
        params: {
          subject_code: subject_code,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(`Get all department error:${error}`);
  }
};

export const getAllSections = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/get_all_sections/"
    );
    return response.data.message;
  } catch (error) {
    console.error(`Get all sections error:${error}`);
  }
};
