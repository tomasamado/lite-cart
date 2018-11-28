import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';



@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  comments: any = {};
  product : any;
  user:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public commentProvider: CommentProvider) {
    this.comments = navParams.get('comments');
    this.product = navParams.get('product');
    this.user = navParams.get('user');
  }
  comment: any = {content:"", product_id : 0}

  ionViewDidLoad() {
    this.getComments(this.product.id);
    console.log(this.comments)
    console.log(this.comment.content);
    
  }
  addComment(){
    this.commentProvider.createComment(this.comment).subscribe((result) => {
      console.log(result);
      this.getComments(this.product.id);
      this.comment.content='';
    }, (err) => {
      console.log(err);
    });
}

getComments(id){
  this.commentProvider.getComments(id)
    .subscribe(data => {
      this.comments = data;
      this.comment.product_id=this.product.id;
      console.log(this.comments);
    });
}

}
