pipeline {
    agent any

    tools {
        nodejs 'node-18'
    }

    environment {
        scannerHome = tool 'SonarQubeScanner'
        // NOTE: keep it 'production' for minimizing app size & to be the most like the production.
        NODE_ENV = 'production'
        TARGET_ENV = 'sit'
        TARGET_ENV_DEFAULT = 'sit'
        HELM_EXPERIMENTAL_OCI = 1
    }

    stages {
        stage('Step 1: Select target ENV') {
            steps {
                script {
                    try {
                        timeout(time: 1, unit: 'MINUTES') {
                            TARGET_ENV = input(
                                id: 'select-target-env',
                                message: 'Please select target ENV',
                                ok: 'Choose',
                                parameters: [
                                    choice(
                                        name: 'ENV',
                                        description: 'Select target env from dropdown list',
                                        choices: ['sit', 'uat', 'production']
                                    )
                                ]
                            )
                            echo "Selected: ${TARGET_ENV}"
                        }
                    } catch (err) {
                        def user = err.getCauses()[0].getUser()
                        if (user.toString() == 'SYSTEM') { // SYSTEM means timeout
                            echo('Input timeout expired, default value will be used: ' + TARGET_ENV_DEFAULT)
                            TARGET_ENV = TARGET_ENV_DEFAULT
                        } else {
                            echo "Input aborted by: [${user}]"
                            error("Pipeline aborted by: [${user}]")
                        }
                    }
                }
            }
        }

        stage('Step 2: Prepare') {
            steps {
                prepare_stage(TARGET_ENV)
            }
        }

        stage('Step 3: Unit test') {
            steps {
                test_stage()
            }
        }

        stage('Step 4: Do skip SonarQube Scanner?') {
            steps {
                script {
                    boolean isSkip = false
                    try {
                        timeout(time: 30, unit: 'SECONDS') {
                            isSkip = input(
                                id: 'skipSonar',
                                message: 'Do skip SonarQube Scanner?',
                                ok: 'Choose',
                                parameters: [
                                    booleanParam(
                                        name: 'skip',
                                        description: 'Check for skipping this step',
                                        defaultValue: false
                                    )
                                ]
                            )
                        }
                    } catch (err) {
                        def user = err.getCauses()[0].getUser()
                        if (user.toString() == 'SYSTEM') { // SYSTEM means timeout
                            echo('Input timeout expired, default value will be used: not skipped')
                        } else {
                            echo "Input aborted by: [${user}]"
                            error("Pipeline aborted by: [${user}]")
                        }
                    }

                    echo "isSkip: ${isSkip}"
                    if (isSkip) {
                        echo 'SonarQube Scanner Skipped'
                    } else {
                        sonarqube_stage()
                    }
                }
            }
        }

        stage('Step 5: Build artifact') {
            steps {
                make_artifact_stage()
            }
        }

        stage('Step 6: Deployment') {
            // agent {
            //     docker {
            //         image 'helm-kubectl-push:0.1.0'
            //     }
            // }
            steps {
                deploy_stage()
            }
        }
    }
}

def prepare_stage(targetEnv) {
    // Setup & Prepare ENV & Build APP
    echo 'Preparing...'

    def props = readJSON file: 'package.json'
    echo "App Version: ${props.version}"

    def gitlabAPI = 'https://a.b.c/api/v4'
    def projectID = 'REPLACE_PROJECT_ID'
    def snippetID = 'REPLACE_SNIPPET_ID'
    def credentialsId = 'REPLACE_CREDENTIALS_ID'
    def envLocate = "${gitlabAPI}/projects/${projectID}/snippets/${snippetID}/files/main/.env.${targetEnv}/raw"
    withCredentials([string(credentialsId: "${credentialsId}", variable: 'TOKEN')]) {
        sh "curl --header 'PRIVATE-TOKEN: ${TOKEN}' ${envLocate} -o .env.local"
    }
    readProperties(file: '.env.local').each { key, value -> env[key] = value }

    env['ENV'] = "${targetEnv}"
    env['TAG'] = "${props.version}"

    echo 'Prepare completed'
}

def test_stage() {
    echo 'Testing...'

    sh 'NODE_ENV=development yarn install'
    sh 'yarn test:ci'

    echo 'Test completed'
}

def sonarqube_stage() {
    echo 'Code scanning...'

    withSonarQubeEnv('sonarqube') {
        sh "echo ${scannerHome}"
        sh "${scannerHome}/bin/sonar-scanner -X"
    }

    echo 'Code scanned'
}

def make_artifact_stage() {
    // Build artifacts
    echo "build...${ENV} with v${TAG}"

    echo "Using NODE_ENV=${NODE_ENV}"
    sh 'yarn add sharp' // NextJS Production Image Optimization Tools
    sh 'yarn build'

    sh 'chmod 777 Dockerfile'
    sh "docker build . -t ${DOCKER_REGISTRY}/${WORKSPACE_NAME}/${APP_NAME}-${ENV}:${TAG}"

    sh "docker login ${DOCKER_REGISTRY} -u ${DOCKER_USER} -p ${DOCKER_PW}"
    sh "docker push ${DOCKER_REGISTRY}/${WORKSPACE_NAME}/${APP_NAME}-${ENV}:${TAG}"

    echo 'Artifacts are ready'
}

def deploy_stage() {
    // k8s deploying with F5
    echo "deploying...${ENV} with v${TAG}"

    sh "helm repo add ${WORKSPACE_NAME} https://${DOCKER_REGISTRY}/chartrepo/${WORKSPACE_NAME} \
        --username ${DOCKER_USER} --password ${DOCKER_PW}"
    sh "helm registry login https://${DOCKER_REGISTRY}/chartrepo/${WORKSPACE_NAME} -u ${DOCKER_USER} -p ${DOCKER_PW}"
    sh 'helm repo update'

    def chartFile = "${HELM_CONFIG_PATH}Chart.yaml"
    sh """
    sed -e 's/^version:.*/version: ${TAG}/' ${chartFile} > ${chartFile}.tmp
    mv ${chartFile}.tmp ${chartFile}
    """

    if ("${ENV}" == 'production' || "${ENV}" == 'pvt') {
        echo 'Production deployment will be skipped.'
        return
    }

    sh "helm package ${HELM_CONFIG_PATH} --app-version ${TAG}"
    sh "helm push ${APP_NAME}-${TAG}.tgz https://${DOCKER_REGISTRY}/chartrepo/${WORKSPACE_NAME} \
        -u ${DOCKER_USER} -p ${DOCKER_PW}"
    sh 'helm repo update'
    sh "helm upgrade --install ${APP_NAME} ${WORKSPACE_NAME}/${APP_NAME} \
        --set config.ENV=${ENV} \
        --set config.VERSIONS=${TAG} \
        --set cisf5.pool=${F5_POOL} \
        --set cisf5.tenant=${F5_TENANT} \
        -n ${NAMESPACE_NAME} \
        --kube-context ${CLUSTER_NAME}"

    echo 'Deployment completed'
}
