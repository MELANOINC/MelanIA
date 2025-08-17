import tensorflow as tf
import numpy as np
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
import joblib
from collections import defaultdict
from app.ml.quantum_ml import QuantumTradingModel

router = APIRouter(tags=["Federated Learning"])

# Almacenamiento de actualizaciones de clientes
client_updates = defaultdict(list)

class FederatedUpdate(BaseModel):
    client_id: str
    model_type: str  # 'trading', 'lead_scoring'
    weights: List[List[float]]
    data_size: int

@router.post("/federated/update")
async def receive_client_update(update: FederatedUpdate):
    """Recibe actualizaciones de modelos de clientes"""
    client_updates[update.model_type].append({
        'weights': [np.array(w) for w in update.weights],
        'data_size': update.data_size
    })
    return {"status": "update received"}

@router.post("/federated/aggregate/{model_type}")
async def aggregate_model_updates(model_type: str):
    """Agrega actualizaciones de clientes usando Federated Averaging"""
    if model_type not in client_updates or not client_updates[model_type]:
        raise HTTPException(400, "No updates for this model type")
    
    updates = client_updates[model_type]
    total_data = sum(update['data_size'] for update in updates)
    
    # Federated Averaging
    avg_weights = []
    for i in range(len(updates[0]['weights'])):
        weighted_sum = np.zeros_like(updates[0]['weights'][i])
        for update in updates:
            weighted_sum += update['weights'][i] * update['data_size']
        avg_weights.append(weighted_sum / total_data)
    
    # Actualizar modelo global
    if model_type == 'trading':
        model = QuantumTradingModel()
        model.model.set_weights(avg_weights)
        joblib.dump(model, 'models/global_trading_model.pkl')
    elif model_type == 'lead_scoring':
        # Actualizar modelo de scoring de leads
        pass
    
    # Limpiar actualizaciones
    client_updates[model_type] = []
    
    return {"status": "aggregation complete", "new_weights": [w.tolist() for w in avg_weights]}

@router.get("/federated/get_global_model/{model_type}")
async def get_global_model(model_type: str):
    """Entrega el modelo global actualizado a los clientes"""
    if model_type == 'trading':
        model = joblib.load('models/global_trading_model.pkl')
        return {"weights": [w.tolist() for w in model.model.get_weights()]}
    raise HTTPException(404, "Model type not found")