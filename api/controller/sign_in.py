import azure.functions as func
from model.impl.UserRepositoryImpl import UserRepository
from model.impl.AuthServiceImpl import AuthService
from model.impl.StoreServiceImpl import StoreService
from model.data.Userdc import SignInRequest,GenericResponse
import json

class Signin:
    def __init__(self):
        self.user_repo = UserRepository()
        self.auth_service = AuthService()
        self.store_service = StoreService()

    def sign_in(self, req: func.HttpRequest, logging) -> func.HttpResponse:
        try:
            req_body = req.get_json()
            signin_request = SignInRequest(**req_body)

            user = self.user_repo.find_by_email(signin_request.email)
            if user and self.auth_service.verify_password(signin_request.password, user['password']):
                # add to local storage
                token=self.store_service.generate_verification_token(user['email'])
                response= GenericResponse(
                    success=True,
                    data = {"Token":token}
                )
                return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
            else:
                return func.HttpResponse("Invalid credentials", status_code=401)
        except ValueError:
            return func.HttpResponse("Invalid input", status_code=400)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Internal Server Error", status_code=500)
