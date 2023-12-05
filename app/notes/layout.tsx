import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default NotesLayout;
