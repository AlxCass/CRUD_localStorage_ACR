import { IDBUser } from './../interfaces/IDbUser';
import { IUser } from './../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HLocaStorageUser } from '../helpers/HLocalStorageUser';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  IUser: IUser[] = [];
  private static readonly MIN_LENGTH_FOR_NAME: number = 5;
  private static readonly MIN_LENGTH_FOR_DESCRIPTION: number = 5;
  public users: Array<IUser>;

  public checkoutForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(FormComponent.MIN_LENGTH_FOR_NAME)]],
    description: ['', [Validators.required, Validators.minLength(FormComponent.MIN_LENGTH_FOR_DESCRIPTION)]],
    phone: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {
    this.users = new Array<IUser>();
  }

  ngOnInit(): void {
  }
  /**
     * actualizar, ejemplo
     */
    /*HLocaStorageUser.update({
      idUser:1,
      name: "Luis Armando Hernandez Vazquez",
      email:"a25@gmail.com",
      description:"this testing",
      phone:"34939493493"
    });*/
  public showAllUsers(){

    if(HLocaStorageUser.total() > HLocaStorageUser.NOTHING){
      this.users = HLocaStorageUser.getUsers()!;
    }else{
      alert("No contienes usuarios registrados")
    }
  }
  public addUser(){
    HLocaStorageUser.add(this.checkoutForm.value);
  }
  public validateForm(): void {
    if (this.checkoutForm.valid) {
       this.addUser();
      alert("Se agrego un nuevo usuario")
      this.checkoutForm.reset();
    }

  }

  public deletUser(IdUser: any){

    if(HLocaStorageUser.total() > HLocaStorageUser.NOTHING){
    this.users = HLocaStorageUser.delete(IdUser)!;
    alert("Se borro el usuario")
  }else{
    alert("No se pudo borrar el registro")
  }
  }

  public editUser(IdUser: any){

    HLocaStorageUser.update(this.checkoutForm.value);
  }


}
