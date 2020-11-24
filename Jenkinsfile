pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Build stage running...'
      }
    }

    stage('Integration Test') {
      parallel {
        stage('Integration Test') {
          steps {
            input 'Proceed?'
            echo 'Integration test running...'
          }
        }

        stage('Unit Testing ') {
          steps {
            echo 'Unit Test Running...'
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        echo 'Deployment stage running...'
      }
    }

    stage('Finish stage') {
      steps {
        echo 'Build finished successfully.'
      }
    }

  }
}