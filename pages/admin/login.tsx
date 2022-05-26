import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { login } from "../../lib/Auth";

interface IUserCredential {
  username: string;
  password: string;
}

const Login: NextPageLayout = (): ReactElement => {
  const [logged, setLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserCredential>({
    username: "",
    password: ""
  });

  const router = useRouter();

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value.trim()
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const { username, password } = userData;
    setLogged(await login(username, password));
  };

  useEffect(() => {
    if (logged === true) router.push("/admin");
  }, [logged, router]);

  return (
    <>
      <div className='w-full md:w-4/6 lg:w-3/6 2xl:w-1/3 mx-auto mt-10'>
        <h1 className='text-2xl text-center mb-16'>Login as admin</h1>

        <form onSubmit={handleSubmit}>
          <div className='w-5/6 mx-auto my-4'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='username'
              id='email'
              className='block mt-2 w-full border border-gray-600 p-3 focus:ring-0 rounded-lg shadow-sm focus:shadow-md'
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-5/6 mx-auto my-4'>
            <label htmlFor='name'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              className='block mt-2 w-full border border-gray-600 p-3 focus:ring-0 rounded-lg shadow-sm focus:shadow-md'
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            className='block mx-auto w-3/6 border p-5 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md'
          >
            login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
