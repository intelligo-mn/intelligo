"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const my_profile_data_1 = require("./myProfile/my-profile.data");
const my_contacts_data_1 = require("./myContacts/my-contacts.data");
const user_contacts_data_1 = require("./contacts/user-contacts.data");
const chat_messages_data_1 = require("./chat/chat-messages.data");
const list_data_1 = require("./list/list.data");
const tabs_over_card_data_1 = require("./tabs-over-card/tabs-over-card.data");
const mail_data_1 = require("./mail/mail.data");
class MaterialLabDbService {
    createDb() {
        return {
            'my-profile': my_profile_data_1.myProfileData.myProfile,
            'my-contacts': my_contacts_data_1.myContactData.myContacts,
            'user-contacts': user_contacts_data_1.ContactsUserData.user,
            'chat-messages': chat_messages_data_1.chatMessagesData.chatMessages,
            'list': list_data_1.listData.list,
            'tabs-over-card': tabs_over_card_data_1.tabsOverCardData.tabsOverCard,
            'mail': mail_data_1.mailData.mail
        };
    }
}
exports.MaterialLabDbService = MaterialLabDbService;
//# sourceMappingURL=MaterialLabDb.service.js.map