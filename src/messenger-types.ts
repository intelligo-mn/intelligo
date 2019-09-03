export interface Error {
  message: string;
  type: string;
  code: number;
  error_subcode: number;
  fbtrace_id: string;
}

// Send Api

export type SendAPIRequest = SenderActionRequest | MessageRequest;

export interface SendAPIResponse {
  recipient_id: string;
  message_id: string;
}

export interface SenderActionRequest {
  recipient: Recipient;
  sender_action: SenderAction;
}

// Message Request
export interface MessageRequest {
  // The messaging type of the message being sent.
  messaging_type: MessagingType;
  recipient: Recipient;
  message: Message;
  // Push notification type
  // REGULAR: sound/vibration
  // SILENT_PUSH: on-screen notification only
  // NO_PUSH: no notification
  notification_type?: NotificationType;
  // The message tag string
  tag?: string;
}

export type SenderAction = 'typing_on' | 'typing_off' | 'mark_seen';

export type MessagingType = 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG';

export type NotificationType = 'REGULAR' | 'SILENT_PUSH' | 'NO_PUSH';

export interface Recipient {
  id: string;
  phone_number?: string;
  user_ref?: string;
  name?: RecipientName;
}

export interface RecipientName {
  first_name: string;
  last_name: string;
}

export interface Message {
  text?: string;
  attachment?: Attachment;
  quick_replies?: QuickReply;
  metadata?: string;
}

export interface QuickReply {
  content_type: QuickReplyContentType;
  title?: string;
  payload?: string | number;
  image_url?: string;
}

export type QuickReplyContentType = 'text' | 'location' | 'user_phone_number' | 'user_email';

// Webhook API

export interface WebhookEvent {
  object: 'page';
  entry: WebhookMessagingEntry[];
}

export interface WebhookEntry {
  id: string;
  time: number;
}

export interface WebhookMessagingEntry extends WebhookEntry {
  messaging: WebhookMessagingEvent[];
}

export interface WebhookStandbyEntry extends WebhookEntry {
  standby: WebhookStandbyEvent[];
}

export interface WebhookMessagingEvent {
  sender?: ConversationParticipant;
  receiver: ConversationParticipant;
  timestamp: number;
}

export interface WebhookStandbyEvent extends WebhookMessagingEvent {}

export interface MessageReceivedEvent extends WebhookStandbyEvent {
  message: {
    mid: string;
    text?: string;
    attachments?: Attachment[];
    quick_reply?: {
      payload: string;
    };
  };
}

export interface AccountLinkingEvent extends WebhookMessagingEvent {
  account_linking: {
    status: 'linked' | 'unlinked';
    authorization_code?: string;
  };
}

export interface DeliveryEvent extends WebhookStandbyEvent {
  delivery: {
    mids: string[];
    watermark: number;
    seq: number;
  };
}

export interface MessageEchoEvent extends WebhookMessagingEvent {
  message: {
    is_echo: boolean;
    app_id: string;
    metadata: string;
    mid: string;
    text?: string;
    attachments?: Attachment[];
  };
}

export interface MessageReadEvent extends WebhookStandbyEvent {
  read: {
    watermark: number;
    seq: number;
  };
}

export interface CheckoutUpdateEvent extends WebhookMessagingEvent {
  checkout_update: {
    payload: string;
    shipping_address: Address;
  };
}

export interface GamePlayEvent extends WebhookMessagingEvent {
  game_play: {
    game_id: string;
    player_id: string;
    context_type: GamePlayContextType;
    context_id: string;
    score: number;
    payload: string;
  };
}

export interface PassThreadControlEvent extends WebhookMessagingEvent {
  pass_thread_control: {
    new_owner_app_id: string;
    metadata: string;
  };
}

export interface TakeThreadControlEvent extends WebhookMessagingEvent {
  take_thread_control: {
    previous_owner_app_id: string;
    metadata: string;
  };
}

export interface RequestThreadControlEvent extends WebhookMessagingEvent {
  request_thread_control: {
    requested_owner_app_id: string;
    metadata: string;
  };
}

export interface AppRolesEvent extends WebhookMessagingEvent {
  app_roles: {};
}

export interface OptInEvent extends WebhookMessagingEvent {
  optin: {
    ref: string;
    user_ref?: string;
  };
}

export interface PaymentEvent extends WebhookMessagingEvent {
  payload: string;
  requested_user_info: UserInfo;
  payment_credential: PaymentCredential;
  transaction_amount: TransactionAmount;
}

export interface PolicyEnforcementEvent extends WebhookMessagingEvent {
  policy_enforcement: {
    action: PolicyEnforcementAction;
    reason?: string;
  };
}

export interface PostbackEvent extends WebhookStandbyEvent {
  title: string;
  payload: string;
  referral?: Referral;
}

export interface ReferralEvent extends WebhookMessagingEvent {
  referral: Referral;
}

export interface Referral {
  source: ReferralSource;
  type: 'OPEN_THREAD';
  ref?: string;
  referrer_uri?: string;
  ad_id?: string;
}

export interface ConversationParticipant {
  id: string;
}

export interface UserInfo {
  shipping_address: Address;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}

export interface PaymentCredential {
  provider_type: string;
  charge_id: string;
  tokenized_card: string;
  tokenized_cvv: string;
  token_expiry_month: string;
  token_expiry_year: string;
  fb_payment_id: string;
}

export interface TransactionAmount {
  currency: string;
  amount: string;
}

export type PolicyEnforcementAction = 'warning' | 'block' | 'unblock';

export type ReferralSource = 'MESSENGER_CODE' | 'DISCOVER_TAB' | 'ADS' | 'SHORTLINK' | 'CUSTOMER_CHAT_PLUGIN';

export type GamePlayContextType = 'SOLO' | 'THREAD' | 'GROUP';

export interface BroadcastMessageCreationRequest {
  messages: BroadcastMessage[];
}

export interface DynamicTextMessage {
  dynamic_text: {
    text: string;
    fallback_text: string;
  };
}

export type BroadcastMessage = DynamicTextMessage | Message;

export interface BroadcastMessageCreationResponse {
  message_creative_id: number;
}

export interface BroadcastMessageSendRequest {
  message_creative_id: number;
  notification_type: 'REGULAR' | 'SILENT_PUSH' | 'NO_PUSH';
  messaging_type: 'MESSAGE_TAG';
  tag: 'NON_PROMOTIONAL_SUBSCRIPTION';
}

export interface BroadcastMessageSendResponse {
  broadcast_id: number;
}

// Handover protocol

export interface HandoverProtocolRequest {
  recipient: {
    id: number;
  };
  metadata?: string;
}

export interface HandoverProtocolSucessResponse {
  success: boolean;
}

export interface PassThreadControlRequest extends HandoverProtocolRequest {
  target_app_id: number;
}

export type RequestThreadControlRequest = HandoverProtocolRequest;

export type TakeThreadControlRequest = HandoverProtocolRequest;

export interface MessageReceiver {
  id: number;
  name: string;
}

export interface SecondaryReceiversList {
  data: MessageReceiver[];
}

// Profile

export interface ProfileProperties {
  account_linking?: string;
  get_started?: GetStartedProperty;
  greeting?: Greetings[];
  whitelisted_domains?: string[];
  payment_settings?: PaymentSettings;
  target_audience?: TargetAudience;
  home_url?: BotHomeUrl;
}

export interface GetStartedProperty {
  payload: string;
}

export interface Greetings {
  locale: string;
  text: string;
}

export interface PaymentSettings {
  privacy_url?: string;
  public_key?: string;
  testers?: number[];
}

export interface TargetAudience {
  audience_type: 'all' | 'custom' | 'none';
  countries?: TargetCountrySettings;
}

export interface TargetCountrySettings {
  blacklist?: string[];
  whitelist?: string[];
}

export interface BotHomeUrl {
  url: string;
  webview_height_ratio: 'tall';
  webview_share_button?: 'show' | 'hide';
  in_test: boolean;
}


export interface IDMatchingRequest {
  page?: number;
  app?: number;
  access_token: string;
  appsecret_proof: string;
}

export interface IDMatchingResponse {
  paging: IDMatchingPaging;
}

export interface AppIDMatchingResponse extends IDMatchingResponse {
  data: AppIDMatchingData;
}

export interface PageIDMatchingResponse extends IDMatchingResponse {
  data: PageIDMatchingData;
}

export interface AppIDMatchingData {
  id: string;
  app: {
    link: string;
    name: string;
    id: number;
  };
}

export interface PageIDMatchingData {
  id: string;
  page: {
    name: string;
    id: number;
  };
}

export interface IDMatchingPaging {
  cursors: {
    before: string;
    after: string;
  };
}

// Code

export interface MessengerCodeRequest {
  type: 'standard';
  image_size?: number;
  data?: {
    ref?: string;
  };
}

export interface MessengerCodeResponse {
  uri: string;
}

export interface FeatureReviewResponse {
  data: FeatureReviewResult[];
}

export interface FeatureReviewResult {
  feature: string;
  status: FeatureReviewStatus;
}

export type FeatureReviewStatus = 'PENDING' | 'REJECTED' | 'APPROVED' | 'LIMITED';

// Insight

export interface InsightsResponse {
  data: InsightsResponseData;
}

export interface InsightsResponseData {
  name: string;
  values: InsightsResponseValue;
}

export interface InsightsResponseValue {
  value: number | InsightsResponseValueByType;
  end_time: string;
}

export interface InsightsResponseValueByType {
  [key: string]: number;
}

// Sponsored Message

export interface SponsoredMessageSendRequest {
  message_creative_id: number;
  daily_budget: number;
  bid_amount: 400;
  targeting: any;
}

export interface SponsoredMessageSendResponse {
  ad_group_id: number;
  broadcast_id: number;
  success: boolean;
}

// Attachments

export type Attachment =
  | ImageAttachment
  | VideoAttachment
  | AudioAttachment
  | FileAttachment
  | LocationAttachment
  | FallbackAttachment
  | TemplateAttachment;

export interface ImageAttachment {
  type: 'image';
  payload: MultimediaPayload;
}

export interface VideoAttachment {
  type: 'video';
  payload: MultimediaPayload;
}

export interface AudioAttachment {
  type: 'audio';
  payload: MultimediaPayload;
}

export interface FileAttachment {
  type: 'file';
  payload: MultimediaPayload;
}

export interface LocationAttachment {
  type: 'location';
  payload: LocationPayload;
}

export interface FallbackAttachment {
  type: 'fallback';
  payload: null;
  title: string;
  URL: string;
}

export interface TemplateAttachment {
  type: 'template';
  payload: TemplatePayload;
}

export interface MultimediaPayload {
  url?: string;
  is_reusable?: boolean;
  attachment_id?: number;
}

export interface LocationPayload {
  coordinates: {
    lat: number;
    long: number;
  };
}

export type TemplatePayload =
  | ButtonTemplate
  | GenericTemplate
  | ListTemplate
  | MediaTemplate
  | OpenGraphTemplate
  | ReceiptTemplate
  | AirlineBoardingPassTemplate
  | AirlineCheckinTemplate
  | AirlineItineraryTemplate
  | AirlineFlightUpdateTemplate;

export interface ButtonTemplate {
  template_type: 'payload';
  text: string;
  buttons: Button[];
  sharable?: boolean;
}

export interface GenericTemplate {
  template_type: 'generic';
  sharable?: boolean;
  image_aspect_ratio?: string;
  elements: PayloadElement[];
}

export interface ListTemplate {
  template_type: 'list';
  top_element_style?: 'compact' | 'large';
  buttons?: Button[];
  elements: PayloadElement[];
  shareable?: boolean;
}

export interface MediaTemplate {
  template_type: 'media';
  elements: MediaElement[];
  sharable?: boolean;
}

export interface OpenGraphTemplate {
  template_type: 'open_graph';
  elements: OpenGraphElement[];
}

export interface ReceiptTemplate {
  template_type: 'receipt';
  sharable?: boolean;
  recipient_name: string;
  merchant_name?: string;
  order_number: string;
  currency: string;
  payment_method: string;
  timestamp?: string;
  elements: ReceiptElement[];
  address?: Address;
  summary: ReceiptSummary;
  adjustments: ReceiptAdjustment[];
}

export interface AirlineBoardingPassTemplate {
  template_type: 'airline_boarding_pass';
  intro_message: string;
  locale: string;
  theme_color?: string;
  boarding_pass: BoardingPass[];
}

export interface AirlineCheckinTemplate {
  template_time: 'airline_checkin';
  intro_message: string;
  locale: string;
  pnr_number?: string;
  checkin_url: string;
  flight_info: FlightInfo[];
}

export interface AirlineItineraryTemplate {
  template_time: 'airline_itinerary';
  intro_message: string;
  locale: string;
  theme_color?: string;
  pnr_number: string;
  passenger_info: PassengerInfo[];
  flight_info: ItineraryFlightInfo[];
  passenger_segment_info: PassengerSegmentInfo[];
  price_info?: PriceInfo[];
  base_price?: number;
  tax?: number;
  total_price?: number;
  currency: string;
}

export interface AirlineFlightUpdateTemplate {
  template_type: 'airline_update';
  intro_message: string;
  theme_color?: string;
  update_type: AirlineFlightUpdateType;
  locale: string;
  pnr_number?: string;
  update_flight_info: FlightInfo;
}

export interface PayloadElement {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action?: Omit<UrlButton, 'title'>;
  buttons: Button[];
}

export interface MediaElement {
  media_type: 'image' | 'video';
  buttons: Button[];
}

export interface MediaElementWithId extends MediaElement {
  attachment_id: string;
}

export interface MediaElementWithUrl extends MediaElement {
  url: string;
}

export interface OpenGraphElement {
  url: string;
  buttons: Button[];
}

export interface Address {
  id?: string;
  street_1: string;
  street_2?: string;
  city: string;
  postal_code: string;
  state: string;
  country: string;
}

export interface ReceiptSummary {
  subtotal?: number;
  shipping_cost?: number;
  total_tax?: number;
  total_cost: number;
}

export interface ReceiptAdjustment {
  name: string;
  amount: string;
}

export interface ReceiptElement {
  title: string;
  subtitle?: string;
  quatity?: number;
  price: number;
  currency?: string;
  image_url?: string;
}

export interface BoardingPass {
  passenger_name: string;
  pnr_number: string;
  travel_class?: string;
  auxiliary_fields: BoardingPassField[];
  secondary_fields: BoardingPassField[];
  logo_iage_url: string;
  header_image_url?: string;
  header_text_field?: BoardingPassField;
  qr_code?: string;
  barcode_image_url?: string;
  above_bar_code_image_url: string;
  flight_info: FlightInfo;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface BoardingPassField {
  label: string;
  value: string;
}

export interface FlightInfo {
  flight_number: string;
  departure_airport: Airport;
  arrival_airport: Airport;
  flight_schedule: FlightSchedule;
}

export interface Airport {
  airport_code: string;
  city: string;
  terminal?: string;
  gate?: string;
}

export interface DepartureAirport extends Airport {
  terminal: string;
  gate: string;
}

export interface FlightSchedule {
  boarding_time: string;
  departure_time: string;
  arrival_time: string;
}

export interface PassengerInfo {
  passenger_id: string;
  ticket_number?: string;
  name: string;
}

export interface ItineraryFlightInfo extends FlightInfo {
  connection_id: string;
  segment_id: string;
  aircraft_type?: string;
  travel_class: FlightTravelClass;
}

export interface PassengerSegmentInfo {
  segment_id: string;
  passenger_id: string;
  seat: string;
  seat_type: string;
  product_info?: string;
}

export interface PriceInfo {
  title: string;
  amount: number;
  currency?: string;
}

export type AirlineFlightUpdateType = 'delay' | 'gate_change' | 'cancellation';

export type FlightTravelClass = 'economy' | 'business' | 'first_class';

// Buttons

export type Button =
  | BuyButton
  | CallButton
  | GameplayButton
  | LoginButton
  | LogoutButton
  | PostbackButton
  | ShareButton
  | UrlButton;

export interface BuyButton {
  type: 'payment';
  title: 'buy';
  payload: string;
  payment_summary: PaymentSummary;
}

export interface CallButton {
  type: 'phone_number';
  title: string;
  payload: string;
}

export interface GameplayButton {
  type: 'game_play';
  title: string;
  payload?: string;
  game_metadat?: GameMetadata;
}

export interface LoginButton {
  type: 'account_link';
  url: string;
}

export interface LogoutButton {
  type: 'account_unlink';
}

export interface PostbackButton {
  type: 'postback';
  title: string;
  payload: string;
}

export interface ShareButton {
  type: 'element_share';
  share_contents: {
    attachments: {
      type: 'template';
      payload: Message;
    };
  };
}

export interface UrlButton {
  type: 'web_url';
  title: string;
  url: string;
  webview_height_ratio?: string;
  messenger_extensions?: boolean;
  fallback_url?: string;
  webview_share_button?: string;
}

export interface PaymentSummary {
  currency: string;
  is_test_payment?: boolean;
  payment_type: 'FIXED_AMOUNT' | 'FLEXIBLE_AMOUNT';
  merchant_type: string;
  requested_user_info: RequestedUserInfo[];
  price_list: PriceList[];
}

export type RequestedUserInfo = 'shipping_address' | 'contact_name' | 'contact_phone' | 'contact_email';

export interface PriceList {
  label: string;
  amount: string;
}

export interface GameMetadata {
  player_id?: string;
  context_id?: string;
}
