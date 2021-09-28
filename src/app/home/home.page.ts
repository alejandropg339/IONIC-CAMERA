import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, ImageOptions  } from '@capacitor/camera';
import { UploadService } from '../services/upload.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  photo: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
    private file: File,
  ) { }

  ngOnInit() {}


  async takePicture(){
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    this.uploadImage(blobData);
    const completeUrlPhoto = 'data:image/jpeg;base64,' + image.base64String;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(completeUrlPhoto);
    console.log(this.photo);
  }

  uploadImage(blobData) {
    this.uploadService.uploadPhoto(blobData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
