import { ReactElement } from "react";

const FullScreenLoader = (): ReactElement => {
  return (
    <div className='fixed w-full h-screen z-50 bg-gray-900 bg-opacity-30'>
      <div className='lds-ellipsis mx-auto scale-150 mt-44 lg:mt-52'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
