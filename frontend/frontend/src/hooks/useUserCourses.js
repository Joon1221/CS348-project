import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useUserCourses = (username) => {
  const [userCourses, setUserCourses] = useState([]);
  const [courses, setCourses] = useState([]);

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

  const getAllCourses = () => {
    axios
      .get("http://localhost:8000/api/get_all_courses/")
      .then((response) => {
        setCourses(response.data.message);
      })
      .catch((error) => {
        console.log(`Get All Courses Error: ${error}`);
      });
  };

  const addUserCourse = (courseToAdd) => {
    axios
      .put("http://localhost:8000/api/put_user_course/", {
        data: courseToAdd,
        username: username,
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
    courses,
    getAllCourses,
    addUserCourse,
  };
};

export default useUserCourses;
