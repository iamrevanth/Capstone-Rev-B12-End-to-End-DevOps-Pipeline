pipeline {
    agent any

    environment {
        // SSH Connecitvity Variables
        CONST_EC2_IP_ADDRESS = "3.108.185.177"
        CONST_EC2_USER       = "ubuntu"
        
        // AWS & Infra Credentials
        CONST_AWS_CONFIGURE_REGION_ID = "ap-south-1"
        CONST_AWS_CONFIGURE_OUTPUT_FORMAT = "json"
        CONST_AWS_ECR_REPOSITORY_NAME = "jl-vb-im-travel-memory-repository"
        CONST_AWS_ECR_FRONTEND_TAG = "frontend"
        CONST_AWS_ECR_FRONTEND_PORT = 3000
        CONST_AWS_ECR_BACKEND_ONE_TAG = "crud-service"
        CONST_AWS_ECR_BACKEND_ONE_PORT = 3001
        CONST_AWS_ECR_BACKEND_TWO_TAG = "hello-service"
        CONST_AWS_ECR_BACKEND_TWO_PORT = 3002
        CONST_TF_EKS_S3_BUCKET_NAME = "jl-vb-im-capstone-bucket"
        CONST_TF_EKS_CLUSTER_NAME = "jl-vb-im-travel-memory-eks-cluster"
        CONST_TF_EKS_NODE_GROUP_NAME = "jl-vb-im-frontend-backend-nodes"
        CONST_TF_EKS_NODE_TYPE = "t3.medium"
        CONST_TF_EKS_NODE_COUNT = 2
        CONST_TF_EKS_VPC_ID = "vpc-0056d809452f9f8ea"
        // CONST_TF_EKS_CLUSTER_ROLE_ARN = "arn:aws:iam::975050024946:role/jl-vb-im-capstone-project-eks-cluster-role"
        // CONST_TF_EKS_CLUSTER_ROLE_NAME = "jl-vb-im-capstone-project-eks-cluster-role"
        CONST_TF_EKS_CLUSTER_ROLE_NAME = "jl_vb_im_capstone_project_eks_cluster_role"
        CONST_TF_EKS_SUBNET1 = "172.31.112.0/20"
        CONST_TF_EKS_SUBNET2 = "172.31.128.0/20"

        // GITHUB
        CONST_GITHUB_CLONE_URL = "https://github.com/JOYSTON-LEWIS/B10_Group_4_Capstone_Project.git"
        CONST_GITHUB_FRONTEND_BRANCH = "Frontend"
        CONST_GITHUB_FRONTEND_FOLDER = "frontend"
        CONST_GITHUB_FRONTEND_DIRECTORY = "Project-Frontend"
        CONST_GITHUB_BACKEND_BRANCH = "Backend"
        CONST_GITHUB_BACKEND_FOLDER = "backend"
        CONST_GITHUB_BACKEND_DIRECTORY = "Project-Backend"
        CONST_GITHUB_BACKEND_SERVICE_ONE_FOLDER = "crud-service"
        CONST_GITHUB_BACKEND_SERVICE_TWO_FOLDER = "hello-service"

        // SECRETS
        SECRETS_MONGO_BASE_URI = credentials('SECRETS_MONGO_BASE_URI')
        SECRETS_MONGO_COLLECTION_ONE = credentials('SECRETS_MONGO_COLLECTION_ONE')
        SECRETS_GRAFANA_SECURITY_ADMIN_USER = credentials('SECRETS_GRAFANA_SECURITY_ADMIN_USER')
        SECRETS_GRAFANA_SECURITY_ADMIN_PASSWORD = credentials('SECRETS_GRAFANA_SECURITY_ADMIN_PASSWORD')
        SECRETS_GITHUB_PAT_TOKEN = credentials('SECRETS_GITHUB_PAT_TOKEN')

        // PROMETHEUS AND GRAFANA
        CONST_NODE_EXPORTER_PORT = 9100
        CONST_PROMETHEUS_PORT = 9090
        CONST_GRAFANA_PORT = 9095

        // ANSIBLE  -- DEPLOYMENT SECTION
        // CONST_ANS_EKS_CLUSTER_NODE_ARN = "arn:aws:iam::975050024946:role/jl-vb-im-capstone-project-eks-node-role"
        CONST_ANS_SSH_IP = "3.108.185.177"
        CONST_ANS_SSH_USER = "ubuntu"
        CONST_ANS_EKS_CLUSTER_NODE_NAME = "jl_vb_im_capstone_project_eks_node_role"
        // CONST_ANS_SSH_PRIVATE_KEY = credentials('SECRETS_EC2_SSH_PRIVATE_KEY')
        CONST_ANS_INSTALL_DOCKER = "true"
        CONST_ANS_INSTALL_KUBECTL = "true"
        CONST_ANS_INSTALL_AWSCLI = "true"
        CONST_ANS_ADDITIONAL_PACKAGES = "git,python3-pip"

        // Kubernetes EKS -- DEPLOYMENT SECTION
        CONST_ANS_KUBE_FRONTEND_NAMESPACE = "tmfrontend"
        CONST_ANS_KUBE_BACKEND_SERVICE_ONE_NAMESPACE = "tmbackend01"
        CONST_ANS_KUBE_BACKEND_SERVICE_TWO_NAMESPACE = "tmbackend02"
        CONST_ANS_KUBECTL_CONFIG_PATH = "/home/ubuntu/.kube/config"

        CONST_ANS_REPLICAS_FRONTEND = "2"
        CONST_ANS_REPLICAS_BACKEND_ONE = "2"
        CONST_ANS_REPLICAS_BACKEND_TWO = "2"

        CONST_ANS_SERVICE_TYPE_FRONTEND = "ClusterIP"
        CONST_ANS_SERVICE_TYPE_BACKEND = "ClusterIP"

        CONST_ANS_CONTAINER_PORT_FRONTEND = 3000
        CONST_ANS_CONTAINER_PORT_BACKEND_ONE = 3001
        CONST_ANS_CONTAINER_PORT_BACKEND_TWO = 3002
        CONST_ANS_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL = "tmcapstonebackend.joydevlabs.com"
        CONST_ANS_FRONTEND_DEPLOYMENT_URL = "tmcapstonefrontend.joydevlabs.com"
        CONST_ANS_FRONTEND_WORK_DIRECTORY = "ansible-frontend-services-deployment"

        // SNS SECTION
        CONST_AWS_SNS_TOPIC_NAME = "jl_vb_im_capstone"
        CONST_AWS_SNS_ENVIRONMENT = "prod"


    }

    stages {


         stage('Build: Common Step 1: Install All Tools on EC2') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
                    accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
                    secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
                ]]) {
                    sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                        script {
                            def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                            def SCRIPT_SSH_USER = env.CONST_EC2_USER
                            def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                            def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY
                            def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                            def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT

                            sh """
                            ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << EOF
echo "✅ Connected to EC2 Success"
echo "✅ Step Install All Tools on EC2 Start"

# Create temporary folder for downloads
mkdir -p ~/install_temp
cd ~/install_temp

# Update system and install packages
sudo apt-get update -y
sudo apt-get upgrade -y

# Installing htop
if ! command -v htop &> /dev/null; then
    sudo apt-get install -y --install-recommends htop
else
    echo "✅ package: htop already installed, skipping..."
fi

# Installing tree
if ! command -v tree &> /dev/null; then
    sudo apt-get install -y --install-recommends tree
else
    echo "✅ package: tree already installed, skipping..."
fi

# Installing net-tools
if ! command -v ifconfig &> /dev/null; then
    sudo apt-get install -y --install-recommends net-tools
else
    echo "✅ package: net-tools already installed, skipping..."
fi

# Installing curl
if ! command -v curl &> /dev/null; then
    sudo apt-get install -y --install-recommends curl
else
    echo "✅ package: curl already installed, skipping..."
fi

# Installing git
if ! command -v git &> /dev/null; then
    sudo apt-get install -y --install-recommends git
else
    echo "✅ package: git already installed, skipping..."
fi

# Installing software-properties-common
if ! dpkg -s software-properties-common &> /dev/null; then
    sudo apt-get install -y --install-recommends software-properties-common
else
    echo "✅ package: software-properties-common already installed, skipping..."
fi

# Installing unzip
if ! command -v unzip &> /dev/null; then
    sudo apt-get install -y --install-recommends unzip
else
    echo "✅ package: unzip already installed, skipping..."
fi

# Installing jq
if ! command -v jq &> /dev/null; then
    sudo apt-get install -y --install-recommends jq
else
    echo "✅ package: jq already installed, skipping..."
fi

# Install Python Section
if ! command -v python3 &> /dev/null; then
    sudo apt-get install -y --install-recommends python3
else
    echo "✅ package: Python3 already installed, skipping..."
fi
# Python package manager
if ! command -v pip3 &> /dev/null; then
    sudo apt-get install -y --install-recommends python3-pip
else
    echo "✅ package: pip3 already installed, skipping..."
fi
# Install boto3 for AWS automation
if ! pip3 show boto3 >/dev/null 2>&1 || ! pip3 show boto3 | grep -q "Version: 1.40.10"; then
    python3 -m pip install --upgrade boto3==1.40.10 --break-system-packages
else
    echo "✅ package: boto3 already installed, skipping..."
fi
# Install Kubernetes Python client
if ! pip3 show kubernetes >/dev/null 2>&1 || ! pip3 show kubernetes | grep -q "Version: 26.1.0"; then
    python3 -m pip install --upgrade kubernetes==26.1.0 --break-system-packages
else
    echo "✅ package: Kubernetes Python client already installed, skipping..."
fi
# Install requests library for HTTP/API calls
if ! pip3 show requests >/dev/null 2>&1 || ! pip3 show requests | grep -q "Version: 2.31.0"; then
    python3 -m pip install --upgrade requests==2.31.0 --break-system-packages
else
    echo "✅ package: requests library already installed, skipping..."
fi
# Install pandas for data processing
if ! pip3 show pandas >/dev/null 2>&1 || ! pip3 show pandas | grep -q "Version: 2.1.1"; then
    python3 -m pip install --upgrade pandas==2.1.1 --break-system-packages
else
    echo "✅ package: pandas already installed, skipping..."
fi


# Install Go Section
if [ ! -x "/usr/local/go/bin/go" ]; then
    wget https://go.dev/dl/go1.21.2.linux-amd64.tar.gz
    sudo rm -rf /usr/local/go
    sudo tar -C /usr/local -xzf go1.21.2.linux-amd64.tar.gz
    # Add to PATH for future interactive sessions
    grep -qxF 'export PATH=\$PATH:/usr/local/go/bin' ~/.bashrc || echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
    # Export PATH immediately for current shell/session
    export PATH=\$PATH:/usr/local/go/bin
    echo "✅ Go installed and PATH updated"
else
    # Ensure PATH is set even if Go already exists
    export PATH=\$PATH:/usr/local/go/bin
    echo "✅ package: Go already installed, skipping..."
fi


# Install Docker Section
if ! command -v docker &> /dev/null; then
    sudo apt-get install -y --install-recommends docker.io
    # Add ubuntu to docker group
    sudo usermod -aG docker ubuntu
else
    echo "✅ package: Docker already installed, skipping..."
fi

# Installing Docker Compose
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.1/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "✅ package: Docker Compose already installed, skipping..."
fi

# Install Kubernetes Section
if ! command -v kubectl &> /dev/null; then
    # Fix kernel file protection
    sudo sysctl fs.protected_regular=0
    # Install kubectl
    curl -LO "https://dl.k8s.io/release/v1.33.1/bin/linux/amd64/kubectl"
    chmod +x kubectl && sudo mv kubectl /usr/local/bin/
else
    echo "✅ package: Kubernetes(kubectl) already installed, skipping..."
fi

# Install Helm
if ! command -v helm &> /dev/null; then
    curl -Lo helm_install.tar.gz "https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz"
    tar -xvzf helm_install.tar.gz
    sudo mv linux-amd64/helm /usr/local/bin/helm
else
    echo "✅ package: Helm already installed, skipping..."
fi

# Install AWS CLI Section
if ! command -v aws &> /dev/null; then
    rm -rf aws awscliv2.zip
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.15.0.zip" -o "awscliv2.zip"
    unzip -o awscliv2.zip
    sudo ./aws/install
    # Configure AWS CLI
    aws configure set aws_access_key_id "${SCRIPT_ACCESS_KEY}"
    aws configure set aws_secret_access_key "${SCRIPT_SECRET_KEY}"
    aws configure set region "${SCRIPT_REGION}"
    aws configure set output "${SCRIPT_OUTPUT}"
else
    echo "✅ package: AWS CLI already installed, skipping..."
fi

# Install Terraform Section
if ! command -v terraform &> /dev/null; then
    curl -fsSL "https://releases.hashicorp.com/terraform/1.9.5/terraform_1.9.5_linux_amd64.zip" -o terraform.zip
    unzip -o terraform.zip
    sudo mv terraform /usr/local/bin/
else
    echo "✅ package: Terraform already installed, skipping..."
fi

# Install EKS Section
if ! command -v eksctl &> /dev/null; then
    curl -Lo eksctl_install.tar.gz "https://github.com/weaveworks/eksctl/releases/download/v0.150.0/eksctl_Linux_amd64.tar.gz"
    tar -xvzf eksctl_install.tar.gz
    sudo mv eksctl /usr/local/bin/eksctl
else
    echo "✅ package: eksctl already installed, skipping..."
fi

# Install Ansible Section
if ! command -v ansible &> /dev/null; then
    echo "📦 Installing Ansible..."
    sudo apt update -y
    sudo add-apt-repository --yes --update ppa:ansible/ansible
    sudo apt install -y ansible
    echo "✅ Ansible installed successfully"
else
    echo "✅ package: Ansible already installed, skipping..."
fi

### # Slack notifications
### pip3 install slack-sdk --break-system-packages
### # Teams notifications (Microsoft Graph API)
### pip3 install msal requests --break-system-packages

# Cleanup all downloaded archives and extracted temp folders
cd ~
rm -rf ~/install_temp
sudo apt-get clean
sudo rm -rf ~/.cache

echo "✅ Packages Installed and Updated Sucessfully"
echo "✅ Step Install All Tools on EC2 End"

EOF
                        """
                        }
                    }
                }
            }
        }

        stage('Build: Common Step 2: Check Ports & Cleanup') {
            steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      sh """
                      ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} 'bash -s' << 'EOF'

echo "✅ Connected to EC2 Success"
echo "✅ Step Check Ports & Cleanup Start"

ports=(3000 3001 3002)

for port in "\${ports[@]}"; do
    container_id=\$(docker ps --filter "publish=\$port" --format "{{.ID}}")
    if [ -n "\$container_id" ]; then
        container_name=\$(docker ps --filter "publish=\$port" --format "{{.Names}}")
        echo "Docker container running: '\$container_name' (ID: \$container_id)"
        docker stop "\$container_id" || true
    else
        echo "No Docker container found on port \$port"
    fi

    pid=\$(sudo lsof -t -i :\$port)
    if [ -n "\$pid" ]; then
        echo "Normal process running on port \$port: PID \$pid"
        kill -9 \$pid || true
    else
        echo "No normal process found on port \$port"
    fi

done

echo "✅ Ports Cleanup Completed Successfully"
echo "✅ Step Check Ports & Cleanup End"

EOF
                      """
                    }
                }
            }
        }


stage('Build: Frontend Step 1: Dockerize Frontend and Push to ECR') {
    steps {
        sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
            script {
                def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                def SCRIPT_SSH_USER = env.CONST_EC2_USER
                def SCRIPT_GIT_URL = env.CONST_GITHUB_CLONE_URL
                def SCRIPT_PARTIAL_REPO = sh(
                    script: """
                         echo "${SCRIPT_GIT_URL}" | sed -e 's|https://github.com/||' -e 's|\\.git\$||'
                    """,
                    returnStdout: true
                ).trim()
                def SCRIPT_PUBLIC_PRIVATE_CHECK = sh(
                    script: "curl -s -o /dev/null -w \"%{http_code}\" https://api.github.com/repos/${SCRIPT_PARTIAL_REPO}",
                    returnStdout: true
                ).trim()
                def SCRIPT_PAT_TOKEN = env.SECRETS_GITHUB_PAT_TOKEN
                def SCRIPT_DIR = env.CONST_GITHUB_FRONTEND_DIRECTORY
                def SCRIPT_BRANCH = env.CONST_GITHUB_FRONTEND_BRANCH
                def SCRIPT_FOLDER_DIR = env.CONST_GITHUB_FRONTEND_FOLDER
                def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                def SCRIPT_TAG = env.CONST_AWS_ECR_FRONTEND_TAG
                def SCRIPT_PORT = env.CONST_AWS_ECR_FRONTEND_PORT
                sh """
                ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'

echo "✅ Connected to EC2 Success"
echo "✅ Step Dockerize Frontend and Push to ECR Start"

# Ensure aws and docker commands are in PATH
export PATH=$PATH:/usr/local/bin

# Clean existing directories
rm -rf ${SCRIPT_DIR} \$(basename ${SCRIPT_GIT_URL} .git)
mkdir -p ${SCRIPT_DIR}

# Clone repo and checkout branch
if [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "200" ]; then
    echo "✅ Public repository"
    git clone "${SCRIPT_GIT_URL}"
elif [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "404" ]; then
    echo "🔒 Private repository"
    git clone "https://${SCRIPT_PAT_TOKEN}@github.com/${SCRIPT_PARTIAL_REPO}.git"
fi
cd \$(basename ${SCRIPT_GIT_URL} .git)
git fetch origin ${SCRIPT_BRANCH}
git checkout -b ${SCRIPT_BRANCH} origin/${SCRIPT_BRANCH}

# Move repo content to target directory
mv * ../${SCRIPT_DIR} || true
cd ../
rm -rf \$(basename ${SCRIPT_GIT_URL} .git)

# Move into the target directory
cd ${SCRIPT_DIR}
cd ${SCRIPT_FOLDER_DIR}

# Create Dockerfile
rm -f Dockerfile
cat <<DOCKERFILE > Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SCRIPT_PORT}
CMD ["npm", "start"]
DOCKERFILE

# AWS ECR login
ACCOUNT_ID=\$(aws sts get-caller-identity --query Account --output text)
IMAGE_URI=\${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_REPO_NAME}:${SCRIPT_TAG}

aws ecr describe-repositories --repository-names ${SCRIPT_REPO_NAME} || \
aws ecr create-repository --repository-name ${SCRIPT_REPO_NAME}

aws ecr get-login-password --region ${SCRIPT_REGION} | docker login --username AWS --password-stdin \${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com

# Build and push Docker image
docker build -t \${IMAGE_URI} .
docker push \${IMAGE_URI}

echo "✅ Frontend Docker image Pushed to ECR Successfully: \${IMAGE_URI}"
echo "✅ Step Dockerize Frontend and Push to ECR End"

EOF
                """
            }
        }
    }
}


stage('Build: Backend Step 1.1: Dockerize Backend Service One and Push to ECR') {
    steps {
        sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
            script {
                def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                def SCRIPT_SSH_USER = env.CONST_EC2_USER
                def SCRIPT_GIT_URL = env.CONST_GITHUB_CLONE_URL
                def SCRIPT_PARTIAL_REPO = sh(
                    script: """
                         echo "${SCRIPT_GIT_URL}" | sed -e 's|https://github.com/||' -e 's|\\.git\$||'
                    """,
                    returnStdout: true
                ).trim()
                def SCRIPT_PUBLIC_PRIVATE_CHECK = sh(
                    script: "curl -s -o /dev/null -w \"%{http_code}\" https://api.github.com/repos/${SCRIPT_PARTIAL_REPO}",
                    returnStdout: true
                ).trim()
                def SCRIPT_PAT_TOKEN = env.SECRETS_GITHUB_PAT_TOKEN
                def SCRIPT_DIR = env.CONST_GITHUB_BACKEND_DIRECTORY
                def SCRIPT_BRANCH = env.CONST_GITHUB_BACKEND_BRANCH
                def SCRIPT_FOLDER_DIR = env.CONST_GITHUB_BACKEND_FOLDER
                def SCRIPT_MS_PATH = env.CONST_GITHUB_BACKEND_SERVICE_ONE_FOLDER
                def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                def SCRIPT_TAG = env.CONST_AWS_ECR_BACKEND_ONE_TAG
                def SCRIPT_PORT = env.CONST_AWS_ECR_BACKEND_ONE_PORT
                sh """
                ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'

echo "✅ Connected to EC2 Success"
echo "✅ Step Dockerize Backend Service One and Push to ECR Start"

# Ensure aws and docker commands are in PATH
export PATH=$PATH:/usr/local/bin

# Clean existing directories
rm -rf ${SCRIPT_DIR} \$(basename ${SCRIPT_GIT_URL} .git)
mkdir -p ${SCRIPT_DIR}

# Clone repo and checkout branch
if [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "200" ]; then
    echo "✅ Public repository"
    git clone "${SCRIPT_GIT_URL}"
elif [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "404" ]; then
    echo "🔒 Private repository"
    git clone "https://${SCRIPT_PAT_TOKEN}@github.com/${SCRIPT_PARTIAL_REPO}.git"
fi
cd \$(basename ${SCRIPT_GIT_URL} .git)
git fetch origin ${SCRIPT_BRANCH}
git checkout -b ${SCRIPT_BRANCH} origin/${SCRIPT_BRANCH}

# Move repo content to target directory
mv * ../${SCRIPT_DIR} || true
cd ../
rm -rf \$(basename ${SCRIPT_GIT_URL} .git)

# Move into the target directory
cd ${SCRIPT_DIR}
cd ${SCRIPT_FOLDER_DIR}
cd ${SCRIPT_MS_PATH}

# Create Dockerfile
rm -f Dockerfile
cat <<DOCKERFILE > Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SCRIPT_PORT}
CMD ["node", "index.js"]
DOCKERFILE

# AWS ECR login
ACCOUNT_ID=\$(aws sts get-caller-identity --query Account --output text)
IMAGE_URI=\${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_REPO_NAME}:${SCRIPT_TAG}

aws ecr describe-repositories --repository-names ${SCRIPT_REPO_NAME} || \
aws ecr create-repository --repository-name ${SCRIPT_REPO_NAME}

aws ecr get-login-password --region ${SCRIPT_REGION} | docker login --username AWS --password-stdin \${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com

# Build and push Docker image
docker build -t \${IMAGE_URI} .
docker push \${IMAGE_URI}

echo "✅ First Backend Docker Pushed to ECR Successfully: \${IMAGE_URI}"
echo "✅ Step Dockerize Backend Service One and Push to ECR End"

EOF
                """
            }
        }
    }
}


stage('Build: Backend Step 1.2: Dockerize Dockerize Backend Service Two and Push to ECR') {
    steps {
        sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
            script {
                def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                def SCRIPT_SSH_USER = env.CONST_EC2_USER
                def SCRIPT_GIT_URL = env.CONST_GITHUB_CLONE_URL
                def SCRIPT_PARTIAL_REPO = sh(
                    script: """
                         echo "${SCRIPT_GIT_URL}" | sed -e 's|https://github.com/||' -e 's|\\.git\$||'
                    """,
                    returnStdout: true
                ).trim()
                def SCRIPT_PUBLIC_PRIVATE_CHECK = sh(
                    script: "curl -s -o /dev/null -w \"%{http_code}\" https://api.github.com/repos/${SCRIPT_PARTIAL_REPO}",
                    returnStdout: true
                ).trim()
                def SCRIPT_PAT_TOKEN = env.SECRETS_GITHUB_PAT_TOKEN
                def SCRIPT_DIR = env.CONST_GITHUB_BACKEND_DIRECTORY
                def SCRIPT_BRANCH = env.CONST_GITHUB_BACKEND_BRANCH
                def SCRIPT_FOLDER_DIR = env.CONST_GITHUB_BACKEND_FOLDER
                def SCRIPT_MS_PATH = env.CONST_GITHUB_BACKEND_SERVICE_TWO_FOLDER
                def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                def SCRIPT_TAG = env.CONST_AWS_ECR_BACKEND_TWO_TAG
                def SCRIPT_PORT = env.CONST_AWS_ECR_BACKEND_TWO_PORT
                sh """
                ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
echo "✅ Connected to EC2 Success"
echo "✅ Step Dockerize Backend Service Two and Push to ECR Start"

# Ensure aws and docker commands are in PATH
export PATH=$PATH:/usr/local/bin

# Clean existing directories
rm -rf ${SCRIPT_DIR} \$(basename ${SCRIPT_GIT_URL} .git)
mkdir -p ${SCRIPT_DIR}

# Clone repo and checkout branch
if [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "200" ]; then
    echo "✅ Public repository"
    git clone "${SCRIPT_GIT_URL}"
elif [ "${SCRIPT_PUBLIC_PRIVATE_CHECK}" = "404" ]; then
    echo "🔒 Private repository"
    git clone "https://${SCRIPT_PAT_TOKEN}@github.com/${SCRIPT_PARTIAL_REPO}.git"
fi
cd \$(basename ${SCRIPT_GIT_URL} .git)
git fetch origin ${SCRIPT_BRANCH}
git checkout -b ${SCRIPT_BRANCH} origin/${SCRIPT_BRANCH}

# Move repo content to target directory
mv * ../${SCRIPT_DIR} || true
cd ../
rm -rf \$(basename ${SCRIPT_GIT_URL} .git)

# Move into the target directory
cd ${SCRIPT_DIR}
cd ${SCRIPT_FOLDER_DIR}
cd ${SCRIPT_MS_PATH}

# Create Dockerfile
rm -f Dockerfile
cat <<DOCKERFILE > Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SCRIPT_PORT}
CMD ["node", "index.js"]
DOCKERFILE

# AWS ECR login
ACCOUNT_ID=\$(aws sts get-caller-identity --query Account --output text)
IMAGE_URI=\${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_REPO_NAME}:${SCRIPT_TAG}

aws ecr describe-repositories --repository-names ${SCRIPT_REPO_NAME} || \
aws ecr create-repository --repository-name ${SCRIPT_REPO_NAME}

aws ecr get-login-password --region ${SCRIPT_REGION} | docker login --username AWS --password-stdin \${ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com

# Build and push Docker image
docker build -t \${IMAGE_URI} .
docker push \${IMAGE_URI}

echo "✅ Second Backend Docker Pushed to ECR Successfully: \${IMAGE_URI}"
echo "✅ Step Dockerize Backend Service Two and Push to ECR End"

EOF
                """
            }
        }
    }
}


stage('Build: Common Step 3: EKS Cluster Creation') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
            accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
            secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
        ]]) {
            sshagent(['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                script {
                    def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                    def SCRIPT_SSH_USER = env.CONST_EC2_USER
                    def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                    def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY
                    def SCRIPT_S3_BUCKET = env.CONST_TF_EKS_S3_BUCKET_NAME
                    def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                    def SCRIPT_VPC_ID = env.CONST_TF_EKS_VPC_ID
                    def SCRIPT_SUBNET1 = env.CONST_TF_EKS_SUBNET1
                    def SCRIPT_SUBNET2 = env.CONST_TF_EKS_SUBNET2
                    def SCRIPT_CLUSTER_ROLE_NAME = env.CONST_TF_EKS_CLUSTER_ROLE_NAME
                    def SCRIPT_NODE_ROLE_NAME = env.CONST_ANS_EKS_CLUSTER_NODE_NAME
                    def SCRIPT_CLUSTER_NAME = env.CONST_TF_EKS_CLUSTER_NAME
                    def SCRIPT_NODE_GROUP_NAME = env.CONST_TF_EKS_NODE_GROUP_NAME
                    def SCRIPT_NODE_COUNT = env.CONST_TF_EKS_NODE_COUNT
                    def SCRIPT_NODE_TYPE = env.CONST_TF_EKS_NODE_TYPE
                    sh """
ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} 'bash -s' <<'ENDSSH'
set -euo pipefail
echo "✅ Connected to EC2 Success"
echo "✅ Step EKS Cluster Creation Start"

cd ~
mkdir -p terraform-eks-configurations
cd terraform-eks-configurations

# --- Create main.tf using provided subnets ---
cat > main.tf << 'EOT'
terraform {
  backend "s3" {
    bucket = "${SCRIPT_S3_BUCKET}"
    key    = "eks/terraform.tfstate"
    region = "${SCRIPT_REGION}"
  }
}

provider "aws" {
  region     = "${SCRIPT_REGION}"
  access_key = "${SCRIPT_ACCESS_KEY}"
  secret_key = "${SCRIPT_SECRET_KEY}"
}

data "aws_vpc" "selected" { id = "${SCRIPT_VPC_ID}" }

data "aws_availability_zones" "available" {}

resource "aws_subnet" "eks_subnet" {
  count             = 2
  vpc_id            = data.aws_vpc.selected.id
  cidr_block        = element(["${SCRIPT_SUBNET1}", "${SCRIPT_SUBNET2}"], count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  tags = { Name = "eks-subnet-\${count.index}" }
}

# -------------------
# Terraform-managed Cluster IAM Role
# -------------------
resource "aws_iam_role" "eks_cluster_role" {
  name = "${SCRIPT_CLUSTER_ROLE_NAME}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

# Attach required AWS managed policies to Cluster Role
resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_role_policy_attachment" "eks_service_policy" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
}

# Optional but recommended for managing VPC resources like ENIs
resource "aws_iam_role_policy_attachment" "eks_vpc_resource_controller" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
}

# -------------------
# Terraform-managed Node IAM Role
# -------------------
resource "aws_iam_role" "eks_node_role" {
  name = "${SCRIPT_NODE_ROLE_NAME}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "eks_ecr_ro_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# -------------------
# EKS Cluster + Nodegroup
# -------------------
resource "aws_eks_cluster" "eks_cluster" {
  name     = "${SCRIPT_CLUSTER_NAME}"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = aws_subnet.eks_subnet[*].id
  }

  depends_on = [
    aws_subnet.eks_subnet,
    aws_iam_role.eks_cluster_role
  ]
}

resource "aws_eks_node_group" "eks_nodes" {
  cluster_name    = aws_eks_cluster.eks_cluster.name
  node_group_name = "${SCRIPT_NODE_GROUP_NAME}"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = aws_subnet.eks_subnet[*].id

  scaling_config {
    desired_size = ${SCRIPT_NODE_COUNT}
    max_size     = ${SCRIPT_NODE_COUNT}
    min_size     = 1
  }

  instance_types = ["${SCRIPT_NODE_TYPE}"]

  lifecycle {
    create_before_destroy = true
  }
}
EOT

# --- Run Terraform ---
terraform init -reconfigure
terraform apply -auto-approve

echo "✅ EKS Cluster + Nodegroup created successfully"

# Update kubeconfig
aws eks update-kubeconfig \
  --region ${SCRIPT_REGION} \
  --name ${SCRIPT_CLUSTER_NAME}

# Wait for nodes to be Ready
echo "⏳ Waiting for EKS nodes to be Ready..."
kubectl wait --for=condition=Ready node --all --timeout=10m

# Show nodes and services
kubectl get nodes
kubectl get svc

# Install metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
echo "⏳ Waiting for metrics-server to be Ready..."
kubectl wait --for=condition=Available deployment metrics-server -n kube-system --timeout=5m

# Delete existing service and recreate to fix manual deletion
kubectl delete svc -n ingress-nginx ingress-nginx-controller --ignore-not-found

# Create namespace for ingress
kubectl create namespace ingress-nginx || echo "Namespace ingress-nginx already exists"

# Deploy NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0/deploy/static/provider/aws/deploy.yaml

# Wait until NGINX ingress pods are Running
echo "⏳ Waiting for NGINX ingress pods to be Running..."
kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=controller -n ingress-nginx --timeout=10m

cat > /home/ubuntu/terraform-eks-configurations/hpa.yaml <<'EOF'
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ingress-nginx-hpa
  namespace: ingress-nginx
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ingress-nginx-controller
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
EOF

echo "✅ hpa.yaml for ingress Created Successfully"

# Apply the HPA immediately
kubectl apply -f /home/ubuntu/terraform-eks-configurations/hpa.yaml

echo "🚀 HPA applied successfully for ingress-nginx-controller"

echo "✅ EKS Cluster Creation Done Sucessfully"
echo "✅ Step EKS Cluster Creation End"

ENDSSH
                    """
                }
            }
        }
    }
}

stage('Build: Backend Step 2.1: Ansible configurations for Backend') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
            accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
            secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
        ]]) {
            sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                script {
                    def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                    def SCRIPT_SSH_USER = env.CONST_EC2_USER
                    def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                    def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY
                    def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                    def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER

                    def SCRIPT_AWS_ACCOUNT_ID = sh(
                        script: """
                            ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                            'aws sts get-caller-identity --query Account --output text'
                        """,
                        returnStdout: true
                    ).trim()
                    def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                    def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT
                    
                    def SCRIPT_INSTALL_DOCKER = env.CONST_ANS_INSTALL_DOCKER
                    def SCRIPT_INSTALL_KUBECTL = env.CONST_ANS_INSTALL_KUBECTL
                    def SCRIPT_INSTALL_AWSCLI = env.CONST_ANS_INSTALL_AWSCLI
                    def SCRIPT_ADDITIONAL_PACKAGES = env.CONST_ANS_ADDITIONAL_PACKAGES
                    def SCRIPT_KUBECTL_CONFIG_PATH = env.CONST_ANS_KUBECTL_CONFIG_PATH

                    def SCRIPT_EKS_CLUSTER_NAME = env.CONST_TF_EKS_CLUSTER_NAME
                    def SCRIPT_ECR_REPOSITORY_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                    def SCRIPT_CONTAINER_PORT_BACKEND_ONE = env.CONST_ANS_CONTAINER_PORT_BACKEND_ONE
                    def SCRIPT_ECR_BACKEND_ONE_TAG = env.CONST_AWS_ECR_BACKEND_ONE_TAG
                    def SCRIPT_KUBE_BACKEND_SERVICE_ONE_NAMESPACE = env.CONST_ANS_KUBE_BACKEND_SERVICE_ONE_NAMESPACE
                    def SCRIPT_REPLICAS_BACKEND_ONE = env.CONST_ANS_REPLICAS_BACKEND_ONE
                    def SCRIPT_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL = env.CONST_ANS_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL
                    def SCRIPT_MONGO_BASE_URI = env.SECRETS_MONGO_BASE_URI
                    def SCRIPT_MONGO_COLLECTION_ONE = env.SECRETS_MONGO_COLLECTION_ONE
                    def SCRIPT_CONTAINER_PORT_BACKEND_TWO = env.CONST_ANS_CONTAINER_PORT_BACKEND_TWO
                    def SCRIPT_ECR_BACKEND_TWO_TAG = env.CONST_AWS_ECR_BACKEND_TWO_TAG
                    def SCRIPT_KUBE_BACKEND_SERVICE_TWO_NAMESPACE = env.CONST_ANS_KUBE_BACKEND_SERVICE_TWO_NAMESPACE
                    def SCRIPT_REPLICAS_BACKEND_TWO = env.CONST_ANS_REPLICAS_BACKEND_TWO

                    sh """
                    ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<REMOTE
set -e

echo "✅ Connected to EC2 Success"
echo "✅ Step Ansible configurations for Backend Start"

cd ~
mkdir -p ansible-backend-services-deployment
cd ansible-backend-services-deployment

# ---------------- Ansible project structure ----------------
mkdir -p ansible
mkdir -p ansible/roles
mkdir -p ansible/roles/backend
mkdir -p ansible/roles/backend/tasks
mkdir -p ansible/inventory
mkdir -p ansible/group_vars
# mkdir -p ansible/roles/backend/templates
# mkdir -p ansible/roles/backend/files
# mkdir -p ansible/roles/backend/files/chart

# ---------------- ansible.cfg ----------------
cat > ansible.cfg <<CFG
[defaults]
inventory = ./ansible/inventory/hosts.ini
remote_user = ${SCRIPT_DEPLOY_SSH_USER}
host_key_checking = False
retry_files_enabled = False
CFG

# ---------------- inventory ----------------
cat > ansible/inventory/hosts.ini <<INV
[backend_nodes]
${SCRIPT_DEPLOY_SSH_IP} ansible_user=${SCRIPT_DEPLOY_SSH_USER}
INV

# ---------------- site.yml ----------------
cat > ansible/site.yml <<PLAY
---
- hosts: backend_nodes
  become: yes
  vars:
    install_docker: ${SCRIPT_INSTALL_DOCKER}
    install_kubectl: ${SCRIPT_INSTALL_KUBECTL}
    install_awscli: ${SCRIPT_INSTALL_AWSCLI}
    additional_packages: [${SCRIPT_ADDITIONAL_PACKAGES}]
    kubeconfig_path: ${SCRIPT_KUBECTL_CONFIG_PATH}

    backend_services:
      - name: crud
        port: ${SCRIPT_CONTAINER_PORT_BACKEND_ONE}
        image: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}:${SCRIPT_ECR_BACKEND_ONE_TAG}
        namespace: ${SCRIPT_KUBE_BACKEND_SERVICE_ONE_NAMESPACE}
        replicas: ${SCRIPT_REPLICAS_BACKEND_ONE}
        url: ${SCRIPT_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL}
        paths: ["/hello","/trip"]
        env:
          - name: PORT
            value: "${SCRIPT_CONTAINER_PORT_BACKEND_ONE}"
          - name: MONGO_URI
            value: "${SCRIPT_MONGO_BASE_URI}/${SCRIPT_MONGO_COLLECTION_ONE}"

      - name: hello
        port: ${SCRIPT_CONTAINER_PORT_BACKEND_TWO}
        image: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}:${SCRIPT_ECR_BACKEND_TWO_TAG}
        namespace: ${SCRIPT_KUBE_BACKEND_SERVICE_TWO_NAMESPACE}
        replicas: ${SCRIPT_REPLICAS_BACKEND_TWO}
        url: ${SCRIPT_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL}  
        paths: ["/hellos"]
        env:
          - name: PORT
            value: "${SCRIPT_CONTAINER_PORT_BACKEND_TWO}"

  roles:
    - backend
PLAY

# ---------------- backend/tasks/main.yml ----------------
cat > ansible/roles/backend/tasks/main.yml <<'EOF'
---
# Ensure required packages
- name: Ensure required packages are installed
  apt:
    name: "{{ item }}"
    state: present
    update_cache: yes
  loop: "{{ additional_packages }}"

# Install Docker if needed
- name: Install Docker
  apt:
    name: docker.io
    state: present
  when: install_docker | bool

# Install kubectl
- name: Ensure kubectl is installed
  get_url:
    url: https://dl.k8s.io/release/v1.33.1/bin/linux/amd64/kubectl
    dest: /usr/local/bin/kubectl
    mode: '0775'
  when: install_kubectl | bool

# Install AWS CLI
- name: Ensure AWS CLI installed
  shell: |
    if ! command -v aws &> /dev/null; then
      rm -rf /tmp/aws /tmp/awscliv2.zip
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.15.0.zip" -o "/tmp/awscliv2.zip"
      apt-get update && apt-get install -y unzip
      unzip -o /tmp/awscliv2.zip -d /tmp
      /tmp/aws/install --update
    fi
  args:
    executable: /bin/bash
  when: install_awscli | bool
  environment:
    PATH: "/usr/local/bin:/usr/local/aws-cli/v2/current/bin:/usr/bin:/bin"

# Ensure AWS CLI config directory exists
- name: Ensure AWS CLI config directory exists
  file:
    path: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws"
    state: directory
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0700'

# Configure AWS CLI credentials
- name: Configure AWS CLI credentials
  copy:
    dest: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws/credentials"
    content: |
      [default]
      aws_access_key_id = ${SCRIPT_ACCESS_KEY}
      aws_secret_access_key = ${SCRIPT_SECRET_KEY}
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

- name: Configure AWS CLI config
  copy:
    dest: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws/config"
    content: |
      [default]
      region = ${SCRIPT_REGION}
      output = ${SCRIPT_OUTPUT}
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

# Update kubeconfig for EKS cluster for the user
- name: Update kubeconfig for EKS cluster
  become: yes
  become_user: ${SCRIPT_DEPLOY_SSH_USER}
  shell: |
    aws eks update-kubeconfig \
      --region ${SCRIPT_REGION} \
      --name ${SCRIPT_EKS_CLUSTER_NAME} \
      --kubeconfig {{ kubeconfig_path }}
  args:
    executable: /bin/bash
  environment:
    PATH: "/usr/local/bin:/usr/local/aws-cli/v2/current/bin:/usr/bin:/bin"

# Fix kubeconfig ownership so the user can access it

- name: Fix kubeconfig ownership
  file:
    path: "{{ kubeconfig_path }}"
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

### Ensure namespaces exist
###- name: Ensure namespaces exist
###  shell: |
###    kubectl create namespace {{ item.namespace }} --dry-run=client -o yaml \
###    | kubectl apply -f - --kubeconfig {{ kubeconfig_path }}
###  loop: "{{ backend_services }}"
###  loop_control:
###    loop_var: item
###  environment:
###    PATH: "/usr/local/bin:/usr/bin:/bin"
###  become: yes
###  become_user: ubuntu

EOF

REMOTE

echo "✅ Ansible configurations for Backend Done Sucessfully"
echo "✅ Step Ansible configurations for Backend End"
                    """
                }
            }
        }
    }
}


stage('Build: Backend Step 2.2: Create PEM on EC2 for Backend') {
    steps {
        withCredentials([
            sshUserPrivateKey(
                credentialsId: 'SECRETS_EC2_SSH_PRIVATE_KEY',
                keyFileVariable: 'SECRETS_EC2_KEY_FILE',
                usernameVariable: 'SECRETS_EC2_USER'
            )
        ]) {
            script {
                def SCRIPT_SSH_IP      = env.CONST_EC2_IP_ADDRESS
                def SCRIPT_SSH_USER    = env.CONST_EC2_USER
                def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER
                def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                
                sh """

                echo "✅ Connected to EC2 Success"
                echo "✅ Step Create PEM on EC2 for Backend Start"

                # Push PEM file from Jenkins -> EC2
                cat "$SECRETS_EC2_KEY_FILE" | ssh \\
                    -o StrictHostKeyChecking=no \\
                    -i "$SECRETS_EC2_KEY_FILE" \\
                    ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \\
                    'mkdir -p ~/ansible-backend-services-deployment && \\
                     cat > ~/ansible-backend-services-deployment/ssh_private_key.pem && \\
                     chmod 600 ~/ansible-backend-services-deployment/ssh_private_key.pem && \\
                     ls -l ~/ansible-backend-services-deployment/ssh_private_key.pem'

                     # Run ansible-playbook ON the EC2
                ssh -o StrictHostKeyChecking=no -i "$SECRETS_EC2_KEY_FILE" ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<'REMOTE'
set -e
cd ~/ansible-backend-services-deployment

# Ensure ansible is installed
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "🔧 Installing Ansible..."
  sudo apt-get update -y
  sudo apt-get install -y ansible
fi

ansible-playbook \\
  -i ansible/inventory/hosts.ini \\
  ansible/site.yml \\
  --private-key ssh_private_key.pem
REMOTE

echo "✅ Create PEM on EC2 for Backend Done Sucessfully"
echo "✅ Step Create PEM on EC2 for Backend End"
                """
            }
        }
    }
}


stage('Build: Backend Step 3: Backend Deployment with Helm') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
            accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
            secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
        ]]) {
            sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                script {
                    def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                    def SCRIPT_SSH_USER = env.CONST_EC2_USER
                    def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER
                    def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                    def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                    def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT
                    def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                    def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY

                    // fetch AWS account ID via remote EC2
                    def SCRIPT_AWS_ACCOUNT_ID = sh(
                        script: """
                            ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                            'aws sts get-caller-identity --query Account --output text'
                        """,
                        returnStdout: true
                    ).trim()

                    def SCRIPT_ECR_REPOSITORY_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                    def SCRIPT_ECR_BACKEND_ONE_TAG = env.CONST_AWS_ECR_BACKEND_ONE_TAG
                    def SCRIPT_MONGO_BASE_URI = env.SECRETS_MONGO_BASE_URI
                    def SCRIPT_MONGO_COLLECTION_ONE = env.SECRETS_MONGO_COLLECTION_ONE
                    def SCRIPT_SERVICE_TYPE_BACKEND = env.CONST_ANS_SERVICE_TYPE_BACKEND
                    def SCRIPT_ECR_BACKEND_TWO_TAG = env.CONST_AWS_ECR_BACKEND_TWO_TAG


                        sh """
                        ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<REMOTE
set -e

echo "✅ Connected to EC2 Success"
echo "✅ Step Backend Deployment with Helm Start"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment

mkdir -p helm-charts
cd helm-charts
mkdir -p backend-service
cd backend-service
touch Chart.yaml values.yaml
mkdir -p templates
cd templates
touch deployment.yaml service.yaml hpa.yaml ingress.yaml

echo "✅ Folder Directories Created Successfully"
echo "helm-charts/
└── backend-service/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        ├── ingress.yaml
        └── hpa.yaml"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment
cat > helm-charts/backend-service/templates/deployment.yaml <<'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Values.backendOne.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.backendOne.name }}
spec:
  replicas: {{ .Values.backendOne.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Values.backendOne.name }}
  template:
    metadata:
      labels:
        app: {{ .Values.backendOne.name }}
    spec:
      containers:
      - name: {{ .Values.backendOne.name }}
        image: "{{ .Values.backendOne.image.repository }}:{{ .Values.backendOne.image.tag }}"
        ports:
        - containerPort: {{ .Values.backendOne.containerPort }}
        env:
        - name: PORT
          value: "{{ .Values.backendOne.env.PORT }}"
        - name: MONGO_URI
          value: "{{ .Values.backendOne.env.MONGO_URI }}"
        livenessProbe:
          httpGet:
            path: /hello
            port: {{ .Values.backendOne.containerPort }}
          initialDelaySeconds: 10
          periodSeconds: 15
        readinessProbe:
          httpGet:
            path: /hello
            port: {{ .Values.backendOne.containerPort }}
          initialDelaySeconds: 5
          periodSeconds: 10

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Values.backendTwo.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.backendTwo.name }}
spec:
  replicas: {{ .Values.backendTwo.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Values.backendTwo.name }}
  template:
    metadata:
      labels:
        app: {{ .Values.backendTwo.name }}
    spec:
      containers:
      - name: {{ .Values.backendTwo.name }}
        image: "{{ .Values.backendTwo.image.repository }}:{{ .Values.backendTwo.image.tag }}"
        ports:
        - containerPort: {{ .Values.backendTwo.containerPort }}
        env:
        - name: PORT
          value: "{{ .Values.backendTwo.env.PORT }}"
        - name: MONGO_URI
          value: "{{ .Values.backendTwo.env.MONGO_URI }}"
        livenessProbe:
          httpGet:
            path: /hellos
            port: {{ .Values.backendTwo.containerPort }}
          initialDelaySeconds: 10
          periodSeconds: 15
        readinessProbe:
          httpGet:
            path: /hellos
            port: {{ .Values.backendTwo.containerPort }}
          initialDelaySeconds: 5
          periodSeconds: 10
EOF

echo "✅ deployment.yaml Created Successfully"


cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment
cat > helm-charts/backend-service/templates/service.yaml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.backendOne.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.backendOne.name }}
spec:
  type: {{ .Values.backendOne.service.type }}
  selector:
    app: {{ .Values.backendOne.name }}
  ports:
    - port: {{ .Values.backendOne.service.port }}
      targetPort: {{ .Values.backendOne.containerPort }}
      protocol: TCP

---
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.backendTwo.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.backendTwo.name }}
spec:
  type: {{ .Values.backendTwo.service.type }}
  selector:
    app: {{ .Values.backendTwo.name }}
  ports:
    - port: {{ .Values.backendTwo.service.port }}
      targetPort: {{ .Values.backendTwo.containerPort }}
      protocol: TCP
EOF

echo "✅ service.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment
cat > helm-charts/backend-service/templates/hpa.yaml <<'EOF'
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ .Values.backendOne.name }}-hpa
  namespace: {{ .Values.namespace }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ .Values.backendOne.name }}
  minReplicas: {{ .Values.backendOne.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.backendOne.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.backendOne.autoscaling.targetCPUUtilizationPercentage }}

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ .Values.backendTwo.name }}-hpa
  namespace: {{ .Values.namespace }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ .Values.backendTwo.name }}
  minReplicas: {{ .Values.backendTwo.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.backendTwo.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.backendTwo.autoscaling.targetCPUUtilizationPercentage }}
EOF

echo "✅ hpa.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment
cat > helm-charts/backend-service/templates/ingress.yaml <<'EOF'
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: backend-ingress
  namespace: {{ .Values.namespace }}
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - http:
      paths:
      {{- range .Values.backendOne.ingress.paths }}
      - path: {{ . }}
        pathType: Prefix
        backend:
          service:
            name: {{ \$.Values.backendOne.name }}
            port:
              number: {{ \$.Values.backendOne.service.port }}
      {{- end }}
      {{- range .Values.backendTwo.ingress.paths }}
      - path: {{ . }}
        pathType: Prefix
        backend:
          service:
            name: {{ \$.Values.backendTwo.name }}
            port:
              number: {{ \$.Values.backendTwo.service.port }}
      {{- end }}
EOF


echo "✅ ingress.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ansible-backend-services-deployment 
cd ansible-backend-services-deployment
cat > helm-charts/backend-service/values.yaml <<EOF
# Namespace for backend services
namespace: tmbackend

# Backend Service One - CRUD Service
backendOne:
  name: backend-service-one
  replicaCount: 2
  image:
    repository: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}
    tag: ${SCRIPT_ECR_BACKEND_ONE_TAG}
  containerPort: 3001
  env:
    PORT: "3001"
    MONGO_URI: "${SCRIPT_MONGO_BASE_URI}/${SCRIPT_MONGO_COLLECTION_ONE}"
  service:
    type: ${SCRIPT_SERVICE_TYPE_BACKEND}
    port: 3001
  autoscaling:
    minReplicas: 1
    maxReplicas: 3
    targetCPUUtilizationPercentage: 70
  ingress:
    paths:
      - /hello
      - /trip

# Backend Service Two - Hello Service
backendTwo:
  name: backend-service-two
  replicaCount: 2
  image:
    repository: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}
    tag: ${SCRIPT_ECR_BACKEND_TWO_TAG}
  containerPort: 3002
  env:
    PORT: "3002"
    MONGO_URI: ""
  service:
    type: ${SCRIPT_SERVICE_TYPE_BACKEND}
    port: 3002
  autoscaling:
    minReplicas: 1
    maxReplicas: 3
    targetCPUUtilizationPercentage: 70
  ingress:
    paths:
      - /hellos
EOF

echo "✅ values.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}/ansible-backend-services-deployment/helm-charts/backend-service
cat > Chart.yaml <<'EOF'
apiVersion: v2
name: backend-service
description: Helm chart for deploying backend services
type: application
version: 0.1.0
appVersion: "1.0.0"
EOF

echo "✅ Chart.yaml Created Successfully"

# Go to helm chart directory
cd /home/${SCRIPT_SSH_USER}/ansible-backend-services-deployment/helm-charts/backend-service

# Delete existing service and recreate to fix manual deletion
kubectl delete svc -n tmbackend backend-service-one backend-service-two --ignore-not-found

# Upgrade if release exists, otherwise install
helm upgrade --install backend-service . \
  --namespace tmbackend \
  --create-namespace \
  --values values.yaml

echo "✅ Helm Backend Deployment Deployed Successfully"
REMOTE

echo "✅ Backend Deployment with Helm Done Sucessfully"
echo "✅ Step Backend Deployment with Helm End"
                    """
                }
            }
        }
    }
}

stage('Build: Frontend Step 2.1: Ansible configurations for Frontend') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
            accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
            secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
        ]]) {
            sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                script {
                    def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                    def SCRIPT_SSH_USER = env.CONST_EC2_USER
                    def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER
                    def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                    def SCRIPT_AWS_ACCOUNT_ID = sh(
                        script: """
                            ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                            'aws sts get-caller-identity --query Account --output text'
                        """,
                        returnStdout: true
                    ).trim()
                    def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                    def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT
                    def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                    def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY

                    def SCRIPT_FRONTEND_WORK_DIRECTORY = env.CONST_ANS_FRONTEND_WORK_DIRECTORY
                    def SCRIPT_INSTALL_DOCKER = env.CONST_ANS_INSTALL_DOCKER
                    def SCRIPT_INSTALL_KUBECTL = env.CONST_ANS_INSTALL_KUBECTL
                    def SCRIPT_INSTALL_AWSCLI = env.CONST_ANS_INSTALL_AWSCLI
                    def SCRIPT_ADDITIONAL_PACKAGES = env.CONST_ANS_ADDITIONAL_PACKAGES
                    def SCRIPT_KUBECTL_CONFIG_PATH = env.CONST_ANS_KUBECTL_CONFIG_PATH
                    def SCRIPT_EKS_CLUSTER_NAME = env.CONST_TF_EKS_CLUSTER_NAME
                    def SCRIPT_ECR_REPOSITORY_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                    def SCRIPT_CONTAINER_PORT_FRONTEND = env.CONST_ANS_CONTAINER_PORT_FRONTEND
                    def SCRIPT_ECR_FRONTEND_TAG = env.CONST_AWS_ECR_FRONTEND_TAG
                    def SCRIPT_KUBE_FRONTEND_NAMESPACE = env.CONST_ANS_KUBE_FRONTEND_NAMESPACE
                    def SCRIPT_REPLICAS_FRONTEND = env.CONST_ANS_REPLICAS_FRONTEND
                    def SCRIPT_FRONTEND_DEPLOYMENT_URL = env.CONST_ANS_FRONTEND_DEPLOYMENT_URL

                    sh """
                    ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<REMOTE
set -e

echo "✅ Connected to EC2 Success"
echo "✅ Step Ansible configurations for Frontend Start"

cd ~
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}

# ---------------- Ansible project structure ----------------
mkdir -p ansible
mkdir -p ansible/roles
mkdir -p ansible/roles/frontend
mkdir -p ansible/roles/frontend/tasks
mkdir -p ansible/inventory
mkdir -p ansible/group_vars
# mkdir -p ansible/roles/frontend/templates
# mkdir -p ansible/roles/frontend/files
# mkdir -p ansible/roles/frontend/files/chart

# ---------------- ansible.cfg ----------------
cat > ansible.cfg <<CFG
[defaults]
inventory = ./ansible/inventory/hosts.ini
remote_user = ${SCRIPT_DEPLOY_SSH_USER}
host_key_checking = False
retry_files_enabled = False
CFG

# ---------------- inventory ----------------
cat > ansible/inventory/hosts.ini <<INV
[frontend_nodes]
${SCRIPT_DEPLOY_SSH_IP} ansible_user=${SCRIPT_DEPLOY_SSH_USER}
INV

# ---------------- site.yml ----------------
cat > ansible/site.yml <<PLAY
---
- hosts: frontend_nodes
  become: yes
  vars:
    install_docker: ${SCRIPT_INSTALL_DOCKER}
    install_kubectl: ${SCRIPT_INSTALL_KUBECTL}
    install_awscli: ${SCRIPT_INSTALL_AWSCLI}
    additional_packages: [${SCRIPT_ADDITIONAL_PACKAGES}]
    kubeconfig_path: ${SCRIPT_KUBECTL_CONFIG_PATH}

    frontend_services:
      - name: frontend
        port: ${SCRIPT_CONTAINER_PORT_FRONTEND}
        image: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}:${SCRIPT_ECR_FRONTEND_TAG}
        namespace: ${SCRIPT_KUBE_FRONTEND_NAMESPACE}
        replicas: ${SCRIPT_REPLICAS_FRONTEND}
        url: ${SCRIPT_FRONTEND_DEPLOYMENT_URL}
        env:
          - name: PORT
            value: "${SCRIPT_CONTAINER_PORT_FRONTEND}"

  roles:
    - frontend
PLAY

# ---------------- frontend/tasks/main.yml ----------------
cat > ansible/roles/frontend/tasks/main.yml <<'EOF'
---
# Ensure required packages
- name: Ensure required packages are installed
  apt:
    name: "{{ item }}"
    state: present
    update_cache: yes
  loop: "{{ additional_packages }}"

# Install Docker if needed
- name: Install Docker
  apt:
    name: docker.io
    state: present
  when: install_docker | bool

# Install kubectl
- name: Ensure kubectl is installed
  get_url:
    url: https://dl.k8s.io/release/v1.33.1/bin/linux/amd64/kubectl
    dest: /usr/local/bin/kubectl
    mode: '0775'
  when: install_kubectl | bool

# Install AWS CLI
- name: Ensure AWS CLI installed
  shell: |
    if ! command -v aws &> /dev/null; then
      rm -rf /tmp/aws /tmp/awscliv2.zip
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.15.0.zip" -o "/tmp/awscliv2.zip"
      apt-get update && apt-get install -y unzip
      unzip -o /tmp/awscliv2.zip -d /tmp
      /tmp/aws/install --update
    fi
  args:
    executable: /bin/bash
  when: install_awscli | bool
  environment:
    PATH: "/usr/local/bin:/usr/local/aws-cli/v2/current/bin:/usr/bin:/bin"

# Ensure AWS CLI config directory exists
- name: Ensure AWS CLI config directory exists
  file:
    path: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws"
    state: directory
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0700'

# Configure AWS CLI credentials
- name: Configure AWS CLI credentials
  copy:
    dest: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws/credentials"
    content: |
      [default]
      aws_access_key_id = ${SCRIPT_ACCESS_KEY}
      aws_secret_access_key = ${SCRIPT_SECRET_KEY}
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

- name: Configure AWS CLI config
  copy:
    dest: "/home/${SCRIPT_DEPLOY_SSH_USER}/.aws/config"
    content: |
      [default]
      region = ${SCRIPT_REGION}
      output = ${SCRIPT_OUTPUT}
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

# Update kubeconfig for EKS cluster for the user
- name: Update kubeconfig for EKS cluster
  become: yes
  become_user: ${SCRIPT_DEPLOY_SSH_USER}
  shell: |
    aws eks update-kubeconfig \
      --region ${SCRIPT_REGION} \
      --name ${SCRIPT_EKS_CLUSTER_NAME} \
      --kubeconfig {{ kubeconfig_path }}
  args:
    executable: /bin/bash
  environment:
    PATH: "/usr/local/bin:/usr/local/aws-cli/v2/current/bin:/usr/bin:/bin"

# Fix kubeconfig ownership so the user can access it

- name: Fix kubeconfig ownership
  file:
    path: "{{ kubeconfig_path }}"
    owner: ${SCRIPT_DEPLOY_SSH_USER}
    group: ${SCRIPT_DEPLOY_SSH_USER}
    mode: '0600'

# Ensure namespaces exist
#- name: Ensure namespaces exist
#  shell: |
#    kubectl create namespace {{ item.namespace }} --dry-run=client -o yaml \
#    | kubectl apply -f - --kubeconfig {{ kubeconfig_path }}
#  loop: "{{ frontend_services }}"
#  loop_control:
#    loop_var: item
#  environment:
#    PATH: "/usr/local/bin:/usr/bin:/bin"
#  become: yes
#  become_user: ubuntu

EOF

REMOTE

echo "✅ Ansible configurations for Frontend Done Sucessfully"
echo "✅ Step Ansible configurations for Frontend End"
                    """
                }
            }
        }
    }
}

stage('Build: Frontend Step 2.2: Create PEM on EC2 for Frontend') {
    steps {
        withCredentials([
            sshUserPrivateKey(
                credentialsId: 'SECRETS_EC2_SSH_PRIVATE_KEY',
                keyFileVariable: 'SECRETS_EC2_KEY_FILE',
                usernameVariable: 'SECRETS_EC2_USER'
            )
        ]) {
            script {
                def SCRIPT_SSH_IP      = env.CONST_EC2_IP_ADDRESS
                def SCRIPT_SSH_USER    = env.CONST_EC2_USER
                def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER
                def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                def SCRIPT_FRONTEND_WORK_DIRECTORY = env.CONST_ANS_FRONTEND_WORK_DIRECTORY
                
                sh """

                echo "✅ Connected to EC2 Success"
                echo "✅ Step Create PEM on EC2 for Frontend Start"

                # Push PEM file from Jenkins -> EC2
                cat "$SECRETS_EC2_KEY_FILE" | ssh \\
                    -o StrictHostKeyChecking=no \\
                    -i "$SECRETS_EC2_KEY_FILE" \\
                    ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \\
                    'mkdir -p ~/${SCRIPT_FRONTEND_WORK_DIRECTORY} && \\
                     cat > ~/${SCRIPT_FRONTEND_WORK_DIRECTORY}/ssh_private_key.pem && \\
                     chmod 600 ~/${SCRIPT_FRONTEND_WORK_DIRECTORY}/ssh_private_key.pem && \\
                     ls -l ~/${SCRIPT_FRONTEND_WORK_DIRECTORY}/ssh_private_key.pem'

                     # Run ansible-playbook ON the EC2
                ssh -o StrictHostKeyChecking=no -i "$SECRETS_EC2_KEY_FILE" ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<'REMOTE'
set -e
cd ~/${SCRIPT_FRONTEND_WORK_DIRECTORY}

# Ensure ansible is installed
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "🔧 Installing Ansible..."
  sudo apt-get update -y
  sudo apt-get install -y ansible
fi

ansible-playbook \\
  -i ansible/inventory/hosts.ini \\
  ansible/site.yml \\
  --private-key ssh_private_key.pem
REMOTE

echo "✅ Create PEM on EC2 for Frontend Done Sucessfully"
echo "✅ Step Create PEM on EC2 for Frontend End"
                """
            }
        }
    }
}

stage('Build: Frontend Step 3: Frontend Deployment with Helm') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
            accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
            secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
        ]]) {
            sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                script {
                    def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                    def SCRIPT_SSH_USER = env.CONST_EC2_USER
                    def SCRIPT_DEPLOY_SSH_USER = env.CONST_ANS_SSH_USER
                    def SCRIPT_DEPLOY_SSH_IP = env.CONST_ANS_SSH_IP
                    def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                    def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT
                    def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                    def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY
                    def SCRIPT_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL = env.CONST_ANS_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL

                    // fetch AWS account ID via remote EC2
                    def SCRIPT_AWS_ACCOUNT_ID = sh(
                        script: """
                            ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                            'aws sts get-caller-identity --query Account --output text'
                        """,
                        returnStdout: true
                    ).trim()

                    // 🔑 Get ingress host dynamically
                    timeout(time: 10, unit: 'MINUTES') {
                        waitUntil {
                            SCRIPT_INGRESS_HOST = sh(
                                script: """
                                    ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                                    "kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'"
                                """,
                                returnStdout: true
                            ).trim()
                            return SCRIPT_INGRESS_HOST != null && SCRIPT_INGRESS_HOST != ""
                        }
                    }

                    // 🔑 Decide final backend URL
                    def SCRIPT_BACKEND_URL = SCRIPT_INGRESS_HOST ? "https://${SCRIPT_INGRESS_HOST}" : "https://${SCRIPT_BACKEND_DEPLOYMENT_SERVICE_SINGLE_BACKEND_URL}"

                    def SCRIPT_SERVICE_TYPE_FRONTEND = env.CONST_ANS_SERVICE_TYPE_FRONTEND
                    def SCRIPT_FRONTEND_WORK_DIRECTORY = env.CONST_ANS_FRONTEND_WORK_DIRECTORY
                    def SCRIPT_REPLICAS_FRONTEND = env.CONST_ANS_REPLICAS_FRONTEND
                    def SCRIPT_ECR_REPOSITORY_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                    def SCRIPT_ECR_FRONTEND_TAG = env.CONST_AWS_ECR_FRONTEND_TAG
                    def SCRIPT_CONTAINER_PORT_FRONTEND = env.CONST_ANS_CONTAINER_PORT_FRONTEND
                        sh """
                        ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<REMOTE
set -e

echo "✅ Connected to EC2 Success"
echo "✅ Step Frontend Deployment with Helm Start"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}

mkdir -p helm-charts
cd helm-charts
mkdir -p frontend-service
cd frontend-service
touch Chart.yaml values.yaml
mkdir -p templates
cd templates
touch deployment.yaml service.yaml hpa.yaml

echo "✅ Folder Directories Created Successfully"
echo "helm-charts/
└── backend-service/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        └── hpa.yaml"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/templates/deployment.yaml <<'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Values.frontend.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.frontend.name }}
spec:
  replicas: {{ .Values.frontend.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Values.frontend.name }}
  template:
    metadata:
      labels:
        app: {{ .Values.frontend.name }}
    spec:
      containers:
      - name: {{ .Values.frontend.name }}
        image: "{{ .Values.frontend.image.repository }}:{{ .Values.frontend.image.tag }}"
        ports:
        - containerPort: {{ .Values.frontend.containerPort }}
        env:
        - name: PORT
          value: "{{ .Values.frontend.env.PORT }}"
        - name: REACT_APP_CRUD_URL
          value: "{{ .Values.frontend.env.REACT_APP_CRUD_URL }}"
        - name: REACT_APP_HELLO_URL
          value: "{{ .Values.frontend.env.REACT_APP_HELLO_URL }}"
EOF

echo "✅ deployment.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/templates/service.yaml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.frontend.name }}
  namespace: {{ .Values.namespace }}
  labels:
    app: {{ .Values.frontend.name }}
spec:
  type: {{ .Values.frontend.service.type }}
  selector:
    app: {{ .Values.frontend.name }}
  ports:
    - port: {{ .Values.frontend.service.port }}
      targetPort: {{ .Values.frontend.containerPort }}
      protocol: TCP
EOF

echo "✅ service.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/templates/hpa.yaml <<'EOF'
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ .Values.frontend.name }}-hpa
  namespace: {{ .Values.namespace }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ .Values.frontend.name }}
  minReplicas: {{ .Values.frontend.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.frontend.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.frontend.autoscaling.targetCPUUtilizationPercentage }}
EOF

echo "✅ hpa.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/templates/ingress.yaml <<'EOF'
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: {{ .Values.namespace }}
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - http:
      paths:
      {{- range .Values.frontend.ingress.paths }}
      - path: {{ . }}
        pathType: Prefix
        backend:
          service:
            name: {{ \$.Values.frontend.name }}
            port:
              number: {{ \$.Values.frontend.service.port }}
      {{- end }}
EOF


echo "✅ ingress.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/values.yaml <<EOF
namespace: tmfrontend
frontend:
  name: frontend-service
  replicaCount: ${SCRIPT_REPLICAS_FRONTEND}
  image:
    repository: ${SCRIPT_AWS_ACCOUNT_ID}.dkr.ecr.${SCRIPT_REGION}.amazonaws.com/${SCRIPT_ECR_REPOSITORY_NAME}
    tag: ${SCRIPT_ECR_FRONTEND_TAG}
  containerPort: ${SCRIPT_CONTAINER_PORT_FRONTEND}
  env:
    PORT: "${SCRIPT_CONTAINER_PORT_FRONTEND}"
    REACT_APP_CRUD_URL: "${SCRIPT_BACKEND_URL}"
    REACT_APP_HELLO_URL: "${SCRIPT_BACKEND_URL}"
  service:
    type: ${SCRIPT_SERVICE_TYPE_FRONTEND}
    port: ${SCRIPT_CONTAINER_PORT_FRONTEND}
  autoscaling:
    minReplicas: 1
    maxReplicas: 3
    targetCPUUtilizationPercentage: 70
  ingress:
    paths:
      - "/"
EOF

echo "✅ values.yaml Created Successfully"

cd /home/${SCRIPT_SSH_USER}
mkdir -p ${SCRIPT_FRONTEND_WORK_DIRECTORY} 
cd ${SCRIPT_FRONTEND_WORK_DIRECTORY}
cat > helm-charts/frontend-service/Chart.yaml <<'EOF'
apiVersion: v2
name: frontend-service
description: Helm chart for deploying frontend service
type: application
version: 0.1.0
appVersion: "1.0.0"
EOF

echo "✅ Chart.yaml Created Successfully"

# Go to helm chart directory
cd /home/${SCRIPT_SSH_USER}/${SCRIPT_FRONTEND_WORK_DIRECTORY}/helm-charts/frontend-service

# Delete existing service and recreate to fix manual deletion
kubectl delete svc -n tmfrontend frontend-service --ignore-not-found

helm upgrade --install frontend-service . \
  --namespace tmfrontend \
  --create-namespace \
  --values values.yaml

echo "✅ Helm Frontend Deployment Deployed Successfully"
REMOTE

echo "✅ Frontend Deployment with Helm Done Sucessfully"
echo "✅ Step Frontend Deployment with Helm End"
                    """
                }
            }
        }
    }
}

        stage('Build: Common Step 4: Prometheus and Grafana Installation') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
                    accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
                    secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
                ]]) {
                    sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                        script {
                            def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                            def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                            def SCRIPT_OUTPUT = env.CONST_AWS_CONFIGURE_OUTPUT_FORMAT
                            def SCRIPT_ACCESS_KEY = SECRETS_AWS_CONFIGURE_ACCESS_KEY
                            def SCRIPT_SECRET_KEY = SECRETS_AWS_CONFIGURE_SECRET_KEY
                            def SCRIPT_NODE_EXPORTER_PORT = env.CONST_NODE_EXPORTER_PORT
                            def SCRIPT_PROMETHEUS_PORT = env.CONST_PROMETHEUS_PORT
                            def SCRIPT_GRAFANA_PORT = env.CONST_GRAFANA_PORT
                            def SCRIPT_GF_SECURITY_ADMIN_USER = env.SECRETS_GRAFANA_SECURITY_ADMIN_USER
                            def SCRIPT_GF_SECURITY_ADMIN_PASSWORD = env.SECRETS_GRAFANA_SECURITY_ADMIN_PASSWORD

                            sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${SCRIPT_SSH_IP} << 'EOF'

echo "✅ Connected to EC2 Success"
echo "✅ Step Prometheus and Grafana Installation Start"

for PORT in ${SCRIPT_PROMETHEUS_PORT} ${SCRIPT_GRAFANA_PORT} ${SCRIPT_NODE_EXPORTER_PORT}; do
    PID=\$(lsof -ti tcp:\$PORT)
    if [ -n "\$PID" ]; then
        echo "Killing process \$PID on port \$PORT"
        kill -9 \$PID
    else
        echo "No process running on port \$PORT"
    fi
done

cd ~
mkdir -p ~/prometheus
cd ~/prometheus

                # Copy the YAML files from local Jenkins workspace to EC2
                echo "📂 Copying YAML files to ~/prometheus"
                cat > prometheus-installation.yaml <<EOL
---
# Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
---
# config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    # Defines global settings
    global:
      scrape_interval: 15s # Prometheus will try to collect metrics from its targets every 15 seconds.
      evaluation_interval: 15s # Prometheus will evaluate rules (like alerting rules) every 15 seconds.
        
    scrape_configs:
      # Job for scraping Kubernetes API server metrics
      - job_name: 'kubernetes-apiservers'  
        kubernetes_sd_configs: # Tells Prometheus to use the Kubernetes API to automatically discover targets, Define What to monitor
        - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs: # Modify the labels of discovered targets
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https

      # Job for scraping Kubernetes node metrics
      - job_name: 'kubernetes-nodes'
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        kubernetes_sd_configs:
          - role: node
        relabel_configs:
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels: [__meta_kubernetes_node_name]
            regex: (.+)
            target_label: __metrics_path__
            replacement: /api/v1/nodes/\\\${1}/proxy/metrics
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - source_labels: [__meta_kubernetes_node_name]
            target_label: node

      # Job for scraping Pod metrics
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: ([^:]+)(?::\\d+)?;(\\d+)
            replacement: \\\$1:\\\$2
            target_label: __address__
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - source_labels: [__meta_kubernetes_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_pod_name]
            action: replace
            target_label: kubernetes_pod_name

      # Job for scraping cAdvisor metrics
      - job_name: 'kubernetes-cadvisor'
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        kubernetes_sd_configs:
          - role: node
        relabel_configs:
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels: [__meta_kubernetes_node_name]
            regex: (.+)
            target_label: __metrics_path__
            replacement: /api/v1/nodes/\\\${1}/proxy/metrics/cadvisor
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - source_labels: [__meta_kubernetes_node_name]
            target_label: node

      # Job for scraping kube-state-metrics
      - job_name: 'kube-state-metrics'
        kubernetes_sd_configs:
          - role: endpoints
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_name]
            regex: kube-state-metrics
            action: keep
          - source_labels: [__meta_kubernetes_namespace]
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_pod_name]
            target_label: kubernetes_pod_name

      # Job for scraping node-exporter metrics
      - job_name: 'node-exporter'
        kubernetes_sd_configs:
          - role: endpoints
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_name]
            regex: node-exporter
            action: keep
          - source_labels: [__meta_kubernetes_endpoint_node_name]
            target_label: node
          - source_labels: [__meta_kubernetes_namespace]
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_pod_name]
            target_label: kubernetes_pod_name
---
# rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: prometheus
  namespace: monitoring
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: prometheus
rules:
- apiGroups: [""]
  resources: ["nodes", "nodes/proxy", "services", "endpoints", "pods"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["extensions", "networking.k8s.io"]
  resources: ["ingresses"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: prometheus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: prometheus
subjects:
- kind: ServiceAccount
  name: prometheus
  namespace: monitoring
---
# prometheus.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
      - name: prometheus
        image: prom/prometheus:v2.45.0
        args:
        - "--config.file=/etc/prometheus/prometheus.yml"
        - "--storage.tsdb.path=/prometheus"
        resources:
          requests:
            cpu: 500m
            memory: 2Gi
          limits:
            cpu: 1
            memory: 4Gi
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: prometheus-config
          mountPath: /etc/prometheus/
        - name: prometheus-storage
          mountPath: /prometheus/
      volumes:
      - name: prometheus-config
        configMap:
          name: prometheus-config
      - name: prometheus-storage
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: monitoring
spec:
  selector:
    app: prometheus
  ports:
  - port: 9090
  type: NodePort
EOL

                cat > exporters.yaml <<EOL
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: node-exporter
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      hostNetwork: true
      containers:
      - name: node-exporter
        image: prom/node-exporter:v1.6.0
        ports:
        - containerPort: 9100
---
apiVersion: v1
kind: Service
metadata:
  name: node-exporter
  namespace: monitoring
spec:
  ports:
  - port: 9100
  selector:
    app: node-exporter
---
# kube-state-metrics.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-state-metrics
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kube-state-metrics
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      serviceAccountName: kube-state-metrics
      containers:
      - name: kube-state-metrics
        image: registry.k8s.io/kube-state-metrics/kube-state-metrics:v2.9.2
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kube-state-metrics
  namespace: monitoring
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kube-state-metrics
rules:
- apiGroups: [""]
  resources: ["nodes", "pods", "services", "resourcequotas", "replicationcontrollers", "limitranges", "persistentvolumeclaims", "namespaces"]
  verbs: ["list", "watch"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "daemonsets", "deployments", "replicasets"]
  verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kube-state-metrics
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kube-state-metrics
subjects:
- kind: ServiceAccount
  name: kube-state-metrics
  namespace: monitoring
---
apiVersion: v1
kind: Service
metadata:
  name: kube-state-metrics
  namespace: monitoring
spec:
  ports:
  - port: 8080
  selector:
    app: kube-state-metrics
EOL

                cat > prometheus-node-exporter.yml <<EOL
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
EOL

                echo "✅ Applying Monitoring Namespace & Prometheus RBAC + Deployment"
                kubectl apply -f prometheus-installation.yaml

                echo "✅ Applying Node Exporter & Kube-State-Metrics"
                kubectl apply -f exporters.yaml


# --- Grafana Installation ---
cd ~
mkdir -p ~/Grafana

if ! lsof -ti tcp:9095 >/dev/null; then
    # Write Grafana YAML with port ${SCRIPT_GRAFANA_PORT}
    cat > ~/Grafana/grafana.yml <<EOL
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:latest
          ports:
            - containerPort: 3000
              name: http-grafana
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
          env:
            - name: GF_SECURITY_ADMIN_USER
              value: ${SCRIPT_GF_SECURITY_ADMIN_USER}
            - name: GF_SECURITY_ADMIN_PASSWORD
              value: ${SCRIPT_GF_SECURITY_ADMIN_PASSWORD}
---
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: monitoring
spec:
  type: LoadBalancer
  ports:
    - port: ${SCRIPT_GRAFANA_PORT}       # External port
      targetPort: 3000 # Internal container port
      protocol: TCP
  selector:
    app: grafana
EOL
else
    echo "✅ Grafana Manifest already created at ~/Grafana"
fi

cd ~

# Delete existing service and recreate to fix manual deletion
kubectl delete svc -n monitoring grafana --ignore-not-found

kubectl apply -f Grafana/grafana.yml

kubectl get svc -n monitoring grafana

echo "✅ Prometheus and Grafana Installation Completed Successfully"
echo "✅ Step Prometheus and Grafana Installation End"

EOF
                            """
                        }
                    }
                }
            }
        }





/*
      stage('Test: Common Step 1: Install All Tools on EC2') {
          steps {
              withCredentials([[
                  $class: 'AmazonWebServicesCredentialsBinding',
                  credentialsId: 'SECRETS_AWS_CONFIGURE_CREDENTIALS',
                  accessKeyVariable: 'SECRETS_AWS_CONFIGURE_ACCESS_KEY',
                  secretKeyVariable: 'SECRETS_AWS_CONFIGURE_SECRET_KEY'
              ]]) {
                  sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                      script {
                          def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                          def SCRIPT_SSH_USER = env.CONST_EC2_USER

                          echo "🧪 [TEST] Verifying installation of all tools on EC2: ${SCRIPT_SSH_IP}"

                          try {
                              sh """
                              ssh -o StrictHostKeyChecking=no -T ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

# Fix PATH for non-interactive session
export PATH=\$PATH:/usr/local/go/bin:/usr/bin:/usr/local/bin

# Check all required tools
for cmd in htop tree ifconfig curl git unzip jq python3 pip3 g docker docker-compose kubectl helm aws terraform eksctl ansible; do
    command -v \$cmd >/dev/null 2>&1 || { echo "❌ Missing tool: \$cmd"; exit 1; }
done
echo "✅ All required tools verified on EC2"
EOF
                              """
                          } catch (Exception e) {
                              error "❌ Tool verification failed on EC2. Breaking the pipeline!"
                          }
                      }
                  }
              }
          }
      }


      stage('Test: Common Step 2: Check Ports & Cleanup') {
          steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER

                      echo "🧪 [TEST] Verifying ports and cleanup on EC2: ${SCRIPT_SSH_IP}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no -T ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail
# Fix PATH for non-interactive session
export PATH=$PATH:/usr/local/go/bin:/usr/bin:/usr/local/bin

ports=(3000 3001 3002)
errors=0

for port in "\${ports[@]}"; do
    # Check Docker containers (ignore errors)
    docker_container=\$(docker ps --filter "publish=\$port" --format "{{.ID}}" 2>/dev/null || true)
    if [ -n "\$docker_container" ]; then
        echo "❌ Docker container still running on port \$port: ID \$docker_container"
        errors=1
    fi

    # Check normal processes (ignore errors)
    pid=\$(sudo lsof -t -i :\$port 2>/dev/null || true)
    if [ -n "\$pid" ]; then
        echo "❌ Process still running on port \$port: PID \$pid"
        errors=1
    fi
done

# Optional: debug output of running containers and processes
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}" || true
sudo lsof -i -P -n | grep -E "3000|3001|3002" || true

if [ \$errors -eq 0 ]; then
    echo "✅ All ports cleaned successfully"
else
    echo "❌ Ports cleanup verification failed"
    exit 1
fi
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Ports cleanup test failed on EC2. Breaking the pipeline!"
                      }
                  }
              }
          }
      }


        stage('Test: Frontend Step 1: Dockerize Frontend and Push to ECR') {
          steps {
              sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                      def SCRIPT_TAG = env.CONST_AWS_ECR_FRONTEND_TAG

                      echo "🧪 [TEST] Verifying Frontend Docker image in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no -T ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

# Ensure aws is in PATH
export PATH=$PATH:/usr/local/bin

IMAGE_EXISTS=\$(aws ecr describe-images \
    --repository-name ${SCRIPT_REPO_NAME} \
    --image-ids imageTag=${SCRIPT_TAG} \
    --region ${SCRIPT_REGION} \
    --query 'imageDetails | length(@)')

if [ "\$IMAGE_EXISTS" -gt 0 ]; then
    echo "✅ Frontend Docker image exists in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
else
    echo "❌ Frontend Docker image NOT found in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
    exit 1
fi
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Frontend Docker image test failed. Breaking the pipeline!"
                      }
                  }
              }
          }
      }


        stage('Test: Backend Step 1.1: Dockerize Backend Service One and Push to ECR') {
          steps {
              sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                      def SCRIPT_TAG = env.CONST_AWS_ECR_BACKEND_ONE_TAG

                      echo "🧪 [TEST] Verifying Backend Service One Docker image in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no -T ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

# Ensure aws is in PATH
export PATH=$PATH:/usr/local/bin

IMAGE_EXISTS=\$(aws ecr describe-images \
    --repository-name ${SCRIPT_REPO_NAME} \
    --image-ids imageTag=${SCRIPT_TAG} \
    --region ${SCRIPT_REGION} \
    --query 'imageDetails | length(@)')

if [ "\$IMAGE_EXISTS" -gt 0 ]; then
    echo "✅ Backend Service One Docker image exists in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
else
    echo "❌ Backend Service One Docker image NOT found in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
    exit 1
fi
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Backend Service One Docker image test failed. Breaking the pipeline!"
                      }
                  }
              }
          }
      }


        stage('Test: Backend Step 1.2: Dockerize Backend Service Two and Push to ECR') {
          steps {
              sshagent(credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_REPO_NAME = env.CONST_AWS_ECR_REPOSITORY_NAME
                      def SCRIPT_TAG = env.CONST_AWS_ECR_BACKEND_TWO_TAG

                      echo "🧪 [TEST] Verifying Backend Service Two Docker image in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no -T ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

# Ensure aws is in PATH
export PATH=\$PATH:/usr/local/bin

IMAGE_EXISTS=\$(aws ecr describe-images \
    --repository-name ${SCRIPT_REPO_NAME} \
    --image-ids imageTag=${SCRIPT_TAG} \
    --region ${SCRIPT_REGION} \
    --query 'imageDetails | length(@)')

if [ "\$IMAGE_EXISTS" -gt 0 ]; then
    echo "✅ Backend Service Two Docker image exists in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
else
    echo "❌ Backend Service Two Docker image NOT found in ECR: ${SCRIPT_REPO_NAME}:${SCRIPT_TAG}"
    exit 1
fi
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Backend Service Two Docker image test failed. Breaking the pipeline!"
                      }
                  }
              }
          }
      }


      stage('Test: Common Step 3: Verify EKS Cluster and NGINX Ingress') {
          steps {
              sshagent(['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_AWS_ACCOUNT_ID = sh(
                          script: """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                              'aws sts get-caller-identity --query Account --output text'
                          """,
                          returnStdout: true
                      ).trim()
                      def SCRIPT_CLUSTER  = "arn:aws:eks:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:cluster/${env.CONST_TF_EKS_CLUSTER_NAME}"

                      echo "🧪 [TEST] Verifying EKS Cluster and NGINX Ingress on EC2: ${SCRIPT_CLUSTER}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail
export PATH=\$PATH:/usr/local/bin:/usr/bin
export KUBECONFIG=/home/ubuntu/.kube/config

echo "✅ Connected to EC2"
echo "⏳ Checking EKS cluster context: ${SCRIPT_CLUSTER}"

# Ensure the ARN context exists
if ! kubectl config get-contexts | grep -q "${SCRIPT_CLUSTER}"; then
    echo "❌ EKS cluster context not found: ${SCRIPT_CLUSTER}"
    exit 1
fi
echo "✅ EKS cluster context found"

# Verify cluster connectivity
echo "⏳ Waiting for all nodes to be Ready..."
kubectl wait --for=condition=Ready node --all --timeout=10m
echo "✅ All nodes are Ready"
kubectl get nodes -o wide

# Verify NGINX ingress
echo "⏳ Verifying NGINX Ingress Controller..."
kubectl get pods -n ingress-nginx

kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=controller -n ingress-nginx --timeout=10m

if ! kubectl get svc -n ingress-nginx | grep -q ingress-nginx-controller; then
    echo "❌ NGINX Ingress Controller service not found"
    exit 1
fi

echo "✅ NGINX Ingress Controller is deployed successfully"
EOF
                          """
                      } catch (Exception e) {
                          error "❌ EKS Cluster / NGINX verification failed on EC2. Breaking the pipeline!"
                      }
                  }
              }
          }
      }


       stage('Test: Backend Step 2.1: Ansible configurations for Backend') {
          steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_AWS_ACCOUNT_ID = sh(
                          script: """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                              'aws sts get-caller-identity --query Account --output text'
                          """,
                          returnStdout: true
                      ).trim()
                      def SCRIPT_CLUSTER  = "arn:aws:eks:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:cluster/${env.CONST_TF_EKS_CLUSTER_NAME}"

                      echo "🧪 [TEST] Verifying Ansible + Backend deployment on EC2: ${SCRIPT_CLUSTER}"

                      try {
                          sh """
                          ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} <<'EOF'
set -euo pipefail

echo "✅ Connected to EC2 successfully"

# Check ansible installation
if command -v ansible >/dev/null 2>&1; then
    echo "✅ Ansible is installed"
else
    echo "❌ Ansible not found"
    exit 1
fi

# Run ansible syntax check
cd ~/ansible-backend-services-deployment/ansible
ansible-playbook site.yml --syntax-check
echo "✅ Ansible playbook syntax check passed"

# Verify EKS access
echo "⏳ Verifying EKS cluster access..."
kubectl get nodes -o wide

# Get ingress hostname
INGRESS_HOST=\$(kubectl get svc ingress-nginx-controller -n ingress-nginx \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

if [ -z "\$INGRESS_HOST" ]; then
    echo "❌ No ingress external hostname found"
    exit 1
fi

echo "🌍 Ingress external hostname: http://\$INGRESS_HOST"

# Test backend endpoints
for path in /trip /hello /hellos; do
    echo "⏳ Testing endpoint: \$path"
    code=\$(curl -s -o /dev/null -w "%{http_code}" http://\$INGRESS_HOST\$path || true)
    if [ "\$code" = "200" ]; then
        echo "✅ Endpoint \$path is working"
    else
        echo "❌ Endpoint \$path check failed (HTTP \$code)"
        exit 1
    fi
done

echo "✅ All backend endpoints are accessible"

EOF
                          """
                      } catch (err) {
                          error "❌ Backend Test failed: ${err}"
                      }
                  }
              }
          }
      }


        stage('Test: Backend Step 2.2: Create PEM on EC2 for Backend') {
          steps {
              sshagent(['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER

                      echo "🧪 [TEST] Verifying PEM + Ansible setup on EC2 (${SCRIPT_SSH_IP})"

                      try {
                          sh """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

echo "🔎 Checking PEM file existence and permissions..."
ls -l ~/ansible-backend-services-deployment/ssh_private_key.pem
stat -c "%a" ~/ansible-backend-services-deployment/ssh_private_key.pem | grep -q 600 \
  || (echo "❌ PEM file permissions are not 600" && exit 1)

echo "🔎 Checking Ansible installation..."
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "❌ Ansible not installed"
  exit 1
else
  echo "✅ Ansible is installed"
fi

echo "🔎 Checking Ansible project structure..."
test -f ~/ansible-backend-services-deployment/ansible/site.yml || (echo "❌ site.yml missing" && exit 1)
test -f ~/ansible-backend-services-deployment/ansible/inventory/hosts.ini || (echo "❌ hosts.ini missing" && exit 1)

echo "✅ All checks passed for PEM + Ansible setup"
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Test failed for Backend Step 2.2: ${e.message}"
                      }
                  }
              }
          }
}


       

        stage('Test: Backend Step 3: Backend Deployment with Helm') {
          steps {
              sshagent(['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_AWS_ACCOUNT_ID = sh(
                          script: """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                              'aws sts get-caller-identity --query Account --output text'
                          """,
                          returnStdout: true
                      ).trim()
                      def SCRIPT_CLUSTER  = "arn:aws:eks:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:cluster/${env.CONST_TF_EKS_CLUSTER_NAME}"

                      echo "🧪 [TEST] Verifying EKS Cluster and NGINX Ingress on EC2: ${SCRIPT_CLUSTER}"

                      try {
                          sh """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
echo "✅ Ansible is installed and working"

echo "⏳ Verifying EKS cluster access..."
kubectl get nodes -o wide

echo "⏳ Checking ingress controller external endpoint..."
INGRESS_HOST=\$(kubectl get svc ingress-nginx-controller -n ingress-nginx \
    -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

if [ -z "\$INGRESS_HOST" ]; then
    echo "❌ No external endpoint found for ingress controller"
    exit 1
fi

echo "🌍 Ingress external hostname: http://\$INGRESS_HOST"

echo "⏳ Verifying backend endpoints..."
for path in /trip /hello /hellos; do
    echo "Testing \$path..."
    STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://\$INGRESS_HOST\$path)
    if [ "\$STATUS" -ne 200 ]; then
        echo "❌ Endpoint check failed for \$path (status: \$STATUS)"
        exit 1
    fi
done

echo "✅ Backend endpoints are accessible"
EOF
                          """
                      } catch (Exception err) {
                          error "❌ Backend endpoint test failed: ${err}"
                      }
                  }
              }
          }
      }

        stage('Test: Frontend Step 2.1: Ansible configurations for Frontend') {
          steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def WORK_DIR        = env.CONST_ANS_FRONTEND_WORK_DIRECTORY

                      echo "🧪 [TEST] Verifying Frontend Ansible configurations on ${SCRIPT_SSH_IP}"

                      try {
                          sh """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

echo "🔎 Checking Ansible project structure in ${WORK_DIR} ..."
test -f ${WORK_DIR}/ansible/site.yml || (echo "❌ site.yml missing" && exit 1)
test -f ${WORK_DIR}/ansible/inventory/hosts.ini || (echo "❌ hosts.ini missing" && exit 1)
test -f ${WORK_DIR}/ansible/roles/frontend/tasks/main.yml || (echo "❌ frontend/tasks/main.yml missing" && exit 1)

echo "🔎 Checking Ansible installation..."
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "❌ Ansible not installed"
  exit 1
else
  echo "✅ Ansible is installed"
fi

echo "🔎 Running ansible-playbook syntax check..."
cd ${WORK_DIR}
ansible-playbook --syntax-check ansible/site.yml

echo "✅ Frontend Ansible configuration test passed"
EOF
                          """
                      } catch (Exception e) {
                          error "❌ Test failed for Frontend Step 2.1: ${e.message}"
                      }
                  }
              }
          }
      }


        stage('Test: Frontend Step 2.2: Create PEM on EC2 for Frontend') {
            steps {
                sshagent(['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                    script {
                        def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                        def SCRIPT_SSH_USER = env.CONST_EC2_USER

                        echo "🧪 [TEST] Verifying PEM + Ansible setup on EC2 (${SCRIPT_SSH_IP})"

                        try {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
set -euo pipefail

echo "🔎 Checking PEM file existence and permissions..."
ls -l ~/ansible-backend-services-deployment/ssh_private_key.pem
stat -c "%a" ~/ansible-backend-services-deployment/ssh_private_key.pem | grep -q 600 \
  || (echo "❌ PEM file permissions are not 600" && exit 1)

echo "🔎 Checking Ansible installation..."
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "❌ Ansible not installed"
  exit 1
else
  echo "✅ Ansible is installed"
fi

echo "🔎 Checking Ansible project structure..."
test -f ~/ansible-backend-services-deployment/ansible/site.yml || (echo "❌ site.yml missing" && exit 1)
test -f ~/ansible-backend-services-deployment/ansible/inventory/hosts.ini || (echo "❌ hosts.ini missing" && exit 1)

echo "✅ All checks passed for PEM + Ansible setup"
EOF
                            """
                        } catch (Exception e) {
                            error "❌ Test failed for Backend Step 2.2: ${e.message}"
                        }
                    }
                }
            }
        }

       stage('Test: Frontend Step 3: Frontend Deployment with Helm') {
          steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {              
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION   = env.CONST_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_AWS_ACCOUNT_ID = sh(
                          script: """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                              'aws sts get-caller-identity --query Account --output text'
                          """,
                          returnStdout: true
                      ).trim()
                      def SCRIPT_CLUSTER  = "arn:aws:eks:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:cluster/${env.CONST_TF_EKS_CLUSTER_NAME}"

                      echo "🧪 [TEST] Verifying EKS Cluster and Frontend Ingress on EC2: ${SCRIPT_CLUSTER}"

                      try {
                          sh """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
echo "✅ Ansible is installed and working"

echo "⏳ Verifying EKS cluster access..."
kubectl get nodes -o wide

echo "⏳ Checking ingress controller external endpoint..."
INGRESS_HOST=\$(kubectl get svc ingress-nginx-controller -n ingress-nginx \
    -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

if [ -z "\$INGRESS_HOST" ]; then
    echo "❌ No external endpoint found for ingress controller"
    exit 1
fi

echo "🌍 Ingress external hostname: http://\$INGRESS_HOST"

echo "⏳ Verifying frontend at root path..."
STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://\$INGRESS_HOST/)

if [ "\$STATUS" -ne 200 ]; then
    echo "❌ Frontend check failed at / (status: \$STATUS)"
    exit 1
fi

echo "✅ Frontend is accessible at /"
EOF
                          """
                      } catch (Exception err) {
                          error "❌ Frontend endpoint test failed: ${err}"
                      }
                  }
              }
          }
      }
      


        stage('Test: Monitoring Step 1: Grafana LoadBalancer Verification') {
          steps {
              sshagent (credentials: ['SECRETS_EC2_SSH_PRIVATE_KEY']) {
                  script {
                      def SCRIPT_SSH_IP   = env.CONST_EC2_IP_ADDRESS
                      def SCRIPT_SSH_USER = env.CONST_EC2_USER
                      def SCRIPT_REGION   = env.SECRETS_AWS_CONFIGURE_REGION_ID
                      def SCRIPT_AWS_ACCOUNT_ID = sh(
                          script: """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} \
                              'aws sts get-caller-identity --query Account --output text'
                          """,
                          returnStdout: true
                      ).trim()
                      def SCRIPT_CLUSTER  = "arn:aws:eks:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:cluster/${env.CONST_TF_EKS_CLUSTER_NAME}"

                      echo "🧪 [TEST] Verifying Grafana LoadBalancer on cluster: ${SCRIPT_CLUSTER}"

                      try {
                          sh """
                              ssh -o StrictHostKeyChecking=no ${SCRIPT_SSH_USER}@${SCRIPT_SSH_IP} << 'EOF'
echo "⏳ Checking Grafana LoadBalancer service..."
GRAFANA_HOST=\$(kubectl get svc grafana -n monitoring -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

if [ -z "\$GRAFANA_HOST" ]; then
    echo "❌ Grafana LoadBalancer hostname not found"
    exit 1
fi

echo "🌍 Grafana external hostname: http://\$GRAFANA_HOST:9095"

echo "⏳ Testing Grafana accessibility..."
STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://\$GRAFANA_HOST:9095/login)

if [ "\$STATUS" -ne 200 ]; then
    echo "❌ Grafana not accessible (status \$STATUS)"
    exit 1
fi

echo "✅ Grafana is accessible at http://\$GRAFANA_HOST:9095"
EOF
                          """
                      } catch (Exception err) {
                          error "❌ Grafana LoadBalancer verification failed: ${err}"
                      }
                  }
              }
          }
      }
*/



    }




post {
    success {
        withAWS(region: "${env.CONST_AWS_CONFIGURE_REGION_ID}", credentials: 'SECRETS_AWS_CONFIGURE_CREDENTIALS') {
            script {
                def SCRIPT_REGION           = env.CONST_AWS_CONFIGURE_REGION_ID
                def SCRIPT_ENVIRONMENT      = env.CONST_AWS_SNS_ENVIRONMENT
                def SCRIPT_AWS_IDENTITY     = awsIdentity()
                def SCRIPT_AWS_ACCOUNT_ID   = SCRIPT_AWS_IDENTITY.account
                def SCRIPT_SNS_TOPIC_NAME   = env.CONST_AWS_SNS_TOPIC_NAME
                def SCRIPT_SNS_TOPIC_ARN    = "arn:aws:sns:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:${SCRIPT_SNS_TOPIC_NAME}"

                snsPublish(
                    topicArn: SCRIPT_SNS_TOPIC_ARN,
                    subject: "✅ Jenkins Pipeline Success - Build ${env.BUILD_NUMBER}",
                    message: """
Jenkins successfully built the requested services   

📦 Build Details:
• Build Number: ${env.BUILD_NUMBER}
• Environment: ${SCRIPT_ENVIRONMENT}
• Timestamp: ${new Date()}

🚀 Deployment Status: ✅ SUCCESS
                """
                )
            }
        }
    }

    failure {
        withAWS(region: "${env.CONST_AWS_CONFIGURE_REGION_ID}", credentials: 'SECRETS_AWS_CONFIGURE_CREDENTIALS') {
            script {
                def SCRIPT_REGION           = env.CONST_AWS_CONFIGURE_REGION_ID
                def SCRIPT_ENVIRONMENT      = env.CONST_AWS_SNS_ENVIRONMENT
                def SCRIPT_AWS_IDENTITY     = awsIdentity()
                def SCRIPT_AWS_ACCOUNT_ID   = SCRIPT_AWS_IDENTITY.account
                def SCRIPT_SNS_TOPIC_NAME   = env.CONST_AWS_SNS_TOPIC_NAME
                def SCRIPT_SNS_TOPIC_ARN    = "arn:aws:sns:${SCRIPT_REGION}:${SCRIPT_AWS_ACCOUNT_ID}:${SCRIPT_SNS_TOPIC_NAME}"

                snsPublish(
                    topicArn: SCRIPT_SNS_TOPIC_ARN,
                    subject: "❌ Jenkins Pipeline Failed - Build ${env.BUILD_NUMBER}",
                    message: """    
Jenkins failed to build the requested services   

🚨 Failure Details:
• Build Number: ${env.BUILD_NUMBER}
• Environment: ${SCRIPT_ENVIRONMENT}
• Failed Stage: Check Jenkins logs
• Timestamp: ${new Date()}

Please check the Jenkins console output for detailed error information.

🚀 Deployment Status: ❌ FAILURE
                  """
                )
            }
        }
    }
}








}
