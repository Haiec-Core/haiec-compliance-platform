import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormSwitchProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
}

export function FormSwitch<TFieldValues extends FieldValues>({
  id,
  label,
  control,
  name,
  description,
}: FormSwitchProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={id}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
