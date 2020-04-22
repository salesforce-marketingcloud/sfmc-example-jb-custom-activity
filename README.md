Salesforce - Journey Builder - Custom Activity
----
You can deploy this example to Heroku!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) 

### Running the service Locally
```
# Install the dependencies
npm install

# Build to run locally in development mode
npm run dev
```

Navigate to http://localhost:8080/

----
## Examples


### /modules/discount-code
Example of a custom activity that utilizes an external service to generate a discount code where the user inputs the discount percent in the configuration.


### /modules/discount-redemption-split
Example of a Rest Decision Split where your application tells the contact which way to go through the journey. The decision split relies
