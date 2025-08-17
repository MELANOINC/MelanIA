from fastapi import APIRouter
from prophet import Prophet
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

router = APIRouter(tags=["Analytics"])

async def get_analytics_data(days: int = 7):
    """Función para obtener datos para GraphQL"""
    # Lógica real de conexión a base de datos
    dates = [(datetime.now() - timedelta(days=i)).date() for i in range(days, 0, -1)]
    return [{
        "date": date,
        "leads": np.random.randint(5, 20),
        "activations": np.random.randint(3, 15),
        "conversions": np.random.randint(1, 10),
        "kpi": round(np.random.uniform(0.3, 0.7), 2)
    } for date in dates]

async def get_lead_forecast():
    """Predicción de leads para GraphQL"""
    history = await get_analytics_data(30)
    df = pd.DataFrame(history)
    df.rename(columns={'date': 'ds', 'leads': 'y'}, inplace=True)
    
    model = Prophet()
    model.fit(df)
    
    future = model.make_future_dataframe(periods=7)
    forecast = model.predict(future)
    
    return [{
        "date": row['ds'].date(),
        "predicted": int(row['yhat']),
        "confidence": round(float(row['yhat_upper'] - row['yhat_lower']), 2)
    } for _, row in forecast.tail(7).iterrows()]

@router.get("/dashboard")
async def dashboard():
    return await get_analytics_data(3)