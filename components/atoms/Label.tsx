import type { LabelHTMLAttributes } from "react";

export default function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block text-sm font-medium text-body" {...props}>
      {children}
    </label>
  );
}
