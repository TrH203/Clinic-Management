from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime

class DoctorBase(BaseModel):
    name: str
    date_of_birth: date
    specialty: str
    image_url: Optional[str] = None
    notes: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(DoctorBase):
    pass

class DoctorRead(DoctorBase):
    id: int

class PatientBase(BaseModel):
    name: str
    date_of_birth: date
    image_url: Optional[str] = None
    notes: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class PatientRead(PatientBase):
    id: int

class AppointmentBase(BaseModel):
    doctor_id: int
    patient_id: int
    appointment_time: datetime
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(AppointmentBase):
    pass

class AppointmentRead(AppointmentBase):
    id: int
    patient: "PatientRead"

class AdminBase(BaseModel):
    username: str

class AdminCreate(AdminBase):
    password: str

class AdminRead(AdminBase):
    id: int

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class DoctorStats(BaseModel):
    date: date
    total_hours: int
    visit_count: int

class PatientTrend(BaseModel):
    date: date
    patient_count: int
    total_hours: int

class PatientVisit(BaseModel):
    patient_name: str
    visit_count: int

class StatisticsRead(BaseModel):
    doctor_stats: List[DoctorStats]
    patient_trend: List[PatientTrend]
    patient_visits: List[PatientVisit]
