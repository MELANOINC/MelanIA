export function Button({ children, variant, ...props }) {
  const base = "px-4 py-2 rounded font-semibold";
  const styles = variant === "outline" ? "border border-black text-black" : "bg-black text-white";
  return <button className={`${base} ${styles}`} {...props}>{children}</button>;
}
