import { Injectable } from '@angular/core'
import { Observable } from '@nativescript/core';
// NativeScript 7+
import { firebase, firestore } from "@nativescript/firebase";
const usersCollection = firestore.collection('users')

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   constructor() {

   }
   /*
   getUserData() {
     firebase.getCurrentUser()
    .then(user => console.log("User uid: " + user.uid))
    .catch(error => console.log("Trouble in paradise: " + error));
   }
   */
   registerWithEmailAndPassword(email,password,displayName,contactNumber) {
    firebase.createUser({
        email: email,
        password: password
      })
      .then(() => {
          return usersCollection.add({
            email: email,
            displayName: displayName,
            contactNumber: contactNumber,
      })
    })
      .then(
          function (user) {
            alert('You have succesfully created an account!')
          },
          function (errorMessage) {
            alert('There has been an issue with the creation of your account')
          }
      );
    
   }


   login(email,password) {
    firebase.login(
        {
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
            email: email,
            password: password
        }
        })
        .then(result => JSON.stringify(result))
        .catch(error => console.log(error));
    }
    

    logout() {
        firebase.logout();
    }
/*
  addData() {
    return this.citiesCollection.add({
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      location: firebase.firestore().GeoPoint(4.34, 5.67)
    }).then(documentRef => {
      console.log(`San Francisco added with auto-generated ID: ${documentRef.id}`);
    });
  }
  */

  
}
