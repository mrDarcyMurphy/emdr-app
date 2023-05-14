interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="bg-slate-800 text-slate-400 hover:text-slate-300 rounded-sm py-1 px-2" onClick={onClick}>{children}</button>
  )
}
