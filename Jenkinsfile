pipeline {
    agent none
    stages {
        stage('Docker build') {
            agent any
            steps {
                sh ' docker build -t taurreswen/emoshop . '
            }
        }
    }
}