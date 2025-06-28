class Message:
    def __init__(self, user_id: str, content: str):
        self.user_id = user_id
        self.content = content

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "content": self.content
        }

    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            user_id=data.get("user_id"),
            content=data.get("content")
        )