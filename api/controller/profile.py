import azure.functions as func
from model.impl.UserRepositoryImpl import UserRepository
from model.impl.StoreServiceImpl import StoreService
from model.data.Userdc import GenericResponse
from model.exceptions.exceptions import *


class Profile:
    def __init__(self):
        self.user_repo = UserRepository()
        self.store_service = StoreService()
    
    def getUserProfile(self, req: func.HttpRequest, logging) -> func.HttpResponse:
        token = req.headers.get('Authorization')
        if not token:
            return func.HttpResponse("Token is missing", status_code=401)
        
        # check token eligibilty : valid or expired
        try:
            id=self.store_service.verify_token(token)
            user = self.user_repo.find_by_email(id)
            response = GenericResponse(
                data={"username": user['username'],
                      "email": user['email']
                      }
            )
            return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
        except (InvalidToken,ExpiredToken):
            response=GenericResponse(
                success=False,
                message="Token Expired/Invalid"
            )
            return func.HttpResponse(response.to_json(), status_code=401,mimetype="application/json")
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Internal Server Error", status_code=500)



    