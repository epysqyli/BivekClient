import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import IWorkingPaper from "../../interfaces/models/IWorkingPaper";
import { checkLogin } from "../../lib/Auth";
import AdminLayout from "../../layouts/AdminLayout";
import { getWorkingPapers } from "../../lib/WorkingPaperRepo";
import TopElement from "../../components/admin/TopElement";
import WorkingPaperForm from "../../components/admin/WorkingPaperForm";
import { PlusCircle } from "react-feather";
import WorkingPaperElement from "../../components/admin/WorkingPaperElement";

export const getServerSideProps: GetServerSideProps<{} | Redirect> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{} | Redirect>> => {
  const isLogged: boolean = await checkLogin(context);
  if (isLogged === false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    };
  }

  const workingPapers: AxiosResponse<Array<IWorkingPaper>> = await getWorkingPapers();
  return { props: { workingPaperProps: workingPapers.data } };
};

interface Props {
  workingPaperProps: Array<IWorkingPaper>;
}

const ManageWorkingPapers: NextPageLayout<Props> = ({ workingPaperProps }: Props): ReactElement => {
  const [workingPapers, setWorkingPapers] = useState<Array<IWorkingPaper>>(workingPaperProps);
  const [showForm, setShowForm] = useState<boolean>(false);
  const showWpForm = () => setShowForm(true);
  const hideWpForm = () => setShowForm(false);

  const addWorkingPaperToState = (workingPaper: IWorkingPaper) => {
    setWorkingPapers([...workingPapers, workingPaper]);
  };

  const replaceWorkingPapersInState = (workingPaper: IWorkingPaper) => {
    const oldWorkingPapers: Array<IWorkingPaper> = workingPapers.filter((wp) => wp.id !== workingPaper.id);
    const newWorkingPapers: Array<IWorkingPaper> = [...oldWorkingPapers, workingPaper].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    setWorkingPapers(newWorkingPapers);
  };

  const removeWorkingPaperFromState = async (id: number): Promise<void> => {
    setWorkingPapers(workingPapers.filter((wp) => wp.id !== id));
  };

  return (
    <div className='mx-auto w-5/6 md:w-4/6 lg:w-2/5 xl:w-1/3'>
      <TopElement text='Manage working papers' />
      {showForm ? (
        <div className='my-10'>
          <WorkingPaperForm addWorkingPaperToState={addWorkingPaperToState} hideForm={hideWpForm} />
        </div>
      ) : (
        <div
          onClick={showWpForm}
          className='w-4/5 mx-auto py-2 rounded-md group cursor-pointer bg-white hover:bg-slate-100 hover:shadow active:shadow-inner'
        >
          <PlusCircle
            size={36}
            strokeWidth={1.5}
            className='w-fit mx-auto mb-3 text-slate-600 transition-transform group-hover:scale-95 group-active:scale-90'
          />
          <h1 className='text-xl text-center text-gray-700'>Add a new working paper</h1>
        </div>
      )}

      {workingPapers
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .map((wp) => {
          return (
            <div
              key={wp.id}
              className='mx-auto w-11/12 my-10 p-2 border rounded-sm bg-white hover:bg-slate-50'
            >
              <WorkingPaperElement
                workingPaper={wp}
                replaceWorkingPapersInState={replaceWorkingPapersInState}
                removeWorkingPaperFromState={removeWorkingPaperFromState}
              />
            </div>
          );
        })}
    </div>
  );
};

ManageWorkingPapers.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageWorkingPapers;
