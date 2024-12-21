import azure.functions as func
from model.impl.PostRepositoryImpl import PostRepository
from model.data.Userdc import GenericResponse ,MultiPost,Post_As_Response
from datetime import datetime

sections = ['Technology', 'Design', 'Culture','Business', 'Politics', 'Opinion',  'Science', 'Health', 'Style', 'Travel']

class postGet:
    def __init__(self):
        self.post_repo = PostRepository()
        self.utils = Utility()
    
    def post_get(self,req: func.HttpRequest,logging) -> func.HttpResponse:
        try:
            logging.info("Entry")
            req_body = req.get_json()
            postTitle = req_body.get('postTitle')
            logging.info(f"postTitle: {postTitle}")
            if (postTitle != "") :
                logging.info(f"Looking for {postTitle}")
                post= self.post_repo.find_by_title(postTitle)
                if post is not None:
                    # add logic to get related posts
                    tags = post.get('tags')
                    taggedPost = self.post_repo.find_by_tags(tags)
                    logging.info(f"Tagged Posts {taggedPost}")
                    if taggedPost is not None:
                        post_as_reponse = Post_As_Response(
                            posts = post,
                            taggedPosts = self.utils.filterPosts(taggedPost,post)
                        )
                        response = GenericResponse(
                            data = post_as_reponse
                        )
                        return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
                #default
                response = GenericResponse(
                        message="Title Not Found"
                    )
                return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")
            #2
            postType = req_body.get('postType')
            logging.info(f"postType: {postType}")
            if (postType != ""):
                #check post type
                # 1 section name
                # 2 archive name
                # 3 search tags
                if postType in sections:
                    # call api for sections
                    posttypePosts = self.post_repo.find_by_section(postType)
                    if posttypePosts is not None:
                        post_as_reponse = Post_As_Response(
                            posts = posttypePosts
                        )
                        response = GenericResponse(
                            data = post_as_reponse
                        )
                        return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
                #call api for archives
                if self.utils.is_archive(postType):
                    logging.info(f"postType: {postType} is a archive -> {self.utils.getArchiveMonth()}:{self.utils.getArchiveYear()}")
                    posttypeArchives = self.post_repo.find_by_month_year(self.utils.getArchiveMonth(),self.utils.getArchiveYear())
                    if posttypeArchives is not None:
                        post_as_reponse = Post_As_Response(
                            posts = posttypeArchives
                        )
                        response = GenericResponse(
                            data = post_as_reponse
                        )
                        return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")

                #default
                response = GenericResponse(
                        message="Posts Not Found"
                    )
                return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")    
            mainPosts = self.post_repo.find_by_type("post1",1)
            #logging.info(f"mainPosts:{mainPosts}")
            featuredPosts = self.post_repo.find_by_type("post2",2)
            #logging.info(f"featuredPosts: {featuredPosts}")
            posts = self.post_repo.find_by_type("post3",3)
            #logging.info(f"posts :{posts}")

            multi_Post = MultiPost(
                post = posts,
                main = mainPosts,
                feature = featuredPosts,
            )

            #logging.info(f"multi_post {multi_Post.to_json()}")
            response = GenericResponse(
                data = multi_Post
            )
            return func.HttpResponse(response.to_json(), status_code=200, mimetype="application/json")
        except ValueError:
            response = GenericResponse(
                message="Invalid Input"
            )
            return func.HttpResponse(response.to_json(), status_code=400, mimetype="application/json")
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            response = GenericResponse(
                message="Internal Server Error"
            )
            return func.HttpResponse(response.to_json(), status_code=500, mimetype="application/json")
            
            

class Utility:
    def __init__(self):
        self.archiveMonth = None
        self.archiveYear = None

    def is_archive(self,Type: str)-> bool:
        # List of valid months
        months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ]
    
        # Split the input string into parts
        parts = Type.split()
    
        # Validate the input format
        if len(parts) != 2:
            #raise "Invalid format. Expected 'Month Year'."
            return False
    
        month, year = parts
    
        # Check if the month is valid
        if month not in months:
            #raise "Invalid month."
            return False
    
        # Check if the year is a valid number and has four digits
        if not year.isdigit() or len(year) != 4:
            #raise "Invalid year."
            return False
    
        #return f"Month: {month}, Year: {year}"
        self.archiveMonth = (months.index(month)+1)
        self.archiveYear = year
        return True

    def getArchiveMonth(self):
        return self.archiveMonth
    
    def getArchiveYear(self):
        return self.archiveYear

    def filterPosts(self, majorList, minorList):
        return [item for item in majorList if item["id"] != minorList["id"]]

