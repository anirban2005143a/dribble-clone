import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/showToast";
import Loader from "../components/loader/Loader";
import { Login } from "../pages/auth/Login";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userData, setuserData] = useState(null);
  const [isAuthenticating, setisAuthenticating] = useState(true);

  const navigate = useNavigate();

  const validateLoginForm = useCallback((formData, setErrors = () => {}) => {
    if (!formData) return false;

    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, []);

  const validateSignupForm = (formData, setErrors = () => {}) => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const userLogin = useCallback(
    async (formData = {}, setisLoading = () => {}) => {
      try {
        setisLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/login`,
          formData,
        );

        if (response?.data?.token) {
          setisAuthenticated(true);
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userid", response?.data?.userid);
          localStorage.setItem("email", response?.data?.email);
          setuserData(response?.data?.user || null)
          // showToast(response.data.message, 1);
          navigate("/");
        }
      } catch (error) {
        setisAuthenticated(false);
        showToast(error.response?.data?.message || error.message, 0);
        console.error("Error submitting form while login:", error);
      } finally {
        setisLoading(false);
      }
    },
    [],
  );

  const userSignup = useCallback(
    async (formData = {}, setisLoading = () => {}) => {
      try {
        setisLoading(true);
        console.log("Form is valid, submitting...");
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/register`,
          {
            fullname: {
              firstname: formData.firstName,
              lastname: formData.lastName,
            },
            email: formData.email,
            password: formData.password,
          },
        );

        console.log(response);
        // showToast(response?.data?.message, 1);

        if (response?.data?.token) {
          setisAuthenticated(true);
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userid", response?.data?.userid);
          localStorage.setItem("email", response?.data?.email);
          setuserData(response?.data?.user || null)
          navigate("/");
        }
      } catch (error) {
        setisAuthenticated(false);
        showToast(error?.response?.data?.message || "Something went wrong!", 0);
        console.error("Error submitting form while signup:", error);
      } finally {
        setisLoading(false);
      }
    },
    [],
  );

  const getUserProfile = useCallback(async () => {
    try {
      setisAuthenticating(true);

      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      console.log(token , userid)

      if (!userid) {
        showToast("User ID not found. Please login again.", 0);
        return;
      }
      if (!token) {
        showToast("Token not found. Please login again.", 0);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/getUserProfile`,
        { userid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      if (response?.data?.user) {
        setisAuthenticated(true);
        setuserData(response.data.user);
      }
    } catch (error) {
      setisAuthenticated(false);
      showToast(error.response?.data?.message || error.message, 0);
      console.error("Error fetching user profile:", error);
    } finally {
      setisAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticating]);

  useEffect(() => {
    getUserProfile();
  }, []);

  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          userData,
          userLogin,
          userSignup,
          validateLoginForm,
          validateSignupForm,
          setisAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
