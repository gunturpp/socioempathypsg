import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private mode: string;
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  private role: FormGroup;
  masks: any;
  phoneNumber: any = "";
  // LoginPage
  // This is the page where the user can register and login to our app.
  // It's important to initialize the loginProvider here and setNavController as it will direct the routes of our app.
  constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public formBuilder: FormBuilder) {
    // It's important to hook the navController to our loginProvider.
    this.loginProvider.setNavController(this.navCtrl);
    // Create our forms and their validators based on validators set on validator.ts.
    this.emailPasswordForm = formBuilder.group({
      email: Validator.emailValidator,
      password: Validator.passwordValidator,
      role: Validators.required,
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
    // Set view mode to main.
    this.mode = 'main';

    console.log('uid', localStorage.getItem('uid'));
    if (localStorage.getItem('uid') != null && localStorage.getItem('uid')) {
     //  if (Login.emailVerification) {
       this.navCtrl.setRoot(TabsPage);
         console.log('logged in', localStorage.getItem('token'));
       }
      
  }

  // Call loginProvider and login the user with email and password.
  // You may be wondering where the login function for Facebook and Google are.
  // They are called directly from the html markup via loginProvider.facebookLogin() and loginProvider.googleLogin().
  login() {
    this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }
  // Call loginProvider and register the user with email and password.
  register() {
    let unmaskedData = {
        phoneNumber: this.phoneNumber.replace(/\D+/g, '')
    };
    console.log(unmaskedData);
    this.loginProvider.register(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"], this.emailPasswordForm.value["role"], this.emailPasswordForm.value["phone"], this.emailPasswordForm.value["gender"]);
  }

  // Call loginProvider and send a password reset email.
  forgotPassword() {
    this.loginProvider.sendPasswordReset(this.emailForm.value["email"]);
    this.clearForms();
  }

  // Clear the forms.
  clearForms() {
    this.emailPasswordForm.reset();
    this.emailForm.reset();
  }

}
