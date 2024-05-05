import Header from "@/components/home/header";
import HomeNavbar from "@/components/home/navbar";

export default function Home() {
  return (
    <main>
      <HomeNavbar />
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <Header />
      </div>
    </main>
  );
}
