from abc import ABC, abstractmethod 
from typing import Optional 

class UserRepositoryInterface(ABC): 
    @abstractmethod 
    def find_by_email(self, email: str) -> Optional[dict]: 
        pass 

    @abstractmethod 
    def create_user(self, user_data: dict) -> dict: 
        pass 

    @abstractmethod 
    def update_user(self, user_data: dict) -> dict: 
        pass 