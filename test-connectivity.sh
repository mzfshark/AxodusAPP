#!/bin/bash

# Axodus Trading Infrastructure - Connectivity Tests
# Tests if all services are reachable

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0
START_TIME=$(date +%s)

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Axodus - Connectivity Tests                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

test_endpoint() {
    local name=$1
    local url=$2
    local auth=$3
    
    echo -n "Testing ${name}... "
    
    if [ -n "$auth" ]; then
        if curl -s -u "$auth" --max-time 5 "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ OK${NC}"
            ((PASSED++))
            return 0
        else
            echo -e "${RED}✗ FAILED${NC}"
            ((FAILED++))
            return 1
        fi
    else
        if curl -s --max-time 5 "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ OK${NC}"
            ((PASSED++))
            return 0
        else
            echo -e "${RED}✗ FAILED${NC}"
            ((FAILED++))
            return 1
        fi
    fi
}

# Test services
echo -e "${YELLOW}Testing Backend Services...${NC}"
test_endpoint "Hummingbot API     " "http://localhost:8000/" "admin:admin"
test_endpoint "Gateway            " "http://localhost:15888/"
test_endpoint "Dashboard          " "http://localhost:8501/"
test_endpoint "MCP Server         " "http://localhost:8100/health"
test_endpoint "Quants Lab         " "http://localhost:8888/"
echo ""

echo -e "${YELLOW}Testing Message Broker...${NC}"
test_endpoint "EMQX Dashboard     " "http://localhost:18083/"
test_endpoint "EMQX MQTT (HTTP)   " "http://localhost:8083/"
echo ""

echo -e "${YELLOW}Testing Frontend...${NC}"
test_endpoint "Axodus Frontend    " "http://localhost:5174/"
echo ""

echo -e "${YELLOW}Testing Databases...${NC}"
echo -n "PostgreSQL         ... "
if command -v pg_isready &> /dev/null && pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ OK${NC}"
    ((PASSED++))
elif command -v nc &> /dev/null && nc -z localhost 5432 2>/dev/null; then
    echo -e "${GREEN}✓ OK${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi

echo -n "MongoDB            ... "
if command -v nc &> /dev/null && nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}✓ OK${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""

# Summary
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Passed: ${PASSED}${NC} | ${RED}Failed: ${FAILED}${NC} | Duration: ${DURATION}s"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All connectivity tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Check services with: docker ps${NC}"
    exit 1
fi
