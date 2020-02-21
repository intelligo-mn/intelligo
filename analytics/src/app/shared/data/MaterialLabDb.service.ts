import { InMemoryDbService } from "angular-in-memory-web-api";
import { myProfileData } from "./myProfile/my-profile.data";
import { myContactData } from "./myContacts/my-contacts.data";
import { ContactsUserData } from "./contacts/user-contacts.data";
import { chatMessagesData } from "./chat/chat-messages.data";
import { listData } from "./list/list.data";
import { tabsOverCardData } from "./tabs-over-card/tabs-over-card.data";
import { mailData } from "./mail/mail.data";
export class MaterialLabDbService implements InMemoryDbService {
	createDb() {
		return {
			'my-profile': myProfileData.myProfile,
			'my-contacts': myContactData.myContacts,
			'user-contacts': ContactsUserData.user,
			'chat-messages': chatMessagesData.chatMessages,
			'list': listData.list,
			'tabs-over-card': tabsOverCardData.tabsOverCard,
			'mail': mailData.mail
		};
	}
}
