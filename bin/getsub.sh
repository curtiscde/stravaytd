# 1=cid, 2=cs, 3=verifytoken 4=callbackurl

echo 'get subscription'
curl -G https://www.strava.com/api/v3/push_subscriptions \
    -d client_id=$1 \
    -d client_secret=$2

echo "
    ./bin/updatesub.sh $1 $2 $3 $4 
"