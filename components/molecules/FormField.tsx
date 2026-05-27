import Label from "@/components/atoms/Label";

interface Props {
  id: string;
  label: string;
  children: React.ReactNode;
}

export default function FormField({ id, label, children }: Props) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
