"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
var SectionType;
(function (SectionType) {
    SectionType["Image"] = "Image";
    SectionType["Text"] = "Text";
    SectionType["Graph"] = "Graph";
    SectionType["Gif"] = "Gif";
    SectionType["Audio"] = "Audio";
    SectionType["Video"] = "Video";
    SectionType["Link"] = "Link";
    SectionType["EmbeddedHtml"] = "EmbeddedHtml";
    SectionType["Carousel"] = "Carousel";
    SectionType["PrintOTP"] = "PrintOTP";
})(SectionType = exports.SectionType || (exports.SectionType = {}));
var CarouselButtonType;
(function (CarouselButtonType) {
    CarouselButtonType["NextNode"] = "NextNode";
    CarouselButtonType["DeepLink"] = "DeepLink";
    CarouselButtonType["OpenUrl"] = "OpenUrl";
})(CarouselButtonType = exports.CarouselButtonType || (exports.CarouselButtonType = {}));
var NodeType;
(function (NodeType) {
    NodeType["ApiCall"] = "ApiCall";
    NodeType["Combination"] = "Combination";
    NodeType["Card"] = "Card";
    NodeType["JumpToBot"] = "JumpToBot";
    NodeType["Condition"] = "Condition";
    NodeType["HandoffToAgent"] = "HandoffToAgent";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var APIMethod;
(function (APIMethod) {
    APIMethod["GET"] = "GET";
    APIMethod["POST"] = "POST";
    APIMethod["PUT"] = "PUT";
    APIMethod["DELETE"] = "DELETE";
    APIMethod["HEAD"] = "HEAD";
    APIMethod["OPTIONS"] = "OPTIONS";
    APIMethod["CONNECT"] = "CONNECT";
})(APIMethod = exports.APIMethod || (exports.APIMethod = {}));
var CardPlacement;
(function (CardPlacement) {
    CardPlacement["Incoming"] = "Incoming";
    CardPlacement["Outgoing"] = "Outgoing";
    CardPlacement["Center"] = "Center";
})(CardPlacement = exports.CardPlacement || (exports.CardPlacement = {}));
var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["EqualTo"] = "EqualTo";
    ConditionOperator["NotEqualTo"] = "NotEqualTo";
    ConditionOperator["GreaterThan"] = "GreaterThan";
    ConditionOperator["LessThan"] = "LessThan";
    ConditionOperator["GreaterThanOrEqualTo"] = "GreaterThanOrEqualTo";
    ConditionOperator["LessThanOrEqualTo"] = "LessThanOrEqualTo";
    ConditionOperator["Mod"] = "Mod";
    ConditionOperator["In"] = "In";
    ConditionOperator["NotIn"] = "NotIn";
    ConditionOperator["StartsWith"] = "StartsWith";
    ConditionOperator["EndsWith"] = "EndsWith";
    ConditionOperator["Contains"] = "Contains";
    ConditionOperator["Between"] = "Between";
    ConditionOperator["IsNull"] = "IsNull";
})(ConditionOperator = exports.ConditionOperator || (exports.ConditionOperator = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType["OpenUrl"] = "OpenUrl";
    ButtonType["GetText"] = "GetText";
    ButtonType["GetNumber"] = "GetNumber";
    ButtonType["GetAddress"] = "GetAddress";
    ButtonType["GetEmail"] = "GetEmail";
    ButtonType["GetPhoneNumber"] = "GetPhoneNumber";
    ButtonType["GetItemFromSource"] = "GetItemFromSource";
    ButtonType["GetImage"] = "GetImage";
    ButtonType["GetAudio"] = "GetAudio";
    ButtonType["GetVideo"] = "GetVideo";
    ButtonType["NextNode"] = "NextNode";
    ButtonType["DeepLink"] = "DeepLink";
    ButtonType["GetAgent"] = "GetAgent";
    ButtonType["GetFile"] = "GetFile";
    ButtonType["ShowConfirmation"] = "ShowConfirmation";
    ButtonType["FetchChatFlow"] = "FetchChatFlow";
    ButtonType["GetDate"] = "GetDate";
    ButtonType["GetTime"] = "GetTime";
    ButtonType["GetDateTime"] = "GetDateTime";
    ButtonType["GetLocation"] = "GetLocation";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var EditorType;
(function (EditorType) {
    EditorType["Text"] = "Text";
    EditorType["TitleCaptionUrl"] = "TitleCaptionUrl";
    EditorType["Carousel"] = "Carousel";
})(EditorType = exports.EditorType || (exports.EditorType = {}));
class ModelHelpers {
    constructor(globalsService, infoDialog) {
        this.globalsService = globalsService;
        this.infoDialog = infoDialog;
        this.CarouselButtonType = CarouselButtonType;
        this.carouselButtonTypes = [
            CarouselButtonType.NextNode,
            CarouselButtonType.OpenUrl,
            CarouselButtonType.DeepLink
        ];
        this.nodeTypes = [
            NodeType.ApiCall,
            NodeType.Combination,
            NodeType.Condition,
            NodeType.HandoffToAgent,
            NodeType.JumpToBot
        ];
        this.apiMethods = [
            APIMethod.GET,
            APIMethod.POST,
            APIMethod.PUT,
            APIMethod.HEAD,
            APIMethod.OPTIONS,
            APIMethod.DELETE,
            APIMethod.CONNECT
        ];
        this.cardPlacements = [
            CardPlacement.Center,
            CardPlacement.Incoming,
            CardPlacement.Outgoing
        ];
        this.buttonTypes = [
            ButtonType.DeepLink,
            ButtonType.GetAddress,
            ButtonType.GetAudio,
            ButtonType.GetDate,
            ButtonType.GetEmail,
            ButtonType.GetImage,
            ButtonType.GetItemFromSource,
            ButtonType.GetLocation,
            ButtonType.GetNumber,
            ButtonType.GetPhoneNumber,
            ButtonType.GetText,
            ButtonType.GetTime,
            ButtonType.GetVideo,
            ButtonType.GetFile,
            ButtonType.NextNode,
            ButtonType.OpenUrl
        ];
        this.conditionOperators = [
            ConditionOperator.EqualTo,
            ConditionOperator.NotEqualTo,
            ConditionOperator.GreaterThan,
            ConditionOperator.LessThan,
            ConditionOperator.GreaterThanOrEqualTo,
            ConditionOperator.LessThanOrEqualTo,
            ConditionOperator.Mod,
            ConditionOperator.In,
            ConditionOperator.NotIn,
            ConditionOperator.StartsWith,
            ConditionOperator.EndsWith,
            ConditionOperator.Contains,
            ConditionOperator.Between,
            ConditionOperator.IsNull
        ];
    }
    sectionAlias(section) {
        switch (section.SectionType) {
            case SectionType.Text: {
                let ts = section;
                return ts.Text || ts.SectionType;
            }
            case SectionType.Image:
            case SectionType.Audio:
            case SectionType.Video:
            case SectionType.EmbeddedHtml:
            case SectionType.Gif:
            case SectionType.Graph:
            case SectionType.Carousel: {
                let tcs = section;
                return tcs.Title || tcs.Caption || tcs.SectionType;
            }
            default:
                return section.SectionType;
        }
    }
    chatNodeAlias(chatNode) {
        return chatNode.Name || chatNode.NodeType;
    }
    chatButtonAlias(btn) {
        return btn.ButtonName || btn.ButtonText || btn.ButtonType;
    }
    editorTypeFromSectionType(secType) {
        switch (secType) {
            case SectionType.Text:
                return EditorType.Text;
            case SectionType.Image:
            case SectionType.Audio:
            case SectionType.Video:
            case SectionType.Gif:
            case SectionType.PrintOTP:
            case SectionType.EmbeddedHtml:
                return EditorType.TitleCaptionUrl;
            case SectionType.Carousel:
                return EditorType.Carousel;
            default:
                return EditorType.Text;
        }
    }
    chatButtonFieldHidden(chatNode, btn, fieldName) {
        const HIDDEN = true;
        if (["ConditionMatchKey", "ConditionOperator", "ConditionMatchValue"].indexOf(fieldName) != -1)
            return [NodeType.ApiCall, NodeType.Condition].indexOf(chatNode.NodeType) != -1
                ? !HIDDEN
                : HIDDEN;
        if (fieldName == "ButtonType" || fieldName == "ButtonText")
            return [NodeType.ApiCall, NodeType.Condition].indexOf(chatNode.NodeType) != -1
                ? HIDDEN
                : !HIDDEN;
        if (["MinLength", "MaxLength", "IsMultiLine", "DefaultText"].indexOf(fieldName) != -1)
            return btn.ButtonType == ButtonType.GetText ? false : true;
        if (["AllowMultiple", "ItemsSource"].indexOf(fieldName) != -1)
            return btn.ButtonType == ButtonType.GetItemFromSource ? !HIDDEN : HIDDEN;
        var hidden = false;
        switch (btn.ButtonType) {
            case ButtonType.OpenUrl:
                hidden = !(["Url"].indexOf(fieldName) != -1);
                break;
            case ButtonType.GetText:
            case ButtonType.GetNumber:
            case ButtonType.GetAddress:
            case ButtonType.GetEmail:
            case ButtonType.GetPhoneNumber:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "Url",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetTime:
            case ButtonType.GetDate:
            case ButtonType.GetDateTime:
            case ButtonType.GetLocation:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "Url",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue",
                        "PostfixText",
                        "PrefixText",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetImage:
            case ButtonType.GetFile:
            case ButtonType.GetAudio:
            case ButtonType.GetVideo:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "PlaceholderText",
                        "Url",
                        "PostfixText",
                        "PrefixText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetItemFromSource:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.NextNode:
                hidden =
                    [
                        "NextNodeId",
                        "PostfixText",
                        "PrefixText",
                        "DeepLinkUrl",
                        "Url",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.DeepLink:
                hidden =
                    [
                        "NextNodeId",
                        "Url",
                        "PostfixText",
                        "PrefixText",
                        "PlaceholderText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetAgent:
                hidden = true;
                break;
            case ButtonType.ShowConfirmation:
                hidden = true;
                break;
            case ButtonType.FetchChatFlow:
                hidden =
                    [
                        "DeepLinkUrl",
                        "PlaceholderText",
                        "PostfixText",
                        "PrefixText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            default:
                break;
        }
        return hidden;
    }
    chatNodeApiCallFieldVisible(chatNode, fieldName) {
        switch (chatNode.ApiMethod) {
            case APIMethod.POST:
            case APIMethod.PUT: {
                if (fieldName == "RequestBody")
                    return true;
                if (fieldName == "RequiredVariables")
                    return false;
            }
            default: {
                if (fieldName == "RequestBody")
                    return false;
                if (fieldName == "RequiredVariables")
                    return true;
            }
        }
        return true;
    }
    sectionIcon(section) {
        switch (section.SectionType) {
            case SectionType.Image:
                return "fa-picture-o";
            default:
                return "fa-file-o";
        }
    }
    addSection(chatNode, sectionType) {
        if (chatNode.NodeType == NodeType.Card) {
            if (chatNode.Sections && chatNode.Sections.length >= 1) {
                this.infoDialog.alert("Not allowed", "In a Card Node, only one content item can be added.");
                return;
            }
            if ([SectionType.Text, SectionType.Image].indexOf(sectionType) == -1) {
                this.infoDialog.alert("Not allowed", "In a Card Node, only Text and Image content types can be added.");
                return;
            }
        }
        switch (sectionType) {
            case SectionType.Carousel:
                chatNode.Sections.push({
                    SectionType: sectionType,
                    _id: new bson_1.ObjectID().toHexString(),
                    Items: []
                });
                break;
            default:
                chatNode.Sections.push({
                    SectionType: sectionType,
                    _id: new bson_1.ObjectID().toHexString()
                });
                break;
        }
        this.globalsService.chatFlowComponent.updateLayout();
    }
    sectionMoveUp(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1)
            this.arrayMove(chatNode.Sections, current, current - 1);
    }
    sectionMoveDown(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1)
            this.arrayMove(chatNode.Sections, current, current + 1);
    }
    sectionDelete(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete section '${this.sectionAlias(section)}'`, ok => {
                if (ok) {
                    chatNode.Sections.splice(current, 1);
                    this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
                    this.globalsService.chatFlowComponent.updateLayout();
                }
            });
        }
    }
    addButton(chatNode) {
        if (chatNode.NodeType == NodeType.Card) {
            if (chatNode.Buttons && chatNode.Buttons.length >= 2) {
                this.infoDialog.alert("No allowed", "Card node cannot have more than two buttons");
                return;
            }
        }
        chatNode.Buttons.push({
            _id: new bson_1.ObjectID().toHexString(),
            ButtonName: "New Button",
            ButtonType: ButtonType.NextNode
        });
        this.globalsService.chatFlowComponent.updateLayout();
    }
    buttonMoveUp(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1)
            this.arrayMove(chatNode.Buttons, current, current - 1);
    }
    buttonMoveDown(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1)
            this.arrayMove(chatNode.Buttons, current, current + 1);
    }
    buttonDelete(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete button '${this.chatButtonAlias(btn)}'?`, ok => {
                if (ok) {
                    chatNode.Buttons.splice(current, 1);
                    this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
                    this.globalsService.chatFlowComponent.updateLayout();
                }
            });
        }
    }
    nodeDeleteDirect(chatNode) {
        let network = this.globalsService.chatFlowComponent.chatFlowNetwork;
        var elementIdxToDel = network.chatNodeVMs.findIndex(x => x.chatNode.Id == chatNode.Id);
        network.chatNodeVMs.splice(elementIdxToDel, 1);
        network.updateChatNodeConnections();
        network.parent.updateLayout();
    }
    nodeDelete(chatNode, nodeEditor) {
        this.infoDialog.confirm("Sure?", `Are you sure you want to delete '${chatNode.Name ||
            chatNode.NodeType}' chat node?`, ok => {
            if (ok) {
                this.nodeDeleteDirect(chatNode);
                if (nodeEditor)
                    nodeEditor.dialogRef.close();
            }
        });
    }
    nodeContentMenu(chatNodeVM, event, options) {
        event.preventDefault();
        let btn = options._elementRef.nativeElement;
        btn.click();
    }
    resetOtherStartNodes(chatNode) {
        this.globalsService.chatFlowComponent.chatFlowNetwork.chatNodeVMs.forEach(vm => {
            if (vm.chatNode != chatNode)
                vm.chatNode.IsStartNode = false;
        });
    }
    test(chatNode) {
        this.infoDialog.alert("Alert", JSON.stringify(chatNode.Sections[chatNode.Sections.length - 1], null, 4));
    }
    arrayMove_RAW(array, old_index, new_index) {
        if (new_index >= array.length) {
            var k = new_index - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
        return array;
    }
    arrayMove(array, old_index, new_index) {
        if (new_index >= array.length || new_index < 0)
            throw "new index cannot be greater than or equal to array length or less than zero";
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    }
    carouselItemAdd(carSection) {
        carSection.Items.push({
            Buttons: [],
            Title: "New Carousel Item",
            _id: new bson_1.ObjectID().toHexString()
        });
    }
    carouselItemMoveUp(carSection, carItem) {
        var current = carSection.Items.indexOf(carItem);
        if (current != -1)
            this.arrayMove(carSection.Items, current, current - 1);
    }
    carouselItemMoveDown(carSection, carItem) {
        var current = carSection.Items.indexOf(carItem);
        if (current != -1)
            this.arrayMove(carSection.Items, current, current + 1);
    }
    carouselItemDelete(carSection, carItem) {
        this.infoDialog.confirm("Sure?", `Delete carousel item ${carItem.Title}?`, ok => {
            var current = carSection.Items.indexOf(carItem);
            if (current != -1)
                carSection.Items.splice(current, 1);
        });
    }
    carouselButtonAdd(carItem) {
        carItem.Buttons.push({
            Text: "New Button",
            Type: CarouselButtonType.NextNode,
            _id: new bson_1.ObjectID().toHexString()
        });
    }
    carouselButtonMoveUp(carItem, carButton) {
        var current = carItem.Buttons.indexOf(carButton);
        if (current != -1)
            this.arrayMove(carItem.Buttons, current, current - 1);
    }
    carouselButtonMoveDown(carItem, carButton) {
        var current = carItem.Buttons.indexOf(carButton);
        if (current != -1)
            this.arrayMove(carItem.Buttons, current, current + 1);
    }
    carouselButtonDelete(carItem, carButton) {
        this.infoDialog.confirm("Sure?", `Delete carousel button ${carButton.Text}?`, ok => {
            var current = carItem.Buttons.indexOf(carButton);
            if (current != -1)
                carItem.Buttons.splice(current, 1);
        });
    }
}
exports.ModelHelpers = ModelHelpers;
//# sourceMappingURL=chatflow.models.js.map