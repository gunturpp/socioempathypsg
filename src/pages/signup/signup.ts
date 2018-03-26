import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private mode: string;
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  private role: FormGroup;
  masks: any;
  phoneNumber: any = "";

  constructor(public loginProvider: LoginProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
       // It's important to hook the navController to our loginProvider.
       this.loginProvider.setNavController(this.navCtrl);
       // Create our forms and their validators based on validators set on validator.ts.
       this.emailPasswordForm = formBuilder.group({
         email: Validator.emailValidator,
         password: Validator.passwordValidator,
         role: "Psikolog",
         phone: Validators.required,
         gender: Validators.required
       });
       this.emailForm = formBuilder.group({
         email: Validator.emailValidator
       });
   
       this.masks = {
           phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
       };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  register() {
    let unmaskedData = {
        phoneNumber: this.phoneNumber.replace(/\D+/g, '')
    };
    console.log(unmaskedData);
    this.loginProvider.register(
      this.emailPasswordForm.value["email"],
      this.emailPasswordForm.value["password"],
      this.emailPasswordForm.value["role"],
      this.emailPasswordForm.value["phone"],
      this.emailPasswordForm.value["gender"]);
  }
  back(){
    this.navCtrl.push(LoginPage);
  }
}
