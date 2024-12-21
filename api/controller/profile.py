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
            # get user by token
            user = self.user_repo.find_by_email(id)
            # check subscription request in request body
            if req.get_body():
                req_body = req.get_json()
                if req_body:
                    wants_subscription = req_body.get('subscribe')
                    if wants_subscription:
                        logging.info(f"profile status {wants_subscription} -> will call fn")
                        user['subscribed'] = wants_subscription
                        updated_user=self.user_repo.update_user(user)
                        if updated_user:
                            response = GenericResponse(
                                success=True,
                                message = 'Subscriber added',
                                data = updated_user,
                            )
                            return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
                        else:
                            response=GenericResponse(
                                        success=False,
                                        message="Susbcriber Not Added"
                                    )
                            return func.HttpResponse(response.to_json(), status_code=401,mimetype="application/json")
            response = GenericResponse(success=True)
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



    