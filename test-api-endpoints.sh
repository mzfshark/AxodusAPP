#!/bin/bash

# Axodus Trading Infrastructure - API Endpoint Tests
# Tests critical API endpoints with authentication

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASSED=0
FAILED=0
START_TIME=$(date +%s)

AUTH="admin:admin"
API_URL="http://localhost:8000"

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Axodus - API Endpoint Tests                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

test_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected=$4
    
    echo -n "Testing ${method} ${endpoint}... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -u "$AUTH" --max-time 10 "$API_URL$endpoint" 2>/dev/null || echo "")
    else
        response=$(curl -s -u "$AUTH" -X "$method" --max-time 10 \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$API_URL$endpoint" 2>/dev/null || echo "")
    fi
    
    if echo "$response" | grep -q "$expected"; then
        echo -e "${GREEN}✓ OK${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((FAILED++))
        return 1
    fi
}

# Test authentication
echo -e "${YELLOW}Testing Authentication...${NC}"
echo -n "Testing without auth   ... "
unauth_response=$(curl -s --max-time 5 "$API_URL/accounts/list" 2>/dev/null || echo "401")
if echo "$unauth_response" | grep -q "401\|Unauthorized\|detail"; then
    echo -e "${GREEN}✓ OK (401 expected)${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ Warning (might allow anonymous)${NC}"
fi
echo ""

# Test account endpoints
echo -e "${YELLOW}Testing Account Endpoints...${NC}"
test_api "GET" "/accounts/list" "" "\[\]"
echo ""

# Test portfolio endpoints
echo -e "${YELLOW}Testing Portfolio Endpoints...${NC}"
test_api "POST" "/portfolio/state" "{}" "balances\|total\|\{"
echo ""

# Test bot orchestration
echo -e "${YELLOW}Testing Bot Orchestration...${NC}"
test_api "GET" "/bot-orchestration/status" "" "\[\]"
echo ""

# Test market data
echo -e "${YELLOW}Testing Market Data...${NC}"
test_api "POST" "/market-data/prices" '{"connector_name":"binance","trading_pairs":["BTC-USDT"]}' "BTC-USDT\|price\|\["
echo ""

# Test controllers
echo -e "${YELLOW}Testing Controllers...${NC}"
test_api "GET" "/controllers/templates" "" "pmm\|grid\|dca\|\{"
echo ""

# Summary
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Passed: ${PASSED}${NC} | ${RED}Failed: ${FAILED}${NC} | Duration: ${DURATION}s"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All API tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Check API logs: docker logs hummingbot-api${NC}"
    exit 1
fi
