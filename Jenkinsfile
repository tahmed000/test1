pipeline {
  agent any
  tools { nodejs 'NodeJS 25.1.0' }
  environment {
    ALLURE_RESULTS = 'allure-results'
    ALLURE_REPORT = 'allure-report'
    HISTORY_DIR = 'allure-history'
  }
  stages {
    stage('Install') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install --with-deps'
      }
    }
    stage('Test') { steps { bat 'npx playwright test' } }
    stage('Restore History') {
      steps { bat 'if exist %HISTORY_DIR% xcopy /E /I /Y %HISTORY_DIR% %ALLURE_RESULTS%/history' }
    }
    stage('Allure Report') {
      steps {
        bat 'npx allure generate %ALLURE_RESULTS% --clean -o %ALLURE_REPORT%'
        bat 'if exist %ALLURE_REPORT%/history xcopy /E /I /Y %ALLURE_REPORT%/history %HISTORY_DIR%'
        archiveArtifacts artifacts: '%ALLURE_REPORT%/**', fingerprint: true
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