import { TabsPage } from './pages/tabs/tabs';
import { VerificationPage } from './pages/verification/verification';

export namespace Login {
  // Get your Firebase app's config on your Firebase console. "Add Firebase to your web app".
  export const firebaseConfig = {
    apiKey: "AIzaSyD8dbdUCysJIUgR4m7DHtN40Gt2e-gYQb8",
    authDomain: "socioempathynew.firebaseapp.com",
    databaseURL: "https://socioempathynew.firebaseio.com",
    projectId: "socioempathynew",
    storageBucket: "socioempathynew.appspot.com",
    messagingSenderId: "605484190997"
  };

  export const homePage = TabsPage;
  export const verificationPage = VerificationPage;
  // Set whether emailVerification is enabled or not.
  export const emailVerification: boolean = true;
}
