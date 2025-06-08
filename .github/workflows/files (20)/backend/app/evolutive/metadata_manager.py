from fastapi import APIRouter, HTTPException
from typing import Dict

router = APIRouter()
metadata_db: Dict[int, dict] = {}

@router.post("/{token_id}/levelup")
async def level_up(token_id: int):
    if token_id not in metadata_db:
        metadata_db[token_id] = {'level': 1}
    else:
        metadata_db[token_id]['level'] += 1
    return {"level": metadata_db[token_id]['level']}

@router.post("/{token_id}/custom_uri")
async def set_custom_uri(token_id: int, uri: str):
    if token_id not in metadata_db:
        metadata_db[token_id] = {'level': 1}
    metadata_db[token_id]['custom_uri'] = uri
    return metadata_db[token_id]

@router.get("/{token_id}")
async def get_metadata(token_id: int):
    if token_id not in metadata_db:
        raise HTTPException(status_code=404, detail="Token not found")
    return {"metadata": metadata_db[token_id]}