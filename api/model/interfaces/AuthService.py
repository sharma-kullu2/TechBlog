from abc import ABC, abstractmethod

class AuthServiceInterface(ABC):

    @abstractmethod
    def generate_verification_token(self, email: str) -> str:
        pass

    @abstractmethod
    def hash_password(self, password: str) -> str:
        pass

    @abstractmethod
    def verify_password(self, password: str, hashed: str) -> bool:
        pass

    