import logging
import azure.functions as func
from controller.profile import Profile



def main(req: func.HttpRequest) -> func.HttpResponse:
    # Create an instance of the Signin class
    profile_instance = Profile()

    # Call the sign_in method
    return profile_instance.getUserProfile(req, logging.getLogger())
