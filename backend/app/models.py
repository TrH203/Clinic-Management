from typing import Optional, List
from datetime import date, datetime
from sqlmodel import Field, SQLModel, Relationship


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

    appointments: List["Appointment"] = Relationship(back_populates="patient")


class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    doctor_id: int = Field(foreign_key="doctor.id")
    patient_id: int = Field(foreign_key="patient.id")
    appointment_time: datetime
    notes: Optional[str] = None

    patient: Patient = Relationship(back_populates="appointments")

class Admin(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    hashed_password: str
