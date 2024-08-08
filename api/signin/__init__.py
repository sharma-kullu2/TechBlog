import logging
import azure.functions as func
from controller.sign_in import Signin



def main(req: func.HttpRequest) -> func.HttpResponse:
    # Create an instance of the Signin class
    signin_instance = Signin()

    # Call the sign_in method
    return signin_instance.sign_in(req, logging.getLogger())
