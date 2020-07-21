# Salesforce Journey Builder - Custom Activity Examples

This repository contains a number of custom activity examples for Salesforce Journey Builder. These examples are 
intended to help you understand how Journey Builder works and get a head start on building your own custom activities.

## Journey Builder
Journey Builder is a marketing planning tool that integrates the various channels and services in the Salesforce 
ecosystem. The application empowers marketers to manage the customer life cycle by composing a Journey workflow on a 
drag-and-drop canvas.

Learn more about [Journey Builder](https://www.salesforce.com/products/marketing-cloud/journey-management/)

![JB](https://user-images.githubusercontent.com/876030/80716658-4db7ab00-8ace-11ea-9775-9b373cf0a18e.png)

## Getting Started

The quickest way to get started is to install [Node.js](https://nodejs.org/) then run the app locally:
```
# Install package dependencies
npm install

# Run the Express app in development mode
npm run dev
```

A webapp will be available at http://localhost:8080/

You will be greeted with a landing page with links to the various examples we've created.

## Deployment
You can deploy this example to Heroku and start working with Journey Builder Custom Activities Today!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) 


## Examples

### /modules/discount-code
Example of a custom activity that utilizes an external service to generate a discount code where the user inputs the discount percent in the configuration.

[Custom Activities](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/creating-activities.htm)

### /modules/discount-redemption-split
Example of a Rest Decision Split where your application tells the contact which way to go through the journey.

[RestDecision Documentation](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/extending-activities.htm)

### Timeout, Retry and Concurrent Execute of Requests
We support below execution parameters to allow customer to config the timeout, retry. In case customer want to control these settings for each activity, they can use config.js file to show the
config in UI and save it when save the journey.

```
execute.timeout - How long, in milliseconds, before each rest activity in the journey times out. Must be from 1,000 to 100,000 milliseconds. Default is 60,000 milliseconds.
execute.retryCount - How many times to retry each rest activity in the journey after the rest activity times out. Must be from 0 to 5. Default is 0.
execute.retryDelay - How long, in milliseconds, to wait before each rest activity in the journey is retried. Must be from 0 to 10,000 milliseconds. Default is 1,000 milliseconds.
execute.concurrentRequests - How many rest activities to run in parallel. Must be from 1 to 50. Default is 1, which means no concurrent requests. Before you use concurrent requests, test the scalability and performance of the target site. If you observe increased gateway errors or timeouts, consider adding retry and increasing the timeout value.
For details, please go to [Custom Activity Configuration(https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/custom-activity-config.htm)]
```

### Dedupe of requests
When retry count is bigger than 1, our system will retry the request in case of network error, gateway error (5XX) or timeout.  It is recommended that customer to set timeout value to be a large value (such as 10,000 or 30,000) to avoid canceling requests by Journey Builder when server is still sending data.  In case  of retry, it might be possible that service already processed the request, but a duplicate request was sent from Journey Builder due to the above errors and retry.  We recommend customer to implement dedupe logical in their end.  For each request, we include two Guid fields `activityId` and `definitionInstanceId` in the request body.  User can parse the values from the payload and use the combination of these two values as a way to dedupe a request, i.e., when we trying the request, the above two fields are the same, but for different request, the values will be different.

## Contributing
We would like to hear from you if you have questions about these examples or if you have ideas for other 
examples that you would like to see included. Just log a new issue and we'll our best to help!

## License
Source code is licensed under [BSD 3-Clause](./LICENSE.txt)
