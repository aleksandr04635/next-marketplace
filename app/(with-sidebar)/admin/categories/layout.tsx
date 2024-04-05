interface ProtectedLayoutProps {
  children: React.ReactNode;
}

//export const dynamic = "force-dynamic"; //tells next to not cache ay pages in the layout

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <>{children}</>;
};

export default ProtectedLayout;
