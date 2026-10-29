import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <main className="w-full flex-1">
        <div className="flex justify-center pt-24">
          <Calculator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
