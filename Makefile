.PHONY: clean docker release build

TOP_DIR ?= ./
RELEASE ?=
PROG ?= beauty-goods-cypress

GIT_VERSION = `git rev-parse --short HEAD`
GIT_BRANCH = `git rev-parse --abbrev-ref HEAD`

REPO ?= registry.cn-shenzhen.aliyuncs.com
RLS_REPO ?= registry.cn-shenzhen.aliyuncs.com/algesthesiahunter
DEV_IMG = ${REPO}/${PROG}:${GIT_BRANCH}
RLS_IMG = ${RLS_REPO}/${PROG}:${RELEASE}


default: release

docker:
	docker build -f Dockerfile --label gitCommit=${GIT_VERSION} --build-arg gitCommit=${GIT_VERSION} -t ${DEV_IMG} ${TOP_DIR}
	docker push ${DEV_IMG}

release:
ifeq ($(RELEASE),)
	@echo "RELEASE not defined!!!"
else
	docker build -f Dockerfile.release --build-arg version=${RELEASE}  -t ${RLS_IMG} ${TOP_DIR}
	docker push ${RLS_IMG}
endif
