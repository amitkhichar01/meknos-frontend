import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-semibold"
    >
      <img src="/logo.webp" alt="meknos logo" className="w-8 h-8" />
      <span className="font-outfit">Meknos</span>
    </Link>
  );
}
