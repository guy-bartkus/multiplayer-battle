# Setup

After cloning, run `npm install` in root of project.  
`npm run sbuild` to build server typescript (src/)  
`npm run cbuild` to build development client typescript (public/src/)  
`npm run cbuildp` to build production client typescript (public/src/)  
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

# Binary Websocket Scheme

## How server/client interpret specific events

### Server

`INIT` - This means user is ready to join game. Data: `{username: varchar}`  
`ROTATE` - Change user rotation. Data: `rad: float32`  
`MOVE` - Update move point. Apply force in direction. Data: `x: uint16, y: uint16`  
`CHAT` - Relay to other players. Data: `msg: varchar`

### Client

`INIT` - Contains map size data. Data: `{mapSize: uint16}`  
`ROTATE` - Player rotate. Data: `{playerID: uint8, rad: float32}`  
`MOVE` - Player movement data. Data: `{playerID: Uint8, x: uint16, y: uint16, dX: uint16, dY: uint16, last: uint8}`  
`CHAT` - Display another player's chat. Data: `{playerID: uint8, msg: varchar}`  
`NEW_PLY` - Add new player to player list. Data: `{username: varchar}`  
`DEL_PLY` - Remove player from player list. Data: `playerID: uint8`  