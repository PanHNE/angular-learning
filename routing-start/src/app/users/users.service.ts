export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find(
      (u) => {
        return u.id === id;
      }
    );
    return user;
  }

  updateUser(id: number, name: string) {
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    if (user) {
      user.name = name;
    }
  }
}
