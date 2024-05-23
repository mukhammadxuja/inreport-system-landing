import Cards from "@/components/home/cards";
import Header from "@/components/home/header";
import HomeNavbar from "@/components/home/navbar";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* <HomeNavbar /> */}
      <Header />
      <Cards />
    </main>
  );
}
