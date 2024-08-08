from abc import ABC, abstractmethod

class StoreInterface(ABC):
    @abstractmethod
    def generate_verification_token(self, email: str) -> str:
        pass
    
    @abstractmethod
    def verify_token(self, token: str) -> str:
        pass