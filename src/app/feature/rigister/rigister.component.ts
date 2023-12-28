import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from "@angular/router";
import { ServicefileService } from '../../service/servicefile.service';
import { NotificationService } from "../../service/notification.service";
@Component({
  selector: 'app-rigister',
  templateUrl: './rigister.component.html',
  styleUrls: ['./rigister.component.css']
})
export class RigisterComponent  implements OnInit {
  registerForm: FormGroup;
  hide: boolean = true;
  confirmHide: boolean = true;
  formSubmit: boolean = false;
  showConfirm: boolean = false;
  constructor(private formBuilder: FormBuilder, public service: ServicefileService,private route:Router,private notify:NotificationService) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      password: ['', Validators.required],
      userName: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  registerSubmit() {
    this.formSubmit = true;
    const registerValue = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid && this.showConfirm) {
      let payload = {
        "type": "register",
        "name": registerValue.userName,
        "email": registerValue.email,
        "password": registerValue.password,
      }
      this.service.getData(payload, "POST", "/index.php").subscribe((res: any) => {
        if(res.status==1){
          this.notify.showSuccess("User Created Successfully",'')
         setTimeout(() => {
          this.route.navigate(['/login'])
         }, 20000);
        }else{
          this.notify.showError("Something went wrong.Please try again later",'');
        }
      })
    } else {
      this.notify.showError("Your Confirm Password Doesn't Match with Your Password",'');
    }
  }
  confirmPass(event: any) {
    const registerValue = Object.assign({}, this.registerForm.value);
    if (event.target.value == registerValue.password) {
      this.showConfirm = true
    } else {
      this.showConfirm = false
    }
  }
}
