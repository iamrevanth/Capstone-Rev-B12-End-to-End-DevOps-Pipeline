# End-to-End DevOps Pipeline for a Web Application with CI/CD (B10_Group_4_Capstone_Project)

## 📌 Problem Statement:  
- DevOps teams require a CI/CD pipeline to streamline the development and deployment process, ensuring that changes are consistently tested, built, and deployed   across environments. 
- Using Jenkins as the CI/CD orchestrator, this project will implement an automated pipeline for a Dockerized application that deploys to Kubernetes on AWS EKS. 
- Jenkins will also automate infrastructure provisioning, configuration management, and deployment, reducing manual intervention and improving efficiency.

## 🎯 Project Goals Achievement at a Glance

----------------------------
| Symbol | Meaning         |
|------- |-----------------|
| ✅    | DONE            |
| ⏳    | COMING SOON     |
| ✨    | ENHANCEMENT     |
| 🛠️    | FIX IN PROGRESS |
----------------------------

### AWS (Cloud Infrastructure)
- Provision VPC, Subnets, Security Groups with Terraform. ✅
- Deploy EKS Cluster for container orchestration. ✅
- Create EC2 instances for Jenkins and Ansible. ✅
- Use AWS ECR for storing Docker images. ✅
- Store Terraform state in S3 with remote backend. ✅

### Terraform (IaC)
- Automate AWS infrastructure provisioning. ✅
- Maintain reusable Terraform modules. ✅
- Ensure state locking & collaboration with S3. ✅

### Ansible (Configuration Management)
- Install Docker, kubectl, AWS CLI, Helm on EC2/EKS nodes. ✅
- Configure servers with security best practices. ✅
- Automate application prerequisites setup. ✅

### Jenkins (CI/CD Orchestration)
- Set up Jenkins on EC2 with required plugins (Docker, Kubernetes, AWS). ✅
- Create multi-stage pipelines for build → infra → config → deploy → test. ✨
- Integrate with Git for webhook-based build triggers. ✅
- Automate Terraform & Ansible execution inside Jenkins. ✅
- Send alerts/notifications on build or deployment failures. ✅

### Docker (Containerization)
- Dockerize the web application with a Dockerfile. ✅
- Push built images to AWS ECR. ✅
- Use Docker in Jenkins build stage for CI. ✅

### Kubernetes (Deployment on EKS)
- Deploy application to EKS via manifests/Helm charts. ✅
- Configure Services, Ingress, LoadBalancer for external access. ✅
- Enable Horizontal Pod Autoscaler (HPA) for scaling. ✅
- Apply health checks & readiness probes for resilience. ✅

### Monitoring & Observability
- Deploy Prometheus on EKS to collect metrics. ✅
- Deploy Grafana for dashboards and visualization. ✅
- Configure alerting rules in Prometheus. ⏳
- Integrate Jenkins alerts with monitoring. ⏳

### Testing & Documentation
- Write test scripts for validating deployments. ✅
- Perform end-to-end pipeline testing from Git push to deployment. ✅
- Document setup, troubleshooting, and cost optimization strategies. ⏳

### Additional Enhancements (Self)
- Splitting code for front-back deployment for it to work with multiple repositories ✨
- Using Cloudflare API within pipeline to assign subdomain.domain.com to the LoadBalancer ✨
- Currently Jenkinsfile if run with Build + Test Steps, it violates the 64kb per function rule 🛠️

# Cost Optimization in Jenkins Pipeline

## ✅ Implemented Cost-Optimizations
1. **EKS Node Type**
   - Using `t3.medium` instance type for worker nodes (burstable compute, cheaper than m5/c5).

2. **Minimal Node Count**
   - Node group configured with only 2 nodes for high availability while keeping baseline compute low.

3. **Cluster Autoscaling (HPA)**
   - Configured for Ingress and backend services (`minReplicas=1`, `maxReplicas=3`, CPU utilization 70%).
   - Scales down during idle usage → prevents over-provisioning.

4. **Lightweight Docker Images**
   - Using `node:20-alpine` images for frontend and backend services.
   - Smaller image size = reduced ECR storage and faster deployments.

5. **Terraform State in S3**
   - Remote state stored in Amazon S3 (cheaper, durable, scalable).

6. **Single EC2 for Jenkins/Tools**
   - Reusing one EC2 instance to install Jenkins, Terraform, Ansible, kubectl, Helm, etc. instead of provisioning multiple dedicated hosts.

---

## ⚡ Potential Areas for Further Cost Optimization
1. **EKS Node Groups**
   - Use **Spot Instances** (mixed with On-Demand) for worker nodes (up to 70–80% cheaper).
   - Consider **Graviton-based instances (t4g.medium)** if workloads support ARM architecture.

2. **Jenkins Hosting**
   - Current setup runs Jenkins on a dedicated EC2.
   - Alternatives:
     - Run Jenkins inside EKS cluster (no extra EC2 cost).
     - Move to **AWS CodePipeline / CodeBuild** (pay-per-use).

3. **ECR Image Storage**
   - Add **lifecycle policies** to automatically clean old/unused images.

4. **Cluster Sizing**
   - Set `min_size = 0` in non-production environments → idle clusters scale down to zero.
   - Enable **cluster autoscaler** for dynamic scaling.

5. **Monitoring Stack**
   - Currently self-hosted Prometheus + Grafana on EKS.
   - Alternative: Use **Amazon Managed Prometheus (AMP)** and **Amazon Managed Grafana (AMG)** (serverless, pay-per-use).

6. **Networking Costs**
   - Keep services as **ClusterIP** where external access isn’t required.
   - Avoid unnecessary **LoadBalancer** services (~$18/month each).

7. **Storage Volumes**
   - Regular cleanup of unused **EBS/EFS volumes** and persistent volumes (PVs/PVCs) to avoid ongoing charges.

---

## 🛠️ Pre-Requisites
Before setting up Jenkins, ensure the following:
- An active **AWS Account** with permissions to launch EC2 instances.  
- **IAM Role/User** with sufficient privileges (EC2, ECR, S3, IAM, VPC, EKS).  
- **Key Pair (PEM)** for SSH access to the EC2 instance.
- **Security Group** allowing:

-----------------------------------------------------------
| Port  | Service / Purpose                               |
|-------|-------------------------------------------------|
| 22    | SSH access to the EC2 instance                  |
| 8080  | Jenkins Web UI                                  |
| 443   | HTTPS (if SSL termination / reverse proxy used) |
| 80    | HTTP (if reverse proxy / load balancer used)    |
| 3000  | Frontend (testing via Docker)                   |
| 3001  | Backend Service #1 (testing)                    |
| 3002  | Backend Service #2 (testing)                    |
| 9090  | Prometheus (metrics collection)                 |
| 9095  | Grafana (dashboards & visualization)            |
| 9100  | Node Exporter (system metrics for Prometheus)   |
-----------------------------------------------------------

---

## ⚙️ Github Configurations

![GITHUB_01](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/GITHUB_01.png)

---

## ⚙️ AWS Configurations

![AWS_01](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/AWS_01.png)
![AWS_02](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/AWS_02.png)

### 📦 EC2 Instance Minimum Requirements
- **Operating System**: Ubuntu 24.04 LTS  
- **Instance Type**: `t3.medium` (2 vCPUs, 4GB Memory)  
- **Storage**: Minimum 30GB (GP3 recommended)  

---

### 🚀 Creating a Jenkins Server on EC2
Use the following script to provision and configure Jenkins on an Ubuntu EC2 instance:

```sh
#!/bin/bash
# Update system
sudo apt update -y
sudo apt upgrade -y

# Install dependencies
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https unzip
sudo apt install -y openjdk-17-jdk

# Verify Java installation
java -version

sudo rm -f /usr/share/keyrings/jenkins-keyring.asc
sudo rm -f /etc/apt/sources.list.d/jenkins.list

# Add Jenkins repository key & source
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list

# Install Jenkins
sudo apt update -y
sudo apt install -y jenkins

# sudo systemctl status jenkins

# Enable and start Jenkins service
sudo systemctl enable jenkins
sudo systemctl start jenkins

# Allow Jenkins port (8080)
sudo ufw allow 8080
sudo ufw allow OpenSSH
sudo ufw --force enable
sudo ufw status

# Install Docker for Usage with jenkins
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker jenkins

# Jenkins password to be used to unlock Jenkins and install plugins via cli
sudo cat /var/lib/jenkins/secrets/initialAdminPassword


# Jenkins cli installation with some pre installed plugins
# These Plugins are mandatory for the jenkinsfile in this project
wget http://localhost:8080/jnlpJars/jenkins-cli.jar

java -jar jenkins-cli.jar -s http://localhost:8080/ -auth admin:<ADMIN_PASSWORD> install-plugin \
  amazon-ecr \
  aws-java-sdk \
  aws-credentials \
  pipeline-aws \
  docker-plugin \
  docker-workflow \
  email-ext \
  ssh-agent

# sudo systemctl restart jenkins

# To increase heap side of Jenkins to avoid out of memory error
sudo nano /etc/default/jenkins
JAVA_ARGS="-Djava.awt.headless=true -Xms1g -Xmx2g"

# Restart jenkins server with all above configurations
sudo systemctl restart jenkins

```


## 🔑 Jenkins Environment Variables

### 1️⃣ AWS Credentials
- **ID**: `SECRETS_AWS_CONFIGURE_CREDENTIALS`  
- **Type**: AWS Credentials  
- **Credentials**:  
  - Access Key ID (e.g., `AHDksdfsdf`)  
  - Secret Access Key (e.g., `afcxvUE`)  

---

### 2️⃣ EC2 SSH Private Key
- **ID**: `SECRETS_EC2_SSH_PRIVATE_KEY`  
- **Type**: SSH Username with Private Key  
- **Credentials**:  
  - Username (e.g., `ubuntu`)  
  - Private Key (PEM file contents)  

---

### 3️⃣ GitHub Credentials
- **ID**: `GITHUB_CREDENTIALS`  
- **Type**: Username with Password  
- **Credentials**:  
  - Username (e.g., `iamrevanth`)  
  - Password / Token (e.g., **GitHub PAT Token**)  

---

### 📸 Jenkins Secret Text Variables

![JENKINS_01](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_01.png)
![JENKINS_02](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_02.png)
![JENKINS_03](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_03.png)
![JENKINS_04](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_04.png)
![JENKINS_05](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_05.png)
![JENKINS_06](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_06.png)
![JENKINS_07](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_07.png)
![JENKINS_08](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_08.png)
![JENKINS_09](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_09.png)
![JENKINS_10](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_10.png)

### 📸 Jenkins Configuration Screenshots

![JENKINS_11](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_11.png)
![JENKINS_12](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_12.png)
![JENKINS_13](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_13.png)
![JENKINS_14](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_14.png)
![JENKINS_15](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_15.png)
![JENKINS_16](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_16.png)
![JENKINS_17](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_17.png)
![JENKINS_18](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/JENKINS_18.png)

---

## 🚀 Final Deliverables (Deployment and Testing):

### 📌 Deliverable:

📄 **Jenkinsfile** → Located at:  
```text
./Jenkinsfile
```

---

### 📸 Screenshots:

![OUTPUT_01](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_01.png)
![OUTPUT_02](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_02.png)
![OUTPUT_03](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_03.png)
![OUTPUT_04](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_04.png)
![OUTPUT_05](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_05.png)
![OUTPUT_06](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_06.png)
![OUTPUT_07](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_07.png)
![OUTPUT_08](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_08.png)
![OUTPUT_09](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_09.png)
![OUTPUT_10](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_10.png)
![OUTPUT_11](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_11.png)
![OUTPUT_12](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_12.png)
![OUTPUT_13](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_13.png)
![OUTPUT_14](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_14.png)
![OUTPUT_15](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_15.png)
![OUTPUT_16](https://github.com/iamrevanth/My-Media-Repository/blob/main/Capstone_Project_Screenshots/OUTPUT_16.png)

---

## 👥 Contributors:
- Revanth : Jenkins Pipeline, Notification System, Prometheus and Grafana
  
## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Feel free to fork and improve the scripts! ⭐ If you find this project useful, please consider starring the repo—it really helps and supports my work! 😊

## 📧 Contact
For any queries, reach out via GitHub Issues.

---

## 🎯 **Thank you for reviewing this project! 🚀**
