# JOB GraphQL Server

## Documentation

+ General: See [jupyter-observablehq-notebook](TBD)
+ Deployment: See [docker/README](docker/README.md)


## Sample GraphQL Requests

### 1 - Queries

#### 1.1 read

Query String:

```
query ($channel: String!, $name: String!) {
  read(channel: $channel, name: $name) {
    name
    value
  }
}
```

Variables:

```json
{ "channel": "channel-1", "name": "toto" }
```

#### 1.2 readHisto

Query String:

```
query($channel: String!, $name: String!, $start: Int!, $end: Int!) {
  readHisto(channel: $channel, name: $name, start: $start, end: $end) {
    value
    timestamp
  }
}
```

Variables:

```json
{ "channel": "channel-1", "name": "toto", "start": 0, "end": 10 }
```

#### 1.3 checkPassword

Query String:

```
query ($password: String!) {
  checkPassword(password: $password)
}
```

Variables:

```json
{ "password": "mysecret" }
```

### 2 Mutations

#### 2.1 write

Query String:

```
mutation($channel: String!, $name: String!, $value: String, $add_histo: Boolean $expiry: Int) {
  write(
    channel: $channel
    name: $name
    value: $value
    add_histo: $add_histo
    expiry: $expiry

  ) {
    channel
    name
  }
}
```

Variables:

```json
{
  "channel": "channel-1",
  "name": "toto",
  "value": "123",
  "add_histo": true,
  "expiry": 20
}
```

#### 2.2 publish

Query String:

```
mutation($channel: String!, $name: String!, $value: String) {
  publish(
    channel: $channel
    name: $name
    value: $value
  ) {
    channel
    name
  }
}
```

Variables:

```json
{ "channel": "channel-1", "name": "toto", "value": "123" }
```

#### 2.3 publishWrite

Query String:

```
mutation($channel: String!, $name: String!, $value: String, $add_histo: Boolean $expiry: Int) {
  publishWrite(
    channel: $channel
    name: $name
    value: $value
    add_histo: $add_histo
    expiry: $expiry

  ) {
    channel
    name
  }
}
```

Variables:

```json
{
  "channel": "channel-1",
  "name": "toto",
  "value": "123",
  "add_histo": true,
  "expiry": 20
}
```

### 3 Subscriptions

#### 3.1 subscribe

Query String:

```
subscription ($channel: String!, $pattern: Boolean) {
  subscribe(channel: $channel, pattern: $pattern) {
    name
    value
  }
}
```

Variables:

```json
{ "channel": "channel-1", "pattern": true }
```
