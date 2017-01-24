node {
    def project = 'prestige-frontend'
    def imageTag = "ordina/${project}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

    checkout scm

    stage ('Build Image') {
        sh("docker build -t ${imageTag} .")
    }

    stage ('Push image to registry') {
        sh("docker push threece/${project}")
    }
    
    stage ('Deploy Application') {
        // Create namespace if it doesn't exist
        sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
        // Apply the image
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/")
        // Get deployment info
        sh("echo http://`kubectl --namespace=${env.BRANCH_NAME} get service/${project} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
    }
}
