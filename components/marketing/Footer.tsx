export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/[0.06] px-6 py-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-lime rounded-md flex items-center justify-center text-xs font-bold text-lime-text">
            PQ
          </div>
          <div>
            <p className="text-sm font-semibold text-white">preQual</p>
            <p className="text-[10px] text-white/30">SEQ · South East Queensland</p>
          </div>
        </div>

        <div className="flex gap-6 text-xs text-white/30">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
        </div>

        <p className="text-[10px] text-white/20 font-medium">
          CONFIDENTIAL · FOR INVESTOR USE ONLY
        </p>
      </div>
    </footer>
  )
}
