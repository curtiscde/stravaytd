# 1=cid, 2=cs, 3=verifytoken 4=callbackurl (domain.io) 5=subid

echo 'delete subscription'
curl -X DELETE https://www.strava.com/api/v3/push_subscriptions/$5 \
    -F client_id=$1 \
    -F client_secret=$2

echo 'add subscription'
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
      -F client_id=$1 \
      -F client_secret=$2 \
      -F "callback_url=https://$4/.netlify/functions/webhook" \
      -F "verify_token=$3"