from fastapi import FastAPI, Depends
from sqlmodel import Session
from . import crud, models, schemas
from .db import create_db_and_tables, engine
from .routers import public, admin
from .deps import get_db

app = FastAPI(title="Clinic Management System API")

app.include_router(public.router, prefix="", tags=["public"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/create-admin/", include_in_schema=False)
def create_admin(db: Session = Depends(get_db)):
    admin = crud.get_admin_by_username(db, username="admin")
    if not admin:
        admin_in = schemas.AdminCreate(username="admin", password="password")
        crud.create_admin(db, admin_in)
        return {"message": "Admin user created successfully"}
    return {"message": "Admin user already exists"}


@app.get("/")
def read_root():
    return {"message": "Welcome to the Clinic Management System API"}
