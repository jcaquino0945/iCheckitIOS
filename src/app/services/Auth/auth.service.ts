import { Injectable } from '@angular/core'
import { Observable } from '@nativescript/core';
// NativeScript 7+
import { firebase, firestore } from "@nativescript/firebase";
import { RouterExtensions } from '@nativescript/angular'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   constructor(private routerExtensions: RouterExtensions) {

    firebase.init({
      onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
          console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
          if (data.loggedIn) {
            alert('logged in')
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
          }
          if (!data.loggedIn) {
            alert('logged out')
          }
        }
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
   }
   /*
   getUserData() {
     firebase.getCurrentUser()
    .then(user => console.log("User uid: " + user.uid))
    .catch(error => console.log("Trouble in paradise: " + error));
   }
   
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
   */

   createAccount(email,password,displayName,contactNumber) {
    firebase.createUser({
        email: email,
        password: password
      }).then(
          function (user) {
            firebase.updateProfile({displayName: displayName}).then(
                  function () {
                    // called when update profile was successful
                    console.log(user.uid)
                    const data = {
                        uid: user.uid,
                        contactNumber: contactNumber,
                        email: email,
                        displayName: displayName,
                        createdAt: Date.now(),
                        role: 'Student'
                    }
                    return firestore.collection('users').doc(user.uid).set(data)
                    .then(res => alert('You have succesfully created an account'))
                    .catch(error => console.log(error));
                  },
                  function (errorMessage) {
                    console.log(errorMessage);
                  }
              );
          },
          function (errorMessage) {
            alert('There has been an issue with the creation of your account');
          }
      );
   }

   test() {
    return firestore.collection('users').get({ source: "server" }).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      });
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
        .then(() => {
          this.routerExtensions.navigate(['dashboard'], {
            transition: {
              name: 'fade',
            },
          })
        })
        .catch(() => alert('may mali'));
    }
    /*
    forgotPassword(email) {
      firebase.sendPasswordResetEmail(email)
    }
    */
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
