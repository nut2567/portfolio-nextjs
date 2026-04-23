import ThailandMapViewer from "./ThailandMapViewer";

const Page = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 text-white shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300/70">
          New Project
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Thailand Map Dashboard</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
          This page brings the Thailand map experience from{" "}
          <code>mol-hrms-admin/resources/js/pages/dashboard.tsx</code> and its
          related dashboard components into <code>portfolio-nextjs</code> as a
          dedicated portfolio project.
        </p>
      </div>

      <ThailandMapViewer />
    </div>
  );
};

export default Page;
