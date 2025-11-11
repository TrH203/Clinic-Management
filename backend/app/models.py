from typing import Optional
from datetime import date, datetime
from sqlmodel import Field, SQLModel


class Doctor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    date_of_birth: date
    specialty: str
    image_url: Optional[str] = None
    notes: Optional[str] = None


class Patient(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    date_of_birth: date
    image_url: Optional[str] = None
    notes: Optional[str] = None


class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    doctor_id: int = Field(foreign_key="doctor.id")
    patient_id: int = Field(foreign_key="patient.id")
    appointment_time: datetime
    notes: Optional[str] = None

class Admin(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    hashed_password: str
