const onInitActivity = {
    "name": "Redemption Code Engagement",
    "id": "0440a8d8-5c96-43ab-bacc-2a585c2d2a53",
    "key": "REST-2",
    "type": "REST",
    "arguments": {
        "executionMode": "{{Context.ExecutionMode}}",
        "definitionId": "{{Context.DefinitionId}}",
        "activityId": "{{Activity.Id}}",
        "contactKey": "{{Context.ContactKey}}",
        "execute": {
            "inArguments": [
                {
                    "discount": "{{Interaction.REST-3.discount}}"
                },
                {
                    "discountCode": "{{Interaction.REST-3.discountCode}}"
                }
            ],
            "outArguments": [],
            "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/execute"
        },
        "testExecute": "",
        "startActivityKey": "{{Context.StartActivityKey}}",
        "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
        "requestObjectId": "{{Context.RequestObjectId}}"
    },
    "configurationArguments": {
        "save": {
            "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/save"
        },
        "testSave": "",
        "publish": {
            "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/publish"
        },
        "testPublish": "",
        "unpublish": "",
        "stop": {
            "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/stop"
        },
        "testStop": "",
        "testUnpublish": "",
        "partnerActivityId": "",
        "validate": {
            "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/validate"
        },
        "testValidate": "",
        "outArgumentSchema": {}
    },
    "metaData": {
        "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/images/icon.svg",
        "category": "customer",
        "iconSmall": "",
        "statsContactIcon": "",
        "original_icon": "images/icon.svg",
        "isConfigured": true
    },
    "schema": {
        "arguments": {
            "execute": {
                "inArguments": [
                    {
                        "discountCode": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "In",
                            "readOnly": false,
                            "access": "Visible"
                        },
                        "discount": {
                            "dataType": "Number",
                            "isNullable": false,
                            "direction": "In",
                            "readOnly": false,
                            "access": "Visible"
                        }
                    }
                ],
                "outArguments": []
            }
        }
    },
    "editable": true,
    "outcomes": [
        {
            "arguments": {
                "branchResult": "no_activity"
            },
            "metaData": {
                "label": "No Activity",
                "invalid": false
            },
            "key": "72997ab9-896e-472f-9551-629a26d2e0ab",
            "next": "WAITBYDURATION-1"
        },
        {
            "arguments": {
                "branchResult": "viewed_item"
            },
            "metaData": {
                "label": "Viewed Item",
                "invalid": false
            },
            "key": "9e275a12-6216-4526-94f0-0d4767faa7b8",
            "next": "WAITBYDURATION-2"
        },
        {
            "arguments": {
                "branchResult": "abandoned_cart"
            },
            "metaData": {
                "label": "Abandoned Cart",
                "invalid": false
            },
            "key": "8959088e-5d23-4522-b25a-856d06d23763",
            "next": "REST-3"
        },
        {
            "arguments": {
                "branchResult": "purchased_item"
            },
            "metaData": {
                "label": "Purchased Item",
                "invalid": false
            },
            "key": "0bb3b908-3e88-49e8-bd64-05ba820ac9c2",
            "next": "WAITBYDURATION-4"
        },
        {
            "arguments": {
                "branchResult": "invalid_code"
            },
            "metaData": {
                "label": "Invalid Code",
                "invalid": false
            },
            "key": "9027e384-6b1e-4380-b61c-fce51e76446d",
            "next": "WAITBYDURATION-5"
        }
    ],
    "errors": null
};

const requestedInteractionDefaults = {
    "email": [
        "{{Event.DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732.\"Email\"}}"
    ],
    "mobileNumber": [],
    "transactionKeys": null,
    "properties": {
        "analyticsTracking": {
            "enabled": false,
            "analyticsType": "google",
            "urlDomainsToTrack": []
        }
    }
};

const requestedInteraction = {
    "id": "c84b8fb2-bb59-4402-b878-f28fa263e8d7",
    "version": 4,
    "name": "Journey Name",
    "description": "",
    "workflowApiVersion": 1,
    "entryMode": "MultipleEntries",
    "activities": [
        {
            "key": "REST-1",
            "name": "Issue 15% Discount",
            "description": "",
            "type": "REST",
            "outcomes": [
                {
                    "key": "686b5fff-3dc9-4277-b859-776a9d58a05b",
                    "next": "WAITBYDURATION-9",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    }
                }
            ],
            "schema": {
                "arguments": {
                    "execute": {
                        "inArguments": [],
                        "outArguments": [
                            {
                                "discountCode": {
                                    "dataType": "Text",
                                    "isNullable": false,
                                    "direction": "Out",
                                    "readOnly": false,
                                    "access": "Visible"
                                },
                                "discount": {
                                    "dataType": "Number",
                                    "isNullable": false,
                                    "direction": "Out",
                                    "readOnly": false,
                                    "access": "Visible"
                                }
                            }
                        ]
                    }
                }
            },
            "metaData": {
                "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/images/icon.svg",
                "category": "customer",
                "iconSmall": "",
                "statsContactIcon": "",
                "original_icon": "images/icon.svg",
                "isConfigured": true
            },
            "arguments": {
                "executionMode": "{{Context.ExecutionMode}}",
                "definitionId": "{{Context.DefinitionId}}",
                "activityId": "{{Activity.Id}}",
                "contactKey": "{{Context.ContactKey}}",
                "execute": {
                    "inArguments": [
                        {
                            "discount": "15"
                        }
                    ],
                    "outArguments": [],
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/execute",
                    "timeout": 10000,
                    "retryCount": 3,
                    "retryDelay": 0
                },
                "testExecute": "",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
                "requestObjectId": "{{Context.RequestObjectId}}"
            },
            "configurationArguments": {
                "save": "",
                "testSave": "",
                "publish": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/publish"
                },
                "testPublish": "",
                "unpublish": "",
                "stop": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/stop"
                },
                "testStop": "",
                "testUnpublish": "",
                "partnerActivityId": "",
                "validate": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/validate"
                },
                "testValidate": "",
                "outArgumentSchema": {
                    "discountCode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Visible"
                    },
                    "discount": {
                        "dataType": "Number",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Visible"
                    }
                },
                "applicationExtensionKey": "104a5141-b917-4c10-ad79-eccfd8cc7167"
            }
        },
        {
            "key": "WAITBYDURATION-9",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "c08f32ca-e08a-4223-952e-16a1bb148d57",
                    "next": "REST-2",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    }
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "5e378903-f3c6-44d2-a814-901980bc4698",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        },
        {
            "key": "REST-2",
            "name": "My Split Activity",
            "description": "",
            "type": "REST",
            "outcomes": [
                {
                    "key": "72997ab9-896e-472f-9551-629a26d2e0ab",
                    "next": "WAITBYDURATION-1",
                    "arguments": {
                        "branchResult": "no_activity"
                    },
                    "metaData": {
                        "label": "No Activity",
                        "invalid": false
                    }
                },
                {
                    "key": "9e275a12-6216-4526-94f0-0d4767faa7b8",
                    "next": "WAITBYDURATION-2",
                    "arguments": {
                        "branchResult": "viewed_item"
                    },
                    "metaData": {
                        "label": "Viewed Item",
                        "invalid": false
                    }
                },
                {
                    "key": "8959088e-5d23-4522-b25a-856d06d23763",
                    "next": "REST-3",
                    "arguments": {
                        "branchResult": "abandoned_cart"
                    },
                    "metaData": {
                        "label": "Abandoned Cart",
                        "invalid": false
                    }
                },
                {
                    "key": "0bb3b908-3e88-49e8-bd64-05ba820ac9c2",
                    "next": "WAITBYDURATION-4",
                    "arguments": {
                        "branchResult": "purchased_item"
                    },
                    "metaData": {
                        "label": "Purchased Item",
                        "invalid": false
                    }
                },
                {
                    "key": "9027e384-6b1e-4380-b61c-fce51e76446d",
                    "next": "WAITBYDURATION-5",
                    "arguments": {
                        "branchResult": "invalid_code"
                    },
                    "metaData": {
                        "label": "Invalid Code",
                        "invalid": false
                    }
                }
            ],
            "schema": {
                "arguments": {
                    "execute": {
                        "inArguments": [
                            {
                                "discountCode": {
                                    "dataType": "Text",
                                    "isNullable": false,
                                    "direction": "In",
                                    "readOnly": false,
                                    "access": "Visible"
                                },
                                "discount": {
                                    "dataType": "Number",
                                    "isNullable": false,
                                    "direction": "In",
                                    "readOnly": false,
                                    "access": "Visible"
                                }
                            }
                        ],
                        "outArguments": []
                    }
                }
            },
            "metaData": {
                "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/images/icon.svg",
                "category": "customer",
                "iconSmall": "",
                "statsContactIcon": "",
                "original_icon": "images/icon.svg",
                "isConfigured": true
            },
            "arguments": {
                "executionMode": "{{Context.ExecutionMode}}",
                "definitionId": "{{Context.DefinitionId}}",
                "activityId": "{{Activity.Id}}",
                "contactKey": "{{Context.ContactKey}}",
                "execute": {
                    "inArguments": [
                        {
                            "discount": "{{Context.discount}}"
                        },
                        {
                            "discountCode": "{{Context.discountCode}}"
                        }
                    ],
                    "outArguments": [],
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/execute"
                },
                "testExecute": "",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
                "requestObjectId": "{{Context.RequestObjectId}}"
            },
            "configurationArguments": {
                "save": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/save"
                },
                "testSave": "",
                "publish": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/publish"
                },
                "testPublish": "",
                "unpublish": "",
                "stop": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/stop"
                },
                "testStop": "",
                "testUnpublish": "",
                "partnerActivityId": "",
                "validate": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/validate"
                },
                "testValidate": "",
                "outArgumentSchema": {},
                "applicationExtensionKey": "c1d8e65d-8551-4501-a9c0-af8224aa6dc9"
            }
        },
        {
            "key": "WAITBYDURATION-1",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "a5563a06-a135-4b78-a57c-55d276e904b8",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    },
                    "next": null
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "3a40a934-9f64-4b66-9658-26baa4452504",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        },
        {
            "key": "WAITBYDURATION-2",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "e14fb4c3-e503-40e6-9497-aa9475ca0b11",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    },
                    "next": null
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "fe043dc7-db68-4825-a0f9-a19727349e77",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        },
        {
            "type": "REST",
            "key": "REST-3",
            "name": "Issue 20% Discount",
            "outcomes": [
                {
                    "key": "5288567f-b7b9-49ba-9877-a675b27b3705",
                    "next": "WAITBYDURATION-3",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    }
                }
            ],
            "schema": {
                "arguments": {
                    "execute": {
                        "inArguments": [],
                        "outArguments": [
                            {
                                "discountCode": {
                                    "dataType": "Text",
                                    "isNullable": false,
                                    "direction": "Out",
                                    "readOnly": false,
                                    "access": "Visible"
                                },
                                "discount": {
                                    "dataType": "Number",
                                    "isNullable": false,
                                    "direction": "Out",
                                    "readOnly": false,
                                    "access": "Visible"
                                }
                            }
                        ]
                    }
                }
            },
            "description": "",
            "metaData": {
                "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/images/icon.svg",
                "category": "customer",
                "iconSmall": null,
                "statsContactIcon": null,
                "original_icon": "images/icon.svg",
                "isConfigured": true
            },
            "arguments": {
                "execute": {
                    "inArguments": [
                        {
                            "discount": "20"
                        }
                    ],
                    "outArguments": [],
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/execute",
                    "timeout": 10000,
                    "retryCount": 3,
                    "retryDelay": 0
                }
            },
            "configurationArguments": {
                "publish": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/publish"
                },
                "validate": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/validate"
                },
                "stop": {
                    "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/stop"
                },
                "applicationExtensionKey": "104a5141-b917-4c10-ad79-eccfd8cc7167"
            }
        },
        {
            "key": "WAITBYDURATION-3",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "1abd91de-4b01-438e-b7d1-d4219715fa2b",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    },
                    "next": null
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "3b5602cd-17fb-4b39-b922-23d828fc1f5d",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        },
        {
            "key": "WAITBYDURATION-4",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "3c44a48f-042d-4833-b288-2557613be3e7",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    },
                    "next": null
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "2f2f2ecf-1afc-44cb-ae67-fef335b03edd",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        },
        {
            "key": "WAITBYDURATION-5",
            "name": "1 minute",
            "description": "",
            "type": "WAIT",
            "outcomes": [
                {
                    "key": "fbc33aea-3924-42fe-885a-911dff080f18",
                    "arguments": {},
                    "metaData": {
                        "invalid": false
                    },
                    "next": null
                }
            ],
            "schema": {
                "arguments": {
                    "endDate": {
                        "dataType": "Date",
                        "isNullable": false,
                        "direction": "Out",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitEndDateAttributeDataBound": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitDefinitionId": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitForEventId": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "executionMode": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "startActivityKey": {
                        "dataType": "Text",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    },
                    "waitQueueId": {
                        "dataType": "LongNumber",
                        "isNullable": true,
                        "direction": "In",
                        "readOnly": false,
                        "access": "Hidden"
                    }
                }
            },
            "metaData": {
                "isConfigured": true,
                "isExtended": false,
                "waitType": "duration",
                "guidanceCardKey": "",
                "uiType": "WAITBYDURATION"
            },
            "arguments": {
                "waitEndDateAttributeDataBound": "",
                "waitDefinitionId": "52b04ac2-4d95-4ff6-b687-a41cc5041861",
                "waitForEventId": "",
                "executionMode": "{{Context.ExecutionMode}}",
                "startActivityKey": "{{Context.StartActivityKey}}",
                "waitQueueId": "{{Context.WaitQueueId}}"
            },
            "configurationArguments": {
                "waitDuration": 1,
                "waitUnit": "MINUTES",
                "specifiedTime": "00:00",
                "timeZone": "Eastern Standard Time",
                "description": "",
                "waitEndDateAttributeExpression": "",
                "specificDate": "",
                "waitForEventKey": ""
            }
        }
    ],
    "persistenceModel_asyncStopping": {},
    "persistenceModel_pausing": {},
    "persistenceModel_resuming": {},
    "metaData": {
        "highThroughputSending": {
            "email": false
        }
    },
    "key": "6afdb8ca-312e-d6bd-f7ca-4f91ca68d7db",
    "createdDate": "2020-04-22T01:58:23.000Z",
    "modifiedDate": "2020-04-22T02:47:31.000Z",
    "goals": [],
    "exits": [],
    "definitionType": "Multistep",
    "channel": "",
    "executionMode": "Production",
    "categoryId": 20718,
    "definitionId": "d59cff7e-a90f-4af5-8cee-5451044fcdda",
    "scheduledStatus": "Draft",
    "defaults": {
        "email": [
            "{{Event.DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732.\"Email\"}}"
        ],
        "mobileNumber": [],
        "transactionKeys": null,
        "properties": {
            "analyticsTracking": {
                "enabled": false,
                "analyticsType": "google",
                "urlDomainsToTrack": []
            }
        }
    },
    "triggers": [
        {
            "key": "TRIGGER",
            "name": "TRIGGER",
            "description": "",
            "type": "EmailAudience",
            "arguments": {
                "startActivityKey": "{{Context.StartActivityKey}}",
                "dequeueReason": "{{Context.DequeueReason}}",
                "lastExecutedActivityKey": "{{Context.LastExecutedActivityKey}}",
                "filterResult": "true"
            },
            "configurationArguments": {
                "filterDefinitionId": "00000000-0000-0000-0000-000000000000",
                "criteria": "",
                "schemaVersionId": 0
            },
            "metaData": {
                "sourceInteractionId": "00000000-0000-0000-0000-000000000000",
                "eventDefinitionId": "A5599B62-B80F-4237-978C-9EF48C115D68",
                "eventDefinitionKey": "DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732",
                "chainType": "none",
                "configurationRequired": false,
                "iconUrl": "/images/icon-data-extension.svg",
                "title": "Data Extension",
                "entrySourceGroupConfigUrl": "jb:///data/entry/audience/entrysourcegroupconfig.json"
            }
        }
    ],
    "transactionKeys": null,
    "status": "DRAFT"
};


export default {
    onInitActivity: onInitActivity,
    requestedInteractionDefaults: requestedInteractionDefaults,
    requestedInteraction: requestedInteraction
}