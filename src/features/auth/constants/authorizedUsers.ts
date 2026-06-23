type AuthorizedUser = {
  email: string;
  password: string;
  name: string;
};

export const AUTHORIZED_USERS: AuthorizedUser[] = [
  { email: 'mousuleman@gmail.com', password: '123456', name: 'Muhammad Suleman' },
  { email: 'masroorahmedfcb@gmail.com', password: '123456', name: 'Masroor Ahmed' },
  { email: 'ammarqureshi120@gmail.com', password: '123456', name: 'Ammar Qureshi' }
];

export function findAuthorizedUser(email: string, password: string): AuthorizedUser | null {
  return (
    AUTHORIZED_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    ) ?? null
  );
}
