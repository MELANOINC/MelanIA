import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import numpy as np
from typing import List, Dict

class QuantumTradingModel:
    def __init__(self):
        self.model = self._build_model()

    def _build_model(self) -> Sequential:
        model = Sequential([
            LSTM(128, return_sequences=True, input_shape=(60, 5)),  # 5 features: OHLC + volumen
            Dropout(0.3),
            LSTM(64),
            Dense(3, activation='softmax')  # 3 clases: BUY, SELL, HOLD
        ])
        model.compile(optimizer='adam', loss='categorical_crossentropy')
        return model

    async def train(self, data: List[Dict]) -> None:
        X = np.array([d["features"] for d in data])
        y = np.array([d["label"] for d in data])
        await self.model.fit(X, y, epochs=50, batch_size=32)

    async def predict(self, market_data: Dict) -> str:
        prediction = await self.model.predict(np.array([market_data["features"]]))
        return ["BUY", "SELL", "HOLD"][np.argmax(prediction)]