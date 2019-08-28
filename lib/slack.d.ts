import { EventEmitter } from 'eventemitter3';
export declare class SlackBot extends EventEmitter {
    token: any;
    name: any;
    disconnect: any;
    wsUrl: any;
    self: any;
    team: any;
    channels: any;
    users: any;
    ims: any;
    groups: any;
    ws: any;
    /**
     * @param {object} params
     * @constructor
     */
    constructor(params: any);
    /**
     * Starts a Real Time Messaging API session
     */
    login(): void;
    /**
     * Establish a WebSocket connection
     */
    connect(): void;
    /**
     * Get channels
     * @returns Promise
     */
    getChannels(): Promise<unknown>;
    /**
     * Get users
     */
    getUsers(): Promise<unknown>;
    /**
     * Get groups
     */
    getGroups(): Promise<unknown>;
    /**
     * Get user by name
     * @param name
     * @returns
     */
    getUser(name: string): Promise<any>;
    /**
     * Get channel by name
     * @param name
     * @returns {object}
     */
    getChannel(name: string): Promise<any>;
    /**
     * Get group by name
     * @param name
     * @returns {object}
     */
    getGroup(name: string): Promise<any>;
    /**
     * Get user by id
     * @param id
     * @returns {object}
     */
    getUserById(id: string): Promise<any>;
    /**
     * Get channel by id
     * @param id
     * @returns {object}
     */
    getChannelById(id: string): Promise<any>;
    /**
     * Get group by id
     * @param id
     * @returns {object}
     */
    getGroupById(id: string): Promise<any>;
    /**
     * Get channel ID
     * @param name
     * @returns
     */
    getChannelId(name: string): Promise<any>;
    /**
     * Get group ID
     * @param name
     * @returns
     */
    getGroupId(name: string): Promise<any>;
    /**
     * Get user ID
     * @param name
     * @returns
     */
    getUserId(name: string): Promise<any>;
    /**
     * Get user by email
     * @param email
     * @returns {object}
     */
    getUserByEmail(email: string): Promise<any>;
    /**
     * Get "direct message" channel ID
     * @param name
     * @returns {vow.Promise}
     */
    getChatId(name: string): any;
    /**
     * Opens a "direct message" channel with another member of your Slack team
     * @param userId
     * @returns {vow.Promise}
     */
    openIm(userId: string): Promise<unknown>;
    /**
     * Get a list of all im channels
     * @returns {vow.Promise}
     */
    getImChannels(): Promise<unknown>;
    /**
     * Posts an ephemeral message to a channel and user
     * @param id - channel ID
     * @param user - user ID
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    postEphemeral(id: string, user: string, text: string, params: any): Promise<unknown>;
    /**
     * Posts a message to a channel by ID
     * @param id - channel ID
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    postMessage(id: string, text: string, params: any): Promise<unknown>;
    /**
     * Updates a message by timestamp
     * @param id - channel ID
     * @param ts - timestamp
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    updateMessage(id: string, ts: string, text: string, params: any): Promise<unknown>;
    /**
     * Posts a message to user by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToUser(name: string, text: string, params: any, cb: any): any;
    /**
     * Posts a message to channel by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToChannel(name: string, text: string, params: any, cb: any): any;
    /**
     * Posts a message to group by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToGroup(name: string, text: string, params: any, cb: any): any;
    /**
     * Common method for posting messages
     * @param type
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     * @private
     */
    _post(type: string, name: string, text: string, params: any, cb: any): any;
    /**
     * Posts a message to group | channel | user
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postTo(name: string, text: string, params: any, cb: any): Promise<any>;
    /**
     * Remove @ or # character from group | channel | user name
     * @param name
     * @returns
     */
    _cleanName(name: string): string;
    /**
     * Preprocessing of params
     * @param params
     * @returns {object}
     * @private
     */
    _preprocessParams(params: any): any;
    /**
     * Send request to API method
     * @param methodName
     * @param {object} params
     * @returns {vow.Promise}
     * @private
     */
    api(methodName?: string, params?: any): Promise<unknown>;
}
