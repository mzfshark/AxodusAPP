"""Configuration settings for Axodus MCP Server"""

from pydantic import BaseModel, Field


class Settings(BaseModel):
    """Server configuration settings"""
    
    # Server settings
    host: str = Field(default="0.0.0.0", description="Host to bind the server")
    port: int = Field(default=8000, description="Port to bind the server")
    
    # Logging settings
    log_level: str = Field(default="INFO", description="Logging level")
    
    # Axodus API settings
    axodus_api_url: str = Field(default="http://localhost:8000", description="Axodus API URL")
    axodus_username: str = Field(default="admin", description="Axodus API username")
    axodus_password: str = Field(default="admin", description="Axodus API password")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()