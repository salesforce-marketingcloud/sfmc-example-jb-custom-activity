# SFMC Example Activity
This example can be viewed at https://sfmc-example-custom-activity.herokuapp.com
----


### Running the service Locally
```
# Install the dependencies
npm install

# Build to run locally
npm run-script buildDev

# Start the service
npm start
```
----
## Examples


### /modules/ping
Simple example of the custom activity.


### /modules/customsplit



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
