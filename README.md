# Getting Started
## Prerequisites
- [Docker Engine](https://docs.docker.com/engine)
- [Docker Compose](https://docs.docker.com/compose) 

## Install Docker Engine and Docker Compose
The instructions below are based on the official documentation for the installation of [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) on Ubuntu.

### Set up the Docker repository
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

### Install Docker Engine
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

### Manage Docker as a non-root user
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
### Configure Docker to start on boot
- Enable docker service to be started automatically at boot by systemd 
	```
	sudo systemctl enable docker
	```

- Disable the docker service from starting autmatically
	```
	sudo systemctl disable docker
	```

### Install Docker Compose
- Download the current stable release of Docker Compose
	```
	sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	```
- Apply executable permissions to the binary
	```
	sudo chmod +x /usr/local/bin/docker-compose
	```
- Test the installation
	```
	docker-compose --version
	```


# Usage
- Clone the repository
	```
	git clone https://github.com/janis-schanbacher/docker-demo.git
	```
- Start the application
	```
	docker-compose up
	```
- Stop the application by hitting CTRL+C in the terminal where you started the app or by running the following command
	```
	docker-compose down
	```
