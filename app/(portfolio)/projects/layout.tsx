export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="-m-12 pr-12 py-12 h-full min-h-screen flex"
      style={{
        background:
          "linear-gradient(90deg, #001930 0%, #00488a 35%, #00488a 50%, #00488a 65%, #001930)",
      }}
    >
      <div
        className="inset-0 w-12 text-white flex flex-col transform  
      duration-600 transition-all h-full"
      >
        {/* <p>p</p>
        <p>p</p>
        <p>p</p> */}
      </div>
      <div className="w-full">{children}</div>
    </main>
  );
}
