#!/bin/bash

# Variables
N8N_DOMAIN="https://TU_DOMINIO_N8N"
WEBHOOK_PATH="/webhook/agentes-ia-webhook"
PDF_URL="https://brunomelano.com/workflow/MELANO_Workflow_Agentes.pdf"

echo "🔁 Probando Webhook de MELANO INC..."

# Ejecutar CURL con mensaje de activación
curl -X POST "$N8N_DOMAIN$WEBHOOK_PATH" \
-H "Content-Type: application/json" \
-d '{
  "message": "Hola Melania, quiero el workflow automatizado"
}'

echo -e "\n✅ Webhook ejecutado. Revisá tu instancia n8n para confirmar respuesta y tracking en Kommo."
echo "📎 El PDF debería estar disponible en: $PDF_URL"
