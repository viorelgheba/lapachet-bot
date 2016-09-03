var request = require('request');

const ATTACHMENT_TYPE_IMAGE = 'image';
const ATTACHMENT_TYPE_AUDIO = 'audio';
const ATTACHMENT_TYPE_VIDEO = 'video';
const ATTACHMENT_TYPE_FILE = 'file';

function FacebookService() {}

FacebookService.prototype = {
    sendMarkSeenAction: function (recipientId) {
        var message = {
            sender_action: 'typing_on'
        };

        this.sendMessage(recipientId, message);
    },
    sendTypingOnAction: function (recipientId) {
        var message = {
            sender_action: 'typing_on'
        };

        this.sendMessage(recipientId, message);
    },
    sendTypingOffAction: function (recipientId) {
        var message = {
            sender_action: 'typing_on'
        };

        this.sendMessage(recipientId, message);
    },
    sendTextMessage: function (recipientId, textMessage) {
        var message = {
            text: textMessage
        };

        this.sendMessage(recipientId, message);
    },
    sendImageAttachment: function (recipientId, imageUrl) {
        this.sendAttachment(recipientId, imageUrl, ATTACHMENT_TYPE_IMAGE);
    },
    sendAudioAttachment: function (recipientId, audioUrl) {
        this.sendAttachment(recipientId, audioUrl, ATTACHMENT_TYPE_AUDIO);
    },
    sendVideoAttachment: function (recipientId, videoUrl) {
        this.sendAttachment(recipientId, videoUrl, ATTACHMENT_TYPE_VIDEO);
    },
    sendFileAttachment: function (recipientId, fileUrl) {
        this.sendAttachment(recipientId, fileUrl, ATTACHMENT_TYPE_FILE);
    },
    sendAttachment: function (recipientId, attachmentUrl, attachmentType) {
        var message = {
            attachment: {
                type: attachmentType,
                payload: {
                    url: attachmentUrl
                }
            }
        };

        this.sendMessage(recipientId, message);
    },
    sendGenericTemplate: function (recipientId) {

    },
    sendButtonTemplate: function (recipientId) {

    },
    sendRecipientTemplate: function (recipientId) {

    },
    sendMessage: function (recipientId, message) {
        request({
            url: process.env.FACEBOOK_API_URL,
            qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
            method: 'POST',
            json: {
                recipient: {
                    id: recipientId
                },
                message: message
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    }
};

module.exports = FacebookService;
