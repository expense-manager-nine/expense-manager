interface Props {
  labelFor: string;
  label: string;
  children: React.ReactNode;
}

export function FormField({ labelFor, label, children }: Props) {
  return (
    <div>
      <label htmlFor={labelFor} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
