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

## Contributing
We would like to hear from you if you have questions about these examples or if you have ideas for other 
examples that you would like to see included. Just log a new issue and we'll our best to help!

## License
Source code is licensed under [BSD 3-Clause](./licenses.txt)
