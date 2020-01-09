# JB Outbound Call Activity Responder

ReST service for responding to POST calls from Outbound Call Activity in JB v2.


Features
 - dumb reponse from request
  -

 TODO:
 - support requests encoded with JWT. parsing determined by content type in request
 - support for oauth server-server flow
 - configurable latency - random range of latency per call in milliseconds


## Running the service
```
npm install

npm start
```

## Endpoints

### /signups
  - 50ms delay
  - 1 in 10,000 chance there will be an http 500 error returned
  - 1 in 10 chance a response code of 400
  - 90% chance HTTP 200 ok result: { "branch": "branch "}

### /ping

### Request Format Json
```
{
  "journeyId": "8d235358-367e-402a-b9e7-356963f4c815",
  "journeyKey": "journey-key-here",
  "journeyVersion": 3,
  "activityId": "901d36bb-9877-43a2-935b-cb8d62443526",
  "activityKey": "activity-key-here",
  "workItems": [
    {
      "key": "work item key - instance of this object (contact) going through this activity this time",
      "referenceKey": "contact key (or in future other key) here",
      "data": {
        "myInput1": "some value",
        "myInput2": 123
      }
    }
    ...
  ]
}
```


### Response Format Json
```
{
    "workItems": [
        {
            "key": "work item key",
            "data": {
                "output1": "output value",
                "output2": 234,
                "branchResult": "branch-3" // RESERVED KEY
            },
            "status": 200 // Valid http status codes
        },
        {
            "key": "work-item-2",
            "status": 202 // Accepted, will respond asynchronously
        },
        ...
    ]
}
```
