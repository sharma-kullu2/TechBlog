import logging
import azure.functions as func
from controller.sign_up import Signup



def main(req: func.HttpRequest) -> func.HttpResponse:
    # Create an instance of the Signin class
    signup_instance = Signup()

    # Call the sign_in method
    return signup_instance.sign_in(req, logging.getLogger())
