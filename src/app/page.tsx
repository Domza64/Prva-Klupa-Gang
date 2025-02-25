import GlasanjeForma from "@/components/GlasanjeForma";
import VotesContainer from "@/components/VotesContainer";

export default function Home() {
  return (
    <>
      <header className="bg-slate-900 w-full h-16 flex items-center justify-center text-white text-lg font-normal shadow-lg">
        PRVA KLUPA GANG - &quot;Bolji pogled, bolji mozak!&quot;
      </header>
      <main className="min-h-screen py-12 pt-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center">
        <section className="text-center flex flex-col items-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4">PRVA KLUPA GANG</h1>
          <p className="text-lg max-w-xl text-gray-300">
            Statistički dokazano: ljudi iz prve klupe imaju **100% veće šanse**
            da budu primjećeni od profesora. 🧠✨
          </p>
          <p className="mt-2 text-gray-400 italic">
            (Zadnja klupa? Ne znamo, nitko nije preživio da ispriča.)
          </p>
          <div className="mt-6">
            <GlasanjeForma />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-10">
          <h2 className="text-3xl font-bold mb-4">Glasaj ili pati!</h2>
          <p className="text-gray-300">
            Podrži revoluciju! Hoćeš sjediti u tami zadnje klupe ili uzdići se
            među elitom predavanja? 🏆
          </p>
          <VotesContainer />
        </section>

        <section className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Zašto izabrati Prvu Klupu?
          </h2>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Bolji pogled na ploču 📖</li>
            <li>Brži odgovori na pitanja ⚡</li>
            <li>Profesori misle da si pametan 🤓</li>
          </ul>
        </section>
      </main>
      <footer className="bg-slate-950 w-full h-20 flex items-center justify-center text-gray-400 text-sm">
        &copy; 2024 - {new Date().getFullYear()} Prva Klupa Gang. Sva prava
        pridržana (osim zadnjoj klupi).
      </footer>
    </>
  );
}
