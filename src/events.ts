/** @class Handles SNS events */
'use strict';
export default class Events {
    sns:any;
    eventTopicArn:string;
    mandrill:any;
    listeners: any = [];

    constructor(sns: any, eventTopicArn:string, mandrill:any) {
        this.sns = sns;
        this.eventTopicArn = eventTopicArn;
        this.mandrill = mandrill;
    }

    listen(event:any, callback:any) {
        this.listeners[event] = callback;
    }

    sendEmail = async (templateName: string, recipient: string, mergeVars: any) => {
        return new Promise((resolve, reject) => {
            const templateData = {
                template_name: templateName,
                template_content: [],
                message: {
                    to: [recipient],
                    global_merge_vars: mergeVars
                }
            };

            this.mandrill.messages.sendTemplate(
                templateData, resolve, reject
            );
        });
    };

    sendTransactionalEmail = async (recipient: string, subject: string, header:string, content:string) => {
        let mergeVars = [
            {
                name: 'HEADER',
                content: header
            },
            {
                name: 'CONTENT',
                content: content
            }
        ];

        return new Promise((resolve, reject) => {
            const templateData = {
                template_name: process.env.MANDRILL_TEMPLATE,
                template_content: [],
                message: {
                    to: [recipient],
                    subject: subject,
                    global_merge_vars: mergeVars
                }
            };

            this.mandrill.messages.sendTemplate(
                templateData, resolve, reject
            );
        });
    };

    publishSnsEvent = async (name:string, instanceData:any, changedFields:any) => {
        console.log('Events: Publishing SNS notification for event "' + name + '"');

        let message = JSON.stringify({
            'Event': name,
            'Instance': instanceData,
            'ChangedFields': changedFields,
        });

        var snsPublishPromise = this.sns.publish({
            Message: message,
            TopicArn: this.eventTopicArn
        }).promise();

        try {
            await snsPublishPromise;
            return Promise.resolve({ name: name, success: true });

        } catch (err) {
            console.log(err);
            return Promise.resolve({ name: name, success: false });
        }
    }

    handleCloudWatchEvent(record:any) {
        var message = record.Message;
        if (message.Event == undefined) {
            console.warn('Events: Received CloudWatch Event notification that did not contain an "Event" key.');
            return;
        }

        if (this.listeners[message.Event] == undefined) {
            console.log('Events: Received CloudWatch Event notification for unknown event "' + message.Event + '"');
            return;
        }

        console.log('Events: Received CloudWatch Event notification for event "' + message.Event + '"');
        return this.listeners[message.Event]();
    };


    handleSnsEvent(record:any) {
        var message = JSON.parse(record.Sns.Message);
        if (message.Event == undefined) {
            console.warn('Events: Received SNS notification that did not contain an "Event" key.');
            return;
        }

        if (this.listeners[message.Event] == undefined) {
            console.log('Events: Received SNS notification for unknown event "' + message.Event + '"');
            return;
        }

        console.log('Events: Received SNS notification for event "' + message.Event + '"');
        return this.listeners[message.Event](message.Instance, message.ChangedFields);
    };

    handleEvent(event:any) {
        const emptyPromise = Promise.resolve({});

        if (event.Records == undefined) {
            console.log('Events: Encountered unsupported event that does not conform to expected schema');
            console.log(event);
            return Promise.resolve({ errors: ['Function/application root'] });
        }

        if (event.Records.length != 1) {
            console.log('Events: Expected exactly 1 record, received ' + event.Records.length);
            console.log(event);
            return emptyPromise;
        }

        var record = event.Records[0];

        var output;
        if (record.EventSource == 'aws:sns') {
            console.log('SNS event');
            console.log(JSON.stringify(event));
            output = this.handleSnsEvent(record);
        } else if (record.EventSource == 'aws:events') {
            console.log('Other SNS event');
            console.log(JSON.stringify(event));
            output = this.handleCloudWatchEvent(record);
        } else {
            console.log('Events: Encountered unsupported event source, expected one of "aws:sns" or "aws:events"');
            console.log(JSON.stringify(event));
            return emptyPromise;
        }

        if (!output) {
            return emptyPromise;
        }

        return output;
    };

}
