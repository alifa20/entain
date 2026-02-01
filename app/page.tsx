import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-dark font-display text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white overflow-x-hidden">
      <header className="bg-[#1a1d24] border-b border-border-dark/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-white tracking-tight">Next to Go</h1>
              <p className="text-text-secondary mt-1 text-sm">
                Live racing countdown • Updates every 60s
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏁</span>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-text-secondary uppercase tracking-wide">Showing</p>
                <p className="text-lg font-bold text-primary">5 Races</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
