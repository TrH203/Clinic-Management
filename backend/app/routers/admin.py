from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from typing import List

from .. import auth, crud, models, schemas
from ..deps import get_db, get_current_user
from ..core.config import settings
from datetime import timedelta

router = APIRouter()

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_admin_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/doctors/", response_model=schemas.DoctorRead)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.create_doctor(db=db, doctor=doctor)

@router.get("/doctors/", response_model=List[schemas.DoctorRead])
def read_doctors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    doctors = crud.get_doctors(db, skip=skip, limit=limit)
    return doctors

@router.get("/doctors/{doctor_id}", response_model=schemas.DoctorRead)
def read_doctor(doctor_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    db_doctor = crud.get_doctor(db, doctor_id=doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return db_doctor

@router.put("/doctors/{doctor_id}", response_model=schemas.DoctorRead)
def update_doctor(doctor_id: int, doctor: schemas.DoctorUpdate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.update_doctor(db=db, doctor_id=doctor_id, doctor=doctor)

@router.delete("/doctors/{doctor_id}", response_model=schemas.DoctorRead)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.delete_doctor(db=db, doctor_id=doctor_id)

@router.get("/doctors/{doctor_id}/appointments/", response_model=List[schemas.AppointmentRead])
def read_doctor_appointments(doctor_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    appointments = crud.get_appointments_by_doctor(db, doctor_id=doctor_id)
    return appointments

@router.post("/patients/", response_model=schemas.PatientRead)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.create_patient(db=db, patient=patient)

@router.get("/patients/", response_model=List[schemas.PatientRead])
def read_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    patients = crud.get_patients(db, skip=skip, limit=limit)
    return patients

@router.get("/patients/{patient_id}", response_model=schemas.PatientRead)
def read_patient(patient_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    db_patient = crud.get_patient(db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@router.put("/patients/{patient_id}", response_model=schemas.PatientRead)
def update_patient(patient_id: int, patient: schemas.PatientUpdate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.update_patient(db=db, patient_id=patient_id, patient=patient)

@router.delete("/patients/{patient_id}", response_model=schemas.PatientRead)
def delete_patient(patient_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.delete_patient(db=db, patient_id=patient_id)

@router.post("/appointments/", response_model=schemas.AppointmentRead)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.create_appointment(db=db, appointment=appointment)

@router.get("/appointments/", response_model=List[schemas.AppointmentRead])
def read_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    appointments = crud.get_appointments(db, skip=skip, limit=limit)
    return appointments

@router.get("/appointments/{appointment_id}", response_model=schemas.AppointmentRead)
def read_appointment(appointment_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    db_appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@router.put("/appointments/{appointment_id}", response_model=schemas.AppointmentRead)
def update_appointment(appointment_id: int, appointment: schemas.AppointmentUpdate, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.update_appointment(db=db, appointment_id=appointment_id, appointment=appointment)

@router.delete("/appointments/{appointment_id}", response_model=schemas.AppointmentRead)
def delete_appointment(appointment_id: int, db: Session = Depends(get_db), current_user: models.Admin = Depends(get_current_user)):
    return crud.delete_appointment(db=db, appointment_id=appointment_id)
