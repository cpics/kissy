/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: May 21 22:52
*/
KISSY.add("scrollview/plugin/scrollbar/control",function(d,j,i,g,e){return g.Controller.extend({bindUI:function(){var a=this,b;b=a.get("autoHide");var c=a.get("scrollview");a._xAxis="x"==a.get("axis");b?a._hideFn=function(){a.hide()}:(d.each([a.get("downBtn"),a.get("upBtn")],function(b){b.on("mousedown",a._onUpDownBtnMouseDown,a).on("mouseup",a._onUpDownBtnMouseUp,a)}),a.get("trackEl").on(j.Gesture.start,a._onTrackElMouseDown,a),b=a.dd=new i.Draggable({node:a.get("dragEl"),groups:!1,halt:!0}),b.on("drag",
a._onDrag,a).on("dragstart",a._onDragStart,a));c.on("afterScroll"+(a._xAxis?"Left":"Top")+"Change.ks-scrollbar",a.afterScrollChange,a).on("scrollEnd.ks-scrollbar",a._onScrollEnd,a).on("afterDisabledChange",a._onScrollViewDisabled,a)},syncUI:function(){var a=this.get("scrollview"),b=this.get("trackEl");this.get("dragEl");var c=this.get("rendered");this.scrollview=a;if(this._xAxis){if(c&&!a.isAxisEnabled("x")){this.hide();return}this._scrollLength=a.scrollWidth;b=this._trackElSize=b.width();a=a.clientWidth/
this._scrollLength;this.set("dragWidth",this.barSize=a*b)}else{if(c&&!a.isAxisEnabled("y")){this.hide();return}this._scrollLength=a.scrollHeight;b=this._trackElSize=b.height();a=a.clientHeight/this._scrollLength;this.set("dragHeight",this.barSize=a*b)}this._syncAndReRender()},destructor:function(){this.get("scrollview").detach(".ks-scrollbar");this._clearHideTimer()},_onScrollViewDisabled:function(a){this.set("disabled",a.newVal)},_onDragStart:function(){var a=this.scrollview,b=this._xAxis;this._startMousePos=
this.dd.get("startMousePos")[b?"left":"top"];this._startScroll=a.get(b?"scrollLeft":"scrollTop")},_onDrag:function(a){var b=this._xAxis,c=this.scrollview,a=this._startScroll+(a[b?"pageX":"pageY"]-this._startMousePos)/this._trackElSize*this._scrollLength;b?c.scrollTo(a):c.scrollTo(void 0,a)},_startHideTimer:function(){this._clearHideTimer();this._hideTimer=setTimeout(this._hideFn,1E3*this.get("hideDelay"))},_clearHideTimer:function(){this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=
null)},_onUpDownBtnMouseDown:function(a){if(!this.get("disabled")){a.halt();var b=this.scrollview,c=this._xAxis,f=c?"scrollLeft":"scrollTop",d=b.scrollStep[c?"left":"top"],h=this.get("downBtn"),a=a.target,e=a==h[0]||h.contains(a)?1:-1,c=c?function(){b.scrollTo(b.get(f)+e*d)}:function(){b.scrollTo(void 0,b.get(f)+e*d)};clearInterval(this.mouseInterval);this.mouseInterval=setInterval(c,100);c()}},_onTrackElMouseDown:function(a){if(!this.get("disabled")){var b=this._xAxis,c=b?"left":"top",f=b?"pageX":
"pageY",d=this.get("trackEl");this.get("dragEl");var h=this.scrollview,c=Math.max(0,(a[f]-d.offset()[c]-this.barSize/2)/this._trackElSize)*this._scrollLength;b?h.scrollTo(c):h.scrollTo(void 0,c);a.halt()}},_onUpDownBtnMouseUp:function(){clearInterval(this.mouseInterval)},_onScrollEnd:function(a){this._hideFn&&this.get("axis")==a.axis&&this._startHideTimer()},afterScrollChange:function(){var a=this.scrollview;this._clearHideTimer();this.show();this._hideFn&&!a.dd.get("dragging")&&this._startHideTimer();
this._syncAndReRender()},_syncAndReRender:function(){var a=this._xAxis,b=this.scrollview,c=a?"dragLeft":"dragTop",f=a?"dragWidth":"dragHeight",d=this.barSize,h=this._scrollLength,e=this._trackElSize,g=b.get(a?"scrollLeft":"scrollTop"),i=b.maxScroll,b=b.minScroll,b=a?b.left:b.top,a=a?i.left:i.top;g>a?(h=a/h*e,this.set(f,d-(g-a)),this.set(c,h+d-this.get(f))):g<b?(h=b/h*e,this.set(f,d-(b-g)),this.set(c,h)):(this.set(c,g/h*e),this.set(f,d))},_onSetDisabled:function(a){this.dd&&this.dd.set("disabled",
a)}},{ATTRS:{allowTextSelection:{value:!0},minLength:{value:20},scrollview:{view:1},axis:{view:1},autoHide:{value:d.UA.ios},visible:{valueFn:function(){return!this.get("autoHide")}},hideDelay:{value:0.1},dragWidth:{setter:function(a){var b=this.get("minLength");return a<b?b:a},view:1},dragHeight:{setter:function(a){var b=this.get("minLength");return a<b?b:a},view:1},dragLeft:{view:1},dragTop:{view:1},dragEl:{view:1},downBtn:{view:1},upBtn:{view:1},trackEl:{view:1},focusable:{value:!1},xrender:{value:e}}},
{xclass:"scrollbar"})},{requires:["event","dd/base","component/base","./render"]});
KISSY.add("scrollview/plugin/scrollbar/render",function(d,j,i){var g=d.Features.isTransformSupported(),e=d.Features.getTransformPrefix(),a={initializer:function(){var a=this.get("axis"),b=this.get("prefixCls");this.get("elCls").push(b+"scrollbar-"+a);d.mix(this.get("childrenElSelectors"),{dragEl:"#ks-scrollbar-{axis}-drag{id}",downBtn:"#ks-scrollbar-{axis}-arrow-down{id}",upBtn:"#ks-scrollbar-{axis}-arrow-up{id}",trackEl:"#ks-scrollbar-{axis}-track{id}"})},_onSetDragHeight:function(a){this.get("dragEl")[0].style.height=
a+"px"},_onSetDragWidth:function(a){this.get("dragEl")[0].style.width=a+"px"},_onSetDragLeft:function(a){this.get("dragEl")[0].style.left=a+"px"},_onSetDragTop:function(a){this.get("dragEl")[0].style.top=a+"px"}},b=e?e+"Transform":"transform";g&&(a._onSetDragLeft=function(a){this.get("dragEl")[0].style[b]="translateX("+a+"px) translateZ(0)"},a._onSetDragTop=function(a){this.get("dragEl")[0].style[b]="translateY("+a+"px) translateZ(0)"});return j.Render.extend(a,{ATTRS:{contentTpl:{value:i},axis:{},
scrollview:{},dragWidth:{},dragHeight:{},dragLeft:{},dragTop:{},dragEl:{},downBtn:{},upBtn:{},trackEl:{}}})},{requires:["component/base","./scrollbar-tpl"]});KISSY.add("scrollview/plugin/scrollbar/scrollbar-tpl",function(){return'<div id="ks-scrollbar-{{axis}}-track{{id}}" class="{{prefixCls}}scrollbar-{{axis}}-track"> <div id="ks-scrollbar-{{axis}}-drag{{id}}" class="{{prefixCls}}scrollbar-{{axis}}-drag"> <div class="{{prefixCls}}scrollbar-{{axis}}-drag-top"> </div> <div class="{{prefixCls}}scrollbar-{{axis}}-drag-center"> </div> <div class="{{prefixCls}}scrollbar-{{axis}}-drag-bottom"> </div> </div> </div> <div id="ks-scrollbar-{{axis}}-arrow-up{{id}}" class="{{prefixCls}}scrollbar-{{axis}}-arrow-up"> <a href="javascript:void(\'up\')">up</a> </div> <div id="ks-scrollbar-{{axis}}-arrow-down{{id}}" class="{{prefixCls}}scrollbar-{{axis}}-arrow-down"> <a href="javascript:void(\'down\')">down</a> </div>'});
KISSY.add("scrollview/plugin/scrollbar",function(d,j,i){function g(){g.superclass.constructor.apply(this,arguments)}d.extend(g,j,{pluginId:"scrollview/plugin/scrollbar",pluginSyncUI:function(e){var a=this.get("minLength"),b=this.get("autoHideX"),c=this.get("autoHideY"),f={scrollview:e,elBefore:e.get("contentEl")};void 0!==a&&(f.minLength=a);this.scrollBarX?this.scrollBarX.sync():e.isAxisEnabled("x")&&(a={axis:"x"},void 0!==b&&(f.autoHide=b),this.scrollBarX=(new i(d.merge(f,a))).render());this.scrollBarY?
this.scrollBarY.sync():e.isAxisEnabled("y")&&(a={axis:"y"},void 0!==c&&(f.autoHide=c),this.scrollBarY=(new i(d.merge(f,a))).render())},pluginDestructor:function(){this.scrollBarX&&(this.scrollBarX.destroy(),this.scrollBarX=null);this.scrollBarY&&(this.scrollBarY.destroy(),this.scrollBarY=null)}});return g},{requires:["base","./scrollbar/control"]});