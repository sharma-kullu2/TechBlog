import azure.functions as func
from model.impl.UserRepositoryImpl import UserRepository
from model.impl.PostRepositoryImpl import PostRepository
from model.data.Userdc import Post , GenericResponse
from datetime import datetime
import uuid

class postAdd:
    def __init__(self):
        self.post_repo = PostRepository()
        self.user_repo = UserRepository()
    
    def post_add(self,req: func.HttpRequest,logging) -> func.HttpResponse:
        try:
            req_body = req.get_json()
            user_email = req_body.get('email')
            user_list = self.user_repo.find_by_email(user_email)
            if user_list is None:
                response = GenericResponse(
                    message="Unknown User"
                )
                return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")
            # find title name 
            old_title = self.post_repo.find_by_title(req_body.get('title'))
            if old_title is not None:
                # flow will change
                response = GenericResponse(
                    message="Title is existing | to update call update API"
                )
                return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")
            new_post = Post(
                id=str(uuid.uuid4()),
                date = str(datetime.now().strftime("%d-%m-%Y")),
                data = req_body.get('content'),
                title = req_body.get('title'),
                entrytype = req_body.get('type'),
                imgUrl = req_body.get('imgUrl'),
                author = user_list['username'],
                summary = req_body.get('summary'),
                section = req_body.get('section'),
                tags = req_body.get('tags'),
            )
            #if req_body.get('imgUrl') is not None:
            #    new_post.setImgUrl(url=req_body.get('imgUrl'))

            logging.info(f"POST: {new_post.__dict__}")
            # add post
            self.post_repo.create_post(new_post.__dict__)
            response = GenericResponse(
                message="Post Added | Verification Pending"
            )
            return func.HttpResponse(response.to_json(), status_code=201, mimetype="application/json")
        except ValueError:
            response = GenericResponse(
                message="Invalid Input"
            )
            return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            response = GenericResponse(
                message="Internal Server Error"
            )
            return func.HttpResponse(response.to_json(), status_code=500, mimetype="application/json")
            
            



