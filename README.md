# Campus Klima App Backend

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/campusklimaapp/cka-backend)
[![Heroku App Status](http://heroku-shields.herokuapp.com/cka-backend)](https://cka-backend.herokuapp.com)

This is the backend server of the "Campus-Klima-App", created during a semester project 2020.
It receives HTTP POST requests and saves them to a mongo-database.
Furthermore it exposes the data via a simple REST-API.

## Deployment via docker

You can build the docker image with

```bash
docker build -t campus-klima-app .
```

The docker image can be executed with

```bash
docker run -d \
  -e MONGO_USER='<your-mongodb-user' \
  -e MONGO_PW='<your-mongodb-password>' \
  -e MONGO_HOSTS='<your-mongodb-hosts>' \
  -p 3000:3000 \
  campusklimaapp/cka-backend
```

To run in interactive mode replace `-d` (_detached mode_) with `-it` (_interactive terminal_).

To show running containers execute

```bash
docker ps
```

To stop a container, kill it with the assiciated container name from above

```bash
docker kill <container-name>
```

## Documentation

### webhook requests

The data is devivered via the _HTTP integration_-plugin in TTN everytime new data is pushed to TTN.

A request looks like this:

```json
{
  "app_id": "997576",
  "dev_id": "node-id",
  "hardware_serial": "0123456789ABCDEF01",
  "port": 2,
  "counter": 8,
  "payload_raw": "EWwAFwoP",
  "payload_fields": {
    "battery": 4460,
    "event": "interval",
    "light": 23,
    "temperature": 25.75
  },
  "metadata": {
    "time": "2020-07-01T08:06:09.67597446Z",
    "frequency": 868.1,
    "modulation": "LORA",
    "data_rate": "SF7BW125",
    "coding_rate": "4/5",
    "gateways": [
      {
        "gtw_id": "ttn-campus-klima-1",
        "timestamp": 588231187,
        "time": "2020-07-01T08:06:09Z",
        "channel": 0,
        "rssi": -61,
        "snr": 10,
        "rf_chain": 0
      }
    ]
  },
  "downlink_url": "https://example.com/ttn-eu/api/v2/down/..."
}
```
