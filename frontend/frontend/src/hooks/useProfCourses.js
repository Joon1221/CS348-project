import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useProfCourse = (username) => {
  const [profCoursesTaught, setProfCoursesTaught] = useState([]);

  const getAllProfCoursesTaught = useCallback(() => {
    axios
      .get("http://localhost:8000/api/get_professor_course_taught/", {
        params: { username },
      })
      .then((response) => {
        // console.log("tada", response.data.message);
        setProfCoursesTaught(response.data.message);
      })
      .catch((error) => {
        console.log(`Get User Courses Error: ${error}`);
      });
  }, [username]);

  const addProfCourseTaught = ({ subject_code, catalog_number }) => {
    axios
      .put("http://localhost:8000/api/put_professor_course_taught/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
      })
      .then((response) => {
        console.log(`Response:`, response.data.message);
        getAllProfCoursesTaught();
      })
      .catch((error) => {
        console.log(`Add Course Error: ${error}`);
      });
  };

  const deleteProfCourseTaught = ({ subject_code, catalog_number }) => {
    axios
      .put("http://localhost:8000/api/delete_professor_course_taught/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
      })
      .then((response) => {
        console.log(`Response:`, response.data.message);
        getAllProfCoursesTaught();
      })
      .catch((error) => {
        console.log(`Add Course Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllProfCoursesTaught();
  }, [getAllProfCoursesTaught]);

  return {
    profCoursesTaught,
    addProfCourseTaught,
    deleteProfCourseTaught,
  };
};

export default useProfCourse;

export const getStudentsTaught = async (username) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/get_students_for_professor/",
      {
        params: {
          username: username.username,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(`Get all student taught error:${error}`);
  }
};
