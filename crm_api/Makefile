.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: install
install:
	npm instal

.PHONY: reset
reset:
	docker volume rm $$(docker volume ls -q) && docker rmi $$(docker images -q) 

.PHONY: dev
dev:
	npm run start:dev

.PHONY: init
init: up install dev
