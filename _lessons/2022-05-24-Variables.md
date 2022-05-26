---
layout: python
title: Variables
date: 2022-05-24
image: apples
InitialCode: |
  x = 1
  s = "You stink"

  print(s) 
---
Well done Alban - in the last lesson you learnt:
1. Python uses spaces at the beginning of lines to group code into best friends
2. We could use this with for loops to tell python which bits got repeated (belonged to the for loop) and which bits were outside the loop
3. If you mess with spaces, the compiler sometimes gets cross (throws you an error)

This time we'll mess with _variables_

A variable is when you substitute a value (for example the value 5) with a name, (like for instance x).

x=5

Why? Just because you can. Now instead of using 5, I can use x. Try it next time you go to the shops. 

## Without Variables
_Me_: I want 5 apples please.

_Shopkeeper_: Sure here you go.

## With Variables
_Me_: x = 5

_Me_: I want x apples please.

_Shopkeeper_: Pardon?

Shopkeepers are not computers.

## Types of variables
You can set a variable to various things. Like a number as we saw above. 
~~~python
x = 5
~~~

Or a string (text not rope)
~~~python
x = "Hi Stinky"
~~~

Or lists of stuff by using square brackets and commas
~~~python
x = [1,1,2,3,5,8,13]
~~~

Or weird things called tuples - things separated by commas and usually put into round brackets
~~~python
x = 1,2
y = (8,1,2)
~~~

## What to do

This is where we get a bit more freeform. 

Google some stuff (for instance "python types") see if any of it makes sense.
Maybe look at the wikipedia page for tuples - get used to it being a bit maths like.

Mess with variables. See if you can do some funky things with them and send me screen shots to show off. For instance I did this:
~~~python
s = "Alban is ace"
s = s + " and "
s = s + "Penny is brilliant. "
s = s * 2000
print(s) 
~~~

Next time we'll look at classes and start to use some of the things we mind mapped out for our game.