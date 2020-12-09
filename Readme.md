Right now, I added the send_position type, but it's not implemented at all. I need to make sure my local game plays just like the normal one, but when online=true, it plays differently.

We're at a good spot, though.

# What do we still need in the local version? 

### Dinosaur that moves when you run X

### Handle death and Game End

- Death: Show dead dino and pause all movement for 2 seconds or something. Send the player who has died to a random location.

- Game End: Show in big letters "Player X Wins! Play again?" and there's a button to play again.


# What about the online version? 

### Handle direction being controlled by server

### Disable keypress causing the player to move

### Map id of characters to player.


For now, I'm going to focus on the local version of the game because Nate still needs to finish up some server stuff.