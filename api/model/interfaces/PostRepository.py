from abc import ABC, abstractmethod 
from typing import Optional 

class PostRepositoryInterface(ABC): 
    @abstractmethod 
    def create_post(self, post_data: dict) -> dict: 
        pass 

    @abstractmethod 
    def update_post(self, post_data: dict) -> dict: 
        pass 

    @abstractmethod
    def find_by_title(self, title: str) -> Optional[dict]:
        pass

    @abstractmethod
    def find_by_type(self, title: str) -> Optional[dict]:
        pass

    @abstractmethod
    def find_by_tags(self, tags: list) -> Optional[list]:
        pass

    @abstractmethod
    def find_by_section(self, section: str) -> Optional[list]:
        pass
    
    @abstractmethod
    def find_by_month_year(self, month: str, year: str) -> Optional[list]:
        pass
 