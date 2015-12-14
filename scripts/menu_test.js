

// just a counter to create unique menu entry names
var cnt = 1;


// this function is called if one of the added menu entries is clicked,
// it only displays a message box.
function menuEntryClicked()
{
	alert('Menu entry clicked - selected URLs:\n\n' + program.getSelection());
}


// the addMenuEntry() and removeMenuEntries() functions are called
// from the configuration dialog below
function addMenuEntry()
{
	program.addMenuEntry('Menu entry #'+cnt, menuEntryClicked);
	alert('There should be ' + cnt + ' menu entries in the main menu or in the context menu now.');
	
	cnt++;
}

function removeMenuEntries()
{
	program.addMenuEntry();
	alert('All menu entries have been removed from the main menu/from the context menu.');
	
	cnt = 1;
}


// add a simpel dialog to "Settings / Advanced / Further options"
var dlg = new Dialog;

dlg.addButton(0, 'Add a menu entry ...', addMenuEntry);
dlg.addButton(0, 'Remove all menu entries ...', removeMenuEntries);
dlg.addButton('ok');

program.addConfigButton('Menu Test Script', function() { dlg.show(); });

