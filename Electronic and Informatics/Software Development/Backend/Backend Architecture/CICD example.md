# Penjelasan

CI/CD masih belum fully automated karena ada campur tangan dari developer ketika ada update fitur (`start run pipeline` dan `pull image results dari server`)

## Langkah-langkah

### 1. Membuat jenkins pipeline untuk build image

  ```groovy
  /* Cmp_sbsd shared library */
  library(
    identifier: 'cmp_sbsd-jenkins-shared-library@master',
    retriever: modernSCM([
      $class: 'GitSCMSource',
      remote: 'http://m2mdev.my_cmp.com:30081/cmp_sbsd/jenkins/cmp_sbsd-jenkins-shared-library',
      credentialsId: 'git-m2mdev-cicd'
    ])
  )

  import groovy.transform.Field

  /* Field */
  @Field
  def _gitBranch = 'master'
  @Field
  def _dockerTag = 'staging-dev'

  pipeline {

    agent none

    environment {

      /* Agent docker registry */
      AGENT_REGISTRY_URL = 'https://index.docker.io/v2/'
      AGENT_REGISTRY_CREDENTIALS = 'dockerregistry-docker-cmp_sbsd'

      /* Git environment */
      GIT_CREDENTIALS = 'git-m2mdev-cicd'
      MAIN_GIT_URL = 'http://m2mdev.my_cmp.com:30081/cmp_sbsd-demo/smartvault-mockup'

      /* Docker environment */
      DCKER_REGISTRY_URL = 'https://hub.my_cmp.com'
      DCKER_CREDENTIALS = 'dockerregistry-my_cmp-m2mdev'
      DCKER_REGISTRY = 'hub.my_cmp.com'
      DCKER_IMAGE = 'smartvault/smartvault-mockup'
    }

    stages {
        stage('Input') {
          agent none
          steps {
              script {
                  try {
                      timeout(time: 90, unit: 'SECONDS') {
                          _gitBranch = input(
                              id: 'input',
                              message: 'Insert input:',
                              ok: 'OK',
                              parameters: [
                                  string(name: 'gitBranch', defaultValue: _gitBranch, description: 'Git Branch'),
                              ]
                          )
                      }
                  } catch (err) {
                      echo "Input timeout or failed. Using default branch: ${_gitBranch}"
                      // Tidak menghentikan eksekusi
                  }
                  
                  echo "Use ${_gitBranch}"
              }
          }
      }


      stage('Source') {
        agent { label 'built-in' }
        steps {
          dir('build') {
            git branch: _gitBranch, credentialsId: GIT_CREDENTIALS, url: MAIN_GIT_URL
          }
        }
      }

      stage('Install Dependencies') {
        agent {
          docker {
            image 'node:20.9.0'
            registryUrl "${AGENT_REGISTRY_URL}"
            registryCredentialsId "${AGENT_REGISTRY_CREDENTIALS}"
          }
        }
        steps {
          dir('build') {
              sh 'npm install --legacy-peer-deps'
          }
        }
      }

      stage('Build') {
        agent {
          docker {
            image 'node:20.9.0'
            registryUrl "${AGENT_REGISTRY_URL}"
            registryCredentialsId "${AGENT_REGISTRY_CREDENTIALS}"
          }
        }
        steps {
          dir('build') {
            sh "CI='false' npm run-script build"
          }
        }
      }

      stage('Dockerize') {
        agent { label 'built-in' }
        steps {
          dir('build') {
            dockerize([
              registryUrl: DCKER_REGISTRY_URL,
              credentialsId: DCKER_CREDENTIALS,
              registry: DCKER_REGISTRY,
              image: DCKER_IMAGE,
              tag: _dockerTag
            ])
          }
        }
      }
    }
  }
  ```

#### Analisa

- Code tersebut akan mengambil dari repo

    ```groovy
    @Field
    def _gitBranch = 'master'

    MAIN_GIT_URL = 'http://m2mdev.my_cmp.com:30081/cmp_sbsd-demo/smartvault-mockup'
    ```

- Membuat hasil build image ke registry

  ``` groovy  
  @Field
  def _dockerTag = 'staging-dev'

  DCKER_REGISTRY = 'hub.my_cmp.com'
  DCKER_IMAGE = 'smartvault/smartvault-mockup'
  ```

### 2. Membuat docker compose pada server

  ```yml
  version: '3.8'
  services:
    smartvault:
      image: hub.my_cmp.com/smartvault/smartvault-mockup:staging-dev
      container_name: smartvault
      ports:
        - "48080:80"
      restart: always
      environment:
        - SERVER_URL=https://bsi-service.cmp_sbsd.net
        - SCHEMA_ID=BSI
        - SERVER_TOKEN=55cf1f472d41759c6340180e9bae2723
      networks:
        - ims_network

  networks:
    ims_network:
      external: true
  ```

#### Analisa 2

Mengambil image dari hasil build pipeline jenkins

>hub.my_cmp.com/smartvault/smartvault-mockup:staging-dev
