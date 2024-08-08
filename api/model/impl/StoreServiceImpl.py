from model.interfaces.StoreInterface import StoreInterface
from model.exceptions.exceptions import InvalidToken , ExpiredToken
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
#import logging

# Load getenvment variables from .env file
load_dotenv()

class StoreService(StoreInterface):
    def generate_verification_token(self, email: str) -> str:
        expiration = datetime.now() + timedelta(hours=1)
        token = jwt.encode({'user_id': email, 'exp': expiration}, os.getenv("JWT_KEY"), algorithm='HS256')
        return token
    
    def verify_token(self, token: str) -> str:
        try: 
            decoded_token = jwt.decode(token, os.getenv("JWT_KEY"), algorithms=["HS256"])
            return decoded_token.get('user_id')
        except jwt.ExpiredSignatureError:
            #logging.info("Token Expired Error")
            raise ExpiredToken ("Token Expired")
        except jwt.InvalidTokenError:
            #logging.info("Token Invalid Error")
            raise InvalidToken ("Token Invalid")