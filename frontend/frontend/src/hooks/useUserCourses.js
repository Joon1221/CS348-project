import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useUserCourses = (username) => {
  const [userCourses, setUserCourses] = useState([]);

  const getUserCourses = useCallback(() => {
    axios
      .get("http://localhost:8000/api/get_user_course/", {
        params: { username },
      })
      .then((response) => {
        setUserCourses(response.data.message);
      })
      .catch((error) => {
        console.log(`Get User Courses Error: ${error}`);
      });
  }, [username]);

  const addUserCourse = async ({ subject_code, catalog_number }) => {
    try {
      await axios.put("http://localhost:8000/api/put_user_course/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
      });
      getUserCourses();
    } catch (error) {
      throw error.response.data;
    }
  };

  const deleteUserCourse = ({ subject_code, catalog_number }) => {
    axios
      .put("http://localhost:8000/api/delete_user_course/", {
        username: username,
        subject_code: subject_code,
        catalog_number: catalog_number,
      })
      .then((response) => {
        console.log(`Response:`, response.data.message);
        getUserCourses();
      })
      .catch((error) => {
        console.log(`Add Course Error: ${error}`);
      });
  };

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return {
    userCourses,
    addUserCourse,
    deleteUserCourse,
  };
};

export default useUserCourses;
