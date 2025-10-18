SHELL := /bin/bash

.PHONY: setup dev build start lint typecheck

setup:
	@echo "==> install deps"
	@npm install

dev:
	@npm run dev

build:
	@npm run build

start:
	@npm run start

lint:
	@npm run lint || true

typecheck:
	@npm run typecheck

