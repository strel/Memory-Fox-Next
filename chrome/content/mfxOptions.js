if (typeof(MemFXOpt) == 'undefined') {
	var MFXOpt = {};
};
	MFXOpt.Opts = 
	{
		prefService : null,
		_branch : null,

		DoSetPrefActivateVisualAcc: function()
		{
			var checkbox = document.getElementById("cb-pref-activateVisualAcc");
			var newPrefActivateVisualAcc = checkbox.checked;

			if( MFXOpt.Opts._branch )
			{
				MFXOpt.Opts._branch.setBoolPref("activateVisualAcc",newPrefActivateVisualAcc);
			}
		},
		DoSetPrefActivateMFDisplayEvents: function()
		{
			var checkbox = document.getElementById("cb-pref-activateMFDisplayEvents");
			var newPrefActivateMFDisplayEvents = checkbox.checked;

			if( MFXOpt.Opts._branch )
			{
				MFXOpt.Opts._branch.setBoolPref("activateMFDisplayEvents",newPrefActivateMFDisplayEvents);
			}
		},
		DoSetPrefDelayStartup: function()
		{
			var newPrefDelayStartup = document.getElementById("memfxOptDelayStartup").value;
			
			if( MFXOpt.Opts._branch )
			{
				MFXOpt.Opts._branch.setIntPref("startupDelay",newPrefDelayStartup);
			}
		},
		DoSetPrefTabDelay: function()
		{
			var newPrefTabDelay = document.getElementById("memfxOptTabDelay").value;

			if( MFXOpt.Opts._branch )
				MFXOpt.Opts._branch.setIntPref("tabDelay",newPrefTabDelay);

		},
		DoSetPrefPrimaryTimeout: function()
		{
			var newPrefPrimaryTimeout = document.getElementById("memfxOptPrimaryTimeout").value;

			if( MFXOpt.Opts._branch )
				MFXOpt.Opts._branch.setIntPref("primaryTimeout",newPrefPrimaryTimeout);

		},
		DoSetPrefActivateMFXEventLogging: function()
		{
			var checkbox = document.getElementById("cb-pref-activateMFXEventLogging");
			var newPrefActivateMFXEventLogging = checkbox.checked;

			if( MFXOpt.Opts._branch )
			{
				MFXOpt.Opts._branch.setBoolPref("activateMFXEventLogging",newPrefActivateMFXEventLogging);
			}
		},
	};

