export {
  createConversation,
  getConversation,
  listConversations,
  getConversationHistory,
  renameConversation,
  deleteConversation,
  deleteAllConversations,
  getMessages,
  saveMessages,
  upsertMessages,
  updateMessage,
  deleteTrailingMessages,
  voteMessage,
  getVotes,
  clearVote,
  updateConversationMetadata,
} from "./service";
export {
  setConversationVisibility,
  setConversationSharing,
  conversationSharing,
  getPublicConversation,
  getPublicMessages,
  shareRef,
} from "./sharing";
export type { ConversationSharing, ConversationVisibility } from "./sharing";
export { getMessage, getMessagesByIds, getRecentMessages } from "./history";

export {
  ConversationServiceError,
  isConversationServiceError,
  type ConversationServiceErrorCode,
} from "./errors";

export type {
  ConversationActor,
  Conversation,
  InsertConversation,
  Message,
  InsertMessage,
  Vote,
  InsertVote,
  ConversationMetadata,
} from "./types";
