
// call the function from foo_exported.dll

program.onLoad = OnLoad;

function OnLoad()
{
	alert('foo_exported.sj: onLoad: calling foo_exported.');
	
	program.callExported('foo_exported')
} 

