export type UserRoles = {
  ANON: "anon";
  ADMIN: "admin";
  USER: "user";
};

export type UserRole = UserRoles[keyof UserRoles];
