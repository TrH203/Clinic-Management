from sqlmodel import Session, select
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Doctor CRUD
def get_doctor(db: Session, doctor_id: int):
    return db.get(models.Doctor, doctor_id)

def get_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.exec(select(models.Doctor).offset(skip).limit(limit)).all()

def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def update_doctor(db: Session, doctor_id: int, doctor: schemas.DoctorUpdate):
    db_doctor = db.get(models.Doctor, doctor_id)
    if db_doctor:
        doctor_data = doctor.dict(exclude_unset=True)
        for key, value in doctor_data.items():
            setattr(db_doctor, key, value)
        db.add(db_doctor)
        db.commit()
        db.refresh(db_doctor)
    return db_doctor

def delete_doctor(db: Session, doctor_id: int):
    db_doctor = db.get(models.Doctor, doctor_id)
    if db_doctor:
        db.delete(db_doctor)
        db.commit()
    return db_doctor

# Patient CRUD
def get_patient(db: Session, patient_id: int):
    return db.get(models.Patient, patient_id)

def get_patients(db: Session, skip: int = 0, limit: int = 100):
    return db.exec(select(models.Patient).offset(skip).limit(limit)).all()

def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def update_patient(db: Session, patient_id: int, patient: schemas.PatientUpdate):
    db_patient = db.get(models.Patient, patient_id)
    if db_patient:
        patient_data = patient.dict(exclude_unset=True)
        for key, value in patient_data.items():
            setattr(db_patient, key, value)
        db.add(db_patient)
        db.commit()
        db.refresh(db_patient)
    return db_patient

def delete_patient(db: Session, patient_id: int):
    db_patient = db.get(models.Patient, patient_id)
    if db_patient:
        db.delete(db_patient)
        db.commit()
    return db_patient

# Appointment CRUD
def get_appointment(db: Session, appointment_id: int):
    return db.get(models.Appointment, appointment_id)

def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.exec(select(models.Appointment).offset(skip).limit(limit)).all()

def get_appointments_by_doctor(db: Session, doctor_id: int):
    return db.exec(select(models.Appointment).where(models.Appointment.doctor_id == doctor_id)).all()

def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def update_appointment(db: Session, appointment_id: int, appointment: schemas.AppointmentUpdate):
    db_appointment = db.get(models.Appointment, appointment_id)
    if db_appointment:
        appointment_data = appointment.dict(exclude_unset=True)
        for key, value in appointment_data.items():
            setattr(db_appointment, key, value)
        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)
    return db_appointment

def delete_appointment(db: Session, appointment_id: int):
    db_appointment = db.get(models.Appointment, appointment_id)
    if db_appointment:
        db.delete(db_appointment)
        db.commit()
    return db_appointment

# Admin CRUD
def get_admin_by_username(db: Session, username: str):
    return db.exec(select(models.Admin).where(models.Admin.username == username)).first()

def create_admin(db: Session, admin: schemas.AdminCreate):
    hashed_password = pwd_context.hash(admin.password)
    db_admin = models.Admin(username=admin.username, hashed_password=hashed_password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin
