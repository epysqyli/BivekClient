import { ReactElement, useContext } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import IWorkingPaper from "../../interfaces/models/IWorkingPaper";
import { checkLogin } from "../../lib/Auth";
import AdminLayout from "../../layouts/AdminLayout";
import { deleteWorkingPaper, getWorkingPapers } from "../../lib/WorkingPaperRepo";
import TopElement from "../../components/admin/TopElement";
import WorkingPaperForm from "../../components/admin/WorkingPaperForm";
import { PlusCircle } from "react-feather";
import WorkingPaperElement from "../../components/admin/WorkingPaperElement";
import { OverlayContext } from "../../hooks/OverlayContext";
import DeleteConfirmation from "../../components/admin/DeleteConfirmation";
import Head from "next/head";

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

const ManageResearchPapers: NextPageLayout<Props> = ({ workingPaperProps }: Props): ReactElement => {
  const [workingPapers, setWorkingPapers] = useState<Array<IWorkingPaper>>(workingPaperProps);
  const [currentWorkingPaperId, setCurrentWorkingPaperId] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const showWpForm = () => setShowForm(true);
  const hideWpForm = () => setShowForm(false);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { showOverlay, hideOverlay } = useContext(OverlayContext);
  const showDeleteConfirmation = () => {
    setShowDelete(true);
    showOverlay();
  };
  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

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
    <>
      <Head>
        <title>Manage research papers</title>
      </Head>
      <div className='mx-auto w-11/12 md:w-4/6 lg:w-3/5 xl:w-1/2'>
        <TopElement text='Manage research papers' />
        {showForm ? (
          <div className='my-10'>
            <WorkingPaperForm addWorkingPaperToState={addWorkingPaperToState} hideForm={hideWpForm} />
          </div>
        ) : (
          <div onClick={showWpForm} className='w-11/12 mx-auto py-2 rounded-md group cursor-pointer'>
            <PlusCircle
              size={50}
              fill='white'
              strokeWidth={1.25}
              className='w-fit mx-auto text-amber-600 transition-transform group-hover:scale-95 group-active:scale-90'
              aria-label='add-working-paper'
              role='button'
            />
          </div>
        )}

        {workingPapers
          .sort((a, b) => (a.id > b.id ? -1 : 1))
          .map((wp) => {
            return (
              <div
                key={wp.id}
                className='mx-auto my-10 p-2 border dark:border-amber-600 rounded-sm bg-white dark:bg-slate-600 hover:bg-slate-50 hover:border-slate-300'
              >
                <WorkingPaperElement
                  workingPaper={wp}
                  setCurrentWorkingPaperId={setCurrentWorkingPaperId}
                  showDeleteConfirmation={showDeleteConfirmation}
                  replaceWorkingPapersInState={replaceWorkingPapersInState}
                />
              </div>
            );
          })}

        <DeleteConfirmation
          id={currentWorkingPaperId}
          show={showDelete}
          hideShow={hideDeleteConfirmation}
          deleteItem={deleteWorkingPaper}
          updateStateAfterDelete={removeWorkingPaperFromState}
          resourceType='working paper'
        />
      </div>
    </>
  );
};

ManageResearchPapers.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageResearchPapers;
