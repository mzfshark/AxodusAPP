#!/bin/bash

# Axodus Trading Infrastructure - Master Test Runner
# Orchestrates all test suites with proper sequencing

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

TOTAL_START=$(date +%s)
TOTAL_PASSED=0
TOTAL_FAILED=0

clear

echo -e "${MAGENTA}"
cat << "BANNER"
   ___                    __         
  / _ | __ ___  ___  ____/ /_ ___  __
 / __ |/  \ \ \/ _ \/ _  / / / (_-<  
/_/ |_/_/_/_\_\\___/\_,_/_/_/ /___/  
                                      
   Trading Infrastructure Test Suite  
BANNER
echo -e "${NC}"

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}Starting comprehensive test suite...${NC}"
echo -e "${CYAN}Time: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo ""

# Pre-flight checks
echo -e "${YELLOW}[PRE-FLIGHT] Checking prerequisites...${NC}"
echo -n "  → Docker installed... "
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Docker not found!${NC}"
    exit 1
fi

echo -n "  → Docker running... "
if docker ps &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Docker not running!${NC}"
    exit 1
fi

echo -n "  → curl installed... "
if command -v curl &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ curl not found!${NC}"
    exit 1
fi
echo ""

# Check containers
echo -e "${YELLOW}[PRE-FLIGHT] Checking Docker containers...${NC}"
RUNNING_CONTAINERS=$(docker ps --format "{{.Names}}" | wc -l)
echo "  → Found ${RUNNING_CONTAINERS} running containers"

if [ "$RUNNING_CONTAINERS" -lt 3 ]; then
    echo -e "${YELLOW}  ⚠ Warning: Expected at least 3 containers${NC}"
    echo -e "${YELLOW}  → Run 'docker compose up -d' to start services${NC}"
fi
echo ""

# Test Suite 1: Connectivity
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Test Suite 1: Connectivity Tests             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

if [ -f "./test-connectivity.sh" ]; then
    if ./test-connectivity.sh; then
        echo -e "${GREEN}✅ Connectivity Tests PASSED${NC}"
        ((TOTAL_PASSED++))
        CONNECTIVITY_RESULT=0
    else
        echo -e "${RED}❌ Connectivity Tests FAILED${NC}"
        ((TOTAL_FAILED++))
        CONNECTIVITY_RESULT=1
    fi
else
    echo -e "${RED}✗ test-connectivity.sh not found${NC}"
    ((TOTAL_FAILED++))
    CONNECTIVITY_RESULT=1
fi
echo ""

sleep 2

# Test Suite 2: API Endpoints
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Test Suite 2: API Endpoint Tests             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

if [ -f "./test-api-endpoints.sh" ]; then
    if ./test-api-endpoints.sh; then
        echo -e "${GREEN}✅ API Endpoint Tests PASSED${NC}"
        ((TOTAL_PASSED++))
        API_RESULT=0
    else
        echo -e "${RED}❌ API Endpoint Tests FAILED${NC}"
        ((TOTAL_FAILED++))
        API_RESULT=1
    fi
else
    echo -e "${RED}✗ test-api-endpoints.sh not found${NC}"
    ((TOTAL_FAILED++))
    API_RESULT=1
fi
echo ""

# Generate summary
TOTAL_END=$(date +%s)
TOTAL_DURATION=$((TOTAL_END - TOTAL_START))

echo ""
echo -e "${MAGENTA}╔════════════════════════════════════════════════╗${NC}"
echo -e "${MAGENTA}║           TEST SUITE SUMMARY                   ║${NC}"
echo -e "${MAGENTA}╚════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}Test Suite Results:${NC}"
echo "────────────────────────────────────────────────"

if [ $CONNECTIVITY_RESULT -eq 0 ]; then
    echo -e "  1. Connectivity Tests      ${GREEN}✓ PASSED${NC}"
else
    echo -e "  1. Connectivity Tests      ${RED}✗ FAILED${NC}"
fi

if [ $API_RESULT -eq 0 ]; then
    echo -e "  2. API Endpoint Tests      ${GREEN}✓ PASSED${NC}"
else
    echo -e "  2. API Endpoint Tests      ${RED}✗ FAILED${NC}"
fi

echo ""
echo -e "${CYAN}Statistics:${NC}"
echo "────────────────────────────────────────────────"
echo -e "  Total Duration: ${TOTAL_DURATION}s"
echo -e "  Suites Passed:  ${GREEN}${TOTAL_PASSED}${NC}"
echo -e "  Suites Failed:  ${RED}${TOTAL_FAILED}${NC}"
echo ""

# Final verdict
if [ $TOTAL_FAILED -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅  ALL TESTS PASSED SUCCESSFULLY! ✅         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}🚀 Next Steps:${NC}"
    echo "  1. Open http://localhost:5174 (Axodus Dashboard)"
    echo "  2. Open http://localhost:8000/docs (API Documentation)"
    echo "  3. Open http://localhost:18083 (EMQX Dashboard)"
    echo "  4. Check logs: docker compose logs -f"
    echo ""
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌  SOME TESTS FAILED  ❌                     ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}🔍 Troubleshooting:${NC}"
    echo "  1. Check Docker: docker ps"
    echo "  2. Check logs: docker compose logs --tail=50"
    echo "  3. Restart services: docker compose restart"
    echo "  4. Full restart: docker compose down && docker compose up -d"
    echo ""
    exit 1
fi
