import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type IAdminProps from "../../interfaces/IAdminProps";
import AdminLayout from "../../layout/AdminLayout";
import { login, checkLogin } from "../../lib/Auth";
import { useState, useEffect } from "react";

interface IUserCredential {
  username: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const isLogged: boolean = await checkLogin(context);
  return { props: { isLogged } };
};

const AdminIndex: NextPageLayout<IAdminProps> = ({
  isLogged,
}: IAdminProps): ReactElement => {
  const [logged, setLogged] = useState<boolean>(isLogged);
  const [userData, setUserData] = useState<IUserCredential>({
    username: "",
    password: "",
  });

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const { username, password } = userData;
    setLogged(await login(username, password));
  };

  useEffect(() => {}, [logged]);

  if (logged) return <div className="text-center mt-10">Manage all things now</div>;

  return (
    <>
      <div className="md:w-4/6 lg:w-3/6 2xl:w-1/3 mx-auto mt-10">
        <form onSubmit={handleSubmit}>
          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="username"
              id="email"
              className="block mt-2 w-full border border-gray-600 p-3 focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="block mt-2 w-full border border-gray-600 p-3 focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="block mx-auto w-3/6 border p-5 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
          >
            login
          </button>
        </form>
      </div>
    </>
  );
};

AdminIndex.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminIndex;
