type AuthorizedUser = {
  email: string;
  password: string;
};

export const AUTHORIZED_USERS: AuthorizedUser[] = [
  { email: 'mousuleman@gmail.com', password: '123456' },
  { email: 'masroorahmedfcb@gmail.com', password: '123456' },
  { email: 'ammarqureshi120@gmail.com', password: '123456' },
];

export function findAuthorizedUser(email: string, password: string): boolean {
  return AUTHORIZED_USERS.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );
}
