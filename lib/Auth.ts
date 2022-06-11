import axios from "axios";
import { GetServerSidePropsContext } from "next";

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
  try {
    const resp = await axios({
      method: "GET",
      url: "http://localhost:5010/logged_in",
      headers: context.req.headers.cookie ? { cookie: context.req.headers.cookie } : undefined
    });
    return resp.status === 200 ? true : false;
  } catch (error) {
    return false;
  }
};

export { login, checkLogin };
