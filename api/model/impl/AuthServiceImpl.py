import crypt
import uuid
from model.interfaces.AuthService import AuthServiceInterface

class AuthService(AuthServiceInterface):

    def generate_verification_token(self, email: str) -> str:
        return str(uuid.uuid4())

    def hash_password(self, password: str) -> str:
        return crypt.crypt(password, crypt.mksalt(crypt.METHOD_SHA512))

    def verify_password(self, password: str, hashed: str) -> bool:
        return crypt.crypt(password, hashed) == hashed
    
  


    

