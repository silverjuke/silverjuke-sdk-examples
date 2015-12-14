

#include "sj_api.h"

 
// some globals
SjInterface interf;


// The main DLL entry point, may be needed for special purposes
BOOL APIENTRY DllMain(HANDLE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    return TRUE;
}


// Receiving messages from Silverjuke
SJPARAM SJCALLBACK CallPlugin(SjInterface* interf, SJPARAM msg, SJPARAM param1, SJPARAM param2, SJPARAM param3)
{
	switch( msg )
	{
		case SJ_PLUGIN_INIT:
			// embed the plugin for demonstration puposes to the main menu.
			interf->CallMaster(interf, SJ_EXECUTE, (SJPARAM)
				"program.addMenuEntry('Hello World!', function(){ program.callPlugin('idMenu'); })"
				, 0, 0);
			return 1; // success

		case SJ_PLUGIN_CALL:
			// this is the "script to C" bridge
			if( strcmp((char*)param1, "idMenu")==0 )
			{
				interf->CallMaster(interf, SJ_EXECUTE, (SJPARAM)
					"alert('Hello World!')"
					, 0, 0);
			}
			return 0;
	}
	return 0;
}


// The Silverjuke API entry point - this symbol needs to be exported
SjInterface* SjGetInterface(void)
{
	interf.CallPlugin = CallPlugin;
	return &interf;
}


