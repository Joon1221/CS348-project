import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useUserCoursesTaken = (username) => {
  const [userCoursesTaken, setUserCoursesTaken] = useState([]);

  const getAllUserCoursesTaken = useCallback(() => {
    axios
      .get("http://localhost:8000/api/get_user_course_taken/", {
        params: { username },
      })
      .then((response) => {
        setUserCoursesTaken(response.data.message);
      })
      .catch((error) => {
        console.log(`Get Courses Taken Error: ${error}`);
      });
  }, [username]);

  const addUserCourseTaken = ({ subject_code, catalog_number, term_code, grade, credit }) => {
    axios
      .put("http://localhost:8000/api/put_user_course_taken/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
        term_code: term_code,
        grade: grade,
        credit: credit,
      })
      .then((response) => {
        console.log(`Response:`, response.data.message);
        getAllUserCoursesTaken();
      })
      .catch((error) => {
        console.log(`Add Course Taken Error: ${error}`);
      });
  };

  const deleteUserCourseTaken = ({ subject_code, catalog_number }) => {
    axios
      .put("http://localhost:8000/api/delete_user_course_taken/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
      })
      .then((response) => {
        console.log(`Response:`, response.data.message);
        getAllUserCoursesTaken();
      })
      .catch((error) => {
        console.log(`Delete Course Taken Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllUserCoursesTaken();
  }, [getAllUserCoursesTaken]);

  return {
    userCoursesTaken,
    addUserCourseTaken,
    deleteUserCourseTaken,
  };
};

export default useUserCoursesTaken;
