import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { LoginProvider } from '../../providers/login';
import { LoginPage } from '../login/login';

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
  provinceData: { text: string; value: string; }[];

  constructor(public loginProvider: LoginProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
       // It's important to hook the navController to our loginProvider.
       this.loginProvider.setNavController(this.navCtrl);
       // Create our forms and their validators based on validators set on validator.ts.
       this.emailPasswordForm = formBuilder.group({
         displayName: Validator.displayNameValidator,
         email: Validator.emailValidator,
         password: Validator.passwordValidator,
         phoneNumber: Validator.phoneValidator,
         gender: Validator.genderValidator,
         birth: Validator.birthValidator,
         province: Validator.provinceValidator
       });
       this.emailForm = formBuilder.group({
         email: Validator.emailValidator
       });
   
       this.masks = {
           phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
       };
  }
  compareFn(option1: any, option2: any) {
    return option1.value === option2.value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.provinces();
  }
  register() {
    let unmaskedData = {
        phoneNumber: this.phoneNumber.replace(/\D+/g, '')
    };
    console.log("province",this.emailPasswordForm.value["province"]);
    this.loginProvider.register(
      this.emailPasswordForm.value["displayName"], 
      this.emailPasswordForm.value["email"],
      this.emailPasswordForm.value["password"],
      this.emailPasswordForm.value["phoneNumber"], 
      this.emailPasswordForm.value["gender"],
      this.emailPasswordForm.value["province"].value,
      this.emailPasswordForm.value["birth"]);
  }
  back(){
    this.navCtrl.push(LoginPage);
  }
  provinces() {
    this.provinceData = [
      { text: 'Aceh', value: 'Aceh' },
      { text: 'Bali', value: 'Bali' },
      { text: 'Banten', value: 'Banten' },
      { text: 'Bengkulu', value: 'Bengkulu' },
      { text: 'Gorontalo', value: 'Gorontalo' },
      { text: 'DKI Jakarta', value: 'DKI Jakarta' },
      { text: 'Jambi', value: 'Jambi' },
      { text: 'Jawa Barat', value: 'Jawa Barat' },
      { text: 'Jawa Tengah', value: 'Jawa Tengah' },
      { text: 'Jawa Timur', value: 'Jawa Timur' },
      { text: 'Kalimantan Barat', value: 'Kalimantan Barat' },
      { text: 'Kalimantan Selatan', value: 'Kalimantan Selatan' },
      { text: 'Kalimantan Tengah', value: 'Kalimantan Tengah' },
      { text: 'Kalimantan Timur', value: 'Kalimantan Timur' },
      { text: 'Kalimantan Utara', value: 'Kalimantan Utara' },
      { text: 'Kepulauan Bangka Belitung', value: 'Kepulauan Bangka Belitung' },
      { text: 'Kepulauan Riau', value: 'Kepulauan Riau' },
      { text: 'Lampung', value: 'Lampung' },
      { text: 'Maluku', value: 'Maluku' },
      { text: 'Maluku Utara', value: 'Maluku Utara' },
      { text: 'Nusa Tenggara Barat', value: 'Nusa Tenggara Barat' },
      { text: 'Nusa Tenggara Timur', value: 'Nusa Tenggara Timur' },
      { text: 'Papua', value: 'Papua' },
      { text: 'Papua Barat', value: 'Papua Barat' },
      { text: 'Riau', value: 'Riau' },
      { text: 'Sulawesi Barat', value: 'Sulawesi Barat' },
      { text: 'Sulawesi Selatan', value: 'Sulawesi Selatan' },
      { text: 'Sulawesi Tengah', value: 'Sulawesi Tengah' },
      { text: 'Sulawesi Tenggara', value: 'Sulawesi Tenggara' },
      { text: 'Sulawesi Utara', value: 'Sulawesi Utara' },
      { text: 'Sumatera Barat', value: 'Sumatera Barat' },
      { text: 'Sumatera Selatan', value: 'Sumatera Selatan' },
      { text: 'Sumatera Utara', value: 'Sumatera Utara' },
      { text: 'Yogyakarta', value: 'Yogyakarta' }
  ];

  }
  
}
