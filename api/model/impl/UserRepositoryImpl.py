from azure.cosmos import CosmosClient
from model.interfaces.UserRepository import UserRepositoryInterface,Optional
import os
from dotenv import load_dotenv

# Load getenvment variables from .env file
load_dotenv()

class UserRepository(UserRepositoryInterface):

    def __init__(self):
        host = os.getenv("ACCOUNT_HOST")
        key= os.getenv("ACCOUNT_KEY")
        db= os.getenv("DATABASE_NAME")
        if host is None or key is None or db is None:
            return
        # Ensure correct instantiation of CosmosClient
        self.client = CosmosClient(host, key)
        # Further initialization logic (like database and container setup)
        self.container = self.client.get_database_client(db).get_container_client('user')

    def find_by_email(self, email: str) -> Optional[dict]:
        query = f"SELECT * FROM c WHERE c.email = '{email}'"
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        return items[0] if items else None

    def create_user(self, user_data: dict) -> dict:
        self.container.create_item(body=user_data)
        return user_data

    def update_user(self, user_data: dict) -> dict:
        self.container.upsert_item(body=user_data)
        return user_data
