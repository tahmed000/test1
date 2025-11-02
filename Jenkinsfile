pipeline {
  agent any
  environment {
    ALLURE_RESULTS = 'allure-results'
    ALLURE_REPORT = 'allure-report'
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
    stage('Allure Report') {
      steps {
        sh 'npx allure generate $ALLURE_RESULTS --clean -o $ALLURE_REPORT'
        archiveArtifacts artifacts: '$ALLURE_REPORT/**', fingerprint: true
      }
    }
  }
  post {
    always {
      junit '**/allure-results/*.xml'
      mail to: 'your-team@example.com',
           subject: "Playwright Test Results: ${currentBuild.fullDisplayName}",
           body: "Test run complete. View the Allure report at ${env.BUILD_URL}allure/\nSummary: ${currentBuild.currentResult}"
    }
  }
}
