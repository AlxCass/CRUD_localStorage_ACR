import { IUser } from '../interfaces/IUser';
import { IDBUser } from '../interfaces/IDbUser';
/**
 * @author Armando
 * @see LEER_COMENTARIOS
 */
export class HLocaStorageUser {
  public static KEY: string = "USER";
  public static INDEX: number = 1;
  public static NOTHING: number = 0;
  /**
   *
   * private methods
   */
  /**
   *
   * @param user
   */
  private static createUser(user: IUser): void{
    user.idUser = this.INDEX;
    const newConfigurationForDbUser: IDBUser = {
      total: this.INDEX,
      users: [user]
    };
    localStorage.setItem(HLocaStorageUser.KEY, JSON.stringify(newConfigurationForDbUser));
  }
  /**
   *
   * @param dbUser
   * @param user
   */
  private static addUserToDb(dbUser: IDBUser, user: IUser){
    dbUser!.total! = dbUser!.total! + 1;
    user.idUser = dbUser.total;
    dbUser.users?.push(user);
    localStorage.setItem(HLocaStorageUser.KEY, JSON.stringify(dbUser));
  }
  /**
   *
   * @returns IDBUser | null
   */
  private static getDBUser(): IDBUser | null {
    let dbUser = localStorage.getItem(HLocaStorageUser.KEY);
    if (dbUser) {
      return JSON.parse(dbUser) as IDBUser;
    }
    return null;
  }
  /**
   * public methods
   */
  /**
   *
   * @returns number: numero total de usuarios registrados
   */
  public static total(): number{
    const dbUser: IDBUser | null = this.getDBUser();
    return dbUser?.total ?? this.NOTHING;

    /**
     *  dbUser?.total ?? this.NOTHING: esto es lo mismo que hacer esto -> dbUser.total === undefined  || dbUser.total === null ? null : db.total
     * o esto
     * if(dbUser.total === undefined  || dbUser.total === null){
     * return null;
     * }else{
     *   return db.total;
     * }
     */
    /**
     * dbUser? -> se le conoce como -> Non-null assertion operator
     * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
     */
  }
  /**
   *
   * @returns arreglo de todos los usuarios registrados o null
   */
  public static getUsers(): Array<IUser> |  null {
    const dbUser = this.getDBUser();
    return  dbUser?.users ?? null;
  }
  /**
   * agrega u nuevo usuario, si ya existe en el localstorage, simplemente lo agrega a la lista, si no crea una nueva,
   * iniciando desde el elemento u1
   * @param user objecto de tipo usuario, el id puede ser el que gusten o incrementa en uno
   */
  public static add(user: IUser): void {
    let dbUser: IDBUser | null = this.getDBUser();
    if (dbUser) {
      this.addUserToDb(dbUser, user);
    } else {
      this.createUser(user);
    }
  }
  /**
   * Busca un usuario especifico por id
   * @param idUser el id del usuario para buscar
   * @returns IUser  o nulo
   */
  public static search(idUser: number): IUser | null {
    const users = this.getUsers();
    if (users) {
      const user = users.find(user => user.idUser === idUser);
      return user === undefined ? null : user;
    }
    return null;
  }
  /**
   * actualiza un usuario directo del localstorage
   * @param updateUser
   * dentro del objeto debe contener el id de el y los datos que los datos para actualizar
   */
  public static update(updateUser: IUser): void {
    let dbUser = this.getDBUser();
    dbUser?.users?.forEach((user, index, users) => {
      if (user.idUser === updateUser.idUser) {
        users[index] = updateUser;
      }
    })
  }
  /**
   * elimina un usuario directo del localstorage
   * @param idUser el numero de usario para eliminar
   */
  public static delete(idUser: number): void {

    let dbUser = this.getDBUser();
    /**
     * simplemente aca al usar Non-null assertion operator
     * validamos que no sea null o undefined, es una mejor practica que usar que igualar a nulo nuestro objecto
     */
    dbUser?.users?.forEach((user, index, users) => {
      if (user.idUser === idUser) {
        users.splice(index, 1);
        dbUser!.total! = dbUser!.total! - 1;
        localStorage.setItem(HLocaStorageUser.KEY, JSON.stringify(dbUser));
        return;
      }
    })

  }



}
