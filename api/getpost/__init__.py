import logging
import azure.functions as func
from controller.postGet import postGet



def main(req: func.HttpRequest) -> func.HttpResponse:
    # Create an instance of the Signin class
    instance = postGet()

    # Call the sign_in method
    return instance.post_get(req, logging.getLogger())
