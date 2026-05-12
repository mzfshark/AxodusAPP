"""Tools module for Axodus MCP Server"""

from .account import setup_connector
from .gateway import manage_gateway_container, manage_gateway_config
from .gateway_swap import manage_gateway_swaps
from .gateway_clmm import manage_gateway_clmm

# Tool registry for the MCP server
TOOLS = [
    setup_connector,
    manage_gateway_container,
    manage_gateway_config,
    manage_gateway_swaps,
    manage_gateway_clmm,
]

__all__ = [
    "TOOLS",
    "setup_connector",
    "manage_gateway_container",
    "manage_gateway_config",
    "manage_gateway_swaps",
    "manage_gateway_clmm",
]