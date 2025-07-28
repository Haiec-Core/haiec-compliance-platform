"use client";

// team member roles = ['admin', 'member', 'owner']
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Enum } from "@/types";

type DefaultValueProp = {
  defaultValue: Exclude<Enum<"workspace_member_role_type">, "owner">;
};

type ValueProp = {
  value: Exclude<Enum<"workspace_member_role_type">, "owner">;
};

type OtherProps = DefaultValueProp | ValueProp;

type TeamMemberRoleSelectProps = {
  onChange: (
    value: Exclude<Enum<"workspace_member_role_type">, "owner">,
  ) => void;
} & OtherProps;

// typeguard to narrow string to Enum<'organization_member_role'>
function isTeamMemberRole(
  value: string,
): value is Exclude<Enum<"workspace_member_role_type">, "owner"> {
  return ["admin", "member", "readonly"].includes(value);
}

export function WorkspaceMemberRoleSelect({
  onChange,
  ...restProps
}: TeamMemberRoleSelectProps) {
  return (
    <Select
      {...restProps}
      onValueChange={(value) => {
        if (!isTeamMemberRole(value)) {
          throw new Error("Invalid team member role");
        }
        onChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent className="w-[180px] text-muted-foreground">
        <SelectGroup>
          <SelectLabel>Workspace Roles</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="readonly">Read Only Member</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
