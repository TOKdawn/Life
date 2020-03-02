var Util = {};
Util.setCookie = function(c_name, value, expiredays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";path=/;expires="+exdate.toGMTString());
};
Util.getCookies = function(c_name){
	if(document.cookie.length > 0){
	 var c_start = document.cookie.indexOf(c_name + "=");
	  if(c_start != -1){
		c_start = c_start + c_name.length + 1;
		var c_end = document.cookie.indexOf(";", c_start);
		if(c_end == -1){
			c_end=document.cookie.length;
		}
		return unescape(document.cookie.substring(c_start, c_end));
	  }
	}
	return ""
};
/**
 * 初始化
 */
(function(){
	 document.ondragstart = function() {return false;};
	//禁用ajax缓存
	$.ajaxSetup({
		cache: false
	});
	/**************启动Title自定义提示***************/
	$("[title],[original-title]").live("mouseover", function(){
		if($(this).attr("disableTitle")){
			return false;
		}
		if($("#mind_hover_tip").length > 0){
			return;
		}
		var target = $(this);
		if(target.attr("title")){
			target.attr("original-title", target.attr("title"));
			target.removeAttr("title");
		}
		if(!target.attr("original-title")){
			return;
		}
		var title = target.attr("original-title");
		var tip = $("#hover_tip");
		if(tip.length == 0){
			tip = $("<div id='hover_tip'><div class='tip_arrow'></div><div class='tip_content radius3'></div></div>").appendTo("body");
		}
		$(".tip_content").html(title);
		$("#hover_tip").show();
		$(".tip_arrow").removeClass("tip_right").removeClass("tip_top").css("top", "");
		if(target.attr("title_pos") == "right"){
			tip.css({
				left: target.offset().left + target.outerWidth() + 7,
				top: target.offset().top + target.outerHeight()/2 - tip.outerHeight()/2
			});
			$(".tip_arrow").attr("class", "tip_arrow tip_right").css("top", tip.outerHeight()/2 - 7);
		}else if(target.attr("title_pos") == "top"){
			tip.css({
				left: target.offset().left + target.outerWidth()/2 - tip.outerWidth()/2,
				top: target.offset().top - tip.outerHeight()
			});
			$(".tip_arrow").attr("class", "tip_arrow tip_top");
		}else if(target.attr("title_pos") == "left"){
			tip.css({
				left: target.offset().left - tip.outerWidth() - 7,
				top: target.offset().top + target.outerHeight()/2 - tip.outerHeight()/2
			});
			$(".tip_arrow").attr("class", "tip_arrow tip_left");
		}else{
			tip.css({
				left: target.offset().left + target.outerWidth()/2 - tip.outerWidth()/2,
				top: target.offset().top + target.outerHeight()
			});
			$(".tip_arrow").attr("class", "tip_arrow");
		}
	}).live("mouseout", function(){
		$("#hover_tip").hide();
	});
	var fromUrl = document.referrer;
	if(fromUrl && fromUrl.indexOf("processon.com") < 0){
		//如果有来源地址，并且不是processon的地址，记录cookie
		Util.setCookie("processon_referrer", encodeURI(fromUrl), 1);
	}
	/**
	 * 短提示，2000毫秒关闭
	 * @param {Object} msg
	 * @param {Object} type  [info,error,ok]
	 */
	$.simpleAlert = function(msg,type,delay){
		if(msg == "close"){
			$("#simplealert").remove();
			return;
		}
		if($("#simplealert").length){
			$("#simplealert").remove();
		}
		var alertType="simplealert-icon-info";
		if(type){
			alertType = "simplealert-icon-" + type;
		}
		var simpleAlert = $("<div id='simplealert' class='simplealert'></div>").appendTo("body");
		var html = "<div class='"+alertType+"'>";
		if(type == "loading"){
			html += "<img src='/images/default/designer/loading.gif' style='margin:10px 0px 0px 12px'/>";
		}
		html += "</div><div class='simplealert-msg'>"+msg+"</div><div class='simplealert-right'></div>";
		simpleAlert.html(html);
		simpleAlert.css("top", ( $(window).height() - simpleAlert.height() ) / 2+$(window).scrollTop() + "px");
		simpleAlert.css("left", ( $(window).width() - simpleAlert.width() ) / 2+$(window).scrollLeft() + "px");
		simpleAlert.show();
		if(delay != "no"){
			setTimeout(function(){
				simpleAlert.fadeOut(200);
			},delay ? delay : 3500);
		}
	};
	/**
	 * 置为不可用
	 */
	$.fn.disable = function(grow, zindex){
		$(this).attr("disable",true);
		// $(".disabled-mask").remove();
		$(this).addClass("opacity disable");
		for(var i = 0 ; i < $(this).length; i++){
			var dom = $(this)[i];
			$(dom).unbind("mouseover.disable").bind("mouseover.disable", function(){
				var mask = $("<div class='disabled-mask'></div>").appendTo("body");
				if(!grow){
					grow = 2;
				}
				mask.css({
					width:$(dom).outerWidth() + grow,
					height:$(dom).outerHeight() + 4,
					top:$(dom).offset().top,
					left:$(dom).offset().left,
					"z-index":9999
				});
				if(zindex){
					mask.css("z-index", zindex);
				}
				mask.on("mouseout", function(){
					$(this).remove();
				}).on("mouseup", function(e){
					e.stopPropagation();
				});
			});
		}
		return this;
	};
	/**
	 * 激活
	 * @param {Object} fn  重新绑定的事件
	 */
	$.fn.enable = function(){
		$(this).attr("disable",false);
		$(this).removeClass("opacity disable");
		for(var i = 0 ; i < $(this).length; i++){
			var dom = $(this)[i];
			$(dom).unbind("mouseover.disable").unbind("focus");
		}
		// $(".disabled-mask").remove();
		return this;
	};

	/**
	 * 打开登录窗口
	 * @param {Object} method
	 * @param {Object} callback
	 */
	Util.loginWindow = function(method, callback){
		if(typeof method == "undefined"){
			method="open";
		}
		if (method == "open") {
			if ($("#loginWindow").length) {
				$("#loginWindow").remove();
			}
			var loginWindow = $("<div id='loginWindow' style='margin-top:-120px;margin-left:-50px;' class='loginWindow'></div>").appendTo("body");
			loginWindow.append("<div id='loginWindow-content' class='loginWindow-content'><img src='/images/ajaxload.gif' style='margin:80px 0px 0px 45%'/></div>");
			$("#loginWindow-content").load("/login/window",function(){
				loginCallback = callback;
			});
			loginWindow.dialog();
		}else if(method="close"){
			$("#loginWindow").dialog("close");
		}
	};

	/**
	 * 打开付费窗口
	 * @param {Object} method
	 * @param {Object} callback
	 */
	Util.payWindow = function(method,data,callback){
		if(typeof method == "undefined"){
			method="open";
		}
		if (method == "open") {
			if ($("#payWindow").length) {
				$("#payWindow").remove();
			}
			var payWindow = $("<div id='payWindow' style='margin-top:-120px;margin-left:-50px;' class='payWindow'></div>").appendTo("body");
			payWindow.append("<div id='payWindow-content' class='loginWindow-content'><img src='/images/ajaxload.gif' style='margin:80px 0px 0px 45%'/></div>");
			$("#payWindow-content").load("/order/pay/window",data,function(){
				payCallback = callback;
			});
			payWindow.dialog();
		}else if(method="close"){
			$("#payWindow").dialog("close");
		}
	};
	/**
	 * 打开一个遮罩
	 * @param {Object} method
	 */
	var maskStackCount = 0;
	$.mask = function(method){
		if(typeof method == "undefined"){
			method="open";
		}
		if (method == "open") {
			if (maskStackCount == 0) {
				var mask = $("<div id='window-mask' class='window-mask' style='display:none'></div>").appendTo("body");
				mask.css({
					width: $(window).width() + "px",
					height: $(window).height() + "px",
					filter: "alpha(opacity=60)"
				}).show();
				$(window).bind("resize.mask", function(){
					mask.css({
						width: $(window).width() + "px",
						height: $(window).height() + "px"
					});
				});
			}
			maskStackCount++;
		}
		else if(method == "close"){
			maskStackCount--;
			if(maskStackCount == 0){
				$("#window-mask").remove();
				$(window).unbind("resize.mask");
			}
		}

	};
	/**
	 * 弹出窗口
	 * ---options---
	 * width
	 * heiht
	 * title
	 * onClose
	 */
	$.fn.dialog = function(options){
		var dialogWin = $(this);
		//如果是字符串类型，则调用方法
		if(typeof options == "string"){
			//关闭
			if(options == "close"){
				dialogWin.find(".dialog-close").trigger("click");
				if($("#window-mask") != null){
					$("#window-mask").hide();
				}
			}
		}else{
			var defaults = {
				fixed: true,
				closable: true,
				mask: true
			};
			options = $.extend(defaults, options);
			//初始化，打开
			if(!options){
				options = {};
			}
			var title = "";
			if(options.title){
				title = options.title;
			}else if(dialogWin.attr("title")){
				title = dialogWin.attr("title");
				dialogWin.attr("title", "");
			}
			// dialogWin.css({
			// 	"width": dialogWidth,
			// 	"height": dialogHeight
			// })
			dialogWin.addClass("dialog-box").show();
			var dialogClose = $("<span class='dialog-close icons'>&#xe637</span>").appendTo(dialogWin);
			dialogClose.bind("click", function(){
				$(document).off('keyup.confirm');
				if(options.onClose){
					if(options.onClose() == false){
						return;
					}
				}
				$.mask("close");
				dialogWin.hide();
				dialogWin.removeClass("dialog-box").find(".dialog-close").remove();
				var title = dialogWin.find(".dialog-title");
				dialogWin.attr("title",title.text());
				title.remove();
				$(window).unbind("resize.dialog");
			});
			dialogWin.find(".close").on("click", function(){
				dialogClose.click();
				// dialogWin.dialog("close");
				return;
			});
			if(options.closable){
				dialogClose.show();
			}
            if(options.hideable){
                dialogClose.hide();
            }
			if(title != ""){
				dialogWin.prepend("<h2 class='dialog-title'>"+title+"</h2>");
			}
			//遮罩
			if(options.mask){
				$.mask();
			}
			$(window).bind("resize.dialog", function(){
				var dialogWidth = dialogWin.outerWidth();
				var dialogHeight = dialogWin.outerHeight();
				var top = 0;
				if(options.fixed){
					dialogWin.css("position", "fixed");
					top = ($(window).height() - dialogHeight) / 2 + "px";
//					console.log($(this),dialogWin, top)
				}else{
					dialogWin.css("position", "absolute");
					top = ($(window).height() - dialogHeight) / 2 + $(document).scrollTop() + "px";
				}
				var left = ($(window).width() - dialogWidth) / 2 + "px";
				dialogWin.css({
					top: top,
					left: left
				});
			});
			$(window).trigger("resize.dialog");
			dialogWin.find(".dialog-title").draggable({target:dialogWin});
		}
		return dialogWin;
	};

	$.fn.draggable = function(options){
		var defaults = {
			target: "default",
			clone: false,
			undrag: "",
			scroll: true,
			//callback
			start: function(){},
			drag: function(){},
			end: function(){}
		};
		var opt = $.extend(defaults, options);
		$(this).off("mousedown.drag").on("mousedown.drag", function(e){
			$(document).on("selectstart.drag dragstart", function(){return false;});
			var $this = $(this);
			var target = typeof opt.target == "string" && opt.target == "default" ? $this : opt.target;
			var downX = e.pageX;
			var downY = e.pageY;
			var downLeft = target.offset().left;
			var downTop = target.offset().top;
			if(opt.clone){
				target = $this.clone().removeAttr("id").css("position", "absolute")
				.offset({
					left: downLeft,
					top: downTop
				});
				if(typeof opt.clone == "function"){
					opt.clone.call(target, e);
					downLeft = target.css("left").replace("px", "") * 1;
					downTop = target.css("top").replace("px", "") * 1;
				}
				if(opt.opacity){
					target.css("opacity", opt.opacity);
				}
			}
			$(document).on("mousemove.drag", function(e){
				if(!$this.hasClass("ondrag")){
					$this.addClass("ondrag");
					if(opt.clone)
						target.appendTo($this.parent());
					opt.start.call($this[0], e);
				}
				var left = e.pageX - downX + downLeft;
				var top = e.pageY - downY + downTop;
				if(opt.bounding){
					var boundingleft = opt.bounding.offset().left;
					var boundingtop = opt.bounding.offset().top;
					if(left > boundingleft && top > boundingtop
						&& left < boundingleft + opt.bounding.outerWidth() - target.outerWidth()
						&& top < boundingtop + opt.bounding.outerHeight() - target.outerHeight()){
						target.offset({
							left: left,
							top: top
						});
					}
				}else{
					target.offset({
						left: left,
						top: top
					});
				}
				opt.drag.call($this[0], e);
			});
			$(document).on("mouseup.drag", function(e){
				opt.end.call($this[0], e);
				if(opt.clone){
					target.remove();
				}
				$(document).off("selectstart.drag dragstart");
				$(document).off("mousemove.drag");
				$(document).off("mouseup.drag");
				if(!$(".drop-hover").length){
					$this.removeClass("ondrag");
				}
			});
			$(this).on("mouseup.drag", function(e){
				$(document).trigger("mouseup.drag");
				$(this).off("mouseup.drag");
			});
		});
		if(!!opt.undrag){
			$(this).find(opt.undrag).off("mousemove.drag").on("mousemove.drag", function(e){
				e.stopPropagation();
			}).on("dragstart", function(){return false});
		}
		return this;
	};

	$.confirm = function(options){
		var confirmWin = $("#global_confirm_window");
		var okval = "确定";
		if(options.okval){
			okval = options.okval;
		}
		if(!confirmWin.length){
            // debugger
            if(options.hasOwnProperty('feishuDelete')){
                confirmWin = $("<div id='global_confirm_window' tabindex='-1' class='confirm-box' title='请确认'><div class='dlg-content'>"+options.content+"</div><div class='dlg-buttons'><span class='pro-btn delete okbtn'>" + okval + "</span>&nbsp;&nbsp;<span class='pro-btn basic cancelbtn close'>取消</span></div></div>").appendTo("body");
            }else{
                confirmWin = $("<div id='global_confirm_window' tabindex='-1' class='confirm-box' title='请确认'><div class='dlg-content'>"+options.content+"</div><div class='dlg-buttons'><span class='pro-btn default okbtn'>" + okval + "</span>&nbsp;&nbsp;<span class='pro-btn basic cancelbtn close'>取消</span></div></div>").appendTo("body");
            }
		}else{
			confirmWin.find(".dlg-content").html(options.content);
			confirmWin.find(".okbtn").html(okval);
		}
		if(options.width){
			confirmWin.css("width", options.width);
		}
		if(options.height){
			confirmWin.css("height", options.height);
		}
		if(options.hiddenOK){
			confirmWin.find(".okbtn").css("visibility", "hidden")
		}else{
			confirmWin.find(".okbtn").css("visibility", "visible")
		}
		confirmWin.dialog();
		$(document).off('keyup.confirm').on('keyup.confirm', function(e){
			if(e.keyCode == 13)
				confirmWin.find(".okbtn").trigger('click');
		});
		confirmWin.find(".okbtn").off().on("click", function(){
			confirmWin.dialog("close");
			if(options.onConfirm){
				options.onConfirm();
			}
			$(document).off('keyup.confirm');
		});
		confirmWin.find(".cancelbtn").off("click.cancel").on("click.cancel", function(){
			if(options.onCancel){
				options.onCancel();
			}
			$(document).off('keyup.confirm');
		});
	};
	/**
	 *升级提示
	 *
	 */
	$.imgtoast = function(options){
		var toastWin = $("#upgrade_dlg");
		if(!toastWin.length){
			var upgradWin = '<div id="upgrade_dlg" class="dialog" style="background:#fff;box-shadow:none;">' +
                '<div class="upgrade-box">' +
                '<h3 class="upgrade-box-title">升级企业版</h3>' +
                '<p class="upgrade-box-content">' +
                '更好的保证团队数据安全与协作效率<br>' +
                '专注工作与协作' +
                '</p>' +
                '<ul class="upgrade-ul">' +
                '<li><span class="icons">&#xe658;</span>无限量项目组使用，各项目同时推进</li>' +
                '<li><span class="icons">&#xe658;</span>免费克隆系统付费模板</li><li>' +
                '<span class="icons">&#xe658;</span>团队成员高级权限设置灵活协作</li>' +
                '<li><span class="icons">&#xe658;</span>团队数据安全，实时备份</li>' +
                '<li style="color: #4386F5; font-size: 15px;"> 请联系企业管理员进行账户升级.<a href="https://processon1.feishu.cn/docs/doccn1gCcGu2lUrZ3qs7HIxrcth">升级说明</a></li>' +
                '</ul>' +
                '<button  class="button" style="float:right; bottom: 20px;" onclick="window.location.href=\'https://processon1.feishu.cn/docs/doccn1gCcGu2lUrZ3qs7HIxrcth\'" >升级说明</button>'+
                // '<a class="button" href="/upgrade">立即升级</a>' +
                '<img src="/assets/images/about/upgrade_bg_right.png"/>' +
                '</div>' +
                '</div>';
			toastWin = $(upgradWin).appendTo("body");
		}
		if(options.tid){
            toastWin.find(".button").attr("href","/upgrade?tid="+options.tid);
		}
		toastWin.dialog();
	};
	/**
	 * 下拉菜单
	 * @param options{
	 * 	position: left, center, right
	 * 	offsetX 左右偏移
	 * 	offsetY 上下偏移
	 * 	zindex zindex值，默认2
	 * 	autoClose 是否点击其他区域后自动关闭
	 * 	closeAfterClick 点击后是否自动关闭
	 * 	target 相对的某个元素弹出
	 * 	onClose 关闭时执行的函数
	 *  autoPosition 是否当显示位置超出浏览器窗口时，自动移动
	 * }
	 */
	$.fn.popMenu = function(options){
		var menu = $(this);
		if(typeof options == "string"){
			//关闭
			if(options == "close"){
				menu.hide().removeClass("popover");
				$(window).unbind("resize.popmenu");
			}
			return;
		}
		var defaults = {
				position: "left",
				fixed: false,
				offsetX: 0,
				offsetY: 0,
				zindex: 2,
				autoClose: true,
				closeAfterClick: false,
				autoPosition: true
		};
		var opt = $.extend(defaults, options);
		var target = $(opt.target);
		menu.addClass("popover").css("z-index", opt.zindex);
		if(opt.fixed){
			menu.css("position", "fixed");
		}
		if(opt.autoClose){
			if(opt.closeAfterClick == false){
				menu.unbind("mouseup.popmenu").bind("mouseup.popmenu", function(e){
					e.stopPropagation();
				});
			}
			$(document).bind("mouseup.popmenu", function(){
				menu.popMenu("close");
				$(document).unbind("mouseup.popmenu");
				if(opt.onClose){
					opt.onClose();
				}
			});
		}
		$(window).bind("resize.popmenu", function(){
			menu.popMenu(options);
		});
		menu.show();
		var left = 0;
		if(opt.position == "center"){
			left = target.offset().left + target.outerWidth() / 2 - menu.outerWidth() / 2;
		}else if(opt.position == "right"){
			left = target.offset().left + target.outerWidth() - menu.outerWidth();
		}else{
			left = target.offset().left;
		}
		if(left + menu.outerWidth() > $(window).width()){
			left = $(window).width() - menu.outerWidth();
		}
		var top = target.offset().top + target.outerHeight();
		if(opt.autoPosition && top + opt.offsetY + menu.outerHeight() > $(window).height() + $(document).scrollTop()){
			menu.css({
				top:$(window).height() - menu.outerHeight() + $(document).scrollTop(),
				left:left + opt.offsetX
			});
		}else{
			menu.css({
				top:top + opt.offsetY,
				left:left + opt.offsetX
			});
		}
	};
	$.fn.suggest = function(options){
		var target = $(this);
		var defaults = {
			valueField: "value",
			offsetX: 0,
			offsetY: 0,
			width: target.outerWidth(),
			format: function(item){
				return item.text;
			}
		};
		var opt = $.extend(defaults, options);
		var suggest = $(".suggest-menu");
		if(suggest.length < 1)
			suggest = $("<ul class='suggest-menu'></ul>").appendTo("body");
		suggest.width(opt.width);
		var index = -1;
		var last = "";
		target.off("keydown.suggest").on("keydown.suggest", function(e){
			if(e.keyCode == 40){
				//向下
				e.preventDefault();
				if(index < suggest.children().length - 1){
					index ++;
					suggest.find(".active").removeClass("active");
					suggest.find("li[index=" + index + "]").addClass("active");
				}
			}else if(e.keyCode == 38){
				//向上
				e.preventDefault();
				suggest.find(".active").removeClass("active");
				if(index >= 0){
					index--;
					suggest.find("li[index=" + index + "]").addClass("active");
				}
			}else if(e.keyCode == 13){
				var active = suggest.find(".active");
				if(active.length){
					target.val(active.attr("val"));
				}
				if(opt.onEnter){
					opt.onEnter(target);
				}
				suggest.hide();
				value = "";
			}
		}).off("keyup.suggest").on("keyup.suggest", function(e){
			var value = target.val();
			if(value == ""){
				suggest.hide();
			}else if(value != last){
				index = -1;
				$.get(opt.url, {q: value}, function(data){
					suggest.empty();
					var items = data.items;
					if(items.length == 0){
						suggest.hide();
						value = "";
					}else{
						for(var i = 0; i < items.length; i++){
							var item = items[i];
							var itemHtml = "<li index='" + i + "' class='suggest-item' val='" + item[opt.valueField] + "'>";
							itemHtml += opt.format(item);
							itemHtml += "</li>";
							suggest.append(itemHtml);
						}
						suggest.show();
						suggest.attr("tabindex", 0);
						var left = 0;
						if(opt.position == "center"){
							left = target.offset().left + target.outerWidth() / 2 - suggest.outerWidth() / 2;
						}else if(opt.position == "right"){
							left = target.offset().left + target.outerWidth() - suggest.outerWidth();
						}else{
							left = target.offset().left;
						}
						if(left + suggest.outerWidth() > $(window).width()){
							left = $(window).width() - suggest.outerWidth();
						}
						var top = target.offset().top + target.outerHeight();
						if(opt.autoPosition && top + opt.offsetY + suggest.outerHeight() > $(window).height() + $(document).scrollTop()){
							suggest.css({
								top:$(window).height() - suggest.outerHeight() + $(document).scrollTop(),
								left:left + opt.offsetX
							});
						}else{
							suggest.css({
								top:top + opt.offsetY,
								left:left + opt.offsetX
							});
						}
						suggest.find(".suggest-item").off("mousedown").on("mousedown", function(e){
							e.preventDefault();
							target.val($(this).attr("val"));
							if(opt.onEnter){
								opt.onEnter(target);
							}
							suggest.hide();
							last = value = "";
						});
					}
				});
			}
			last = value;
		}).off("blur.suggest").on("blur.suggest", function(e){
			suggest.hide();
			last = "";
		});
	};
	/**
	 * 说明： 在页面指定元素中构建分页条
	 * @param curPage 当前第几页
	 * @param totalPage 一共有多少页
	 * @param clickHandler 点击事件，传入参数为当前第几页
	 * @param barCount 分页条共显示多少个按钮
	 */
	$.fn.pagination = function(curPage, totalPage, clickHandler, barCount){
		if(totalPage <= 1){
			return;
		}
		var pageBarNum = 5;
		if(barCount){
			pageBarNum = barCount;
		}
		var tar = $(this).addClass("pagination");
		var start = 1;
		var end = totalPage;
		if(totalPage > pageBarNum){
			var index = Math.floor(pageBarNum/2);
			var start = (curPage-index) > 0 ? (curPage-index) : 1;
			if(totalPage - start < pageBarNum){
				start = totalPage - pageBarNum + 1;
			}
			var end = start + pageBarNum - 1;
		}
		var pageHtml = "";
		if(curPage > 1){
			pageHtml += "<a p='" + (curPage - 1) + "'>«</a>";
		}else{
			pageHtml += "<a class='disabled'>«</a>";
		}
		if(start >= 2){
			pageHtml += "<a p='1'>1</a>";
		}
		if(start >= 3){
			pageHtml += "<a class='disabled ellipsis'>...</a>";
		}
		for (var i = start; i <= end; i++) {
			if (i > totalPage)
				break;
			if (i == curPage) {
				pageHtml += '<a class="disabled">' + i + '</a>';
			} else {
				pageHtml += "<a p='" + i + "'>" + i + "</a>";
			}
		}
		if(end <= totalPage - 2){
			pageHtml += "<a class='disabled ellipsis'>...</a><a p='"+totalPage+"'>"+totalPage+"</a>";
		}else if(end <= totalPage - 1){
			pageHtml += "<a p='"+ totalPage +"'>"+totalPage+"</a>";
		}
		if(curPage < totalPage){
			pageHtml += "<a p='" + (curPage + 1) + "'>»</a>";
		}else{
			pageHtml += "<a class='disabled'>»</a>";
		}
		tar.html(pageHtml);
		if(clickHandler){
			tar.find("a[p]").bind("click", function(){
				var page = $(this).attr("p");
				clickHandler(page);
			});
		}
	};
	$.fn.multiInput = function(opts, value, text){
		var obj = $(this);
		if(typeof opts == "string" && opts == "setVal"){
			setVal(value, text);
			return;
		}
		opts = $.extend({
			text:"请在此输入邮箱，回车添加",
			autoComplete:false,
			url:"",
			params:{}
		}, opts);

		obj.html("");
		var valsCon = $('<div class="multi-input-vals"></div>');
		var input = $('<div><input type="text" id="multi-input" placeholder="'+ opts.text +'"></div>');
		obj.append(valsCon).append(input);
		input.find("input").off().on("keyup", function(e){
			var txt = $.trim($(this).val());
			if(txt == ""){
				return;
			}
			if(e.keyCode == 13 && opts.setVal){
				var isEmail = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,8}$/.test(txt);
				if(!isEmail){
					//$(this).val("");
					return;
				}
				var html = opts.setVal(txt);
				setVal(null, html);
				$(this).val("");
			}else if(opts.autoComplete){
				opts.params = $.extend(opts.params, {value:txt});
				$.ajax({
					url:opts.url,
					cache:false,
					data:opts.params,
					success:function(data){
						var html = opts.autoCompleteCallback(data);
						$(".popWindow").remove();
						if(html == ""){
							return;
						}
						var htmlCon = $("<div class='popWindow'></div>").appendTo("body");
						htmlCon.html(html);
						htmlCon.popWindow({
							target:"#multi-input"
						});
					}
				});
			}
		});
		$(document).on("click", ".multi-input-vals .closeme" ,function(){
			var closeBtn = $(this), txt = closeBtn.prev().text();
			if(txt != null && opts.deleteVal){
				closeBtn.parent().remove();
				opts.deleteVal(txt);
			}
		})
		function setVal(val, text){
			var vals = obj.find(".multi-input-vals");
			var icon = "&#xe63e;", isEmail = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,8}$/.test(text);
			if(isEmail && val == null){
				icon = "&#xe614;";
				val = text;
			}else if(!isEmail && val == null){
				return;
			}
			var html = '<span val="'+ val +'" class="multi-input-value"><span class="icons">'+ icon +'</span><span class="multi-text">'+ text +'</span><span class="icons closeme">&#xe637;</span></span>';
			vals.append(html);
		}
	};
	$.fn.popWindow = function(opts){
		var obj = $(this), target = $(opts.target), posLeft = 0;
		if(opts.dropCenter == 'center'){
			posLeft =target.offset().left - 0 + (target.width()/2);
		}else{
			posLeft =target.offset().left;
		}
		obj.css({
			left: posLeft,
			top:target.offset().top + target.height() + (opts.mh || 0),
			zIndex:opts.index || 1
		}).show().siblings(".popWindow").hide();
		obj.on("click.popwindow", function(e){
			e.stopPropagation();
		});
		$(document).on("click.popwindow", function(){
			obj.hide().css({index:-1});
		})
	}
	/**
	 * 获取ID
	 */
	$.fn.id = function(){
		return this.attr("id");
	};

	$.fn.submitForm = function (opt) {
		var defaultOpt = {
			json: true
		};
		var options = $.extend(defaultOpt, opt);
		var form = $(this);
		if (options.onSubmit) {
			if (options.onSubmit.call(form) == false) {
				return
			}
		}
		if (options.url) {
			form.attr("action", options.url)
		}
		var frameId = "submit_frame_" + (new Date().getTime());
		var frame = $("<iframe id=" + frameId + " name=" + frameId + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({
			position: "absolute",
			top: -1000,
			left: -1000
		});
		form.attr("target", frameId);
		frame.appendTo("body");
		frame.bind("load", submitCallback);
		form.append("<input type='hidden' name='submitFormByHiddenFrame' id='submitFormByHiddenFrameParam' value='hiddenFrame'/>");
		form[0].submit();
		$("#submitFormByHiddenFrameParam").remove();
		var checkCount = 10;

		function submitCallback() {
			frame.unbind();
			var body = $("#" + frameId).contents().find("body");
			var data = body.html();
			if (data == "") {
				if (--checkCount) {
					setTimeout(submitCallback, 200);
					return
				}
				return
			}
			var ta = body.find(">textarea");
			if (ta.length) {
				data = ta.val()
			} else {
				var pre = body.find(">pre");
				if (pre.length) {
					data = pre.html()
				}
			}
			try {
				eval("data=" + data);
				if (data.error == "error") {
					$.simpleAlert("暂时无法处理您的请求，请稍候重试。", "error", 3000)
				} else {
					if (data.error == "notlogin") {
						Util.loginWindow("open",
							function () {
								form.submitForm(options)
							})
					} else {
						if (options.success) {
							options.success(data)
						}
					}
				}
			} catch (e) {
				if (options.json) {
					$.simpleAlert("暂时无法处理您的请求，请稍候重试。", "error", 3000);
					if (options.error) {
						options.error(data)
					}
				} else {
					if (options.success) {
						options.success(data)
					}
				}
			}
			setTimeout(function () {
					frame.unbind();
					frame.remove()
				},
				100)
		}
	};
	/**
	 * 扩展的form提交 post ajax形式
	 * @param {Object} options
	 * @param .url  提交地址
	 * @param .onSubmit  提交前事件
	 * @param .success  提交成功事件
	 */
	$.fn.submitFormAjax = function(options){
		var form = $(this);
		if(options.onSubmit){
			if (options.onSubmit.call() == false) {
				return;
			}
		}
		$.ajax({
			url:options.url ? options.url : $(this).attr("action"),
			type:"POST",
			data:$(this).serialize(),
			success:function(data){
				if(data.error == "error"){
					$.simpleAlert("暂时无法处理您的请求，请稍候重试", "error", 3000);
				}else if (data.error == "notlogin") {
					//由AOP拦截处理的登录验证
					Util.loginWindow("open", function(){
						form.submitFormAjax(options);
					});
				}else if (options.success) {
					options.success(data);
				}
			},
			error:function(data){
				$.simpleAlert("暂时无法处理您的请求，请稍候重试","error",3000);
				if(options.error){
					options.error(data);
				}
			}
		});
	};
	/**
	 * dom边缘动态数字提示
	 */
	$.fn.numberTip = function(opts){
		var defaults = $.extend({
			val:"+1",
			size:14,
			color:"red",
			time:1000, //ms
			pos:"right"
		}, opts);
		var obj = $(this);
		var num = $("<span class='number-tip'>"+ defaults.val +"</span>").appendTo("body");
		var left = obj.offset().left;
		if(defaults.pos == "right"){
			left = obj.offset().left + obj.outerWidth() / 2;
		}
		num.css({
			left:left,
			top:obj.offset().top,
			opacity:1
		}).show();
		num.animate({
			top:"-=14px",
			opacity:0
		}, 400, function(){
			num.remove();
		});
	};
	/**
	 * dom输入框等进行提示
	 */
	$.fn.inputTip = function(opts){
		var defaults = $.extend({
			text:"",
			time:500, //ms
			pos:"rightin" //rightin,rightout,leftin,leftout
		}, opts);
		var obj = $(this), tip = $(".input-tip");
		if(tip.length){
			tip.show();
			return;
		}
		tip = $("<span class='input-tip'>"+ defaults.text +"</span>").appendTo("body");
		var left = obj.offset().left;
		if(defaults.pos == "rightin"){
			left = obj.offset().left + obj.outerWidth() - obj.width();
		}else if(defaults.pos == "rightout"){
			left = obj.offset().left + obj.outerWidth() + 5;
		}
		tip.css({
			left:left,
			top:defaults.top || obj.offset().top,
			opacity:1
		}).show();
		setTimeout(function(){
			tip.fadeOut(function(){
				tip.remove();
			});
		}, defaults.time);
	};
	/**
	 * 列表发散效果
	 * w:内容宽度
	 * h:内容高度
	 * ml:左边距
	 * mt:右边距
	 * maxWidth:排列宽度
	 */
	$.fn.spread = function(options){
		var items = this;
		if( typeof options === "string" ) return;
		if( items.length <= 0 ) return;
		var $i = $(items[0]), $p = $i.parent();
		var pl = parseInt( $i.css("padding-left").replace("px", "") ), pr = parseInt( $i.css("padding-right").replace("px", "") ),
			pt = parseInt( $i.css("padding-top").replace("px", "") ), pb = parseInt( $i.css("padding-bottom").replace("px", "") ),
			wpl = parseInt( $p.css("padding-left").replace("px", "") ), wpr = parseInt( $p.css("padding-right").replace("px", "") ),
			wpt = parseInt( $p.css("padding-top").replace("px", "") ), wpb = parseInt( $p.css("padding-bottom").replace("px", "") );
		var defaults = {
				w: $i.width() + pl + pr,
				h: $i.height() + pt + pb,
				ml: 10,
				mt: 10,
				maxWidth: $p.width(),
				s: 150
		};
		var opt = $.extend(defaults, options);
		var w = opt.w, h = opt.h, ml = opt.ml, mt = opt.mt, maxWidth = opt.maxWidth, s = opt.s;
		$.each(items, function(i, item){
			var $item = $(item);
			$item.css({"top":"-" + h + "px", "left":0});
		});
		var row = parseInt( (maxWidth + ml)/(w + ml) );		//单行最多排列个数
		var cell = Math.ceil( items.length/row );
		$.each(items, function(i, item){
			var $item = $(item);
			var l = parseInt( i/row );		//第几行
			var r = parseInt( i%row );		//每行第几个
			var left = r == 0 ? wpl + 10 : r*( w + ml ) + wpl + 10;
			var top = l == 0 ? wpt + 6 : l*( h + mt ) + wpt + 6;
			$item.css({"display":"block","position":"absolute"});
			var time = ( Math.sqrt( Math.pow((top + 150), 2) + Math.pow(left, 2) ) / 150 );
			$item.animate({
				top: top,
				left: left
			}, time*s );
		});
	}

	/**
	 * target: 输入框的DIV
	 * face: 表情按钮
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	var streamInputStreams = {};
	var curr_stream_icon = null;
	$.fn.streamInput = function(options) {
		if(!this[0] || !options.face || this[0].nodeName != "DIV" || this.attr("stream_id")){
			return;
		}
		var defaults = {
			target: this
		}
		var opt = $.extend(defaults, options);
		//加入集合
		var stream = {
			id: "",
			range: null
		}
		var keys = Object.keys(streamInputStreams);
		stream.id = keys.length ? streamInputStreams[keys[keys.length - 1]].id + 1 : 1;
		stream.stream_id = "stream_" + (keys.length ? streamInputStreams[keys[keys.length - 1]].id + 1 : 1);
		this.attr({
			contentEditable: "true",
			spellcheck: "false",
			accesskey: "q",
			stream_id: stream.stream_id
		});
		$(opt.face).attr("for_stream", stream.stream_id);
		streamInputStreams[stream.stream_id] = stream, curr_stream_icon = stream;
		/**
		 * v11 ie11及非ie
		 * v10 ie10及以下
		 * isRange 是否有Range
		 * isCopy 是否复制
		 * len 移动长度
		 * @type {Boolean}
		 */
		var isCopy = false, isRange = false, v11 = 0, v10 = 0, len = 0, b = !!opt.home;
		$(opt.target).off("click.stream keyup.stream").on("click.stream keyup.stream", function(e){
			curr_stream_icon = streamInputStreams[$(this).attr("stream_id")];
			curr_stream_icon.target = $(this);
			var sel = window.getSelection();
			curr_stream_icon.range = sel.getRangeAt(0).cloneRange();
		});
		$(opt.target).off("DOMSubtreeModified.stream").on("DOMSubtreeModified.stream", function(e){
			if(!isCopy) {
				return;
			}
			isCopy = false;
			if($(this).children().length < 1)
				return;
			replaceHtml($(this));
			replaceFace($(this));
			if(isRange) {
				replaceHtml($(this).find(".paste-cont"));
				var str = $(this).html();
				$(this).empty();
				var sel = window.getSelection();
				var range = sel.getRangeAt(0);
				range.deleteContents();
				var div = $("<div>" + str + "</div>");
				//去除剪切板中非文本和表情内容
				var html = div.html(), el = document.createElement("div"), frag = document.createDocumentFragment(), node, lastNode;
				if (html){
					el.innerHTML = html;
					while ( (node = el.firstChild) ) {
						lastNode = frag.appendChild(node);
						if(node.nodeName == "SPAN") {
							v11 = frag.childNodes.length + node.childNodes.length - 1;
						}
					}
				}
				range.insertNode(frag);
				// 粘贴得到的文本
				if (lastNode) {
					range = range.cloneRange();
					range.collapse(true);
					replaceSpan($(this), false);
					range.setStart(this, v11 || this.childNodes.length - v10 );
					range.setEnd(this, v11 || this.childNodes.length - v10 );
					if(v10 && len) {
						var index = this.childNodes.length - v10;
						node = this.childNodes[index];
						range.setStart(node, node.data.length - len);
						range.setEnd(node, node.data.length - len);
					}
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}else {
				focusToEnd(this);
			}
		});
		$(opt.target).off("paste.stream").on("paste.stream", function(e){
			e = e.originalEvent;
			var clip =  e.clipboardData || e.view.clipboardData;
			var sel = window.getSelection();
			var range = sel.getRangeAt(0);
			range.deleteContents();
			try{
				//获取剪切板内容
				var str = clip.getData("text/html") || clip.getData("text/plain").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				str = str.replace(/<(\/)?(html|body)(\s|\S)+?>/g, "").replace(/(<!--.+?-->)|(\r\n)/g, "");
				var div = $("<div>" + str + "</div>");
				replaceHtml(div);
				replaceFace(div);
				resetRange(div, sel, range, this);
				return false;
			}
			catch(err){
				isCopy = true;
				if($.trim($(this).html().replace(/\s+|<br>/g, "")) == ""){
					isRange = false;
					return;
				}
				isRange = true;
				var span = document.createElement("span");
				span.className = "paste-cont";
				range.insertNode(span);
				range = range.cloneRange();
				range.selectNodeContents(span);
				sel.removeAllRanges();
				sel.addRange(range);
				var rangeStart = getRangeStart(this);
				v10 = rangeStart.v, len = rangeStart.len;
			}
		});
		$(opt.face).off("click.stream").on("click.stream", function(){
			curr_stream_icon = streamInputStreams[$(this).attr("for_stream")];
			var input = curr_stream_icon.target = $("div[stream_id='" + $(this).attr("for_stream") + "']");
			input.focus();
			if(curr_stream_icon.range) {
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(curr_stream_icon.range);
			}
			var dialog = $("#faces_dialog");
			if(dialog.length < 1) {
				dialog = $("<div></div>").attr({"id": "faces_dialog", "class": "faces-lib"})
				.append("<ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>" +
				"<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>" +
				"<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>" +
				"<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>" +
				"<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>")
				.appendTo("body");
			}
			$("#faces_dialog").popMenu({
				target: this,
				position: "right",
				zindex: 4
			});
			// .popMenu({
			// 	target: this,
			// 	fixed: b,
			// 	offsetY: 10,
			// 	zindex:999
			// });
			$("#faces_dialog ul li").off("click.stream").on("click.stream", function(e){
				$("#faces_dialog").popMenu("close");
				var input = $(curr_stream_icon.target), index = $(this).index() + 1, str;
				str = "<img class='ico-face' src='/assets/images/faces/faces/" + index + ".gif'>";
				if($.trim(input.html().replace(/&nbsp;|<br>/g, "")) == ""){
					input.html(str);
					focusToEnd(input[0]);
					return;
				}
				input.focus();
				var sel = window.getSelection();
				var range = curr_stream_icon.range;
				range.deleteContents();
				var div = $("<div>" + str + "</div>");
				resetRange(div, sel, range, input);
			});
			$("#faces_dialog").on('mousedown', function(e) {
				e.stopPropagation();
			})
		});
		function replaceHtml(div) {
			try{
				var html = div.html().replace(/^\s+/g, " ").replace(/(\S)\s+(\S)?/g, "$1 $2");
				div.html(html);
				var childs = div.children(":not(.ico-face, .paste-cont)");
				if(childs.length < 1) {
					return;
				}
				childs.each(function(i, item) {
					var display = $(item).css("display");
					if($(item).is("img, title, head, link, style, script"))
						$(item).remove();
					else
						$(item).replaceWith( $(item).html() );
				});
			}
			catch(e) {
			}
			childs = div.children(":not(.ico-face, .paste-cont)");
			if(childs.length > 0) {
				replaceHtml(div);
			}
		}
		function replaceFace(div) {
			var faces = div.find(".ico-face");
			faces.each(function(i, item) {
				$(item).replaceWith( $("<img class='" + $(item).attr("class") + "' src='" + $(item).attr("src") + "'>") );
			});
		}
		function replaceSpan(div) {
			var childs = div.children(".paste-cont");
			if(childs.length < 1)
				return;
			childs.each(function(i, item) {
				$(item).replaceWith( $(item).html() );
			});
		}
		function focusToEnd(element) {
			$(element).focus();
			try {
				var range = document.createRange();
				range.selectNode(element.lastChild || element);
				range.collapse(false);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
				$(element).keyup();
			} catch (ex) {}
		}
		function getRangeStart(div) {
			var that = div.cloneNode(true), len = that.childNodes.length, v = 0, nl = 0;
			if(len > 3 && $(that).children(".paste-cont").length > 0 ) {
				for(var i = 0; i < len; i++) {
					var el = that.childNodes[i];
					if(el.nodeName == "SPAN"){
						v = len - i - 1;
						if(i < len - 1 && that.childNodes[i + 1].nodeName == "#text") {
							nl = that.childNodes[i + 1].data.length;
						}
						break;
					}
				}
			}
			return {v: v, len: nl}
		}
		function resetRange(div, sel, range, ele){
			//去除剪切板中非文本和表情内容
			var html = div.html(), el = document.createElement("div"), frag = document.createDocumentFragment(), node, lastNode;
			if (html){
				el.innerHTML = html;
				while ( (node = el.firstChild) ) {
					lastNode = frag.appendChild(node);
				}
			}
			range.insertNode(frag);
			// 粘贴得到的文本
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
				$(ele).keyup();
			}
			return range;
		}
	};
})();
/**
 * 封装的ajax，对$.ajax结果进行了过滤
 * @param {Object} options
 */
Util.ajax = function(options){
	if(options.onSend){
		if(options.onSend() == false){
			return;
		}
	}
	var defaults = {
		type: "POST"
	}
	options = $.extend(defaults, options);
	return $.ajax({
		url:options.url,
		type:options.type,
		traditional:true,
		data:options.data,
		success:function(data){
			if(data.error == "error"){
				$.simpleAlert("<@i18n resource='global.error'/>","error",3000);
				if(options.error){
					options.error(data);
				}
			}else if (data.error == "notlogin") {
				//由AOP拦截处理的登录验证
				if(options.loginValidate){
					options.loginValidate(data);
				}
				Util.loginWindow("open", function(){
					//登录成功再次执行本次请求.
					Util.ajax(options);
				});
			}else{
				if(options.success){
					options.success(data);
				}
			}
		},
		error:function(data){
			if(data.status){
				if(options.error){
					options.error(data);
				}else{
//					$.simpleAlert("<@i18n resource='global.error'/>","error",3000);
				}
			}
		}
	});
};
Util.get = function(url, params, callback){
	$.ajax({
		url:url,
		type:"GET",
		data:params,
		success:function(data){
			if(data.error == "error"){
				$.simpleAlert("<@i18n resource='global.error'/>","error",3000);
			}else if (data.error == "notlogin") {
				//由AOP拦截处理的登录验证
				Util.loginWindow("open", function(){
					//再次执行
					Util.get(url, params, callback);
				});
			}else{
				callback(data);
			}
		},
		error:function(data){
//			$.simpleAlert("<@i18n resource='global.error'/>","error",3000);
		}
	});
};
/**
 * 头部弹窗插件
 * @param {} content 显示的内容
 * @param {} type 显示的样式（top_success/ top_error）
 * @param {} delay 默认7000
 */
Util.globalTopTip = function(content, type, delay, dom, noarrow){
	if(typeof content == "undefined"){
		return;
	}
	if(delay == null){
		delay = 5000;
	}
	if(type == null){
		type = "top_success";
	}
	var globalTopTipBox = $("#global_top_dialog");
	if(globalTopTipBox.length > 0){
		globalTopTipBox.remove();
	}
	globalTopTipBox = $('<div id="global_top_dialog" class="global_top_dialog"><div class="left_arrow"></div>' + content + '<div class="right_arrow"></div></div>').appendTo("body");
	globalTopTipBox.addClass(type);
	if(noarrow){
		globalTopTipBox.find(".left_arrow").remove();
		globalTopTipBox.find(".right_arrow").remove();
		globalTopTipBox.addClass("noarrow");
	}
	var outerW = globalTopTipBox.outerWidth();
	if(dom){
		globalTopTipBox.css("top", $(dom).offset().top + "px");
	}else{
		if($("#header").length == 0){
			globalTopTipBox.css("top", "0px");
		}
	}
	globalTopTipBox.css({
		"margin-left": -(outerW*0.5)+"px"
	}).show();
	setTimeout(function(){
		globalTopTipBox.addClass("show");
		setTimeout(function(){
			globalTopTipBox.removeClass("show");
			setTimeout(function(){
				globalTopTipBox.fadeOut("slow").remove();
			},250);
		}, delay);
	},50);
};
/**
 * 全局gloabaltip
 * @param {}
 * content 显示的内容
 * type 显示的样式（left-bot-default）
 * delay 默认5000
 */
Util.globalLeftTip = function(params){
	var options =  params;
	if(typeof options.content == "undefined"){
		return;
	}
	if(!options.delay){
		options.delay = 5000;
	}
	if(options.type == null){
		options.type = "left-bot-default";
	}
	var globalTopTipBox = $("#global-leftbot-dialog");
	if(globalTopTipBox.length > 0){
		globalTopTipBox.remove();
	}
	globalTopTipBox = $('<div id="global-leftbot-dialog" class="global-leftbot-dialog">' + options.content + '</div>').appendTo("body");
	globalTopTipBox.addClass(options.type);
	globalTopTipBox.show();
	setTimeout(function(){
		globalTopTipBox.addClass("show");
		setTimeout(function(){
			globalTopTipBox.removeClass("show");
			setTimeout(function(){
				globalTopTipBox.fadeOut("slow").remove();
			},250);
		}, options.delay);
	},50);
};


/**
 * 全局顶部loading效果
 * author lyp
 * @param options
 */
Util.loading = function(options) {
	var defaults = {
		content:"loading...",
		show:1000,
		delay:0,
		model:false
	};
	if(typeof(options) == "string" && options == "close"){
		$("#top_loading_tip").remove();
		$("#dialog_model").remove()
		return ;
	};
	options = $.extend(defaults, options);
	if($("#top_loading_tip").length > 0){
		$("#top_loading_tip").remove();
	}
	var $html = $("<div id='top_loading_tip' class='loadingTop'><p><b>" + options.content + "</b></p></div>").appendTo("body");
	if(options.model) {
		$("body").append("<div id='dialog_model'></div>");
		$("#dialog_model").css({"width": "100%", "height": "100%", "position": "fixed", "top": 0, "left": 0,
			"z-index": options.zIndex - 1, "opacity": 0.6, "background": "#FFF", "display": "none"});
	}
	if( typeof(options.show) == "number" ) {
		$("#top_loading_tip").delay(options.delay).show(0, function(){
			if(options.model)
				$("#dialog_model").show();
		}).delay(options.show).fadeOut(500, function(){
			if(options.model)
				$("#dialog_model").hide();
		});
	}
	else if( options.show === true ) {
		$("#top_loading_tip").delay(options.delay).show(0, function(){
			if(options.model)
				$("#dialog_model").show();
		});
	}
};
/**
 * loadingball
 * @param {}
 * {close:true,con:$dom,css:{background:'#aaa',width:'10px',height:'10px'}}
 * 样式在global.css
 */
Util.loadingball = function(params){
	if(params.close){
		$('.ball-spinner').hide();
		return ;
	}
	var $Dom = params.con;
	if(!$Dom){
		$Dom = $('body');
	}
	var ballSpinner = $Dom.children('.ball-spinner');
	if(ballSpinner.length > 0){
		ballSpinner.show();
	}else{
		$('<div class="ball-spinner center-middle"><div class="ball1"></div><div class="ball2"></div><div class="ball3"></div>').appendTo($Dom);
	}
	if(params.css && typeof (params.css) == 'object'){
		$('.ball-spinner>div').css(params.css);
	}
};
Util.messageNoPrivilege = function(content,dowhat){
    $.confirm({
        content: "<div class='filecheck-con'><span class='icons'>&#xe656;</span><div class='filecheck-right'><div>"+content+"</div><div>您可以 <a target='_blank' href='/upgrade'>"+dowhat+"</a></div></div>",
        onConfirm: function(){
            window.location = "/upgrade";
        }
    });
},
Util.checkOrgExpire = function(callback,params){
    Util.ajax({url:"/organizations/check_expire",data:params,success:function(e){
            if(e.expire){
                $.imgtoast({tid:params.orgId});
                callback(false);
                return;
            }
            callback(true);
        }
    });
},
Util.checkFileCount = function(callback,params){
	Util.ajax({
		url: "/view/privatefilecount",
		data:params,
		success: function(data){
			if(data.member){
				callback();
				return;
			}
			if(data.filecount >= data.totalcount){
				$.confirm({
					content: "<div class='filecheck-con'><span class='icons'>&#xe656;</span><div class='filecheck-right'><div>您的文件数量不足，无法创建新的文件</div><div>您可以 <a target='_blank' href='/upgrade'>去升级账号或者扩容</a></div></div></div>",
					onConfirm: function(){
						callback(false);
					},
					okval:"去看看"
				});
			}else{callback();}
		}
	});
};
/**
 * 创建随机密码
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
Util.creatCode = function(len)
{
	var seed = ['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ','123456789'];
	var idx, i;
	var result='';
	for(i = 0; i < len; i++)
	{
		idx = Math.floor(Math.random() * 3);
		result += seed[idx].substr(Math.floor(Math.random() * (seed[idx].length)), 1);
	}
	return result;
}
Util.loadAvatar = function(userId){
	var userlogo = "https://accounts.processon.com";
	var serverName = location.origin.toLowerCase();
	var endIndex = serverName.indexOf("processon.com");
	if(endIndex < 0){
		userlogo = "";
	}
	if(!userId){
		return '<img src="/assets/imgs/on.png"/>';
	}else{
		return '<img src="' + userlogo + '/photo/' + userId + '.png"/>';
	}
}
/*
 *  说明：过滤XSS
 *  模板中使用<!--{}-->标签输出变量则自动添加XSS过滤
 *  使用<!--@@-->标签则不进行xss过滤
 *  使用：
 *  initnode.filter.xss(val);
 */
Util.filterXss = function(val){
	if(val == null || val == ""){
		return "";
	}
    val = val.toString();
    val = val.replace(/</g,'&lt;');
    val = val.replace(/%3C/g,'&lt;');
    val = val.replace(/>/g,'&gt;');
    val = val.replace(/%3E/g,'&gt;');
    val = val.replace(/'/g,'&apos;');
    val = val.replace(/"/g,'&quot;');
    return val;
};
Util.restoreXss = function(val){
	if(val == null || val == ""){
		return "";
	}
    val = val.replace(/&lt;/g, "<");
    val = val.replace(/&gt;/g,">");
    val = val.replace(/&apos;/g,'\'');
    val = val.replace(/&quot;/g,'"');
    return val;
};
/**
 *  扩展js String
 */
String.prototype.isEmpty = function(){
	if(this.replace(/(^\s*)|(\s*$)/g, '').length<=0){//null
		return true;
	}
	else{// not null
		return false;
	}
};
String.prototype.notEmpty = function(){
	return !this.isEmpty();
};
String.prototype.isEmail = function(){
	if(this.isEmpty() || (! /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,8}$/.test(this))){//格式不正确
		return false;
	}else{// 格式正确
		return true;
	}
};
//Array 功能扩展：获取元素下标、判断包含、删除指定元素
Array.prototype.inArray = function(elem){
	for(var i = 0; i < this.length; i++){
		if(this[i] == elem) return true;
	}
	return false;
};
Array.prototype.indexOf = function(elem){
	for(var i = 0; i < this.length; i++){
		if(this[i] == elem) return i;
	}
	return -1;
};
Array.prototype.remove = function(elem){
	var index = this.indexOf(elem);
	if(index > -1){
		this.splice(index, 1);
	}
};
if(!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
};
Util.getUrlParams = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null){
		return unescape(r[2]);
	}
	return null;
};
/**
 * 计算shape数量
 */
Util.shapesCount = function(index){
	var designer_canvas = $("#designer_canvas"), shapesCount = designer_canvas.find(".shape_box").length;
	if(shapesCount > 600){
		Util.globalTopTip("本文件的图形数量已足够绘制一艘航空母舰，为了好的作图体验，建议您不要制作过大的文件哦", "top_error", 20000, $("#designer"));
	}
}
/**
 *获取当前日期下几个月的日期
 *{param:number } monthNum 月数
 */
Util.GetNextMonthDay = function(monthNum) {
	 var date = new Date();
     days = date.getDate(); //获取当前日期中的月的天数
     var year2 = date.getFullYear();
     var month2 = parseInt(date.getMonth()+1) + parseInt(monthNum);
     if (month2 > 12) {
         year2 = parseInt(year2) + parseInt((parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12));
         month2 = parseInt(month2) % 12;
     }
     var day2 = date.getDate();
     var days2 = new Date(year2, month2, 0);
     days2 = days2.getDate();
     if (day2 > days2) {
         day2 = days2;
     }
     if (month2 < 10) {
         month2 = '0' + month2;
     }

     var t2 = year2 + '年' + month2 + '月' + day2 +'日';
     return t2;
}
Util.GetNextDay = function(dayNum,date) {
	if(date){
		var date1 = new Date(date);
	}else{
		var date1 = new Date();
	}
	var date2 = new Date(date1);
	date2.setDate(date1.getDate() + dayNum);
	return date2.getFullYear() + "年" + (date2.getMonth() + 1) + "月" + date2.getDate() +'日';
}

