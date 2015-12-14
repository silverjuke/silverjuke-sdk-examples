
// regular expression object for proper quoting of the SQL query string
var regExpr = new RegExp("'", "g");



// onDecPlayCount() is called if a playback is done and if the
// "Automatically increase the play count" option is not checked;
// as Silverjuke always increases the playcount, we decrease it by one here
function onDecPlayCount(url)
{
	var db = new Database();
	db.openQuery("UPDATE tracks SET timesplayed=timesplayed-1 WHERE url='" + url.replace(regExpr, "''") + "';");
	db.closeQuery();
}



// onMenuEntry() is called if the user selects our menu entry
function onMenuEntry()
{
	// get the selected urls
	var urls = program.getSelection();

	// create the dialog
	var dlg = new Dialog();
	dlg.addCheckCtrl('doAutoIncr', 'Automatically increase the play count if a track is played', !player.onPlaybackDone);
	dlg.addCheckCtrl('changePlayCount', 'Set the play count of the ' + urls.length + ' selected track(s) to:');
	dlg.addTextCtrl('newPlayCount', '', 0);
	
	// show the dialog
	if( dlg.showModal() == 'ok' )
	{
		// update "auto increase"
		var doAutoIncr = dlg.getValue('doAutoIncr') != 0;
		player.onPlaybackDone = doAutoIncr? 0 : onDecPlayCount;
		program.iniWrite('playCountTool/doAutoIncr', doAutoIncr);
		print('auto incr. updated');
		
		// change play count?
		if( urls.length 
		 && dlg.getValue('changePlayCount') )
		{
			// get entered playcount
			var newPlayCount = parseInt(dlg.getValue('newPlayCount')), i;
			
			// build SQL query string
			var query = 'UPDATE tracks SET timesplayed=' + newPlayCount + ' WHERE url IN(';
				for( i = 0; i < urls.length; i++ )
				{
					if( i ) query += ',';
					query += "'" + urls[i].replace(regExpr, "''") + "'";
				}
			query += ');';
			
			// execute query
			var db = new Database();
			db.openQuery(query);
			db.closeQuery();
			
			// redraw the window to reflect the changes
			if( program.refreshWindows )
				program.refreshWindows();
			
			print('play count changed');
		}
	}
}



// init
program.addMenuEntry('Play count tool...', onMenuEntry);

if( !program.iniRead('playCountTool/doAutoIncr', true) )
	player.onPlaybackDone = onDecPlayCount;
	