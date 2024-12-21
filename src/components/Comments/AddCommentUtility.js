export class CommentEntity{
	constructor({content,likes=[],replies=[]}={}){
		this.string=content;
		this.likes=likes;
		this.replies=replies;		
	}
};

export class CommentObject{
	constructor({username,comment}){
		this.name=username;
		this.comment=comment;
	}
};


export class IndexCollection{
	constructor({L1,L2=null}={}){
		this.L1=L1;
		this.L2=L2;
	}
};

export class PreLikeStruct{
	constructor({Included = false,Likes = []}={}){
		this.nameIncluded = Included;
		this.totalLikes = Likes;
	}
}
//convert comments to JSON