import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ServicefileService } from '../../service/servicefile.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit  {
  contactUs: FormGroup;
  hide: boolean = true;
  confirmHide: boolean = true;
  formSubmit: boolean = false;
  showConfirm: boolean = false;
  constructor(private formBuilder: FormBuilder, public service: ServicefileService) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.contactUs = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      mobileNumber: ['', [Validators.required,Validators.maxLength(10)]],
      userName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactUs.controls;
  }
  contactSubmit() {
    this.formSubmit = true;
    const registerValue = Object.assign({}, this.contactUs.value);
    if (this.contactUs.valid) {
      window.open("https://techexactly.com/",'_blank')
    } 
  }
  confirmPass(event: any) {
    const registerValue = Object.assign({}, this.contactUs.value);
    if (event.target.value != registerValue.password) {
      this.showConfirm = true
    } else {
      this.showConfirm = false
    }
  }
}
