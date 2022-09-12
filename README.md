# DebugConsole

DebugConsole is a small Node.js app (paired with accompanying Project64 scripts) that allows you to stream
IS-Viewer debugging output to a terminal.  The app automatically converts the native euc-jp encoded strings
into UTF-8 to work with modern operating systems.  The Project64 scripts included are designed to work with
the Debug ROM for Ocarina of Time: Master Quest; these can also be adapted to work with other ROMs that include
debug logging by changing the address in the script it looks for.

## Installation

### With Project64

Copy the DebugServer.js file to the Scripts folder inside of your Project64 installation (create the folder if
it does not yet exist).  Project64 should automatically detect this in the Scripts window (Debugger->Scripts).
If you don't see the Debugger menu, ensure you have enabled the debugger functionality:

1. Open the Options menu and click Configuration.
2. If checked, uncheck *Hide advanced settings*.
3. Click on Advanced, then check both *Enable debugger* and *Always use interpreter core*.
4. Click OK.  The Debugger menu should now be available.

To run the script, open the Scripts window and double-click on DebugServer.js on the left side. It will open the
server port and be ready for the command line app to connect.

### Node.js App

1. If you do not have Node.js installed, run:
```bash
apt install nodejs npm
```
2. Run `npm install` at the repo root.
3. Run `node app` to run the command line tool.  Note it must be run after the Project64 script has been started.

