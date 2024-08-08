from dataclasses import dataclass, asdict
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
