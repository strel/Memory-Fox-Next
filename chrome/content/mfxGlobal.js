if (typeof(MemFXGlobal) == 'undefined') {
	var MFXGlobal = {};
};
	MFXGlobal.Procs = 
	{
		prefService : null,
		_branch : null,

		DoSetPrefGlobal: function()
		{
			var checkbox = document.getElementById("cb-pref-global");
			var newPrefGlobal  = checkbox.checked;

			if( MFXGlobal.Procs._branch )
			{
				MFXGlobal.Procs._branch.setBoolPref("global",newPrefGlobal);
			}
		},
		DoSetPrefBlacklist: function()
		{
			if( MFXGlobal.Procs._branch )
			{
				MFXGlobal.Procs._branch.setCharPref("blacklist", MFXGlobal.Procs.saveBlacklistProcesses());
			}
		},
		saveBlacklistProcesses: function()
		{
			var lstbox = document.getElementById("ctrlProcessList");
			var vArray = new Array();
			for (	var i = 0; i < lstbox.getRowCount(); i++) {
					vArray[i] = lstbox.getItemAtIndex(i).value;
			}
			return vArray.join(';');
		},
		loadBlacklistProcesses: function()
		{
			var lstbox = document.getElementById("ctrlProcessList");
			var value = document.getElementById("pref-blacklist").value;
			if (value.length == 0) return;
				var parts = value.split(';');
			for (	var i = 0; i < parts.length; i++) {
					MFXGlobal.Procs.addAllItems(lstbox, parts[i]);
			}
		},
		addInput: function(aEvent)
		{
			var addButton = document.getElementById("add-Btn");
			var add = document.getElementById("addTxt");

			addButton.disabled = add.value.length == 0;
		},
		addKeyPress: function(aEvent)
		{
			var rButton = document.getElementById("remove-Btn");
			rButton.disabled = true;
			if (aEvent.keyCode == 13) {
				// alert('Dude');
				aEvent.preventDefault();
				MFXGlobal.Procs.addItem();
			}
		},
		addItem: function()
		{
			var lstBox = document.getElementById("ctrlProcessList");
			var txtToAdd = document.getElementById("addTxt").value;

			document.getElementById("addTxt").value = "";

			var listItem = lstBox.appendItem(txtToAdd, txtToAdd);
  			listItem.setAttribute("tooltiptext", txtToAdd);

			var addButton = document.getElementById("add-Btn");
			addButton.disabled = true;
		},
		addAllItems: function(lstBox,txtAdd)
		{
			var listItem = lstBox.appendItem(txtAdd, txtAdd);
  			listItem.setAttribute("tooltiptext", txtAdd);
		},
		removeListedProcess: function()
		{
			var lstBox = document.getElementById("ctrlProcessList");
			lstBox.removeItemAt(lstBox.selectedIndex);
		},
		selectionHasChanged: function(lstbox)
		{
			var rButton = document.getElementById("remove-Btn");
			rButton.disabled = (lstbox.selectedCount == 0);
			// onselect="document.getElementsByTagName('memfx_prefpane')[0].userChangedValue(this);"
		},
	};

