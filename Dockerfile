# Use an official Ubuntu as the base image
FROM ubuntu:20.04

# Set the environment to non-interactive to avoid prompts during package installations
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    gnupg \
    lsb-release

# Add the deadsnakes PPA to get Python 3.10
RUN add-apt-repository ppa:deadsnakes/ppa -y

# Install Python 3.10 and pip
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3.10-venv \
    python3.10-dev \
    python3-pip

# Ensure python3 points to python3.10
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1

# Install Node.js (LTS version)
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Clean up the apt cache to reduce the image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY . /workspace

# Expose port 3000
EXPOSE 3000
EXPOSE 4280
EXPOSE 7071

# Set the default command to bash
CMD ["/bin/bash"]
