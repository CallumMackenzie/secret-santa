# Secret Santa !

## User Stories

- As an individual who wants to organize a secret santa ...
	- I want to be able to create a unique secret santa.
	- I want my friends to be able to join the secret santa.
	- I want to set guidelines for the secret santa such as price, location, date, etc.
	- I want to start the secret santa.

- As an individual who wants to partake in a secret santa ...
	- I want to join a secret santa.
	- I want to know the details of the secret santa.
	- I want to say what gift(s) I might want for the secret santa.
	- I want to say how I prefer my gift to be delievered (ie. address, drop off, etc).
	- I want to know who I got in the secret santa.
	- I want to know what the person I got might want.
	- I want to tell the person how they are to obtain their gift.
	- I want to know when my person has recieved their gift.

## Objects
- SecretSanta
	- Has a name
	- Has a unique code
	- Has a single user as an admin
	- Has a list of participants
	- Contains secret santa guidelines
	- Has whether it has started or not
- Participant
	- Has a user
	- Has a wishlist
	- Has delivery info
	- Has an individual they got
	- Has a DeliveryStatus for their own gift
- Account
	- Has a collection of secret santas user is partaking in
	- Can leave an unstarted secret santa
- DeliveryStatus (enum)
	- Undelievered
	- Delivered
	- Recieved