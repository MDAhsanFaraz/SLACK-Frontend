import axios from "@/config/axiosConfig";

export const signupRequest = async ({ email, password, username }) => {
  try {
    const response = await axios.post("users/signup", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const signInRequest = async ({ email, password }) => {
  try {
    const reponse = await axios("users/signin", { email, password });
    return reponse.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
