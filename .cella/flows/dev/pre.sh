#!/bin/sh
# ensure deps are installed before each op
cd /shenhav.fyi && bun install --frozen-lockfile 2>/dev/null || true
