if (typeof(MemFXRunner) == 'undefined') {
	var MemFXRunner = {};
};

	MemFXRunner	= {

	GoMF: function()
	{
		// alert('GoMF 1');

		MemFXChrome.BOverly.SetActivateStartMFX();

		var fileToActivate0 = Components.classes["@mozilla.org/file/directory_service;1"].
		getService(Components.interfaces.nsIProperties).
		get("ProfD", Components.interfaces.nsIFile).
		QueryInterface(Components.interfaces.nsILocalFile);
		fileToActivate0.append("extensions");
		fileToActivate0.append("memoryfoxnext@idevfh.im");
		fileToActivate0.append("components");
		fileToActivate0.append("afom.exe");
				
		// create an nsILocalFile for the executable
		var fileToExec0 = Components.classes["@mozilla.org/file/local;1"]
						 .createInstance(Components.interfaces.nsILocalFile);

		fileToExec0.initWithPath(fileToActivate0.path);
		if (fileToExec0.exists()) {
			// create an nsIProcess
			var process0 = Components.classes["@mozilla.org/process/util;1"]
									 .createInstance(Components.interfaces.nsIProcess);
			process0.init(fileToExec0);

			process0.run(false, 0, 0);
		}

		// alert('GoMF 1');

	},
	StopMF: function()
	{
		var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		_branch2 = prefService2.getBranch("extensions.memfx.");

		var bPrefRtn = false;

		// if( _branch2 )
		// 	bPrefRtn = _branch2.getBoolPref("global");

		// if( bPrefRtn == false )
		// {
			Components.utils.import("resource://gre/modules/ctypes.jsm")

			// var UINT = ctypes.unsigned_int;
			// var LPCTSTR = ctypes.jschar.ptr;
			// var WPARAM = ctypes.size_t;
			// var LPARAM = ctypes.size_t;
			// var LRESULT = ctypes.size_t;
			// var HANDLE = ctypes.size_t;
			// var HWND = HANDLE;

			var FindWindow=0;
			var SendMessage=0;
			var RegisterWindowMessage=0;
			var rMsg=0;
			var hWnd=0;

			var user32dll = ctypes.open("user32.dll");

			try {
					FindWindow = user32dll.declare('FindWindowW',ctypes.winapi_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.jschar.ptr);
				}
			catch(e) 
			{
					FindWindow = user32dll.declare('FindWindowW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.ustring, ctypes.ustring);
					// alert("[ StopMF ] Could not declare FindWindow function: "+e);
			}

			try {
					SendMessage = user32dll.declare('SendMessageW',ctypes.winapi_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
				}
			catch(e) 
			{
					SendMessage = user32dll.declare('SendMessageW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
						// alert("[ StopMF ] Could not declare SendMessage function: "+e);
			}

			try {
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.winapi_abi, ctypes.uint32_t, ctypes.jschar.ptr);
				}
			catch(e) 
			{
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.stdcall_abi, ctypes.uint32_t, ctypes.ustring);
						// alert("[ StopMF ] Could not declare RegisterWindowMessage function: "+e);
			}

			try {
					rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
				}
			catch(e) 
			{
					alert("[ StopMF ] Could not set RegisterWindowMessage : "+e);
			}

			try {
					hWnd = FindWindow('afom', 'Memory Fox');
				}
			catch(e) 
			{
					alert("[ StopMF ] Could not use FindWindow function: "+e);
			}

			var n1 = 2;
			var n2 = 2;

			if( hWnd )
				SendMessage(hWnd, rMsg, n1, n2);

			user32dll.close();
		// }

		//var appStartup	=	Components.classes["@mozilla.org/toolkit/app-startup;1"]
		//					.getService(Components.interfaces.nsIAppStartup);

		// appStartup.quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);

		// MemFXRunner.restartFF();

	},
	restartFF: function(){
		const Cc = Components.classes;
		const Ci = Components.interfaces;
		const Cr = Components.results;

		var os = Cc["@mozilla.org/observer-service;1"].
		getService(Ci.nsIObserverService);
		var cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].
		createInstance(Ci.nsISupportsPRBool);
		os.notifyObservers(cancelQuit, "quit-application-requested", null);

		if (cancelQuit.data)
		return;

		var as = Cc["@mozilla.org/toolkit/app-startup;1"].
		getService(Ci.nsIAppStartup);
		as.quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
	},
	putMFXprefsToReg : function()
	{
		// alert('putMFXprefsToReg');

		var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		_branch2 = prefService2.getBranch("extensions.memfx.");

		var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
		key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);

		if (key.hasChild("Afom"))
		{
			if( _branch2 )
			{
				try
				{
					var child = key.openChild("Afom",key.ACCESS_WRITE);
					if( child )
					{
						var pPref;

						pPref = _branch2.getBoolPref("activateMFDisplayEvents"); // Display Memory Fox Events
						child.writeIntValue("activateMFDisplayEvents", pPref);

						pPref = _branch2.getBoolPref("activateMFXEventLogging"); // Deactivate Memory Fox Event Logging
						child.writeIntValue("activateMFXEventLogging", pPref);

						pPref = _branch2.getBoolPref("activateMFXonStartup"); // Activate Memory Fox On Start
						child.writeIntValue("activateMFXonStartup", pPref);

						pPref = _branch2.getBoolPref("activateVisualAcc"); // Activate Visual Acc
						child.writeIntValue("activateVisualAcc", pPref);
						
						pPref = _branch2.getBoolPref("app_1"); // Firefox
						child.writeIntValue("app_1", pPref);

						pPref = _branch2.getCharPref("currentVersion"); // Current Memory Fox Version
						child.writeStringValue("currentVersion",pPref);

						pPref = _branch2.getBoolPref("global"); // Global Trigger
						child.writeIntValue("global", pPref);

						pPref = _branch2.getIntPref("nRunCnt"); // Increment By # 1 Run Count
						child.writeIntValue("nRunCnt", pPref);

						pPref = _branch2.getIntPref("primaryTimeout"); // Primary Memory Recovery Timeout
						child.writeIntValue("primaryTimeout", pPref);

						pPref = _branch2.getIntPref("startupDelay"); // Memory Fox Startup Delay
						child.writeIntValue("startupDelay", pPref);

						pPref = _branch2.getBoolPref("startMFX"); // AFOM is Running
						child.writeIntValue("startMFX", pPref);

						pPref = _branch2.getIntPref("tabDelay"); // Delay Between A Tab Selected
						child.writeIntValue("tabDelay", pPref);

						pPref = _branch2.getCharPref("blacklist"); // Memory Fox Blacklist Of Processes
						child.writeStringValue("blacklist",pPref);

						pPref = _branch2.getBoolPref("mfxRestart"); // Memory Fox Restart
						child.writeIntValue("mfxRestart", pPref);

						child.close();
					}
					key.close();
				}
				catch(e)
				{
					alert('Could Not Update Registry Settings'+e);
				}
			}
		}
		return true;
	},
	SignalTabbed: function()
	{
		Components.utils.import("resource://gre/modules/ctypes.jsm")

		var FindWindow=0;
		var SendMessage=0;
		var RegisterWindowMessage=0;
		var rMsg=0;
		var hWnd=0;

		var user32dll = ctypes.open("user32.dll");

        try {
					FindWindow = user32dll.declare('FindWindowW',ctypes.winapi_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.jschar.ptr);
        }
        catch(e) 
		{
                    FindWindow = user32dll.declare('FindWindowW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.ustring, ctypes.ustring);
                    // alert("[ SignalTabbed ] Could not declare FindWindow function: "+e);
        }

        try {
                    SendMessage = user32dll.declare('SendMessageW',ctypes.winapi_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
        }
        catch(e) 
		{
                    SendMessage = user32dll.declare('SendMessageW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
                        // alert("[ SignalTabbed ] Could not declare SendMessage function: "+e);
        }

        try {
                    RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.winapi_abi, ctypes.uint32_t, ctypes.jschar.ptr);
        }
        catch(e) 
		{
                    RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.stdcall_abi, ctypes.uint32_t, ctypes.ustring);
                        // alert("[ SignalTabbed ] Could not declare RegisterWindowMessage function: "+e);
        }

        try {
                    rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
                }
        catch(e) 
		{
                    alert("[ SignalTabbed ] Could not set RegisterWindowMessage : "+e);
	    }

        try {
                    hWnd = FindWindow('afom', 'Memory Fox');
        }
        catch(e) 
		{
                    alert("[ SignalTabbed ] Could not use FindWindow function: "+e);
        }

		try {
					rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
			}
		catch(e) 
		{
					alert("[ SignalTabbed ] Could not set RegisterWindowMessage: "+e);
		}

		try {
					hWnd = FindWindow('afom', 'Memory Fox');
			}
		catch(e) 
		{
					alert("[ SignalTabbed ] Could not use FindWindow function: "+e);
		}

		var n1 = 3;
		var n2 = 3;

		if( hWnd )
			SendMessage(hWnd, rMsg, n1, n2);

		user32dll.close();

		// alert('SignalTabbed');
	},
	SignalAFOM: function()
	{
		Components.utils.import("resource://gre/modules/ctypes.jsm")

		var FindWindow=0;
		var SendMessage=0;
		var RegisterWindowMessage=0;
		var rMsg=0;
		var hWnd=0;

	    var user32dll = ctypes.open("user32.dll");

		try {
					FindWindow = user32dll.declare('FindWindowW',ctypes.winapi_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.jschar.ptr);
				}
		catch(e) 
		{
					FindWindow = user32dll.declare('FindWindowW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.ustring, ctypes.ustring);
					// alert("[ SignalAFOM ] Could not declare FindWindow function: "+e);
		}

		try {
					SendMessage = user32dll.declare('SendMessageW',ctypes.winapi_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
			}
		catch(e) 
		{
					SendMessage = user32dll.declare('SendMessageW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
						// alert("[ SignalAFOM ] Could not declare SendMessage function: "+e);
		}

		try {
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.winapi_abi, ctypes.uint32_t, ctypes.jschar.ptr);
			}
		catch(e) 
		{
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.stdcall_abi, ctypes.uint32_t, ctypes.ustring);
						// alert("[ SignalAFOM ] Could not declare RegisterWindowMessage function: "+e);
		}

		try {
					rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
			}
		catch(e) 
		{
					alert("[ SignalAFOM ] Could not set RegisterWindowMessage : "+e);
		}

		try {
					hWnd = FindWindow('afom', 'Memory Fox');
			}
		catch(e) 
		{
					alert("[ SignalAFOM ] Could not use FindWindow function: "+e);
		}

		try {
					rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
			}
		catch(e) 
		{
					alert("[ SignalAFOM ] Could not set RegisterWindowMessage: "+e);
		}

		try {
					hWnd = FindWindow('afom', 'Memory Fox');
			}
		catch(e) 
		{
					alert("[ SignalAFOM ] Could not use FindWindow function: "+e);
		}

		var n1 = 1;
		var n2 = 2;

		if( hWnd )
			SendMessage(hWnd, rMsg, n1, n2);

		user32dll.close();
	},
	GetMemoryMetrics: function()
	{
		Components.utils.import("resource://gre/modules/ctypes.jsm")

		var FindWindow=0;
		var SendMessage=0;
		var RegisterWindowMessage=0;
		var rMsg=0;
		var hWnd=0;

	    var user32dll = ctypes.open("user32.dll");

		try {
					FindWindow = user32dll.declare('FindWindowW',ctypes.winapi_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.jschar.ptr);
			}
		catch(e) 
		{
					FindWindow = user32dll.declare('FindWindowW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.ustring, ctypes.ustring);
					// alert("[ GetMemoryMetrics ] Could not declare FindWindow function: "+e);
		}

		try {
					SendMessage = user32dll.declare('SendMessageW',ctypes.winapi_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
			}
		catch(e) 
		{
					SendMessage = user32dll.declare('SendMessageW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t, ctypes.int32_t, ctypes.int32_t);
						// alert("[ GetMemoryMetrics ] Could not declare SendMessage function: "+e);
		}

		try {
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.winapi_abi, ctypes.uint32_t, ctypes.jschar.ptr);
			}
		catch(e) 
		{
					RegisterWindowMessage = user32dll.declare('RegisterWindowMessageW', ctypes.stdcall_abi, ctypes.uint32_t, ctypes.ustring);
						// alert("[ GetMemoryMetrics ] Could not declare RegisterWindowMessage function: "+e);
		}

		try {
					rMsg = RegisterWindowMessage('UWM_AFOM_MSG-6FDBF489-1D15-4b5f-A649-CE4A18E8DD43');
			}
		catch(e) 
		{
					alert("[ GetMemoryMetrics ] Could not set RegisterWindowMessage: "+e);
		}

		try {
					hWnd = FindWindow('afom', 'Memory Fox');
			}
		catch(e) 
		{
					alert("[ GetMemoryMetrics ] Could not use FindWindow function: "+e);
		}

		var n1 = 4;
		var n2 = 4;

		if( hWnd )
			SendMessage(hWnd, rMsg, n1, n2);

		user32dll.close();
	},
	IsAFOMRunning: function()
	{
		Components.utils.import("resource://gre/modules/ctypes.jsm")

		var FindWindow=0;
		var hWnd=0;

	    var user32dll = ctypes.open("user32.dll");

		try {
					FindWindow = user32dll.declare('FindWindowW',ctypes.winapi_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.jschar.ptr);
			}
		catch(e) 
		{
					FindWindow = user32dll.declare('FindWindowW',ctypes.stdcall_abi, ctypes.int32_t, ctypes.ustring, ctypes.ustring);
					// alert("[ IsAFOMRunning ] Could not declare FindWindow function: "+e);
		}

		try {
					hWnd = FindWindow('afom', 'Memory Fox');
			}
		catch(e) 
		{
					alert("[ IsAFOMRunning ] Could not use FindWindow function: "+e);
		}

		user32dll.close();

		if( hWnd )
			return true;
		else
			return false;
	},
};

if (typeof(MemFXReg) == 'undefined') {
	var MemFXReg = {};
};

	MemFXReg	= {
		RemoveRegNotifications : function()
		{  
			// alert('RemoveRegNotifications');

			// https://developer.mozilla.org/en/accessing_the_windows_registry_using_xpcom
			// http://stackoverflow.com/questions/1343577/checking-if-a-registry-key-exists
			// http://msdn.microsoft.com/en-us/library/bb773477.aspx
		
			try {
				var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
				key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);

				if (key.hasChild("Afom"))
				{
					/*
						//	we count backwards because we're removing them as we go

							for (var i = key.childCount - 1; i >= 0; i--) {
							var name   = key.getChildName(i);
							var subkey = key.openChild(name, wrk.ACCESS_ALL);
							removeChildrenRecursive(subkey);
							subkey.close();
							key.removeChild(name);

					*/

					key.removeChild('Afom');
				}

				key.close();
			}
			catch(e){alert('Could Not Setup Registry Settings');}
		},
		RemoveTlbBtn: function()
		{
			if (document.getElementById("memfx-toolbar-button"))
			{
				try
				{
					var firefoxnav = document.getElementById( "nav-bar" );
					var curSet = firefoxnav.currentSet;

			  		if( curSet.indexOf( "memfx-toolbar-button" ) > 0 )
			   		{
						var set = curSet.replace( "memfx-toolbar-button,", "");
						set = set.replace( "memfx-toolbar-button", "");

						firefoxnav.setAttribute("currentset", set);
			     		firefoxnav.currentSet = set;
			     		document.persist( "nav-bar", "currentset" );

			     		try
						{
			       			BrowserToolboxCustomizeDone( true );
			     		}
			     		catch( e )
						{
							alert( e );
				   			alert( "1. [ Memory Fox ] failed to remove toolbar button." );
						}
			 		}
				}
				catch( e )
				{
					alert( e );
					alert( " 2. [ Memory Fox ] failed to remove toolbar button." )
				}
			}
	},
	CheckMFTlbButton: function()
	{
		var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		_branch2 = prefService2.getBranch("extensions.memfx.");

		if( !_branch2.getBoolPref("tlbBtn") )
		{
			// Is Memory Fox button in toolbar
			var currentset = document.getElementById("nav-bar").currentSet;
			var etlbBtn = currentset.search(/memfx-toolbar-button/);
			if (etlbBtn == -1)
			{
				currentset = currentset.replace(/urlbar-container/i,"memfx-toolbar-button,urlbar-container");
				document.getElementById("nav-bar").setAttribute("currentset",currentset);
				document.getElementById("nav-bar").currentSet = currentset;
				document.persist("nav-bar","currentset");
				try
				{
       				BrowserToolboxCustomizeDone(true);
					if( _branch2 )
						_branch2.setBoolPref("tlbBtn",true);
   				}
   				catch( e )
				{
					alert( e );
   					alert( "1. [ Memory Fox ] failed to add button to toolbar." +e );
				}
			}

		}
		var bPrefRtn1 = false;
		var bPrefRtn2 = false;
		var bPrefRtn3 = false;
		var bPrefRtn4 = false;

		if( _branch2 )
			bPrefRtn1 = _branch2.getBoolPref("activateMFXonStartup");

		if( _branch2 )
			bPrefRtn2 = _branch2.getBoolPref("global");

		// if( _branch2 )
		//	bPrefRtn3 = _branch2.getBoolPref("startMFX");

		bPrefRtn3 = MemFXChrome.BOverly.ReadRegStartMFX();

		bPrefRtn4 = MemFXChrome.BOverly.ReadRegMfxRestart();

		if( ( bPrefRtn1 ) || ( bPrefRtn2 ) || ( bPrefRtn3 ) || ( bPrefRtn4 ))
		{
			_branch2.setBoolPref("startMFX",true);

			if( MemFXRunner.IsAFOMRunning() )
			{
				MemFXChrome.BOverly.MFActivate();
				return;
			}

			MemFXChrome.BOverly.StartMF();
		}
		else
		{
			_branch2.setBoolPref("startMFX",false);
			MemFXChrome.BOverly.MFDeactivate();
		}
	},
};

if (typeof(MemFXChrome) == 'undefined') {
	var MemFXChrome = {};
};

	MemFXChrome.BOverly = 
	{
		//	const Cc = Components.classes;
		//	const Ci = Components.interfaces;
	
		/* Observer service. */  
		_observerService : null,
		_beingUninstalled : false,
		_branch2 : null,
		_idevfh : true,
		_idevfhUpdate : true,
		_InitReg : 99,
		_nb: null,
		
		setTheTimeout: function (func, delay)
		{
			var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			var callback = { that: this, notify: function () {func.call(this.that); } };
			timer.initWithCallback(callback, delay,
			Components.interfaces.nsITimer.TYPE_ONE_SHOT);
		},
		clearTimeout: function (timer)
		{
		   timer.cancel();
		},
	
		waitMFX: function(msecs)
		{
			var start = new Date().getTime();
			var cur = start
			while(cur - start < msecs)
			{
				cur = new Date().getTime();
			}
		},
		ATabSelected:function (event) {
			// var browser = gBrowser.selectedBrowser;
			// browser is the XUL element of the browser that's just been selected
			// alert('ATabSelected');

			MemFXRunner.SignalTabbed();
		},
		onTitleChange: function(evt)
		{
			// alert(evt);                          // [object Event]
			// alert(evt.target);                   // [object XrayWrapper [object HTMLDocument]]
			// alert(evt.target.title);             // The title of the page
			// alert(evt.target.childNodes);        // [object XrayWrapper [object NodeList]]
			// alert(evt.target.childNodes.length); // 2
			// alert(evt.target.childNodes[0]);     // [object XrayWrapper [object DocumentType]]
			// alert(evt.target.childNodes[1]);     // [object XrayWrapper [object HTMLHtmlElement]]
			// alert(evt.target.childNodes[1].innerHTML); // The source code of the page
		},
	///////////////////////////////////////////////////////
	
	eventMFNotifications: function() // Visual Only
	{
		function checkForNofitication()
		{
			var image = "chrome://memfx/skin/icons/toolbar-button-on.png";
			var title = "Memory Fox Event Notification";
			var text = MemFXChrome.BOverly.ReadRegActivateEventNotificationComments();
			
			try {
				Components.classes['@mozilla.org/alerts-service;1']
					.getService(Components.interfaces.nsIAlertsService)
					.showAlertNotification(image, title, text, false, '', null);
			} catch(e) {
				// prevents runtime error on platforms that don't implement nsIAlertsService
			}
		}
		
		checkForNofitication();
		setInterval(checkForNofitication,NOTIFICATION_CHECK_INTERVAL);
	},
    onKeyPressed: function(e) 
	{
		var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		_branch2 = prefService2.getBranch("extensions.memfx.");

//    	alert(e.keyCode);

//		Turn On For Test

/*
		if( (e.shiftKey) && (e.keyCode  == 118 ) ) // F7
		{
			if( MemFXChrome.BOverly._nb != null )
			{
				MemFXChrome.BOverly._nb.removeAllNotifications(true);
				MemFXChrome.BOverly._nb = null;
			}
		}
*/

//		if( (e.altKey) && (e.keyCode  == 116 ) )
		if( (e.shiftKey) && (e.keyCode  == 116 ) ) // F5
		{
			if( _branch2 )
			{
				var bPrefRtn = _branch2.getBoolPref("activateVisualAcc");
				
				// alert( bPrefRtn ); // activateMFDisplayEvents

				if( bPrefRtn )
				{
					// alert("shiftKey key pressed");

					var browser = gBrowser.getBrowserForTab(gBrowser.selectedTab);
					browser.focus();

					MemFXChrome.BOverly.launchEventMetrics();
				}
				else
				{
					// https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIAlertsService
					MemFXChrome.BOverly.eventMFNotifications();
				}
			}
		}
		
//		if (e.shiftKey)
//			alert("shift key pressed");
//		alert(String.fromCharCode(e.charCode);  

//		Turn On For Test
//		if ( ( e.shiftKey ) && ( e.ctrlKey) && ( e.charCode === 80) )
//			alert("Got The Control Shift P");
/*
		// This works Perfectly to identify keys
		var str= 'ctrl key: '+e.ctrlKey+',alt key: '+e.altKey+', shift key: '+e.shiftKey+'\n';
		var s= e.charCode || e.keyCode;
		if(s>= 16 && s<= 18) return;
		str+= 'code: '+s+' = '+String.fromCharCode(s);
		alert(str);	
*/	
   },
   launchEventMetrics: function(e) // JAWS
   {

	   // document.body.focus();
		var message = MemFXChrome.BOverly.ReadRegActivateEventNotificationComments();

		var nb = gBrowser.getNotificationBox();
		MemFXChrome.BOverly._nb = nb;
		nb.removeAllNotifications(true);
		var n = nb.getNotificationWithValue('popup-blocked');
		if(n) 
		{
			n.label = message;
		} 
		else
		{
			var buttons = [{
							label: 'Button',
							accessKey: 'B',
							popup: 'blockedPopupOptions',
							callback: null
					}];
	 
			const priority = nb.PRIORITY_WARNING_MEDIUM;
			// nb.appendNotification(message, 'popup-blocked','chrome://browser/skin/Info.png',priority, buttons);
			nb.appendNotification(message, 'popup-blocked','chrome://browser/skin/Info.png',priority);

		var browser = gBrowser.getBrowserForTab(gBrowser.selectedTab);
		browser.focus();

			var	timer = MemFXChrome.BOverly.setTheTimeout(function() { nb.removeAllNotifications(true); }, 3000);
						MemFXChrome.BOverly.clearTimeout(timer);
			var	timer2 = MemFXChrome.BOverly.setTheTimeout(function() { nb.removeAllNotifications(true); }, 300);
						MemFXChrome.BOverly.clearTimeout(timer2);
		}
   },
		onMouseTooltip: function() 
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			var textForTips = MemFXChrome.BOverly.ReadRegActivateEventMemoryMetrics();
			// var textForTips = 'Hello World'; // MemFXChrome.BOverly.ReadRegActivateEventMemoryMetrics();
			document.getElementById("memory-fox-status-icon").setAttribute("tooltiptext",textForTips);
			if( _branch2.getBoolPref("tlbBtn") )
				document.getElementById("memfx-toolbar-button").setAttribute("tooltiptext",textForTips);
		},
  		init: function(e) 
		{
			this.initialized = true;

			MemFXChrome.BOverly.register();

			window.removeEventListener("load", MemFXChrome.BOverly.init, true);

			if( MemFXChrome.BOverly._idevfh )
			{
				MemFXChrome.BOverly._idevfh = false;
				MemFXChrome.BOverly.getVersion(MemFXChrome.BOverly.checkVersionUpdate);
			}
		},
		uninit: function(e)
		{
			this.MemFXChrome.BOverly.minusRunCnt();
					
			var appcontent = window.document.getElementById("appcontent");
			if (appcontent) 
				appcontent.removeEventListener("DOMContentLoaded", this, false);
			
			window.removeListener('load', function() { MemFXChrome.BOverly.init(e); } , false);

			window.removeEventListener("unload", function() { MemFXChrome.BOverly.uninit(e); }, true);

			window.removeEventListener("keypress", function(e) { MemFXChrome.BOverly.onKeyPressed(e); }, false);

			MemFXChrome.BOverly.unregister();
			
			MemFXChrome.BOverly.container.removeEventListener("TabSelect", MemFXChrome.BOverly.ATabSelected, false);
			
		},
		register: function()
		{
			/* 
			* Initializes this object. 
			*/
			try {
					var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);				
					observerService.addObserver(this, "quit-application-granted", false);
					observerService.addObserver(this, "em-action-requested", false);
					observerService.addObserver(this, "item-cancel-action", false);
					observerService.addObserver(this, "nsPref:changed", false);
					
					var prefService = Components.classes["@mozilla.org/preferences-service;1"]
												.getService(Components.interfaces.nsIPrefService);
					this._branch = prefService.getBranch("extensions.memfx.");
					this._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
					this._branch.addObserver("", this, false);					
					//	this.observerService.addObserver(this, "memory-fox", false);
					
					gBrowser.tabContainer.addEventListener("TabSelect", MemFXChrome.BOverly.ATabSelected, false);

					gBrowser.addEventListener("DOMTitleChanged", function (evt) { MemFXChrome.BOverly.onTitleChange(evt); }, false);

			} 
			catch(e) {}
		},
		unregister: function()
		{
			/* 
			* Uninitializes this object. 
			*/
			try {
					if(!this._branch2) 
						return;
					this._branch2.removeObserver("", this);
					
					var observerService = Components.classes["@mozilla.org/observer-service;1"]
												.getService(Components.interfaces.nsIObserverService);				
												
					observerService.removeObserver(this,"quit-application-granted");
					observerService.removeObserver(this,"em-action-requested");
					observerService.removeObserver(this,"item-cancel-action");
					observerService.removeObserver(this, "nsPref:changed");

					gBrowser.tabContainer.removeEventListener("TabSelect", MemFXChrome.BOverly.ATabSelected, false);

					gBrowser.removeEventListener("DOMTitleChanged", function () { MemFXChrome.BOverly.onTitleChange(); }, false);
			} 
			catch(e) {}
		},
		//  	nsIObserver implementation
		/* 
			* Observes the registered notification topics. 
			* @param aSubject The nsISupports object associated with the notification. 
			* @param aTopic The notification topic. 
			* @param aData The additional string associated with the notification. 
		*/  
		observe: function(aSubject, aTopic, aData)
		{
			// alert( aSubject );
			// alert( aTopic );
			// alert( aData );
			
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			if ( aTopic == "em-action-requested" ) 
			{
				aSubject.QueryInterface(Components.interfaces.nsIUpdateItem);
			
				if (aSubject.id == "memoryfoxnext@idevfh.im") 
				{
				  if( aData == null )
				  {
					// alert('aData == null');
				  }
				  else if ( aData == "item-installed" ) 
				  {
					// alert('aData == item-installed');
				  }
				  else if( aData == "item-upgraded" )
				  {
					// alert('aData == item-upgraded 1');

					MemFXChrome.BOverly.ResetGlobalMF();

					// alert('aData == item-upgraded 2');

					// MemFXChrome.BOverly._beingUninstalled = true;

					MemFXChrome.BOverly.StopMF();

					// alert('aData == item-upgraded 3');
				  }
				  else if (aData == "item-uninstalled") 
				  {
					// var nlBee = 0;
					// if( _branch2 )
					//	nlBee = _branch2.getBoolPref("lBee"); /* Memory Fox Uninstall */
					// alert(nlBee);

					// alert("item-uninstalled");

					MemFXChrome.BOverly.StopMF();

					MemFXChrome.BOverly.openEpilog();

					MemFXChrome.BOverly._beingUninstalled = true;
				  } 
				  else if (aData == "item-cancel-action") 
				  {
					// alert("item-cancel-action");
					MemFXChrome.BOverly._beingUninstalled = false;
				  }
				}
			}
			else 
			if (aTopic == "quit-application-granted") 
			{
				// alert("quit-application-granted");
				// alert( "MemFXChrome.BOverly._beingUninstalled" );
				// alert( MemFXChrome.BOverly._beingUninstalled );

				// if( _branch2 )
				//	_branch2.setBoolPref("global",false);

				MemFXRunner.StopMF();

				// if( _branch2 )
				//	nRtn = _branch2.getBoolPref("global");

				if( _branch2 )
				{
					bRtn = _branch2.getBoolPref("mfxRestart");

					if( bRtn )
					{
						_branch2.setBoolPref("mfxRestart",false);

						MemFXChrome.BOverly.StartMF();

						return;
					}
				}

				if( MemFXChrome.BOverly._beingUninstalled )
				{
					// alert('MemFXChrome.BOverly._beingUninstalled');

					MemFXRunner.StopMF();

					if( _branch2 )
						_branch2.deleteBranch('');

					MemFXReg.RemoveRegNotifications();
					MemFXReg.RemoveTlbBtn();
				}
				else
				if( !nRtn )
					MemFXRunner.StopMF();
			}
			else 
			if(aTopic == "nsPref:changed")
			{
				var activateSettings = false;
				var activateAutoStart = false;
				var bPrefRtn = false;
				var bPrefRtn1 = false;
				var nRtn = 0;
				
				// alert(aData);
				
				switch (aData) 
				{
					case "app_1":
						activateSettings = true;
					break;
					case "tlbBtn":
						activateSettings = true;
					break;
					case "activateMFDisplayEvents":
						activateSettings = true;
						if( _branch2 )
						{
							bPrefRtn = _branch2.getBoolPref("activateVisualAcc");
							bPrefRtn1 = _branch2.getBoolPref("activateMFDisplayEvents");

							if( bPrefRtn && bPrefRtn1 )
								_branch2.setBoolPref("activateVisualAcc",false)
						}
					break;
					case "activateVisualAcc":
						activateSettings = true;
						if( _branch2 )
						{
							bPrefRtn = _branch2.getBoolPref("activateVisualAcc");
							bPrefRtn1 = _branch2.getBoolPref("activateMFDisplayEvents");

							if( bPrefRtn && bPrefRtn1 )
								_branch2.setBoolPref("activateMFDisplayEvents",false)
						}
					break;
					case "activateMFXonStartup":
						activateSettings = true;
					break;
					case "startMFX":
						activateSettings = true;

						nRtn = 0;
						if( _branch2 )
							nRtn = _branch2.getBoolPref("startMFX");
						if( nRtn )
						{
							// alert('Activate');
							MemFXChrome.BOverly.SetActivateStartMFX();
							MemFXChrome.BOverly.MFActivate();
						}
						else
						{
							// alert('Deactivate');
							MemFXChrome.BOverly.ResetActivateStartMFX();
							MemFXChrome.BOverly.MFDeactivate();
						}
					break;
					case "startupDelay":
						activateSettings = true;
						nRtn = 0;
						if( _branch2 )
							nRtn = _branch2.getIntPref("startupDelay");
					break;
					case "global":
						// alert('global');
						activateSettings = true;
						nRtn = 0;
						if( _branch2 )
							nRtn = _branch2.getBoolPref("global");
						if( nRtn )
						{
							if( _branch2 )
								pPref = _branch2.setBoolPref("startMFX",true); // AFOM is Running
							MemFXChrome.BOverly.StartMF();
						}
						else
						{
							if( _branch2 )
								pPref = _branch2.setBoolPref("startMFX",false); // AFOM not Running
							MemFXChrome.BOverly.StopMF();
						}

						// MemFXReg.CheckMFTlbButton();
					break;
					case "tabDelay":
						activateSettings = true;
						nRtn = 0;
						if( _branch2 )
							nRtn = _branch2.getIntPref("tabDelay");
					break;
					case "primaryTimeout":
						activateSettings = true;
						nRtn = 0;
						if( _branch2 )
							nRtn = _branch2.getIntPref("primaryTimeout");
					break;
					case "activateMFXEventLogging":
						activateSettings = true;
						if( _branch2 )
							bPrefRtn = _branch2.getBoolPref("activateMFXEventLogging");
					break;
					case "currentVersion":
						activateSettings = true;
					break;
					case "lBee": /* Memory Fox Uninstall */
						activateSettings = true;
					break;
					case "nRunCnt":
						activateSettings = true;
					break;
					case "blacklist":
						activateSettings = true;
					break;
					default:
						// activateSettings  = false;
						// activateAutoStart = false;
					break;
				}
				if( activateSettings == true )
				{
					activateSettings = false;

					MemFXRunner.putMFXprefsToReg();

					MemFXRunner.SignalAFOM();
				}
			}
		},
		openFirstRun: function ()
		{
			var firstrunURL = "https://addons.mozilla.org/firefox/addon/memory-fox/";
			MemFXChrome.BOverly.openSite(firstrunURL);
			MemFXChrome.BOverly.waitMFX(1700);
		},
		openUpdate: function (currentVersion)
		{
			//onbeforeunload
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");
				
			var updateURL = "http://www.https://addons.mozilla.org/en-US/firefox/?browse=featured";
			MemFXChrome.BOverly.openSite(updateURL);
			MemFXChrome.BOverly.waitMFX(1700);
		},
		openEpilog: function ()
		{
			var lastrunURL = "https://addons.mozilla.org/firefox/addon/memory-fox/";
			MemFXChrome.BOverly.openSite(lastrunURL);
			// MemFXChrome.BOverly.waitMFX(3000);
		},
		// Open A Web Page IDEVFH
		openSite: function (aURL)
		{
			this.newTab = getBrowser().addTab(aURL);
		},
		// 	Got this from http://siphon9.net/loune/2010/07/getting-your-firefox-extension-version-number/
		//	init: function(e) 

		getVersion : function (callback) {
			if ("@mozilla.org/extensions/manager;1" in Components.classes) {
				// < Firefox 3
				var version = Components.classes["@mozilla.org/extensions/manager;1"]
					.getService(Components.interfaces.nsIExtensionManager).getItemForID("memoryfoxnext@idevfh.im").version;
				
				callback(version);
			}
			else {
				Components.utils.import("resource://gre/modules/AddonManager.jsm");

				listener = {
				  onUninstalling: function(addon) {
					if (addon.id == "memoryfoxnext@idevfh.im") {

						MemFXChrome.BOverly.openEpilog();
						
						MemFXChrome.BOverly._beingUninstalled = true;

						AddonManager.getAddonByID("memoryfoxnext@idevfh.im", function(addon) {  
						  addon.uninstall();  
						});  					  
					}
				  },
				  onOperationCancelled: function(addon) {
					if (addon.id == "memoryfoxnext@idevfh.im") {
						 MemFXChrome.BOverly._beingUninstalled = false;
					}
				  }
				}

				try {
				  AddonManager.addAddonListener(listener);
				} catch (ex) {}
	
				Components.utils.import("resource://gre/modules/AddonManager.jsm");  
				AddonManager.getAddonByID("memoryfoxnext@idevfh.im", function (addon) {
					callback(addon.version);
				});
			}
		},
		checkVersionUpdate: function (currentVersion) 
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			var bPrefRtn = false;

			/*			
				var extensionManager = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);  
				var addon = extensionManager.getItemForID("memoryfoxnext@idevfh.im");  
				var currentVersion = addon.version;
			*/

			var lastVersion = _branch2.getCharPref("currentVersion");

			// alert(lastVersion);

			if (lastVersion == "none") {

				// alert('lastVersion == none');

				MemFXChrome.BOverly._InitReg = 0;

				// gBrowser.tabContainer.advanceSelectedTab(-1, true);

				window.setTimeout(function(){	
				var winM = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService();
		    	var winMed = winM.QueryInterface(Components.interfaces.nsIWindowMediator);
		    	var winDo = winMed.getMostRecentWindow("navigator:browser");
					
				var contentWin = winDo.document.getElementById("content");
		    	contentWin.selectedTab = contentWin.addTab("https://addons.mozilla.org/firefox/addon/memory-fox/");
	    		}, 1700);

			} 
			else 
			if (lastVersion != currentVersion) {
			
				// alert('lastVersion != currentVersion');

				MemFXChrome.BOverly._InitReg = 1;

				if( MemFXChrome.BOverly._idevfhUpdate )
				{
					MemFXChrome.BOverly._idevfhUpdate = false;

					window.setTimeout(function(){	
					var winM = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService();
					var winMed = winM.QueryInterface(Components.interfaces.nsIWindowMediator);
					var winDo = winMed.getMostRecentWindow("navigator:browser");
						
					var contentWin = winDo.document.getElementById("content");
					contentWin.selectedTab = contentWin.addTab("https://addons.mozilla.org/firefox/addon/memory-fox/");
					}, 3000);
				}
			}
			else 
			if (lastVersion == currentVersion) {

				// alert('lastVersion == currentVersion');

				MemFXChrome.BOverly._InitReg = 3;
			}

            if( MemFXChrome.BOverly._InitReg == 0 ) // None
			{
				// alert('MemFXChrome.BOverly._InitReg 0');

				if( _branch2 )
					_branch2.setCharPref("currentVersion", currentVersion);

				MemFXReg.CheckMFTlbButton();

				MemFXChrome.BOverly.MFDeactivate();
			}
            else 
			if( MemFXChrome.BOverly._InitReg == 1 ) // Update
            {
				// alert('MemFXChrome.BOverly._InitReg 1');

				if( _branch2 )
					_branch2.setCharPref("currentVersion", currentVersion);

				MemFXChrome.BOverly.MFDeactivate();

				MemFXReg.CheckMFTlbButton();
            }
            else 
			if( MemFXChrome.BOverly._InitReg == 3 ) // Same Same
            {
				// alert( 'MemFXChrome.BOverly._InitReg 3' );

				if( _branch2 )
					_branch2.setCharPref("currentVersion", currentVersion);

				MemFXReg.CheckMFTlbButton();
			}
		},
		getURL: function(e) {
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
		getService(Components.interfaces.nsIWindowMediator);
		var recentWindow = wm.getMostRecentWindow("navigator:browser");
		return recentWindow ? recentWindow.content.document.location : null;
		},
		loadjscssfile: function (filename, filetype){
		 if (filetype=="js"){ //if filename is a external JavaScript file
		  var fileref=document.createElement('script')
		  fileref.setAttribute("type","text/javascript")
		  fileref.setAttribute("src", filename)
		 }
		 else if (filetype=="css"){ //if filename is an external CSS file
		  var fileref=document.createElement("link")
		  fileref.setAttribute("rel", "stylesheet")
		  fileref.setAttribute("type", "text/css")
		  fileref.setAttribute("href", filename)
		 }
		 if (typeof fileref!="undefined")
		  document.getElementsByTagName("head")[0].appendChild(fileref)
		},
		MFActivate: function()
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			var bPrefRtn = false;

			bPrefRtn = _branch2.getBoolPref("global");

			if( bPrefRtn )
			{
				var icon  = document.getElementById('memory-fox-status-icon');
				icon.setAttribute('src', 'chrome://memfx/skin/icons/icon_gon.png'); 

				var menuitem = document.getElementById('memfx-activate');
				menuitem.setAttribute('disabled', 'true');
				var menuitem2 = document.getElementById('memfx-deactivate');
				menuitem2.setAttribute('disabled', 'true');

				var smenuitem3 = document.getElementById('memfx-activate-g');
				smenuitem3.setAttribute('disabled', 'true');
				var smenuitem4 = document.getElementById('memfx-deactivate-g');
				smenuitem4.setAttribute('disabled', 'false');

				var smenuitem = document.getElementById('memfx-s-activate');
				smenuitem.setAttribute('disabled', 'true');
				var smenuitem2 = document.getElementById('memfx-s-deactivate');
				smenuitem2.setAttribute('disabled', 'true');

				var smenuitem5 = document.getElementById('memfx-s-activate-g');
				smenuitem5.setAttribute('disabled', 'true');
				var smenuitem6 = document.getElementById('memfx-s-deactivate-g');
				smenuitem6.setAttribute('disabled', 'false');

				if (document.getElementById("memfx-toolbar-button"))
				{
					var smenuitem3 = document.getElementById('memfx-tbar-s-activate');
					smenuitem3.setAttribute('disabled', 'true');
					var smenuitem4 = document.getElementById('memfx-tbar-s-deactivate');
					smenuitem4.setAttribute('disabled', 'true');

					var smenuitem5 = document.getElementById('memfx-tbar-s-activate-g');
					smenuitem5.setAttribute('disabled', 'true');
					var smenuitem6 = document.getElementById('memfx-tbar-s-deactivate-g');
					smenuitem6.setAttribute('disabled', 'false');

					document.getElementById("memfx-toolbar-button").setAttribute("memfx-toolbar-button", "gproc"); 
				}
			}
			else
			{
					var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
					_branch2 = prefService2.getBranch("extensions.memfx.");

					var icon  = document.getElementById('memory-fox-status-icon');
					icon.setAttribute('src', 'chrome://memfx/skin/icons/icon_on.png'); 
							
					var menuitem = document.getElementById('memfx-activate');
					menuitem.setAttribute('disabled', 'true'); // Works.
					var menuitem2 = document.getElementById('memfx-deactivate');
					menuitem2.setAttribute('disabled', 'false'); // Works.
					
					var menuitem3 = document.getElementById('memfx-activate-g');
					menuitem3.setAttribute('disabled', 'true'); // Works.
					var menuitem4 = document.getElementById('memfx-deactivate-g');
					menuitem4.setAttribute('disabled', 'true'); // Works.

					var smenuitem = document.getElementById('memfx-s-activate');
					smenuitem.setAttribute('disabled', 'true');
					var smenuitem2 = document.getElementById('memfx-s-deactivate');
					smenuitem2.setAttribute('disabled', 'false');

					var smenuitem5 = document.getElementById('memfx-s-activate-g');
					smenuitem5.setAttribute('disabled', 'true');
					var smenuitem6 = document.getElementById('memfx-s-deactivate-g');
					smenuitem6.setAttribute('disabled', 'true');

					if (document.getElementById("memfx-toolbar-button"))
					{
						var smenuitem3 = document.getElementById('memfx-tbar-s-activate');
						smenuitem3.setAttribute('disabled', 'true');
						var smenuitem4 = document.getElementById('memfx-tbar-s-deactivate');
						smenuitem4.setAttribute('disabled', 'false');

						var smenuitem5 = document.getElementById('memfx-tbar-s-activate-g');
						smenuitem5.setAttribute('disabled', 'true');
						var smenuitem6 = document.getElementById('memfx-tbar-s-deactivate-g');
						smenuitem6.setAttribute('disabled', 'true');

						document.getElementById("memfx-toolbar-button").setAttribute("memfx-toolbar-button", "on"); 
					}
				}
		},		
		MFDeactivate: function()
		{
			// alert('MFDeactivate 1');

			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			var bPrefRtn = false;

			bPrefRtn = _branch2.getBoolPref("global");

			if( bPrefRtn )
			{
				// alert('MFDeactivate 2');

				var icon  = document.getElementById('memory-fox-status-icon');
				icon.setAttribute('src', 'chrome://memfx/skin/icons/icon_gon.png'); 
				var menuitem = document.getElementById('memfx-activate');
				menuitem.setAttribute('disabled', 'true');
				var menuitem2 = document.getElementById('memfx-deactivate');
				menuitem2.setAttribute('disabled', 'true');

				var smenuitem3 = document.getElementById('memfx-activate-g');
				smenuitem3.setAttribute('disabled', 'true');
				var smenuitem4 = document.getElementById('memfx-deactivate-g');
				smenuitem4.setAttribute('disabled', 'false');
									
				var smenuitem = document.getElementById('memfx-s-activate');
				smenuitem.setAttribute('disabled', 'true');
				var smenuitem2 = document.getElementById('memfx-s-deactivate');
				smenuitem2.setAttribute('disabled', 'true');
									
				var smenuitem = document.getElementById('memfx-s-activate-g');
				smenuitem.setAttribute('disabled', 'true');
				var smenuitem2 = document.getElementById('memfx-s-deactivate-g');
				smenuitem2.setAttribute('disabled', 'false');
									
				if (document.getElementById("memfx-toolbar-button"))
				{
					// alert('MFDeactivate 3');

					var smenuitem3 = document.getElementById('memfx-tbar-s-activate');
					smenuitem3.setAttribute('disabled', 'true');
					var smenuitem4 = document.getElementById('memfx-tbar-s-deactivate');
					smenuitem4.setAttribute('disabled', 'true');

					var smenuitem5 = document.getElementById('memfx-tbar-s-activate-g');
					smenuitem5.setAttribute('disabled', 'true');
					var smenuitem6 = document.getElementById('memfx-tbar-s-deactivate-g');
					smenuitem6.setAttribute('disabled', 'true');

					document.getElementById("memfx-toolbar-button").setAttribute("memfx-toolbar-button", "gproc"); 
				}
			}
			else
			{	
				// alert('MFDeactivate 4');

				var icon  = document.getElementById('memory-fox-status-icon');
				icon.setAttribute('src', 'chrome://memfx/skin/icons/icon_off.png'); 

				var menuitem = document.getElementById('memfx-activate');
				menuitem.setAttribute('disabled', 'false');
					
				var menuitem2 = document.getElementById('memfx-deactivate');
				menuitem2.setAttribute('disabled', 'true');
					
				var menuitem3 = document.getElementById('memfx-activate-g');
				menuitem3.setAttribute('disabled', 'false');
					
				var menuitem4 = document.getElementById('memfx-deactivate-g');
				menuitem4.setAttribute('disabled', 'true');
					
				var smenuitem = document.getElementById('memfx-s-activate');
				smenuitem.setAttribute('disabled', 'false');
										
				var smenuitem2 = document.getElementById('memfx-s-deactivate');
				smenuitem2.setAttribute('disabled', 'true');

				var smenuitem5 = document.getElementById('memfx-s-activate-g');
				smenuitem5.setAttribute('disabled', 'false');
										
				var smenuitem6 = document.getElementById('memfx-s-deactivate-g');
				smenuitem6.setAttribute('disabled', 'true');

				// alert(document.getElementById("memfx-toolbar-button"));
				if (document.getElementById("memfx-toolbar-button") )
				{
					// alert('In toolbar-button');

					// alert('MFDeactivate 5');

					var smenuitem3 = document.getElementById('memfx-tbar-s-activate');
					smenuitem3.setAttribute('disabled', 'false');
					var smenuitem4 = document.getElementById('memfx-tbar-s-deactivate');
					smenuitem4.setAttribute('disabled', 'true');

					var smenuitem5 = document.getElementById('memfx-tbar-s-activate-g');
					smenuitem5.setAttribute('disabled', 'false');
					var smenuitem6 = document.getElementById('memfx-tbar-s-deactivate-g');
					smenuitem6.setAttribute('disabled', 'true');

					document.getElementById("memfx-toolbar-button").setAttribute("memfx-toolbar-button", "off"); 
				}
			}
		},
		StartMF: function() 
		{
			// alert('StartMF');

			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			if( _branch2 )
				_branch2.setBoolPref("startMFX", true);

			MemFXChrome.BOverly.SetMfxRestart();

			MemFXRunner.GoMF();

			// MemFXRunner.putMFXprefsToReg();
			// MemFXRunner.SignalAFOM();

			MemFXChrome.BOverly.MFActivate();
		},
		StopMF: function()
		{
			// alert('StopMF');

			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			if( _branch2 )
				_branch2.setBoolPref("startMFX", false);

			MemFXChrome.BOverly.ResetActivateStartMFX();
			MemFXChrome.BOverly.ResetMfxRestart();

			MemFXRunner.StopMF();

			MemFXChrome.BOverly.MFDeactivate();
		},
		StartGlobalMF: function() 
		{
			// alert('StartGlobalMF');

			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			if( _branch2 )
				pPref = _branch2.setBoolPref("global",true);

			MemFXChrome.BOverly.StartMF();
		},
		ResetGlobalMF: function() 
		{
			// alert('ResetGlobalMF');

			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			if( _branch2 )
				pPref = _branch2.setBoolPref("global",false);

			MemFXChrome.BOverly.StopMF();
		},
		ReadRegActivateEventNotificationComments: function()
		{
			var sActivateEventComment = "";
			
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// RG_SZ keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					sActivateEventComment = child.readStringValue("activateEventComment");

					child.close();
				}
			}
			key.close();
			
			return sActivateEventComment;
		},
		ReadRegActivateEventMemoryMetrics: function()
		{
			var sActivateEventMemoryMetrics = "";
			
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// RG_SZ keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					sActivateEventMemoryMetrics = child.readStringValue("activateEventMemoryMetrics");

					child.close();
				}
			}
			key.close();
			
			return sActivateEventMemoryMetrics;
		},
		SetActivateStartMFX: function()
		{
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					child.writeIntValue("startMFX", 1);

					child.close();
				}
			}
			key.close();
		},
		ResetActivateStartMFX: function()
		{
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					child.writeIntValue("startMFX", 0);

					child.close();
				}
			}
			key.close();
		},
		ReadRegStartMFX: function()
		{
			var nStartMFX = 0;
			
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					nStartMFX = child.readIntValue("startMFX");
					
					child.close();
				}
			}
			key.close();
			
			return nStartMFX;
		},
		SetMfxRestart: function()
		{
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					child.writeIntValue("mfxRestart", 1);

					child.close();
				}
			}
			key.close();
		},
		ResetMfxRestart: function()
		{
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					child.writeIntValue("mfxRestart", 0);

					child.close();
				}
			}
			key.close();
		},
		ReadRegMfxRestart: function()
		{
			var nMfxRestart = 0;
			
			var key = Components.classes["@mozilla.org/windows-registry-key;1"].createInstance(Components.interfaces.nsIWindowsRegKey);
			key.open(key.ROOT_KEY_CURRENT_USER,"SOFTWARE",key.ACCESS_ALL);
			if (key.hasChild("Afom"))
			{
				// DWORD keys for :
				var child = key.openChild("Afom",key.ACCESS_ALL);
				if( child )
				{
					nMfxRestart = child.readIntValue("mfxRestart");
					
					child.close();
				}
			}
			key.close();
			
			return nMfxRestart;
		},

		plusRunCnt: function()
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");
			var nVal_nRunCnt = _branch2.getIntPref("nRunCnt"); // # Run Count
			nVal_nRunCnt = nVal_nRunCnt + 1;
			_branch2.setIntPref("nRunCnt",nVal_nRunCnt); // Increment # Run Count
		},
		zeroRunCnt: function()
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");

			_branch2.setIntPref("nRunCnt",0); // Zero # Run Count
		},
		minusRunCnt: function()
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");
			var nVal_nRunCnt = _branch2.getIntPref("nRunCnt"); // # Run Count
			
			if( nVal_nRunCnt )
			{
				nVal_nRunCnt = nVal_nRunCnt - 1;
				_branch2.setIntPref("nRunCnt",nVal_nRunCnt); // Increment # Run Count
			}
		},
		getRunCnt: function()
		{
			var prefService2 = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService);
			_branch2 = prefService2.getBranch("extensions.memfx.");
			return _branch2.getIntPref("nRunCnt"); // # Run Count
		},
		optionsDialog: function()
		{

		 //       alert("Memory Fox, created by IDEVFH");
			window.openDialog('chrome://memfx/content/mfxOptions.xul','','chrome,centerscreen,modal',''); 
		},
		globalDialog: function()
		{

		 //       alert("Memory Fox, created by IDEVFH");
			window.openDialog('chrome://memfx/content/mfxGlobal.xul','','chrome,centerscreen,modal',''); 
		},
		goHome: function()
		{
			//	create the tab, populate it, and bring it to the front
			var url = "https://addons.mozilla.org/firefox/addon/memory-fox/";
			this.newTab = getBrowser().addTab(url);
			getBrowser().selectedTab = this.newTab; 
		},
	};
