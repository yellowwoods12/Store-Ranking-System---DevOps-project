pipeline{
    agent any{
        stages{
            stage('One'){
                steps{
                    echo 'Stage 1 running...'
                }
            }
            stage('Two'){
                steps{
                    input('Proceed?')
                }
            }
            stage('Three'){
                when{
                    not{
                        branch 'test'
                    }
                }
                steps{
                    echo 'Stage 3 running...'
                }
            }
            stae('Four'){
                parallel{
                    stage('Unit test'){
                        steps{
                            echo 'Unit testing running...'
                        }
                    }
                    stage('Integration test'){
                        steps{
                            echo 'Integration testing running...'
                        }
                    }
                }
            }
        }
    }
}