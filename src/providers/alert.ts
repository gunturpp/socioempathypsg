import { QuestCounselorPage } from './../pages/quest-counselor/quest-counselor';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Validator } from '../validator';
import { Login } from '../login';
import { LogoutProvider } from './logout';
import { QuestCommunityPage } from '../pages/quest-community/quest-community';

const errorMessages = {
  // Alert Provider
  // This is the provider class for most of the success and error messages in the app.
  // If you added your own messages don't forget to make a function for them or add them in the showErrorMessage switch block.

  // Firebase Error Messages
  accountExistsWithDifferentCredential: { title: 'Akun Telah digunakan!', subTitle: 'Silahkan coba lagi menggunakan akun lain. Terima kasih.' },
  notPsychology: { title: 'Tidak Dapat Masuk.', subTitle: 'Gunakan akun lain dan login kembali.' },
  invalidCredential: { title: 'Invalid Credential!', subTitle: 'An error occured logging in with this credential.' },
  operationNotAllowed: { title: 'Login Gagal!', subTitle: 'Login ditolah, silahkan hubungi tim kami. Terima kasih.' },
  userDisabled: { title: 'Account Disabled!', subTitle: 'Sorry! But this account has been suspended! Please contact support.' },
  userNotFound: { title: 'Akun Tidak Ditemukan!', subTitle: 'Silahkan daftar terlebih dahulu.' },
  wrongPassword: { title: 'Password Salah!', subTitle: 'Maaf, password yang anda masukkan salah.' },
  invalidEmail: { title: 'Email Salah!', subTitle: 'Maaf, email yang anda masukkan salah' },
  emailAlreadyInUse: { title: 'Email Tidak Tersedia', subTitle: 'Maaf, email telah digunakan.' },
  weakPassword: { title: 'Weak Password!', subTitle: 'Sorry, but you have entered a weak password.' },
  requiresRecentLogin: { title: 'Credential Expired!', subTitle: 'Sorry, but this credential has expired! Please login again.' },
  userMismatch: { title: 'User Mismatch!', subTitle: 'Sorry, but this credential is for another user!' },
  providerAlreadyLinked: { title: 'Already Linked!', subTitle: 'Sorry, but your account is already linked to this credential.' },
  credentialAlreadyInUse: { title: 'Credential Not Available!', subTitle: 'Sorry, but this credential is already used by another user.' },
  // Profile Error Messages
  changeName: { title: 'Gagal Mengganti Nama!', subTitle: 'Maaf, terjadi kesalahan saat mengganti nama. Silahkan coba lagi.' },
  invalidCharsName: Validator.profileNameValidator.patternError,
  nameTooShort: Validator.profileNameValidator.lengthError,
  changeEmail: { title: 'Gagal Mengganti Email!', subTitle: 'Maaf,  terjadi kesalahan saat mengganti email. Silahkan coba lagi.' },
  invalidProfileEmail: Validator.profileEmailValidator.patternError,
  changePhoto: { title: 'Gagal Mengganti Foto!', subTitle: ' terjadi kesalahan saat mengganti foto. Silahkan coba lagi.' },
  changeInvoice: { title: 'Invoice Gagal dibuat!', subTitle: 'Silahkan pilih paket kembali.' },
  passwordTooShort: Validator.profilePasswordValidator.lengthError,
  invalidCharsPassword: Validator.profilePasswordValidator.patternError,
  passwordsDoNotMatch: { title: 'Gagal Mengganti Password!', subTitle: 'Maaf, password yang anda masukkan tidak sesuai.' },
  updateProfile: { title: 'Gagal Mengubah Profil', subTitle: 'Maaf, terjadi kesalahan saat mengganti Profil. Silahkan coba lagi.' },
  updateProfession: { title: 'Gagal Mengubah Profesi', subTitle: 'Maaf, terjadi kesalahan saat mengganti Profesi. Silahkan coba lagi.' },
  updateCity: { title: 'Gagal Mengubah Kota', subTitle: 'Maaf, terjadi kesalahan saat mengganti Kota. Silahkan coba lagi.' },
  updateStatus: { title: 'Gagal Mengubah Status', subTitle: 'Maaf, terjadi kesalahan saat mengganti Status. Silahkan coba lagi.' },
  updateBirth: { title: 'Gagal Mengubah Tanggal Lahir', subTitle: 'Maaf, terjadi kesalahan saat mengganti Tanggal Lahir. Silahkan coba lagi.' },
  updateNumber: { title: 'Gagal Mengubah Nomer', subTitle: 'Maaf, terjadi kesalahan saat mengganti Nomer. Silahkan coba lagi.' },
  usernameExists: { title: 'Username Telah Digunakan!', subTitle: 'Maaf, username telah digunakan oleh pengguna lain.' },
  // Image Error Messages
  imageUpload: { title: 'Gagal Mengunggah Gambar!', subTitle: 'Maaf but we\'ve encountered an error uploading selected image.' },
  // Group Error Messages
  groupUpdate: { title: 'Update Group Failed!', subTitle: 'Maaf, but we\'ve encountered an error updating this group.' },
  groupLeave: { title: 'Leave Group Failed!', subTitle: 'Maaf, but you\'ve encountered an error leaving this group.' },
  groupDelete: { title: 'Delete Group Failed!', subTitle: 'Maaf, but we\'ve encountered an error deleting this group.' }
};

const successMessages = {
  passwordResetSent: { title: 'Reset Password Telah Dikirim!', subTitle: 'reset password telah dikirim ke email: ' },
  profileUpdated: { title: 'Berhasil Mengganti Profil!', subTitle: 'Terima kasih!' },
  numberUpdated: { title: 'Berhasil Mengganti Nomer Handphone!', subTitle: 'Terima kasih!' },
  invoiceUpdated: { title: 'Berhasil Membeli Paket!', subTitle: 'Kami akan cek invoice 2x24 jam, silahkan periksa status invoice anda. Terima kasih.' },
  professionUpdated: { title: 'Berhasil Mengganti Profession!', subTitle: 'Terima kasih!' },
  cityUpdated: { title: 'Berhasil Mengganti Kota!', subTitle: 'Terima kasih!' },
  birthUpdated: { title: 'Berhasil Mengganti Tanggal Lahir!', subTitle: 'Terima kasih!' },
  statusUpdated: { title: 'Berhasil Mengganti Status!', subTitle: 'Terima kasih!' },

  emailVerified: { title: 'Email Telah Dikonfirmasi!', subTitle: 'Selamat! email anda berhasil dikonfirmasi' },
  emailVerificationSent: { title: 'Konfirmasi Email Telah dikirim', subTitle: 'Periksa email anda: ' },
  accountDeleted: { title: 'Account Deleted!', subTitle: 'Your account has been successfully deleted.' },
  passwordChanged: { title: 'Berhasil Mengganti Password!', subTitle: 'Password anda berhasil diganti.' },
  friendRequestSent: { title: 'Friend Request Sent!', subTitle: 'Your friend request has been successfully sent!' },
  friendRequestRemoved: { title: 'Friend Request Deleted!', subTitle: 'Your friend request has been successfully deleted.' },
  groupUpdated: { title: 'Group Updated!', subTitle: 'This group has been successfully updated!' },
  groupLeft: { title: 'Leave Group', subTitle: 'You have successfully left this group.' }
};

@Injectable()
export class AlertProvider {
  private alert;

  constructor(public alertCtrl: AlertController, public logoutProvider: LogoutProvider) {
    console.log("Initializing Alert Provider");
  }

  // Show profile updated
  showProfileUpdatedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.profileUpdated["title"],
      subTitle: successMessages.profileUpdated["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show password reset sent
  showPasswordResetMessage(email) {
    this.alert = this.alertCtrl.create({
      title: successMessages.passwordResetSent["title"],
      subTitle: successMessages.passwordResetSent["subTitle"] + email,
      buttons: ['OK']
    }).present();
  }

  // Show email verified and redirect to homePage
  showEmailVerifiedMessageAndRedirect(navCtrl) {
    this.alert = this.alertCtrl.create({
      title: successMessages.emailVerified["title"],
      subTitle: successMessages.emailVerified["subTitle"],
      buttons: [{
        text: 'OK',
        handler: () => {
          navCtrl.setRoot(Login.homePage);
        }
      }]
    }).present();
  }

  // Show email verification sent
  showEmailVerificationSentMessage(email) {
    this.alert = this.alertCtrl.create({
      title: successMessages.emailVerificationSent["title"],
      subTitle: successMessages.emailVerificationSent["subTitle"] + email,
      buttons: ['OK']
    }).present();
  }

  // Show account deleted
  showAccountDeletedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.accountDeleted["title"],
      subTitle: successMessages.accountDeleted["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show password changed
  showPasswordChangedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.passwordChanged["title"],
      subTitle: successMessages.passwordChanged["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show friend request sent
  showFriendRequestSent() {
    this.alert = this.alertCtrl.create({
      title: successMessages.friendRequestSent["title"],
      subTitle: successMessages.friendRequestSent["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show friend request removed
  showFriendRequestRemoved() {
    this.alert = this.alertCtrl.create({
      title: successMessages.friendRequestRemoved["title"],
      subTitle: successMessages.friendRequestRemoved["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show group updated.
  showGroupUpdatedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.groupUpdated["title"],
      subTitle: successMessages.groupUpdated["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show error messages depending on the code
  // If you added custom error codes on top, make sure to add a case block for it.
  showErrorMessage(code) {
    switch (code) {
      // Firebase Error Messages
      case 'auth/account-exists-with-different-credential':
        this.alert = this.alertCtrl.create({
          title: errorMessages.accountExistsWithDifferentCredential["title"],
          subTitle: errorMessages.accountExistsWithDifferentCredential["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/not-psychology':
        this.alert = this.alertCtrl.create({
          title: errorMessages.notPsychology["title"],
          subTitle: errorMessages.notPsychology["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/invalid-credential':
        this.alert = this.alertCtrl.create({
          title: errorMessages.invalidCredential["title"],
          subTitle: errorMessages.invalidCredential["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/operation-not-allowed':
        this.alert = this.alertCtrl.create({
          title: errorMessages.operationNotAllowed["title"],
          subTitle: errorMessages.operationNotAllowed["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/user-disabled':
        this.alert = this.alertCtrl.create({
          title: errorMessages.userDisabled["title"],
          subTitle: errorMessages.userDisabled["subTitle"],
          buttons: ['OK']
        });
        this.alert.present();
        break;
      case 'auth/user-not-found':
        this.alert = this.alertCtrl.create({
          title: errorMessages.userNotFound["title"],
          subTitle: errorMessages.userNotFound["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/wrong-password':
        this.alert = this.alertCtrl.create({
          title: errorMessages.wrongPassword["title"],
          subTitle: errorMessages.wrongPassword["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/invalid-email':
        this.alert = this.alertCtrl.create({
          title: errorMessages.invalidEmail["title"],
          subTitle: errorMessages.invalidEmail["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/email-already-in-use':
        this.alert = this.alertCtrl.create({
          title: errorMessages.emailAlreadyInUse["title"],
          subTitle: errorMessages.emailAlreadyInUse["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/weak-password':
        this.alert = this.alertCtrl.create({
          title: errorMessages.weakPassword["title"],
          subTitle: errorMessages.weakPassword["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/requires-recent-login':
        this.alert = this.alertCtrl.create({
          title: errorMessages.requiresRecentLogin["title"],
          subTitle: errorMessages.requiresRecentLogin["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/user-mismatch':
        this.alert = this.alertCtrl.create({
          title: errorMessages.userMismatch["title"],
          subTitle: errorMessages.userMismatch["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/provider-already-linked':
        this.alert = this.alertCtrl.create({
          title: errorMessages.providerAlreadyLinked["title"],
          subTitle: errorMessages.providerAlreadyLinked["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'auth/credential-already-in-use':
        this.alert = this.alertCtrl.create({
          title: errorMessages.credentialAlreadyInUse["title"],
          subTitle: errorMessages.credentialAlreadyInUse["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      // Profile Error Messages
      case 'profile/error-change-name':
        this.alert = this.alertCtrl.create({
          title: errorMessages.changeName["title"],
          subTitle: errorMessages.changeName["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/invalid-chars-name':
        this.alert = this.alertCtrl.create({
          title: errorMessages.invalidCharsName["title"],
          subTitle: errorMessages.invalidCharsName["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/name-too-short':
        this.alert = this.alertCtrl.create({
          title: errorMessages.nameTooShort["title"],
          subTitle: errorMessages.nameTooShort["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/error-change-email':
        this.alert = this.alertCtrl.create({
          title: errorMessages.changeEmail["title"],
          subTitle: errorMessages.changeEmail["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/invalid-email':
        this.alert = this.alertCtrl.create({
          title: errorMessages.invalidProfileEmail["title"],
          subTitle: errorMessages.invalidProfileEmail["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/error-change-photo':
        this.alert = this.alertCtrl.create({
          title: errorMessages.changePhoto["title"],
          subTitle: errorMessages.changePhoto["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/password-too-short':
        this.alert = this.alertCtrl.create({
          title: errorMessages.passwordTooShort["title"],
          subTitle: errorMessages.passwordTooShort["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/invalid-chars-password':
        this.alert = this.alertCtrl.create({
          title: errorMessages.invalidCharsPassword["title"],
          subTitle: errorMessages.invalidCharsPassword["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/passwords-do-not-match':
        this.alert = this.alertCtrl.create({
          title: errorMessages.passwordsDoNotMatch["title"],
          subTitle: errorMessages.passwordsDoNotMatch["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/error-update-profile':
        this.alert = this.alertCtrl.create({
          title: errorMessages.updateProfile["title"],
          subTitle: errorMessages.updateProfile["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'profile/error-same-username':
        this.alert = this.alertCtrl.create({
          title: errorMessages.usernameExists["title"],
          subTitle: errorMessages.usernameExists["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      //Image Error Messages
      case 'image/error-image-upload':
        this.alert = this.alertCtrl.create({
          title: errorMessages.imageUpload["title"],
          subTitle: errorMessages.imageUpload["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      // Group Error MEssages
      case 'group/error-update-group':
        this.alert = this.alertCtrl.create({
          title: errorMessages.groupUpdate["title"],
          subTitle: errorMessages.groupUpdate["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'group/error-leave-group':
        this.alert = this.alertCtrl.create({
          title: errorMessages.groupLeave["title"],
          subTitle: errorMessages.groupLeave["subTitle"],
          buttons: ['OK']
        }).present();
        break;
      case 'group/error-delete-group':
        this.alert = this.alertCtrl.create({
          title: errorMessages.groupDelete["title"],
          subTitle: errorMessages.groupDelete["subTitle"],
          buttons: ['OK']
        }).present();
        break;
    }
  }
}
