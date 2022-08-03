export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className="w-full rounded-lg border-gray-300 font-medium shadow-sm placeholder:font-normal placeholder:text-gray-400"
      type="text"
      {...props}
    />
  );
}
