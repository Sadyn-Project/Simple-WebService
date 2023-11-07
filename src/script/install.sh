#!/bin/bash
#
# Install Script for Sadyn Simple-WebService for Linux
# Using Node.JS, Express.js, and other libraries

clear

if [ "$USER" == "root" ]; then
    read -p $'\033[38;5;214mAre you sure you want to run this script as root? (y/n) \033[38;5;185m' -n 1 ri
    echo -e "\033[0m"
    if [ "$ri" != "y" ]; then
        echo -e "\n\033[38;5;124mAborting\033[0m"
        exit 0
    fi
    echo -e "\n"
fi

cd ~

read -p $'\033[38;5;214mWhat\'s the name of the project? \033[38;5;185m' name
echo -e "\033[0m"

if [ -z "$name" ]; then
    echo "A name is required for your project."
    exit 1
fi

name="${name,,}"
name="${name// /-}"

echo -e "\033[38;5;98mCreating Directory at \033[38;5;96m$PWD/$name\033[0m"
sleep 1

if [ -d "$PWD/$name" ]; then
    echo -e "\033[38;5;124mDirectory already exists\033[0m"
    read -p $'\033[38;5;214mDo you want to overwrite it? (y/n) \033[38;5;185m' -n 1 owd
    echo -e "\033[0m"
    if [ "$owd" == "y" ]; then
        echo -e "\n\033[38;5;98mDeleting \033[38;5;96m$PWD/$name\033[0m"
        sleep 1
        rm -r "$PWD/$name"
    else
        echo -e "\n\033[38;5;124mAborting\033[0m"
        exit 1
    fi
fi

mkdir "./$name"
cd "./$name"

echo -e "\n\033[38;5;96m$PWD \033[38;5;98mCreated\033[0m"

echo -e "\033[38;5;98mInstalling Packages\033[0m"

apt update
apt install -y jq unzip curl file nodejs npm

echo -e "\033[38;5;98mSearching for latest Release\033[0m"

sleep 2

response=$(curl -s -H "Content-Type: application/json" -X GET "https://source.thundernetwork.org/api/v1/repos/Sadyn-Project/Simple-WebService/releases/latest")

length=$(echo "$response" | jq -r ".assets | length")
for ((x = 0; x < length; x++)) do
    if [ $(echo "$response" | jq -r ".assets[$x].name") == "WebService.tar.gz" ]; then
        url=$(echo "$response" | jq -r ".assets[$x].browser_download_url")
    fi
done

if [ ! -v url ]; then
    echo -e "\033[38;5;124mCould not find latest Release\033[0m"
    exit 1
fi

echo -e "\033[38;5;98mDownloading Latest Release\033[0m"

sleep 1

curl -L $url | tar -xzv

echo -e "\033[38;5;98mInstalling Dependencies\033[0m"

sleep 1

/usr/local/bin/npm install
/usr/local/bin/npm run setup

echo -e "\033[38;5;198mInstallation Finished!\033[0m"

exit 0