sh
echo "Installing dependencies..." &
npm install &
echo "Building project..." &
npm run build &
echo "Installing MongoDB" &
var=$(sudo apt install mongod) &
echo "MongoDB Install Output:" $var &
bash ./start.sh