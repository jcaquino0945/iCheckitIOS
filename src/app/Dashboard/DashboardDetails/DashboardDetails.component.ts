import { CancelSubmissionComponent } from './Cancel-Submission/Cancel-Submission.component';
import { Application, EventData, View } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, NgZone, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { firebase, firestore ,firebaseFunctions} from "@nativescript/firebase";
import { storage } from "@nativescript/firebase/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, HttpResponse } from "@nativescript/core";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "@nativescript/angular";
import {
  Mediafilepicker,
  FilePickerOptions
} from "nativescript-mediafilepicker";
import { openUrl } from "@nativescript/core/utils";

@Component({
  selector: "DashboardDetails",
  templateUrl: "./DashboardDetails.component.html",
  styleUrls: ["./DashboardDetails.component.css"]
})
export class DashboardDetailsComponent implements OnInit {
  id;
  userData;
  userDetails;
  taskData;
  myFile = '';
  private _hostView: View;

  constructor(private route: ActivatedRoute,
    private zone:NgZone,
    private router: Router,
    private http: HttpClient,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    firebase
    .getCurrentUser()
    .then(user => {
      (this.userData = user),
        firestore
          .collection("users")
          .doc(this.userData.uid)
          .get().then(doc => {
            if (doc.exists) {
              console.log(`Document data: ${JSON.stringify(doc.data())}`);
              const taskDocument = firestore.collection("tasks").doc(this.route.snapshot.paramMap.get('id'));

              // note that the options object is optional, but you can use it to specify the source of data ("server", "cache", "default").
              taskDocument.get({ source: "server" }).then(doc => {
                if (doc.exists) {
                  // this.taskData = doc.data();
                  doc.data().recipients.forEach(element => {
                    if(Object.values(element).includes(this.userData.uid)) { 
                      console.log(element)
                      console.log('it exists')
                      this.taskData = element;
                  }
                  });
                  console.log(`Document data: ${JSON.stringify(doc.data())}`);
                } else {
                  console.log("No such document!");
                }
              });
              this.userDetails = doc.data();
            } else {
              console.log("No such document!");
            }
          });
    })
    .catch(error => console.log("Trouble in paradise: " + error));
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onDel() {
    let options = {
      context: {},
      fullscreen: false,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(CancelSubmissionComponent, options).then(res => {
      console.log(res);
    });
  }

  // submitTask() {
  //   alert("Submit attachment of task");
  // }

  submitTask() {
    // var fs = require("tns-core-modules/file-system");

    let extensions = [];
 
    if (Application.ios) {
        extensions = [kUTTypePDF, kUTTypeText,kUTTypeImage]; // you can get more types from here: https://developer.apple.com/documentation/mobilecoreservices/uttype
    } else {
      extensions = ["png", "pdf", "jpg"];
    }

    let options: FilePickerOptions = {
      android: {
        extensions: extensions,
        maxNumberFiles: 1
      },
      ios: {
        extensions: extensions,
        multipleSelection: false,
        // hostView: this._hostView
      }
    };

    let mediafilepicker = new Mediafilepicker();

    mediafilepicker.openFilePicker(options);

    mediafilepicker.on("getFiles", event => {
      this.zone.run(() => {
        let results = event.object.get("results");
        // do your stuff here
        // any UI changes will be reflected
        if (results) {
          for (let i = 0; i < results.length; i++) {
            let result = results[i];
            // console.log(result.file);
            this.myFile = result.file;
            // console.log(this.myFile)
            // .replace(/ /g, "%20")
            // this.myFile = this.myFile.replace(/ /g, "%20")
            // this.myFile = this.myFile.split(/(\\|\/)/g).pop()
            let iosUrl = result.file.replace("file:///", "")
            // alert(iosUrl);

            const path = `${this.taskData.uid}/${this.myFile.split(/(\\|\/)/g).pop()}/`;
            // console.log(path);
            var metadata = ({});

            // alert(path)
            // alert(result.file)
            storage.uploadFile({
              remoteFullPath: path,
              localFullPath: iosUrl,
              metadata
            }).then(() => {
              storage.getDownloadUrl({
                // optional, can also be passed during init() as 'storageBucket' param so we can cache it
                // the full path of an existing file in your Firebase storage
                remoteFullPath: path
              }).then((url) => {
                   let updatedTaskData = {
                      createdAt: this.taskData.createdAt,
                      deadline: this.taskData.deadline,                      
                      description: this.taskData.description,
                      displayName: this.taskData.displayName,
                      email: this.taskData.email,
                      section: this.taskData.section,
                      pushToken: this.taskData.pushToken,
                      status: 'For Approval',
                      submissionLink: url,
                      taskId: this.taskData.taskId,
                      title: this.taskData.title,
                      uid: this.taskData.uid,
                      uploadedBy: this.taskData.uploadedBy,
                      term: this.taskData.term,
                      attemptsLeft: this.taskData.attemptsLeft - 1,
                      deadlineLimit: this.taskData.deadlineLimit
                    }

                      firestore.collection("tasks").doc(this.taskData.taskId)
                        .update({                       
                            recipients: firestore.FieldValue.arrayRemove(this.taskData)
                        }).then(() => {
                        firestore.collection("tasks").doc(this.taskData.taskId)
                          .update({                       
                            recipients: firestore.FieldValue.arrayUnion(updatedTaskData)
                          })
                        })
                        .then(() => {
                          alert('Your submission was received! Please wait for the admins to verify your submission.')
                        })
                        .then(() => {

                          const taskDocument = firestore.collection("tasks").doc(this.route.snapshot.paramMap.get('id'));
                          
                          // note that the options object is optional, but you can use it to specify the source of data ("server", "cache", "default").
                          taskDocument.get({ source: "server" }).then(doc => {
                            if (doc.exists) {
                              // this.taskData = doc.data();
                              doc.data().recipients.forEach(element => {
                                if(Object.values(element).includes(this.userData.uid)) { 
                                  console.log(element)
                                  console.log('it exists')
                                  this.taskData = element;
                              }
                              });
                              console.log(`Document data: ${JSON.stringify(doc.data())}`);
                            } else {
                              console.log("No such document!");
                            }
                          });
                        })  
                }   
              );
            }).catch((err) => {
              alert(err)
              console.log(err)
            })
          }
        }
      });
    });

    // mediafilepicker.on("getFiles", function(res) {
    //   let results = res.object.get("results");
    //   console.dir(results);

    //   if (results) {
    //     for (let i = 0; i < results.length; i++) {
    //       let result = results[i];
    //       console.log(result.file);
    //       this.myFile = result.file
    //       console.log(this.myFile);
    //       alert(this.myFile)
    //     }
    //   }
    // });

    mediafilepicker.on("error", function(res) {
      let msg = res.object.get("msg");
      console.log(msg);
    });

    mediafilepicker.on("cancel", function(res) {
      let msg = res.object.get("msg");
      console.log(msg);
    });
  }

  onTap(url){     
    openUrl(url);
  }
}
// /Users/chescaestonido/Library/Developer/CoreSimulator/Devices/927991DE-DB29-48B3-8BA9-DB2DC66F3865/data/Containers/Data/Application/062B2B21-C5A7-4062-87FA-3D6A65D22C71/tmp/org.nativescript.iCheckit-Inbox/IMG_0008.JPG