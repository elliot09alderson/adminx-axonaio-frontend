export function Button({ text, onClick, disabled, className, type, children }) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold   px-4 py-3 dark:text-white ${className}`}
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
}
