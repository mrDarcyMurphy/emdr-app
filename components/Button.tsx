export function Button({ onClick, children }) {
  return (
    <button className="bg-slate-800 text-stone-200 rounded-sm py-1 px-2" onClick={onClick}>{children}</button>
  )
}
