import logging
import azure.functions as func
from controller.postAdd import postAdd



def main(req: func.HttpRequest) -> func.HttpResponse:
    # Create an instance of the Signin class
    postAdd_instance = postAdd()

    # Call the sign_in method
    return postAdd_instance.post_add(req, logging.getLogger())
