import azure.functions as func
from model.impl.UserRepositoryImpl import UserRepository
from model.impl.AuthServiceImpl import AuthService
from model.data.Userdc import SignUpRequest, User
import json
import uuid

class Signup:
    def __init__(self):
        self.user_repo = UserRepository()
        self.auth_service = AuthService()

    def sign_up(self,req: func.HttpRequest,logging) -> func.HttpResponse:
        try:
            req_body = req.get_json()
            signup_request = SignUpRequest(
                email = req_body.get('email'),
                password = req_body.get('password'),
                username = req_body.get('username'),
            )
        
            if self.user_repo.find_by_email(signup_request.email):
                return func.HttpResponse("User already exists", status_code=400)
        
            hashed_password = self.auth_service.hash_password(signup_request.password)
            verification_token = self.auth_service.generate_verification_token(signup_request.email)
        
            new_user = User(
                id=str(uuid.uuid4()),
                email=signup_request.email,
                password=hashed_password,
                username=signup_request.username,
                is_verified=False,
                verification_token=verification_token
            )
        
            self.user_repo.create_user(new_user.__dict__)
        
            # Send verification email logic goes here...
        
            return func.HttpResponse("User registered. Please check your email for verification link.", status_code=201)
        except ValueError:
            return func.HttpResponse("Invalid input", status_code=400)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Internal Server Error", status_code=500)
