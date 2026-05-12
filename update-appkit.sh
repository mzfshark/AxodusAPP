#!/bin/bash
# Update AppKit to latest compatible versions

echo "🔄 Updating AppKit and dependencies..."

# Kill any running dev servers
pkill -9 node
sleep 2

# Clean cache
echo "🧹 Cleaning cache..."
rm -rf node_modules/.vite

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start dev server
echo "🚀 Starting dev server..."
npm run dev
