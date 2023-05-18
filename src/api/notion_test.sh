curl -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer secret_wAaz6IYU56hzmTcdWnN01AYPBHJz2Chd3KyWM1nSeQi" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-08-16" \
  --data "{
    \"parent\": { \"database_id\": \"54dde943e2e7442eb4202859f501dda3\" },
    \"properties\": {
      \"title\": {
        \"title\": [
          {
            \"text\": {
              \"content\": \"Yurts in Big Sur, California\"
            }
          }
        ]
      }
    }
  }"
