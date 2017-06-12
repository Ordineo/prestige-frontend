node('slave') {
    def dockerHubRepo = 'threece'
    def project = 'prestige-frontend'
    def imageTag = "${dockerHubRepo}/${project}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

    checkout scm

    stage ('Build Image') {
        def image = docker.build("${imageTag}")
    }

    stage ('Push image to registry') {
        image.push("${imageTag}")
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
