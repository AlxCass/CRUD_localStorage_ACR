import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HLocaStorageUser } from '../helpers/HLocalStorageUser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private static readonly MIN_LENGTH_FOR_NAME: number = 5;
  private static readonly MIN_LENGTH_FOR_DESCRIPTION: number = 5;
  public checkoutForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(FormComponent.MIN_LENGTH_FOR_NAME)]],
    description:['', [Validators.required, Validators.minLength(FormComponent.MIN_LENGTH_FOR_DESCRIPTION)]],
    phone:['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  public validateForm(): void{
    if(this.checkoutForm.valid){
      HLocaStorageUser.add(this.checkoutForm.value);
      alert("Se agrego un nuevo usuario")
      this.checkoutForm.reset();
    }

  }



}
