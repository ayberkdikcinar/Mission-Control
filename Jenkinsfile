pipeline{
    agent any
    tools {
        nodejs "nodejs"
    }  
    environment { 
        MONGO_URL = "${env.MONGO_URL}"
    }
    stages{
        stage('install'){
            steps{
                echo 'Installing npm packages...'
                sh 'npm install'
                echo 'install step is done'
            }
        }
        stage('build'){ 
            steps{
                echo 'Building...'
                sh 'npm audit fix --force'
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
