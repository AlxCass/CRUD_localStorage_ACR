import { User } from '../interfaces/user';
export class HLocaStorageUser{
    public static KEY: string = "USER";


    public static getUsers(): Array<User> | null{
      const users = localStorage.getItem(HLocaStorageUser.KEY);
      if(users){
        return JSON.parse(users) as Array<User>;
      }
      return null;
    }

    public static add(user: User): void{
      let users: Array<User> | null = this.getUsers();
      if(users){
        users.push(user);
        localStorage.setItem(HLocaStorageUser.KEY, JSON.stringify(users));
      }else{
        localStorage.setItem(HLocaStorageUser.KEY, JSON.stringify([user]));
      }

    }

}
