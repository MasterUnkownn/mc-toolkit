#!/data/data/com.termux/files/usr/bin/bash

# ===== CONFIG =====
BACKEND_DIR="backend"
FRONTEND_DIR="app"

BACKEND_PORT=5000
FRONTEND_PORT=5173

PID_FILE=".mc_toolkit_pids"

# ===== COLORS =====
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# ===== FUNCTIONS =====

function is_running() {
    ps -p $1 > /dev/null 2>&1
}

function start_backend() {
    echo -e "${GREEN}Starting backend...${NC}"
    cd $BACKEND_DIR || exit

    python server.py > ../backend.log 2>&1 &
    BACK_PID=$!

    cd ..
    echo $BACK_PID >> $PID_FILE
    echo -e "Backend PID: $BACK_PID"
}

function start_frontend() {
    echo -e "${GREEN}Starting frontend...${NC}"
    cd $FRONTEND_DIR || exit

    npm run dev > ../frontend.log 2>&1 &
    FRONT_PID=$!

    cd ..
    echo $FRONT_PID >> $PID_FILE
    echo -e "Frontend PID: $FRONT_PID"
}

function stop_all() {
    if [ ! -f "$PID_FILE" ]; then
        echo -e "${RED}No running services found.${NC}"
        return
    fi

    echo -e "${RED}Stopping services...${NC}"

    while read PID; do
        if is_running $PID; then
            kill $PID
            echo "Stopped PID: $PID"
        else
            echo "PID $PID not running"
        fi
    done < $PID_FILE

    rm $PID_FILE
    echo -e "${GREEN}All services stopped.${NC}"
}

function status() {
    if [ ! -f "$PID_FILE" ]; then
        echo -e "${RED}No services running.${NC}"
        return
    fi

    echo -e "${GREEN}Service status:${NC}"

    while read PID; do
        if is_running $PID; then
            echo "PID $PID is running"
        else
            echo "PID $PID is NOT running"
        fi
    done < $PID_FILE
}

# ===== MAIN =====

case "$1" in
    start)
        if [ -f "$PID_FILE" ]; then
            echo -e "${RED}Services already running. Use './start.sh stop' first.${NC}"
            exit 1
        fi

        touch $PID_FILE
        start_backend
        start_frontend

        echo ""
        echo -e "${GREEN}🚀 MC Toolkit Started!${NC}"
        echo "Frontend: http://localhost:$FRONTEND_PORT"
        echo "Backend:  http://localhost:$BACKEND_PORT"
        ;;

    stop)
        stop_all
        ;;

    restart)
        stop_all
        sleep 1
        $0 start
        ;;

    status)
        status
        ;;

    *)
        echo "Usage: ./start.sh {start|stop|restart|status}"
        ;;
esac
