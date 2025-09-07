import HeroSection from "../components/HeroSection/HeroSection";
import PessoasList from "../components/PessoasList/PessoasList";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <PessoasList />
    </div>
  );
}

export default Home;
