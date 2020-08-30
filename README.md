# Docker-demo
This todo-list application aims to demonstrate the usage of Docker Compose. The app consists of a RESTful API that is built with Flask (Python), and a React user interface that uses the API.

## Prerequisites
- [Docker Engine](https://docs.docker.com/engine)
- [Docker Compose](https://docs.docker.com/compose) 

### Install Docker Engine and Docker Compose
The instructions below are based on the official documentation for the installation of [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) on Ubuntu.

#### Set up the Docker repository
- Update apt package index and install packages to allow apt to use a repository over HTTPS
	```sh
	sudo apt-get update
	sudo apt-get install \
		apt-transport-https \
		ca-certificates \
		curl \
		gnupg-agent \
		software-properties-common
	```

- Add Docker's official GPG key
	```sh
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	```
	- Verify fingerprint by executing `sudo apt-key fingerprint 0EBFCD88`, it should match "9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88"

- Set up the stable repository
	```sh
	sudo add-apt-repository \
	   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
	   $(lsb_release -cs) \
	   stable"
	```

#### Install Docker Engine
- Uninstall old versions of docker
	```sh
	sudo apt-get remove docker docker-engine docker.io containerd runc
	```

- Update the apt package index and install the latest version of Docker Engine and containerd
	```sh
	sudo apt-get update
	sudo apt-get install docker-ce docker-ce-cli containerd.io
	```

- Verify that Docker Engine is installed correctly by running the `hello-world` image
	```sh
	sudo docker run hello-world
	```

#### Manage Docker as a non-root user
- After installing Docker Engine the `docker` group is already created without users added to it. Verify or otherwise add the group by entering the following command:
	```sh
	sudo groupadd docker
	```
- Add the current user to the `docker` group
	```sh
	sudo usermod -aG docker $USER
	```
- Reevevaluate group mambershhips of the docker group by logging out and back in or by running the following command:
	```sh
	newgrp docker
	```
#### Configure Docker to start on boot
- Enable docker service to be started automatically at boot by systemd 
	```sh
	sudo systemctl enable docker
	```

- Disable the docker service from starting autmatically
	```sh
	sudo systemctl disable docker
	```

#### Install Docker Compose
- Download the current stable release of Docker Compose
	```sh
	sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	```
- Apply executable permissions to the binary
	```sh
	sudo chmod +x /usr/local/bin/docker-compose
	```
- Test the installation
	```sh
	docker-compose --version
	```

<!--
### Deploy the stack to a swarm 
[Official Documentation](https://docs.docker.com/engine/swarm/stack-deploy/)
#### Run Docker Engine in swarm mode
([Official Documentation](https://docs.docker.com/engine/swarm/swarm-mode/))
- Look up the physical public IP of your machine on your network
	```sh
	ifconfig
	```
- Create a swarm 
	```sh
	docker swarm init --advertise-addr <MANAGER-IP>
	```
- Bring the Docker Engine out of swarm mode
	```sh
	docker swarm leave --force
	```

#### Set up a Docker registry
- Start the registry as a service on your swarm
	```sh
	docker service create --name registry --publish published=5000,target=5000 registry:2
	```
- Check status of the registry
	```sh
	docker service ls
	```
- Verify that the registry is working (expected output: `{}`)
	```
	 curl http://localhost:5000/v2/
	```
#### Push the generated image to the registry
- Push the generated image to the registry
	```sh
	docker-compose push
	```
	- If the command fails due to: `ERROR: Get https://<MANAGER-IP>:5000/v2/: http: server gave HTTP response to HTTPS client`
		- Create or modify `/etc/docker/daemon.json`:
			```json   
			{
				"insecure-registries":["myregistry.example.com:5000"] 
			}
			```
    	- Restart docker daemon
			```sh
			sudo service docker restart
			```
#### Deploy the stack to the swarm
- Create the stack
	```sh
	docker stack deploy --compose-file docker-compose.yml docker-demo-stack
	```
- Check that the stack is running
	```sh
	docker stack services docker-demo-stack
	```
- Bring the stack down
	```sh
	docker stack rm docker-demo-stack
	```
- Bring the registry down
	```sh
	docker service rm registry
	``` 
-->

## Usage
- Clone the repository
	```sh
	git clone https://github.com/janis-schanbacher/docker-demo.git
	```
- Start the application in the background using detachted mode
	```sh
	docker-compose up -d
	```
	- Access the user interface: http://localhost:3000
	- Access the api: http://localhost:5000/tasks
- Stop the application
	```sh
	docker-compose down
	```
- Verify that the application is running
	```sh
	docker-compose ps
	```
- View Logs
	```sh
	docker-compose logs
	```