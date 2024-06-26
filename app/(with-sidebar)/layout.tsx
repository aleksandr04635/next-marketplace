import { Sidebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

//export const dynamic = "force-dynamic"; //tells next to not cache ay pages in the layout

//h-fit xl:min-h-[calc(100vh_-_130px)] xl:min-h-fit bg-red-500   gap-x-2
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    /*  <div
      className="h-fit w-full flex flex-col gap-y-3 items-center justify-center  min-h-screen
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    > */
    <div className=" w-full flex flex-row gap-x-0   ">
      <Sidebar />
      <div className="mx-auto w-full  min-h-[calc(100vh_-_128px)] lg:pl-0 pr-[16px] flex items-center justify-center">
        {/*  py-2 */}
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
