pipeline{
    agent any
    
    stages{
        stage('build'){
            environment { 
                MONGO_URL = 'mongodb://localhost/nasa'
            }
            steps{
                echo 'Building...'
                echo 'Installing npm packages'
                sh 'npm install'
                echo 'running client'
                sh 'npm run build --prefix client'
                echo 'build step is done'
            }
        }
        stage('test'){
            steps{
                echo 'testing...'
                sh 'npm run test'
                echo 'test step is done'
            }
        }
    }
}