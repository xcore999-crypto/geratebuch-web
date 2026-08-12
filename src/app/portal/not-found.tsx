import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function PortalNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon name="search" className="h-6 w-6" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-600">Fehler 404</p>
      <h1 className="mt-2 text-2xl font-bold text-navy-900">Diese Seite wurde nicht gefunden.</h1>
      <p className="mt-3 max-w-sm text-sm text-slate-500">
        Das gesuchte Gerät oder die Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/portal"
        className="mt-6 inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Zur Übersicht
      </Link>
    </div>
  );
}
