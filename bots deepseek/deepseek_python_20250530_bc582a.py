import strawberry
from strawberry.fastapi import GraphQLRouter
from app.api import dashboard, lead
from typing import List, Dict, Any
from datetime import date

@strawberry.type
class LeadType:
    name: str
    email: str
    score: float
    conversion_prob: float

@strawberry.type
class AnalyticsType:
    date: date
    leads: int
    activations: int
    conversions: int
    kpi: float

@strawberry.type
class PredictiveAnalytics:
    future_date: date
    predicted_leads: int
    confidence_interval: float

@strawberry.type
class Query:
    @strawberry.field
    async def get_analytics(self, days: int = 7) -> List[AnalyticsType]:
        raw_data = await dashboard.get_analytics_data(days)
        return [
            AnalyticsType(
                date=item['date'],
                leads=item['leads'],
                activations=item['activations'],
                conversions=item['conversions'],
                kpi=item['kpi']
            ) for item in raw_data
        ]
    
    @strawberry.field
    async def get_lead_predictions(self) -> List[PredictiveAnalytics]:
        forecast = await dashboard.get_lead_forecast()
        return [
            PredictiveAnalytics(
                future_date=item['date'],
                predicted_leads=item['predicted'],
                confidence_interval=item['confidence']
            ) for item in forecast
        ]
    
    @strawberry.field
    async def high_value_leads(self, min_score: float = 0.8) -> List[LeadType]:
        leads = await lead.get_scored_leads()
        return [
            LeadType(
                name=lead['name'],
                email=lead['email'],
                score=lead['score'],
                conversion_prob=lead['conversion_prob']
            ) for lead in leads if lead['score'] >= min_score
        ]

schema = strawberry.Schema(Query)
graphql_router = GraphQLRouter(schema)