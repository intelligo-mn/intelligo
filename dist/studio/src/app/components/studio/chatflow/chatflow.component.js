"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const angular2_hotkeys_1 = require("angular2-hotkeys");
const bson_1 = require("bson");
const models = require("../../../models/chatflow.models");
const chatflow_service_1 = require("../../../services/chatflow.service");
const data_service_1 = require("../../../services/data.service");
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const login_service_1 = require("../../../services/login.service");
const settings_service_1 = require("../../../services/settings.service");
const simulator_service_1 = require("../../../services/simulator.service");
const business_picker_component_1 = require("../../shared/business-picker/business-picker.component");
const publish_chatbot_component_1 = require("../../shared/publish-chatbot/publish-chatbot.component");
const nodeeditor_component_1 = require("../nodeeditor/nodeeditor.component");
const simulator_frame_component_1 = require("../simulator-frame/simulator-frame.component");
let ChatFlowComponent = class ChatFlowComponent {
    constructor(chatFlowService, dialog, infoDialog, route, router, dataService, loginService, snakbar, hotkeys, globalsService, simulatorService, settings) {
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.loginService = loginService;
        this.snakbar = snakbar;
        this.hotkeys = hotkeys;
        this.globalsService = globalsService;
        this.simulatorService = simulatorService;
        this.settings = settings;
        this.projName = "";
        this.keymapOnDesigner = [
            new angular2_hotkeys_1.Hotkey(["command+s", "ctrl+s"], (e, s) => {
                this.saveChatFlow();
                return false;
            }, [], "Save the chat flow"),
            new angular2_hotkeys_1.Hotkey(["command+r", "ctrl+r"], (e, s) => {
                this.playChatFlow();
                return false;
            }, [], "Run the chat"),
            new angular2_hotkeys_1.Hotkey("n", (e, s) => {
                this.addNewNode();
                return false;
            }, [], "Add a new node"),
            new angular2_hotkeys_1.Hotkey("c", (e, s) => {
                this.cloneSelectedNodes();
                return false;
            }, [], "Clone selected nodes"),
            new angular2_hotkeys_1.Hotkey("esc", (e, s) => {
                this.clearSelection();
                return false;
            }, [], "Clear selection"),
            new angular2_hotkeys_1.Hotkey("del", (e, s) => {
                this.deleteSelectedNodes();
                return false;
            }, [], "Delete selected nodes"),
            new angular2_hotkeys_1.Hotkey("alt+f", (e, s) => {
                this.fitViewToAllNodes();
                return false;
            }, [], "Fit to screen"),
            new angular2_hotkeys_1.Hotkey("alt+w", (e, s) => {
                this.gotoStartup();
                return false;
            }, [], "Close the designer")
        ];
        this._isMouseDown = false;
        this.animationFrameId = 0;
        this.chatFlowNetwork = new ChatFlowNetwork(this, this.infoDialog, this.snakbar);
        this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
        this._viewBoxX = 0;
        this._viewBoxY = 0;
        this._viewBoxWidth = Config.defaultDesignerWidth;
        this._viewBoxHeight = Config.defaultDesignerHeight;
        globalsService.chatFlowComponent = this;
        this.MH = new models.ModelHelpers(globalsService, infoDialog);
    }
    ngOnInit() {
        this.route.queryParamMap.subscribe(x => {
            this.projName = x.get("proj");
            if (this.projName) {
                this.globalsService.setPageTitle(this.projName);
                let proj = this.settings.getChatProject(this.projName);
                if (proj)
                    this.loadChatFlowPack(proj);
                else
                    this.router.navigateByUrl("/studio");
            }
        });
        this.bindDesignerShortcuts();
    }
    ngOnDestroy() {
        this.unbindDesignerShortcuts();
    }
    chatFlowRootSVG() {
        return this.chatflowRoot.nativeElement;
    }
    documentKeyDown(event) {
        if (event.keyCode == 17) {
            this.ctrlDown = true;
        }
    }
    documentKeyUp(event) {
        if (event.keyCode == 17) {
            this.ctrlDown = false;
        }
    }
    bindDesignerShortcuts() {
        this.unbindDesignerShortcuts();
        this.keymapOnDesigner.forEach(x => this.hotkeys.add(x));
    }
    unbindDesignerShortcuts() {
        this.keymapOnDesigner.forEach(x => this.hotkeys.remove(x));
    }
    deleteSelectedNodes() {
        let selectedNodes = this.chatFlowNetwork.selectedNodes();
        if (!selectedNodes || selectedNodes.length <= 0) {
            return;
        }
        let title = `Delete ${selectedNodes.length} nodes?`;
        let message = `Are you sure, you want to delete ${selectedNodes.length} selected nodes?`;
        if (selectedNodes.length == 1) {
            let selectedNode = selectedNodes[0];
            let name = this.MH.chatNodeAlias(selectedNode.chatNode);
            title = `Delete '${name}' node?`;
            message = `Are you sure, you want to delete ${name} nodes?`;
        }
        this.infoDialog.confirm(title, message, ok => {
            if (ok) {
                this.deleteMultipleNodes(selectedNodes);
            }
        });
    }
    clearSelection() {
        this.chatFlowNetwork.chatNodeVMs.forEach(x => {
            x.isSelected = false;
        });
    }
    cloneSelectedNodes() {
        let selectedNodes = this.chatFlowNetwork.selectedNodes();
        if (!selectedNodes || selectedNodes.length <= 0) {
            return;
        }
        selectedNodes.forEach(node => {
            let cloneNode = this.globalsService.cloneNode(node.chatNode);
            if (!cloneNode)
                return;
            let newNodeVM = new ChatNodeVM(this.chatFlowNetwork, cloneNode, this.snakbar);
            newNodeVM._x = node._x + 100;
            newNodeVM._y = node._y + 100;
            newNodeVM._layoutUpdated = true;
        });
        this.chatFlowNetwork.updateChatNodeConnections();
        this.updateLayout();
    }
    deleteMultipleNodes(nodesVMs) {
        for (let i = 0; i < nodesVMs.length; i++) {
            let nodeVM = nodesVMs[i];
            var elementIdxToDel = this.chatFlowNetwork.chatNodeVMs.findIndex(x => x.chatNode.Id == nodeVM.chatNode.Id);
            this.chatFlowNetwork.chatNodeVMs.splice(elementIdxToDel, 1);
        }
        this.chatFlowNetwork.updateChatNodeConnections();
        this.chatFlowNetwork.parent.updateLayout();
    }
    updateLayout() {
        if (this.chatFlowNetwork &&
            this.chatFlowNetwork.chatNodeVMs &&
            this.chatFlowNetwork.chatNodeVMs.length > 0 &&
            this.chatflowRoot) {
            let ele = this.chatFlowRootSVG();
            if (ele.querySelector) {
                for (let i = 0; i < this.chatFlowNetwork.chatNodeVMs.length; i++) {
                    let chatNode = this.chatFlowNetwork.chatNodeVMs[i];
                    let _updateNodeLayoutInit = this.updateNodeLayout(chatNode);
                    if (!_updateNodeLayoutInit || !chatNode._layoutUpdated) {
                        window.requestAnimationFrame(() => this.updateLayout());
                        break;
                    }
                }
            }
        }
    }
    updateNodeLayout(chatNodeVM) {
        let btnsTable = this.chatFlowRootSVG().querySelector(`table[node-id='${chatNodeVM.chatNode.Id}']`);
        if (btnsTable) {
            if (!chatNodeVM._layoutUpdated)
                chatNodeVM._btnTableWidth = btnsTable.getBoundingClientRect().width;
            else
                chatNodeVM._btnTableWidth = btnsTable.clientWidth;
            chatNodeVM._width =
                chatNodeVM._width > chatNodeVM._btnTableWidth
                    ? chatNodeVM._width
                    : chatNodeVM._btnTableWidth;
            window.requestAnimationFrame(() => {
                let nodeRoot = this.chatFlowRootSVG().querySelector(`div[node-id='${chatNodeVM.chatNode.Id}']`);
                chatNodeVM._height = nodeRoot.clientHeight;
                chatNodeVM._layoutUpdated = true;
            });
            return true;
        }
        return false;
    }
    ngTr(x, y) {
        return `translate(${x},${y})`;
    }
    mouseMove(event) {
        if (!this.chatFlowNetwork.newChatNodeConnection.isHidden) {
            let targetXY = this.transformCoordinates(event.pageX, event.pageY, event);
            this.chatFlowNetwork.newChatNodeConnection.destX = targetXY.x - 30;
            this.chatFlowNetwork.newChatNodeConnection.destY = targetXY.y - 30;
        }
        if (this.chatFlowNetwork.draggingChatNode) {
            try {
                let targetXY = this.transformCoordinates(event.pageX, event.pageY, event);
                let offset = this.chatFlowNetwork.draggingChatNodeOffset;
                this.chatFlowNetwork.draggingChatNode._x = targetXY.x - offset.x;
                this.chatFlowNetwork.draggingChatNode._y = targetXY.y - offset.y;
                let selectedNodes = this.chatFlowNetwork.selectedNodes();
                if (selectedNodes && selectedNodes.length > 0) {
                    for (var i = 0; i < selectedNodes.length; i++) {
                        let thisNode = selectedNodes[i];
                        let thisOffset = this.chatFlowNetwork.selectedNodeOffsets[thisNode.chatNode.Id];
                        if (thisOffset) {
                            thisNode._x = targetXY.x - thisOffset.x;
                            thisNode._y = targetXY.y - thisOffset.y;
                        }
                    }
                }
            }
            catch (e) {
                this.chatFlowNetwork.draggingChatNode._x += event.movementX;
                this.chatFlowNetwork.draggingChatNode._y += event.movementY;
            }
        }
        if (this._isMouseDown) {
            this._viewBoxX -= event.movementX;
            this._viewBoxY -= event.movementY;
        }
    }
    transformCoordinates(x, y, event) {
        let svg_elem = this.chatFlowRootSVG();
        let matrix = svg_elem.getScreenCTM();
        let point = svg_elem.createSVGPoint();
        point.x = x - event.view.pageXOffset;
        point.y = y - event.view.pageYOffset;
        return point.matrixTransform(matrix.inverse());
    }
    mouseDown(event) {
        this.zoomCancel();
        if (this.chatFlowNetwork.newChatNodeConnection.isHidden &&
            !this.chatFlowNetwork.draggingChatNode)
            this._isMouseDown = true;
        else
            this._isMouseDown = false;
    }
    mouseUp(event) {
        this.resetDraggingState();
    }
    mouseLeave(event) {
        this.resetDraggingState();
    }
    viewBox() {
        return `${this._viewBoxX} ${this._viewBoxY} ${this._viewBoxWidth} ${this._viewBoxHeight}`;
    }
    zoomToRect(x, y, width, height) {
        this._viewBoxX = x;
        this._viewBoxY = y;
        this._viewBoxWidth = width;
        this._viewBoxHeight = height;
    }
    zoomToRectWithAnimation(x, y, width, height) {
        this.zoomToRectAnimIntermediate(this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight, x, y, width, height);
    }
    zoomCancel() {
        if (this.animationFrameId)
            cancelAnimationFrame(this.animationFrameId);
    }
    zoomToRectAnimIntermediate(x1, y1, width1, height1, x2, y2, width2, height2) {
        let step = Config.viewBoxAnimStep *
            ((Math.abs(x1 - x2) +
                Math.abs(y1 - y2) +
                Math.abs(width1 - width2) +
                Math.abs(height1 - height2)) /
                100);
        this._viewBoxX = this.tendValue(x1, x2, step);
        this._viewBoxY = this.tendValue(y1, y2, step);
        this._viewBoxWidth = this.tendValue(width1, width2, step);
        this._viewBoxHeight = this.tendValue(height1, height2, step);
        if (!this.approxEquals(this._viewBoxX, x2, step) ||
            !this.approxEquals(this._viewBoxY, y2, step) ||
            !this.approxEquals(this._viewBoxWidth, width2, step) ||
            !this.approxEquals(this._viewBoxHeight, height2, step))
            this.animationFrameId = requestAnimationFrame(() => {
                this.zoomToRectAnimIntermediate(this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight, x2, y2, width2, height2);
            });
        else
            this.animationFrameId = 0;
    }
    tendValue(value, tendsTo, step) {
        return Math.abs(value - tendsTo) > step
            ? value > tendsTo
                ? value - step
                : value + step
            : value;
    }
    approxEquals(a, b, approx) {
        return Math.abs(Math.round(b) - Math.round(a)) <= Math.round(approx);
    }
    fitViewToAllNodes() {
        this.fitViewToNodes(this.chatFlowNetwork.chatNodeVMs);
    }
    fitViewToNodes(chatNodeVMs) {
        var Xs = chatNodeVMs.map(x => x._x);
        var Ys = chatNodeVMs.map(x => x._y);
        var XsWithWidth = chatNodeVMs.map(x => x._x + x._width);
        var YsWithHeight = chatNodeVMs.map(x => x._y + x._height);
        var minX = Math.min(...Xs);
        var minY = Math.min(...Ys);
        var maxX = Math.max(...XsWithWidth);
        var maxY = Math.max(...YsWithHeight);
        var width = maxX - minX;
        var height = maxY - minY;
        if (width < Config.maxZoomWidth)
            width = Config.maxZoomWidth;
        if (height < Config.maxZoomHeight)
            height = Config.maxZoomHeight;
        this.zoomToRectWithAnimation(minX, minY, width, height);
    }
    designerWheel(event) {
        event.preventDefault();
        this.zoomCancel();
        let change = Config.zoomCoefficient * event.deltaY;
        if (this._viewBoxWidth - change > 0)
            this._viewBoxWidth -= change;
        if (this._viewBoxHeight - change > 0)
            this._viewBoxHeight -= change;
        if (this._viewBoxWidth < Config.maxZoomWidth)
            this._viewBoxWidth = Config.maxZoomWidth;
        if (this._viewBoxHeight < Config.maxZoomHeight)
            this._viewBoxHeight = Config.maxZoomHeight;
    }
    openEditor(chatNodeVM) {
        let dialogRef = this.dialog.open(nodeeditor_component_1.NodeEditorComponent, {
            width: "60%",
            backdropClass: "dark-overlay",
            data: chatNodeVM.chatNode
        });
        dialogRef.afterOpen().subscribe(x => {
            this.unbindDesignerShortcuts();
        });
        dialogRef.afterClosed().subscribe(x => {
            this.bindDesignerShortcuts();
        });
    }
    addNewNode() {
        var newNodeVM = new ChatNodeVM(this.chatFlowNetwork, {
            Name: "New Node",
            Id: new bson_1.ObjectID().toHexString(),
            Buttons: [],
            Sections: [],
            NodeType: models.NodeType.Combination
        }, this.snakbar);
        newNodeVM._x = this._viewBoxX + this._viewBoxWidth / 2 + Math.random() * 50;
        newNodeVM._y =
            this._viewBoxY + this._viewBoxHeight / 2 + Math.random() * 50;
        newNodeVM._layoutUpdated = true;
        this.chatFlowNetwork.updateChatNodeConnections();
        this.updateLayout();
    }
    resetDraggingState() {
        if (!this.chatFlowNetwork.newChatNodeConnection.isHidden)
            this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
        if (this.chatFlowNetwork.draggingChatNode)
            delete this.chatFlowNetwork.draggingChatNode;
        this._isMouseDown = false;
    }
    loadChatFlowPack(pack) {
        if (pack.ChatNodes) {
            this.chatFlowNetwork.chatFlowPack = pack;
            this.chatFlowNetwork.chatNodeVMs = [];
            pack.ChatNodes.forEach(cn => {
                new ChatNodeVM(this.chatFlowNetwork, cn, this.snakbar);
                cn.Buttons.forEach(btn => {
                    btn.AdvancedOptions =
                        btn.VariableValue ||
                            btn.ConditionMatchKey ||
                            btn.ConditionMatchValue ||
                            btn.ConditionOperator
                            ? true
                            : false;
                });
            });
            this.chatFlowNetwork.chatNodeVMs.forEach(vm => {
                var locs = pack.NodeLocations;
                if (locs) {
                    var loc = locs[vm.chatNode.Id];
                    vm._x = loc.X;
                    vm._y = loc.Y;
                }
            });
            this.chatFlowNetwork.updateChatNodeConnections();
            this.updateLayout();
            this.initialZoom();
        }
    }
    layoutReady() {
        if (!this.chatFlowNetwork.chatNodeVMs)
            return true;
        else
            return (this.chatFlowNetwork.chatNodeVMs.filter(x => x._layoutUpdated).length ==
                this.chatFlowNetwork.chatNodeVMs.length);
    }
    initialZoom() {
        if (this.layoutReady())
            this.fitViewToAllNodes();
        else
            setTimeout(() => this.initialZoom(), 500);
    }
    saveChatFlow() {
        var nodeLocs = {};
        for (let i = 0; i < this.chatFlowNetwork.chatNodeVMs.length; i++) {
            let item = this.chatFlowNetwork.chatNodeVMs[i];
            nodeLocs[item.chatNode.Id] = {
                X: item._x,
                Y: item._y
            };
        }
        let pack = {
            ProjectId: this.chatFlowNetwork.chatFlowPack.ProjectId,
            ChatNodes: this.chatFlowNetwork.chatNodeVMs.map(x => x.chatNode),
            NodeLocations: nodeLocs,
            _id: this.chatFlowNetwork.chatFlowPack._id,
            CreatedOn: this.chatFlowNetwork.chatFlowPack.CreatedOn,
            UpdatedOn: this.chatFlowNetwork.chatFlowPack.UpdatedOn
        };
        this.settings.saveChatProject(this.projName, pack, true);
        this.snakbar.open(`Chatbot project '${this.projName}' saved`, "Dismiss", {
            duration: 2000
        });
        return pack;
    }
    exportChatFlow() {
        let pack = this.saveChatFlow();
        this.globalsService.downloadTextAsFile(this.projName + ".intelligo", JSON.stringify(pack));
    }
    playChatFlow() {
        let pack = this.saveChatFlow();
        if (pack.ChatNodes.filter(x => x.IsStartNode).length <= 0) {
            this.infoDialog.alert("Start node not set!", `Tick 'Mark as start node' for the initial node of your chatbot.`);
            return;
        }
        let chatNodes = this.chatFlowService.normalizeChatNodes(pack.ChatNodes);
        this.simulatorService.init(chatNodes, this.simulator);
        this.simulator.isOpen = true;
    }
    openPublishDialog() {
        this.infoDialog.showSpinner();
        this.loginService.performLogin(false, null, true, done => {
            this.infoDialog.hideSpinner();
            if (this.dataService.loggedInUser) {
                if (this.dataService.isBizAdmin() || this.dataService.isFlowManager()) {
                    this.dialog.open(publish_chatbot_component_1.PublishChatbotComponent, {
                        width: "auto",
                        data: {
                            pack: this.saveChatFlow(),
                            bizId: this.dataService.loggedInUser.businessId
                        }
                    });
                }
                else {
                    let d = this.dialog.open(business_picker_component_1.BusinessPickerComponent, {
                        width: "30%",
                        data: {
                            askFlowId: false
                        }
                    });
                    d.afterClosed().subscribe((x) => {
                        if (x && x.bizAccount) {
                            let ba = x.bizAccount;
                            this.dialog.open(publish_chatbot_component_1.PublishChatbotComponent, {
                                width: "auto",
                                data: {
                                    pack: this.saveChatFlow(),
                                    bizId: ba.id
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    gotoStartup() {
        this.infoDialog.confirm("Save?", "Do you want to save any unsaved changes before you close?", ok => {
            if (ok)
                this.saveChatFlow();
            this.router.navigateByUrl("/studio");
        });
    }
};
__decorate([
    core_1.ViewChild("chatflowRoot", { static: true }),
    __metadata("design:type", core_1.ElementRef)
], ChatFlowComponent.prototype, "chatflowRoot", void 0);
__decorate([
    core_1.ViewChild("simulator", { static: true }),
    __metadata("design:type", simulator_frame_component_1.SimulatorFrameComponent)
], ChatFlowComponent.prototype, "simulator", void 0);
__decorate([
    core_1.HostListener("document:keydown", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ChatFlowComponent.prototype, "documentKeyDown", null);
__decorate([
    core_1.HostListener("document:keyup", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ChatFlowComponent.prototype, "documentKeyUp", null);
ChatFlowComponent = __decorate([
    core_1.Component({
        selector: "app-chatflow",
        templateUrl: "./chatflow.component.html",
        styleUrls: ["./chatflow.component.scss"]
    }),
    __metadata("design:paramtypes", [chatflow_service_1.ChatFlowService,
        material_1.MatDialog,
        info_dialog_service_1.InfoDialogService,
        router_1.ActivatedRoute,
        router_1.Router,
        data_service_1.DataService,
        login_service_1.LoginService,
        material_1.MatSnackBar,
        angular2_hotkeys_1.HotkeysService,
        globals_service_1.GlobalsService,
        simulator_service_1.SimulatorService,
        settings_service_1.SettingsService])
], ChatFlowComponent);
exports.ChatFlowComponent = ChatFlowComponent;
class ChatFlowNetwork {
    constructor(parent, infoDialog, snackbar) {
        this.parent = parent;
        this.infoDialog = infoDialog;
        this.snackbar = snackbar;
        this.chatNodeConnections = [];
        this.chatNodeVMs = [];
        this.newChatNodeConnection = new ChatNodeNewConnection();
        this.selectedNodeOffsets = {};
    }
    updateChatNodeConnections() {
        this.chatNodeConnections = [];
        this.chatNodeVMs.forEach(chatNodeVM => {
            chatNodeVM.chatNode.Buttons.forEach(srcBtn => {
                if (srcBtn.NextNodeId != null || srcBtn.NextNodeId != "") {
                    let destNode = this.chatNodeVMs.filter(x => x.chatNode.Id == srcBtn.NextNodeId);
                    if (destNode && destNode.length > 0)
                        this.chatNodeConnections.push(new ChatNodeConnection(new ChatButtonConnector(chatNodeVM, srcBtn, this.snackbar), destNode[0], this.infoDialog));
                }
            });
        });
    }
    selectedNodes() {
        return this.chatNodeVMs.filter(x => x.isSelected);
    }
}
class ChatNodeConnection {
    constructor(srcButtonConnector, destChatNodeVM, infoDialog) {
        this.srcButtonConnector = srcButtonConnector;
        this.destChatNodeVM = destChatNodeVM;
        this.infoDialog = infoDialog;
        this.closeButtonVisible = false;
        this.closeButtonPointX = 0;
        this.closeButtonPointY = 0;
        this.circleRadius = Config.buttonCircleRadius;
        this.pathWidth = Config.connectionPathWidth;
    }
    srcConnectorX() {
        return this.srcButtonConnector.x() - this.pathWidth / 2;
    }
    srcConnectorY() {
        return this.srcButtonConnector.y();
    }
    destConnectorX() {
        return this.destChatNodeVM.nodeConnectorX() - this.pathWidth / 2;
    }
    destConnectorY() {
        return this.destChatNodeVM.nodeConnectorY();
    }
    calcTangentOffset(pt1X, pt2X) {
        return (pt2X - pt1X) / 2;
    }
    calcSrcTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destConnectorX();
        return pt1X + this.calcTangentOffset(pt1X, pt2X);
    }
    calcSrcTangentY() {
        return this.srcConnectorY();
    }
    calcDestTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destConnectorX();
        return pt2X - this.calcTangentOffset(pt1X, pt2X);
    }
    calcDestTangentY() {
        return this.destConnectorY();
    }
    path() {
        return `M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destConnectorX()},${this.destConnectorY()} M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destConnectorX()},${this.destConnectorY()}`;
    }
    mouseEnter(event) {
        let xy = this.destChatNodeVM.network.parent.transformCoordinates(event.pageX, event.pageY, event);
        this.closeButtonPointX = xy.x;
        this.closeButtonPointY = xy.y;
        this.closeButtonVisible = true;
        setTimeout(() => {
            this.closeButtonVisible = false;
        }, 50000);
    }
    remove(event) {
        this.infoDialog.confirm("Delete connection?", `This will delete the connection between the button '${this
            .srcButtonConnector.button.ButtonName ||
            "Unnamed Button"}' and node '${this.destChatNodeVM.chatNode.Name ||
            "Unnamed Node"}'. Are you sure?`, ok => {
            if (ok) {
                this.srcButtonConnector.setButtonNextNodeId(null);
                this.destChatNodeVM.network.updateChatNodeConnections();
            }
        });
    }
}
class ChatNodeNewConnection {
    constructor() {
        this.isHidden = false;
        this.canConnect = false;
        this.circleRadius = Config.buttonCircleRadius;
    }
    srcConnectorX() {
        if (this.srcButtonConnector)
            return this.srcButtonConnector.x();
        return 0;
    }
    srcConnectorY() {
        if (this.srcButtonConnector)
            return this.srcButtonConnector.y();
        return 0;
    }
    calcTangentOffset(pt1X, pt2X) {
        return (pt2X - pt1X) / 2;
    }
    calcSrcTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destX;
        return pt1X + this.calcTangentOffset(pt1X, pt2X);
    }
    calcSrcTangentY() {
        return this.srcConnectorY();
    }
    calcDestTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destX;
        return pt2X - this.calcTangentOffset(pt1X, pt2X);
    }
    calcDestTangentY() {
        return this.destY;
    }
    path() {
        if (this.isHidden)
            return "M 0,0";
        return `M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destX},${this.destY}`;
    }
}
class ChatButtonConnector {
    constructor(chatNodeVM, button, snackbar) {
        this.chatNodeVM = chatNodeVM;
        this.button = button;
        this.snackbar = snackbar;
        this.circleRadius = Config.buttonCircleRadius;
    }
    x() {
        let btns = this.chatNodeVM.chatNode.Buttons;
        let btnsCount = btns.length;
        let eachPart = this.chatNodeVM.width() / btnsCount;
        let _x = this.chatNodeVM.x() +
            eachPart * (this.btnIndex() + 1) -
            eachPart / 2 -
            this.chatNodeVM.circleRadius;
        return _x;
    }
    y() {
        var _y = this.chatNodeVM.y() + this.chatNodeVM.height();
        return _y;
    }
    mouseDown(event) {
        let nw = this.chatNodeVM.network;
        if (nw.newChatNodeConnection.isHidden)
            nw.newChatNodeConnection.isHidden = false;
        nw.newChatNodeConnection.srcButtonConnector = this;
        nw.newChatNodeConnection.destX = this.x();
        nw.newChatNodeConnection.destY = this.y();
    }
    btnIndex() {
        let btns = this.chatNodeVM.chatNode.Buttons;
        return btns.indexOf(this.button);
    }
    setButtonNextNodeId(nextNodeId) {
        this.button.NextNodeId = nextNodeId;
        this.chatNodeVM.network.updateChatNodeConnections();
    }
    startDirectConnection(event) {
        this.chatNodeVM.network.clickConnectionStartButton = this;
        if (this.chatNodeVM.network.clickConnectionStartSnackbar) {
            this.chatNodeVM.network.clickConnectionStartSnackbar.dismiss();
            this.chatNodeVM.network.clickConnectionStartSnackbar = null;
        }
        this.chatNodeVM.network.clickConnectionStartSnackbar = this.snackbar.open(`Connection started at button '${this.button.ButtonName}' of node '${this.chatNodeVM.chatNode.Name}'. Click on the target node to connect.`, "Abort");
        this.chatNodeVM.network.clickConnectionStartSnackbar
            .onAction()
            .subscribe(() => {
            this.chatNodeVM.network.clickConnectionStartButton = null;
        });
    }
    isConnected() {
        return (this.button.NextNodeId &&
            this.chatNodeVM.network.chatNodeVMs.filter(x => x.chatNode.Id == this.button.NextNodeId).length > 0);
    }
}
class ChatNodeVM {
    constructor(network, chatNode, snackbar) {
        this.network = network;
        this.chatNode = chatNode;
        this.snackbar = snackbar;
        this._layoutUpdated = false;
        this._x = 0;
        this._y = 0;
        this._btnTableWidth = Config.defaultNodeWidth;
        this._width = Config.defaultNodeWidth;
        this._height = Config.defaultNodeHeight;
        this.cornerRadius = Config.defaultNodeCornerRadius;
        this.headerHeight = Config.defaultNodeHeaderHeight;
        this.circleRadius = Config.buttonCircleRadius;
        this.isSelected = false;
        this.network.chatNodeVMs.push(this);
        this._x = this.network.chatNodeVMs.indexOf(this) * Config.defaultNodeWidth;
    }
    width() {
        return this._width;
    }
    height() {
        return this._height;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
    mouseDown(event) {
        if (!this.network.parent.ctrlDown &&
            this.network.selectedNodes().length <= 1) {
            this.network.parent.clearSelection();
        }
        this.toggleSelection();
        this.network.draggingChatNode = this;
        let targetXY = this.network.parent.transformCoordinates(event.pageX, event.pageY, event);
        let mouseOffsetX = targetXY.x - this._x;
        let mouseOffsetY = targetXY.y - this._y;
        this.network.draggingChatNodeOffset = new Point(mouseOffsetX, mouseOffsetY);
        this.network.selectedNodeOffsets = {};
        let selectedNodes = this.network.selectedNodes();
        if (selectedNodes && selectedNodes.length > 0) {
            selectedNodes.forEach(n => {
                let mouseOffset = {
                    x: targetXY.x - n._x,
                    y: targetXY.y - n._y
                };
                this.network.selectedNodeOffsets[n.chatNode.Id] = new Point(mouseOffset.x, mouseOffset.y);
            });
        }
    }
    mouseUp(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.srcButtonConnector.setButtonNextNodeId(this.chatNode.Id);
        }
    }
    mouseEnter(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.canConnect = true;
        }
    }
    mouseLeave(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.canConnect = false;
        }
    }
    chatButtonConnectors() {
        return this.chatNode.Buttons.map(btn => new ChatButtonConnector(this, btn, this.snackbar));
    }
    nodeConnectorY() {
        return this.y();
    }
    nodeConnectorX() {
        return this.x() + this.width() / 2 - this.circleRadius;
    }
    clickConnectionActive() {
        return this.network.clickConnectionStartButton;
    }
    nodeClick() {
        if (this.clickConnectionActive()) {
            this.network.clickConnectionStartButton.setButtonNextNodeId(this.chatNode.Id);
            this.network.clickConnectionStartButton = null;
            this.network.clickConnectionStartSnackbar.dismiss();
        }
        else {
            if (!this.network.parent.ctrlDown &&
                this.network.selectedNodes().length > 1) {
                this.network.parent.clearSelection();
            }
        }
    }
    toggleSelection() {
        this.isSelected = !this.isSelected;
    }
    isNodeEmpty() {
        if ((!this.chatNode.Sections || this.chatNode.Sections.length <= 0) &&
            (!this.chatNode.Buttons || this.chatNode.Buttons.length <= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.ChatNodeVM = ChatNodeVM;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Config {
}
Config.defaultNodeWidth = 300;
Config.defaultNodeHeight = 200;
Config.defaultNodeHeaderHeight = 30;
Config.defaultNodeCornerRadius = 20;
Config.defaultSectionWidth = 30;
Config.defaultSectionHeight = 30;
Config.defaultDesignerWidth = 1366;
Config.defaultDesignerHeight = 700;
Config.buttonCircleRadius = 8;
Config.designerMargin = 40;
Config.connectionPathWidth = 3;
Config.zoomCoefficient = 0.3;
Config.viewBoxAnimStep = 10;
Config.maxZoomHeight = 600;
Config.maxZoomWidth = 900;
//# sourceMappingURL=chatflow.component.js.map