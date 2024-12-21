from dataclasses import dataclass, asdict ,field
from typing import Any, Optional
import json

@dataclass
class User:
    id: str
    email: str
    password: str
    username: str
    is_verified: bool = False
    verification_token: str = ""
    authorized: bool = False
    subscribed: bool = False

@dataclass
class SignInRequest:
    email: str
    password: str

@dataclass
class SignUpRequest:
    email: str
    password: str
    username: str

@dataclass
class GenericResponse:
    status: str = None
    message: str = None
    success: bool = True
    data: Optional[Any] = None
    def to_json(self) -> str:
        return json.dumps(asdict(self))


@dataclass
class Post:
    id:str
    author:str
    date:str
    data:str
    title:str
    entrytype:str
    summary:str
    tags: Optional[Any]
    section: str
    imgUrl:str = None
    verified:bool = False
    comments: Optional[Any] = None
    def to_json(self) -> str:
        return json.dumps(asdict(self)) 
    def setVerified(self):
        self.verified = true

@dataclass
class MultiPost:
    post: dict
    main: dict  = field(default_factory=dict)
    feature: dict  = field(default_factory=dict)
    def to_json(self) -> str:
        return json.dumps(asdict(self)) 

@dataclass
class Post_As_Response:
    posts: Optional[Any]
    taggedPosts: Optional[Any] = None
    def to_json(self) -> str:
        return json.dumps(asdict(self)) 
