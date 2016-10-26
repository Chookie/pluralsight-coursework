/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

alert("It is the Zombie Apocalypse. Your are looting a store and suddenly a zombie bursts through the door");
var weapon = prompt("Choose your weapon: A bow and arrow, an axe or a rubber chicken");
var randomNumber = Math.round(Math.random());

alert("You attack the zombie with your " + weapon);

if(randomNumber == 0) {
  alert("The zombie bites your. you loose!!");
} else {
  alert("You kill the zombie iwth your " + weapon + ". You win!!");
}