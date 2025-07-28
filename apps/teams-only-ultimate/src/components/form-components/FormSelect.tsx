import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormSelectProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
  id,
  label,
  control,
  name,
  description,
  options,
  placeholder,
}: FormSelectProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
