import logo from '../assets/logo.png';

export default function About() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-white p-6 shadow-lg">
        <img
          src={logo}
          alt="Logo"
          className="h-24 w-24 rounded-full object-cover shadow-md"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Mohammadreza Javadi
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          Full Stack Developer
        </p>

        <a
          href="https://github.com/mammaadDeveloper"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          GitHub Profile
        </a>
      </div>
    </div>
  );
}
