import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { ObjectID } from 'bson';
import * as models from '../../../models/chatflow.models';
import { ChatFlowService } from '../../../services/chatflow.service';
import { DataService } from '../../../services/data.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { LoginService } from '../../../services/login.service';
import { SettingsService } from '../../../services/settings.service';
import { SimulatorService } from '../../../services/simulator.service';
import { BusinessPickerComponent, BusinessPickerParam, ChoosenBizAccChatProj } from '../../shared/business-picker/business-picker.component';
import { PublishChatbotComponent } from '../../shared/publish-chatbot/publish-chatbot.component';
import { NodeEditorComponent } from '../nodeeditor/nodeeditor.component';
import { SimulatorFrameComponent } from '../simulator-frame/simulator-frame.component';

@Component({
	selector: 'app-chatflow',
	templateUrl: './chatflow.component.html',
	styleUrls: ['./chatflow.component.scss'],
})
export class ChatFlowComponent implements OnInit, OnDestroy {
	constructor(
		private chatFlowService: ChatFlowService,
		public dialog: MatDialog,
		public infoDialog: InfoDialogService,
		public route: ActivatedRoute,
		public router: Router,
		public dataService: DataService,
		private loginService: LoginService,
		public snakbar: MatSnackBar,
		private hotkeys: HotkeysService,
		public globalsService: GlobalsService,
		public simulatorService: SimulatorService,
		public settings: SettingsService) {

		this.chatFlowNetwork = new ChatFlowNetwork(this, this.infoDialog, this.snakbar);
		this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
		this._viewBoxX = 0;
		this._viewBoxY = 0;
		this._viewBoxWidth = Config.defaultDesignerWidth;
		this._viewBoxHeight = Config.defaultDesignerHeight;

		globalsService.chatFlowComponent = this;

		this.MH = new models.ModelHelpers(globalsService, infoDialog);
	}
	chatFlowNetwork: ChatFlowNetwork;
	MH: models.ModelHelpers;

	@ViewChild('chatflowRoot', { static: true })
	chatflowRoot: ElementRef;

	@ViewChild('simulator', { static: true })
	simulator: SimulatorFrameComponent;

	projName: string = "";
	ngOnInit(): void {
		this.route.queryParamMap.subscribe(x => {
			this.projName = x.get('proj');
			if (this.projName) {
				this.globalsService.setPageTitle(this.projName);
				let proj = this.settings.getChatProject(this.projName);
				if (proj)
					this.loadChatFlowPack(proj);
				else
					this.router.navigateByUrl('/studio');
			}
		});
		this.bindDesignerShortcuts();
	}

	ngOnDestroy(): void {
		this.unbindDesignerShortcuts();
	}

	chatFlowRootSVG() {
		return this.chatflowRoot.nativeElement as SVGSVGElement;
	}

	keymapOnDesigner: Hotkey[] = [
		new Hotkey(["command+s", "ctrl+s"], (e, s) => {
			this.saveChatFlow();
			return false;
		}, [], "Save the chat flow"),
		new Hotkey(["command+r", "ctrl+r"], (e, s) => {
			this.playChatFlow();
			return false;
		}, [], "Run the chat"),
		new Hotkey("n", (e, s) => {
			this.addNewNode();
			return false;
		}, [], "Add a new node"),
		new Hotkey("c", (e, s) => {
			this.cloneSelectedNodes();
			return false;
		}, [], "Clone selected nodes"),
		new Hotkey("esc", (e, s) => {
			this.clearSelection();
			return false;
		}, [], "Clear selection"),
		new Hotkey("del", (e, s) => {
			this.deleteSelectedNodes();
			return false;
		}, [], "Delete selected nodes"),
		new Hotkey("alt+f", (e, s) => {
			this.fitViewToAllNodes();
			return false;
		}, [], "Fit to screen"),
		new Hotkey("alt+w", (e, s) => {
			this.gotoStartup();
			return false;
		}, [], "Close the designer")
	];

	@HostListener('document:keydown', ['$event'])
	documentKeyDown(event: KeyboardEvent) {
		if (event.keyCode == 17) {
			this.ctrlDown = true;
		}
	}

	@HostListener('document:keyup', ['$event'])
	documentKeyUp(event: KeyboardEvent) {
		if (event.keyCode == 17) {
			this.ctrlDown = false;
		}
	}
	ctrlDown: boolean;

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
		this.infoDialog.confirm(title, message, (ok) => {
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
			newNodeVM._layoutUpdated = true; //To skip the loading indicator
		});

		this.chatFlowNetwork.updateChatNodeConnections();
		this.updateLayout();
	}

	deleteMultipleNodes(nodesVMs: ChatNodeVM[]) {
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
			if (ele.querySelector) { //Initialization issues, proceed only if querySelector is available.
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

	updateNodeLayout(chatNodeVM: ChatNodeVM): boolean {
		let btnsTable = this.chatFlowRootSVG().querySelector(`table[node-id='${chatNodeVM.chatNode.Id}']`) as HTMLTableElement;
		if (btnsTable) {

			if (!chatNodeVM._layoutUpdated) //If this is not done, when new section is added to the node, node's width is also increasing abnormally!
				chatNodeVM._btnTableWidth = btnsTable.getBoundingClientRect().width;
			else
				chatNodeVM._btnTableWidth = btnsTable.clientWidth;

			chatNodeVM._width = ((chatNodeVM._width > chatNodeVM._btnTableWidth) ? chatNodeVM._width : chatNodeVM._btnTableWidth);

			window.requestAnimationFrame(() => {
				let nodeRoot = this.chatFlowRootSVG().querySelector(`div[node-id='${chatNodeVM.chatNode.Id}']`) as HTMLDivElement;
				chatNodeVM._height = nodeRoot.clientHeight;
				chatNodeVM._layoutUpdated = true;
			});
			return true;
		}

		return false;
	}

	ngTr(x: number, y: number) {
		return `translate(${x},${y})`;
	}

	mouseMove(event: MouseEvent) {
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
			} catch (e) {
				this.chatFlowNetwork.draggingChatNode._x += event.movementX;
				this.chatFlowNetwork.draggingChatNode._y += event.movementY;
			}
		}

		if (this._isMouseDown) {
			this._viewBoxX -= event.movementX;
			this._viewBoxY -= event.movementY;
		}
	}

	transformCoordinates(x: number, y: number, event: MouseEvent) {
		let svg_elem = this.chatFlowRootSVG();
		let matrix = svg_elem.getScreenCTM();
		let point = svg_elem.createSVGPoint();
		point.x = x - event.view.pageXOffset;
		point.y = y - event.view.pageYOffset;
		return point.matrixTransform(matrix.inverse());
	}

	_isMouseDown = false;
	mouseDown(event: MouseEvent) {

		//cancel any ongoing animation as user might have interrupted it by doing the mouse down.
		this.zoomCancel();

		//Check if mouse is captured by others
		if (this.chatFlowNetwork.newChatNodeConnection.isHidden && !this.chatFlowNetwork.draggingChatNode)
			this._isMouseDown = true;
		else
			this._isMouseDown = false;
	}

	mouseUp(event: MouseEvent) {
		this.resetDraggingState();
	}

	mouseLeave(event: MouseEvent) {
		this.resetDraggingState();
	}

	_viewBoxWidth: number;
	_viewBoxHeight: number;

	_viewBoxX: number;
	_viewBoxY: number;
	viewBox() {
		//0 0 1000 500
		return `${this._viewBoxX} ${this._viewBoxY} ${this._viewBoxWidth} ${this._viewBoxHeight}`;
	}

	zoomToRect(x: number, y: number, width: number, height: number) {
		this._viewBoxX = x;
		this._viewBoxY = y;
		this._viewBoxWidth = width;
		this._viewBoxHeight = height;
	}

	animationFrameId: number = 0;
	zoomToRectWithAnimation(x: number, y: number, width: number, height: number) {
		this.zoomToRectAnimIntermediate(
			this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight,
			x, y, width, height);
	}
	zoomCancel() {
		if (this.animationFrameId)
			cancelAnimationFrame(this.animationFrameId);
	}
	zoomToRectAnimIntermediate(
		x1: number, y1: number, width1: number, height1: number,
		x2: number, y2: number, width2: number, height2: number) {

		let step = Config.viewBoxAnimStep * ((Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(width1 - width2) + Math.abs(height1 - height2)) / 100);

		this._viewBoxX = this.tendValue(x1, x2, step);
		this._viewBoxY = this.tendValue(y1, y2, step);
		this._viewBoxWidth = this.tendValue(width1, width2, step);
		this._viewBoxHeight = this.tendValue(height1, height2, step);

		if (!this.approxEquals(this._viewBoxX, x2, step) ||
			!this.approxEquals(this._viewBoxY, y2, step) ||
			!this.approxEquals(this._viewBoxWidth, width2, step) ||
			!this.approxEquals(this._viewBoxHeight, height2, step))
			this.animationFrameId = requestAnimationFrame(() => {
				this.zoomToRectAnimIntermediate(
					this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight,
					x2, y2, width2, height2);
			});
		else
			this.animationFrameId = 0;
	}

	tendValue(value: number, tendsTo: number, step: number) {
		return (Math.abs(value - tendsTo) > step ? (value > tendsTo ? value - step : value + step) : value);
	}
	approxEquals(a: number, b: number, approx: number): boolean {
		return Math.abs(Math.round(b) - Math.round(a)) <= Math.round(approx);
	}

	fitViewToAllNodes() {
		this.fitViewToNodes(this.chatFlowNetwork.chatNodeVMs);
	}

	fitViewToNodes(chatNodeVMs: ChatNodeVM[]) {
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

	designerWheel(event: WheelEvent) {
		event.preventDefault();

		//cancel any ongoing animation as user might have interrupted it by doing the mouse down.
		this.zoomCancel();

		let change = Config.zoomCoefficient * event.deltaY;

		console.log(change)
		if (this._viewBoxWidth - change > 0)
			this._viewBoxWidth -= change;

		if (this._viewBoxHeight - change > 0)
			this._viewBoxHeight -= change;

		if (this._viewBoxWidth < Config.maxZoomWidth)
			this._viewBoxWidth = Config.maxZoomWidth;
		if (this._viewBoxHeight < Config.maxZoomHeight)
			this._viewBoxHeight = Config.maxZoomHeight;
	}

	openEditor(chatNodeVM: ChatNodeVM) {
		let dialogRef = this.dialog.open(NodeEditorComponent, {
			width: '60%',
			backdropClass: 'dark-overlay',
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
			Name: 'New Node',
			Id: new ObjectID().toHexString(),
			Buttons: [],
			Sections: [],
			NodeType: models.NodeType.Combination,
		}, this.snakbar);

		newNodeVM._x = (this._viewBoxX + (this._viewBoxWidth / 2)) + (Math.random() * 50);
		newNodeVM._y = (this._viewBoxY + (this._viewBoxHeight / 2)) + (Math.random() * 50);
		newNodeVM._layoutUpdated = true; //To skip the loading indicator

		this.chatFlowNetwork.updateChatNodeConnections();
		this.updateLayout();
	}

	private resetDraggingState() {
		if (!this.chatFlowNetwork.newChatNodeConnection.isHidden)
			this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
		if (this.chatFlowNetwork.draggingChatNode)
			delete this.chatFlowNetwork.draggingChatNode;
		this._isMouseDown = false;
	}
	private loadChatFlowPack(pack: models.ChatFlowPack) {

		if (pack.ChatNodes) {
			this.chatFlowNetwork.chatFlowPack = pack;
			this.chatFlowNetwork.chatNodeVMs = [];

			pack.ChatNodes.forEach(cn => {
				new ChatNodeVM(this.chatFlowNetwork, cn, this.snakbar);

				cn.Buttons.forEach(btn => {
					btn.AdvancedOptions = ((btn.VariableValue || btn.ConditionMatchKey || btn.ConditionMatchValue || btn.ConditionOperator) ? true : false);
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
			return (this.chatFlowNetwork.chatNodeVMs.filter(x => x._layoutUpdated).length == this.chatFlowNetwork.chatNodeVMs.length);
	}

	initialZoom() {
		if (this.layoutReady())
			this.fitViewToAllNodes();
		else
			setTimeout(() => this.initialZoom(), 500);
	}

	saveChatFlow() {
		var nodeLocs: models.NodeLocations = {};

		for (let i = 0; i < this.chatFlowNetwork.chatNodeVMs.length; i++) {
			let item = this.chatFlowNetwork.chatNodeVMs[i];

			nodeLocs[item.chatNode.Id] = {
				X: item._x,
				Y: item._y
			};
		}

		let pack: models.ChatFlowPack = {
			ProjectId: this.chatFlowNetwork.chatFlowPack.ProjectId,
			ChatNodes: this.chatFlowNetwork.chatNodeVMs.map(x => x.chatNode),
			NodeLocations: nodeLocs,
			_id: this.chatFlowNetwork.chatFlowPack._id,
			CreatedOn: this.chatFlowNetwork.chatFlowPack.CreatedOn,
			UpdatedOn: this.chatFlowNetwork.chatFlowPack.UpdatedOn
		};
		this.settings.saveChatProject(this.projName, pack, true);
		this.snakbar.open(`Chatbot project '${this.projName}' saved`, 'Dismiss', {
			duration: 2000
		});
		return pack;
	}

	exportChatFlow() {
		let pack = this.saveChatFlow();
		this.globalsService.downloadTextAsFile(this.projName + ".anaproj", JSON.stringify(pack));
	}

	playChatFlow() {
		//this.infoDialog.alert('Alert', 'Coming soon');
		let pack = this.saveChatFlow();
		if (pack.ChatNodes.filter(x => x.IsStartNode).length <= 0) {
			this.infoDialog.alert('Start node not set!', `Tick 'Mark as start node' for the initial node of your chatbot.`);
			return;
		}
		let chatNodes = this.chatFlowService.normalizeChatNodes(pack.ChatNodes);
		this.simulatorService.init(chatNodes, this.simulator);
		this.simulator.isOpen = true;
	}

	openPublishDialog() {

		this.infoDialog.showSpinner();
		this.loginService.performLogin(false, null, true, (done) => {
			this.infoDialog.hideSpinner();

			if (this.dataService.loggedInUser) {
				if (this.dataService.isBizAdmin() || this.dataService.isFlowManager()) {
					this.dialog.open(PublishChatbotComponent, {
						width: 'auto',
						data: {
							pack: this.saveChatFlow(),
							bizId: this.dataService.loggedInUser.businessId
						}
					});
				} else {
					let d = this.dialog.open(BusinessPickerComponent, {
						width: "30%",
						data: <BusinessPickerParam>{
							askFlowId: false
						}
					});
					d.afterClosed().subscribe((x: ChoosenBizAccChatProj) => {
						if (x && x.bizAccount) {
							let ba = x.bizAccount;
							this.dialog.open(PublishChatbotComponent, {
								width: 'auto',
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
		this.infoDialog.confirm('Save?', 'Do you want to save any unsaved changes before you close?', (ok) => {
			if (ok)
				this.saveChatFlow();
			this.router.navigateByUrl('/studio');
		});
	}
}

class ChatFlowNetwork {
	constructor(
		public parent: ChatFlowComponent,
		public infoDialog: InfoDialogService,
		public snackbar: MatSnackBar) {
	}

	updateChatNodeConnections(): void {
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

	chatNodeConnections: ChatNodeConnection[] = [];
	chatNodeVMs: ChatNodeVM[] = [];
	chatFlowPack: models.ChatFlowPack;

	selectedNodes() {
		return this.chatNodeVMs.filter(x => x.isSelected);
	}

	newChatNodeConnection: ChatNodeNewConnection = new ChatNodeNewConnection();
	draggingChatNode: ChatNodeVM;
	draggingChatNodeOffset: Point;

	selectedNodeOffsets: {
		[nodeId: string]: Point;
	} = {};

	clickConnectionStartButton: ChatButtonConnector;
	clickConnectionStartSnackbar: MatSnackBarRef<SimpleSnackBar>;
}

class ChatNodeConnection {
	constructor(
		public srcButtonConnector: ChatButtonConnector,
		public destChatNodeVM: ChatNodeVM,
		public infoDialog: InfoDialogService) {
	}

	srcConnectorX() {
		return this.srcButtonConnector.x() - (this.pathWidth / 2);
	}
	srcConnectorY() {
		return this.srcButtonConnector.y();
	}

	destConnectorX() {
		return this.destChatNodeVM.nodeConnectorX() - (this.pathWidth / 2)
	}
	destConnectorY() {
		return this.destChatNodeVM.nodeConnectorY();
	}

	calcTangentOffset(pt1X: number, pt2X: number) {
		return ((pt2X - pt1X) / 2);
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
                ${this.destConnectorX()},${this.destConnectorY()}`; //double path to render connections with hollow shapes
	}

	closeButtonVisible = false;
	closeButtonPointX: number = 0;
	closeButtonPointY: number = 0;
	mouseEnter(event: MouseEvent) {
		let xy = this.destChatNodeVM.network.parent.transformCoordinates(event.pageX, event.pageY, event);
		this.closeButtonPointX = xy.x; //some offset from the cursor
		this.closeButtonPointY = xy.y; //some offset from the cursor
		this.closeButtonVisible = true;

		setTimeout(() => {
			this.closeButtonVisible = false;
		}, 50000); //Hide the close button after 5secs
	}

	circleRadius = Config.buttonCircleRadius;
	pathWidth = Config.connectionPathWidth;

	remove(event: MouseEvent) {
		this.infoDialog.confirm('Delete connection?', `This will delete the connection between the button '${this.srcButtonConnector.button.ButtonName || 'Unnamed Button'}' and node '${this.destChatNodeVM.chatNode.Name || 'Unnamed Node'}'. Are you sure?`, (ok) => {
			if (ok) {
				this.srcButtonConnector.setButtonNextNodeId(null);
				this.destChatNodeVM.network.updateChatNodeConnections();
			}
		});
	}
}

class ChatNodeNewConnection {
	srcButtonConnector: ChatButtonConnector;
	destX: number;
	destY: number;

	isHidden = false;
	canConnect = false;

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

	calcTangentOffset(pt1X: number, pt2X: number) {
		return ((pt2X - pt1X) / 2);
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

	circleRadius = Config.buttonCircleRadius;
}

class ChatButtonConnector {
	constructor(
		public chatNodeVM: ChatNodeVM,
		public button: models.Button,
		public snackbar: MatSnackBar) {
	}

	x() {
		let btns = this.chatNodeVM.chatNode.Buttons;
		let btnsCount = btns.length;
		let eachPart = (this.chatNodeVM.width() / btnsCount);
		let _x = (
			this.chatNodeVM.x()
			+ ((eachPart) * (this.btnIndex() + 1))
			- eachPart / 2
			- this.chatNodeVM.circleRadius
		);
		return _x;
	}

	y() {
		var _y = this.chatNodeVM.y() + this.chatNodeVM.height();
		//console.log("YY- " + this.chatNodeVM.chatNode.Name + ": " + this.chatNodeVM.height());
		return _y;
	}

	circleRadius = Config.buttonCircleRadius;

	mouseDown(event: MouseEvent) {
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

	setButtonNextNodeId(nextNodeId: string) {
		this.button.NextNodeId = nextNodeId;
		this.chatNodeVM.network.updateChatNodeConnections();
	}

	startDirectConnection(event: MouseEvent) {
		this.chatNodeVM.network.clickConnectionStartButton = this;

		if (this.chatNodeVM.network.clickConnectionStartSnackbar) {
			this.chatNodeVM.network.clickConnectionStartSnackbar.dismiss();
			this.chatNodeVM.network.clickConnectionStartSnackbar = null;
		}

		this.chatNodeVM.network.clickConnectionStartSnackbar = this.snackbar.open(`Connection started at button '${this.button.ButtonName}' of node '${this.chatNodeVM.chatNode.Name}'. Click on the target node to connect.`, 'Abort');
		this.chatNodeVM.network.clickConnectionStartSnackbar.onAction().subscribe(() => {
			this.chatNodeVM.network.clickConnectionStartButton = null;
		});
	}

	isConnected() {
		return this.button.NextNodeId && (this.chatNodeVM.network.chatNodeVMs.filter(x => x.chatNode.Id == this.button.NextNodeId).length > 0);
	}
}

export class ChatNodeVM {
	constructor(
		public network: ChatFlowNetwork,
		public chatNode: models.ChatNode,
		public snackbar: MatSnackBar) {
		this.network.chatNodeVMs.push(this);

		this._x = (this.network.chatNodeVMs.indexOf(this)) * Config.defaultNodeWidth;
	}
	_layoutUpdated: boolean = false;
	_x: number = 0;
	_y: number = 0;

	_btnTableWidth: number = Config.defaultNodeWidth;
	_width: number = Config.defaultNodeWidth;
	width() {
		return this._width;
	}

	_height: number = Config.defaultNodeHeight;
	height() {
		return this._height;
	}

	x() {
		return this._x;
	}

	y() {
		return this._y;
	}

	cornerRadius: number = Config.defaultNodeCornerRadius;
	headerHeight: number = Config.defaultNodeHeaderHeight;

	mouseDown(event: MouseEvent) {
		if (!this.network.parent.ctrlDown && this.network.selectedNodes().length <= 1) {
			this.network.parent.clearSelection();
		}
		this.toggleSelection();

		this.network.draggingChatNode = this;

		let targetXY = this.network.parent.transformCoordinates(event.pageX, event.pageY, event);
		let mouseOffsetX = targetXY.x - this._x;
		let mouseOffsetY = targetXY.y - this._y;
		this.network.draggingChatNodeOffset = new Point(mouseOffsetX, mouseOffsetY);

		this.network.selectedNodeOffsets = {}; //clearing
		let selectedNodes = this.network.selectedNodes();
		if (selectedNodes && selectedNodes.length > 0) {
			selectedNodes.forEach(n => {
				let mouseOffset = {
					x: targetXY.x - n._x,
					y: targetXY.y - n._y,
				};

				this.network.selectedNodeOffsets[n.chatNode.Id] = new Point(mouseOffset.x, mouseOffset.y);
			});
		}
	}

	mouseUp(event: MouseEvent) {
		let nw = this.network;
		if (!nw.newChatNodeConnection.isHidden) {
			nw.newChatNodeConnection.srcButtonConnector.setButtonNextNodeId(this.chatNode.Id);
		}
	}

	mouseEnter(event: MouseEvent) {
		let nw = this.network;
		if (!nw.newChatNodeConnection.isHidden) {
			nw.newChatNodeConnection.canConnect = true;
		}
	}

	mouseLeave(event: MouseEvent) {
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
		return (this.x()) + (this.width() / 2) - this.circleRadius;
	}

	clickConnectionActive() {
		return this.network.clickConnectionStartButton;
	}

	nodeClick() {
		if (this.clickConnectionActive()) {
			this.network.clickConnectionStartButton.setButtonNextNodeId(this.chatNode.Id);
			this.network.clickConnectionStartButton = null;
			this.network.clickConnectionStartSnackbar.dismiss();
		} else {
			if (!this.network.parent.ctrlDown && this.network.selectedNodes().length > 1) {
				this.network.parent.clearSelection();
			}
		}
	}

	circleRadius = Config.buttonCircleRadius;

	isSelected: boolean = false;
	toggleSelection() {
		this.isSelected = !this.isSelected;
	}
	isNodeEmpty() {
		if ((!this.chatNode.Sections || this.chatNode.Sections.length <= 0) && (!this.chatNode.Buttons || this.chatNode.Buttons.length <= 0)) {
			return true;
		} else {
			return false;
		}
	}
}

class Point {
	constructor(public x: number, public y: number) { }
}

class Config {
	static defaultNodeWidth = 300;
	static defaultNodeHeight = 200;
	static defaultNodeHeaderHeight = 30;

	static defaultNodeCornerRadius = 20;

	static defaultSectionWidth = 30;
	static defaultSectionHeight = 30;

	static defaultDesignerWidth = 1366;
	static defaultDesignerHeight = 700;

	static buttonCircleRadius = 8;
	static designerMargin = 40;
	static connectionPathWidth = 3;

	static zoomCoefficient = 0.3;

	static viewBoxAnimStep = 10;

	static maxZoomHeight = 600;
	static maxZoomWidth = 900;
}
