# Setup

After cloning, run `npm install` in root of project.  
`npm run sbuild` to build server typescript (src/)  
`npm run cbuild` to build client typescript (public/src/)  
`npm run nodemon` to rebuild client when files change  

# Server To-dos

❌ Finish binary websocket protocol  
❌ Figure out an efficient way to store & iterate list of players  
❌ Allow player to specify where they want to move on map  
❌ Send updates to players about other player events  

# Client To-dos

❌ Finish binary websocket protocol  
❌ Send mouse events to server so player can move  
❌ Get player updates from server and render other players  
❌ Setup canvases after getting init data from server  
❌ Keep player in center of canvas when moving  
❌ Make background canvas have grid so can see when moving  