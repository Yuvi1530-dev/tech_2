import { Component, OnInit } from '@angular/core';
import { ServicefileService } from '../../service/servicefile.service';
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NotificationService } from "../../service/notification.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: any;
  password: any;
  hide: boolean = false;
  isChecked: boolean = false;
  formSubmit: boolean = false;
  constructor(private formBuilder: FormBuilder, public service: ServicefileService, public notify: NotificationService, private route: Router) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    var userName = this.service.getCookie("userName");
    var password = this.service.getCookie("password");

    if (userName != '' && password != '') {

      this.isChecked = true;
      this.userName = userName;
      this.password = password;
    } else {

      this.isChecked = false;
      this.userName = '';
      this.password = '';
    }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  getErrorEmail() {
    return this.loginForm.get('email').hasError('pattern')
      ? 'Not a valid emailaddress' : '';
  }
  loginSubmit() {
    this.notify.showSuccess("Login Successfuly", '')
    this.formSubmit = true;
    const loginValues = Object.assign({}, this.loginForm.value);
    if (this.loginForm.valid) {
      let payload = {
        "type": "login",
        "email": loginValues.email,
        "password": loginValues.password,
      }
      this.service.getData(payload, "POST", "/index.php").subscribe((res: any) => {
        console.log(res.data.id,"user_login")
        if (res.success==true) {
          this.notify.showSuccess("Login Successfuly", '')
          sessionStorage.setItem('user_login',res.data.id)
          setTimeout(() => {
            this.route.navigate(['dashboard'])
          }, 6000);
        }
      })
    } else {
      this.notify.showError("Your Password Doesn't Match With Your Password", '')
    }
  }
  storeValue(event: any) {
    console.log("event",event)
    if (event.checked == true) {
     
      const loginValues = Object.assign({}, this.loginForm.value);
      this.service.setCookie("userName", loginValues.email, 7)
      this.service.setCookie("password", loginValues.password, 7)
      this.isChecked=true;
    } else {
      this.service.setCookie("userName", '', 0);
      this.service.setCookie("password", '', 0);
      this.isChecked=false;
    }
  }
}