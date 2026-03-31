export type User = { id: string; name: string; };
export type userList = () => User[];
export type userById = (id: string) => User;
export type userCreate = (data: { name: string }) => User;