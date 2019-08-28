import { EventEmitter } from 'eventemitter3';
export declare class MessengerBot extends EventEmitter {
    PAGE_ACCESS_TOKEN: any;
    VALIDATION_TOKEN: any;
    APP_SECRET: any;
    FB_URL: any;
    app: any;
    webhook: any;
    intelligoClassifier: any;
    /**
     * @param params
     * @constructor
     */
    constructor(params: any);
    learn(data: any): void;
    answer(question: any): any;
    initWebhook(): void;
    handleEvent(event: any): void;
    verifyRequestSignature(req: any, res: any, buf: any): void;
    addGreeting(text: string): void;
    addGetStartedButton(): void;
    addPersistentMenu(persistent_menu: any): void;
    removePersistentMenu(): void;
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     * @param {String} messageText
     */
    sendTextMessage(recipientId: any, messageText: string): void;
    /**
     * @param {Recipient|String} recipientId
     * @param {String} type Must be 'image', 'audio', 'video' or 'file'.
     * @param {String} url URL of the attachment.
     */
    sendAttachment(recipientId: any, type: any, url: any): void;
    /**
     * @param {Recipient|String} recipientId
     * @param {Array.<Element>} elements
     */
    sendGenericMessage(recipientId: any, elements: any): void;
    sendButtonMessage(recipientId: any, text: any, buttons: any): void;
    callSendAPI(messageData: any): void;
    /**
     * @param {Recipient|String} recipientId
     * @param greetings
     * @param text
     */
    sendWelcome(recipientId: any, greetings: any, text: any): void;
    receivedPostback(event: any): void;
    sendReadReceipt(recipientId: any): void;
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     */
    sendTypingOn(recipientId: any): void;
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     */
    sendTypingOff(recipientId: any): void;
    getRandomNumber(minimum: number, maxmimum: number): number;
    randomIntFromInterval(min: number, max: number): number;
    textMatches(message: string, matchString: string): boolean;
}
