import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  photolibrary: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private photoLibrary: PhotoLibrary, private alertCtrl: AlertController, private camera: Camera, public productProvider: ProductProvider) {
  }

  product: any = { title: "", description: "", price: "", quantity: "", image: "data:image/png;base64,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" };

  addPicture() {
    console.log('camera');
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.product.image = 'data:image/jpeg;base64,' + imageData;
      console.log('photo from library');
    }, (error) => {
      console.log(error);
    });
  }

  addProduct() {
    this.productProvider.createProduct(this.product).subscribe((result) => {
    }, (err) => {
      if (err.status === 400) {
        let alert = this.alertCtrl.create({
          title: err.statusText,
          subTitle: 'Please fill all fields',
          buttons: ['Dismiss']
        });

        alert.present();

      }
      console.log(err);
    });
    this.navCtrl.pop();
  }
}
