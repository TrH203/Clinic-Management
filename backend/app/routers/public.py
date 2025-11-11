from fastapi import APIRouter

router = APIRouter()

@router.get("/news")
def get_news():
    # Placeholder for news
    return [{"id": 1, "title": "News 1", "content": "Content 1"}, {"id": 2, "title": "News 2", "content": "Content 2"}]

@router.get("/services")
def get_services():
    # Placeholder for services
    return [{"id": 1, "name": "Service 1", "description": "Description 1"}, {"id": 2, "name": "Service 2", "description": "Description 2"}]
