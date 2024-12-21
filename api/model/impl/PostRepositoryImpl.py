from azure.cosmos import CosmosClient
from model.interfaces.PostRepository import PostRepositoryInterface,Optional
import os
from dotenv import load_dotenv

# Load getenvment variables from .env file
load_dotenv()

class PostRepository(PostRepositoryInterface):

    def __init__(self):
        host = os.getenv("ACCOUNT_HOST")
        key= os.getenv("ACCOUNT_KEY")
        db= os.getenv("DATABASE_NAME")
        if host is None or key is None or db is None:
            return
        # Ensure correct instantiation of CosmosClient
        self.client = CosmosClient(host, key)
        # Further initialization logic (like database and container setup)
        self.container = self.client.get_database_client(db).get_container_client('posts')

    def create_post(self, post_data: dict) -> dict:
        self.container.create_item(body=post_data)
        return post_data

    def update_post(self, post_data: dict) -> dict:
        self.container.upsert_item(body=post_data)
        return post_data

    def find_by_title(self, title: str) -> Optional[dict]:
        query = f"SELECT * FROM c WHERE c.title = '{title}'"
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        return items[0] if items else None

    def find_by_type(self, postType: str ,limit: int) -> Optional[dict]:
        query = f'''SELECT c.data, c.date, c.title, c.imgUrl, c.author
                FROM posts c
                WHERE c.entrytype="{postType}"
                ORDER BY c.date DESC
                OFFSET 0 LIMIT {limit}'''
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        if items:
            if (limit == 1):
                return items[0]
            else:
                itemArr=[]
                for item in items:
                    itemArr.append(item)
                return itemArr
        return None

    def find_by_tags(self, tags: list) -> Optional[list]:
        # Start building the query
        query = f'''SELECT TOP 4 * FROM c
                WHERE ARRAY_CONTAINS(c.tags, "{tags[0]}")'''
        # Remove the first item, as it's already used in the query
        tags.pop(0)
        # Loop through the remaining items and append each condition
        for item in tags:
            subqry = f'''OR ARRAY_CONTAINS(c.tags, "{item}")'''
            query += subqry  # Correctly append the sub-query to the main query
        subqry = f"ORDER BY c._ts DESC"
        query += subqry
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        if items:
            itemArr=[]
            for item in items:
                itemArr.append(item)
            return itemArr
        return None
    
    def find_by_section(self, section: str) -> Optional[list]:
        query = f'''SELECT c.data, c.date, c.title, c.imgUrl, c.author
                FROM posts c
                WHERE c.section="{section}"
                ORDER BY c.date DESC'''
                #OFFSET 0 LIMIT {limit}'''
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        if items:
            itemArr=[]
            for item in items:
                itemArr.append(item)
            return itemArr
        return None

    def find_by_month_year(self, month: str, year: str) -> Optional[list]:
        query = f'''SELECT c.data, c.date, c.title, c.imgUrl, c.author 
                    FROM posts c
                    WHERE c.date LIKE "%-{month}-{year}"'''
        items = list(self.container.query_items(query=query, enable_cross_partition_query=True))
        if items:
            itemArr=[]
            for item in items:
                itemArr.append(item)
            return itemArr
        return None

        

