import axios from "axios";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

const getToken = (context: GetServerSidePropsContext): string | undefined => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");
  return token;
};

const login = async (username: string, password: string): Promise<boolean> => {
  const resp = await axios({
    method: "POST",
    url: "http://localhost:5010/login",
    data: { username: username, password: password },
    withCredentials: true
  });

  return resp.status === 200 ? true : false;
};

const checkLogin = async (context: GetServerSidePropsContext): Promise<boolean> => {
  const token = getToken(context);

  try {
    const resp = await axios({
      method: "GET",
      url: "http://localhost:5010/logged_in",
      headers: { Authorization: `Bearer ${token}` }
    });
    return resp.status === 200 ? true : false;
  } catch (error) {
    return false;
  }
};

export { login, checkLogin };
