#!/bin/bash

# Kill any existing processes on ports 5602 and 5000
kill $(lsof -t -i:5602) 2> /dev/null
kill $(lsof -t -i:5000) 2> /dev/null

# start backend index server
source venv/bin/activate
echo "python environment activated..."
python index_server.py &
echo "index_server running..."

# wait for the server to start - if creating a brand new huge index, on startup, increase this further
sleep 10

# start the flask server
python api.py &

# assumes you've ran npm install already (dockerfile does this during build)
# cd react_frontend && npm run build && serve -s build
cd ../../ && yarn start
