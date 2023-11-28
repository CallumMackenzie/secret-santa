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
	- Has a list of secret santas user is admin for
- DeliveryStatus (enum)
	- Undelievered
	- Delivered
	- Recieved

## Pages

### Login Page
From the login page I need to be able to create an account or login.
<br/>
The page simply needs to be simple and look nice, with a Christmas theme.

### Home page
From the home page I need to be able to
- Sign out
- Join a secret santa (do this directly on the homepage)
- Create a secret santa (go to creation page)
- See the secret santas I admin and edit them (go to editor page)
- See the secret santas I am a part of and view them (go to viewing page)

### Creation page
From the creation page I need to be able to
- Cancel creation (return home)
- Edit secret santa name
- Edit secret santa description
- Create the secret santa
- View the secret santa join code

### Editor page
From the editor page I need to be able to
- Delete a secret santa
- Remove individuals from a secret santa if it has not started
- Start the secret santa if it has not started
- Go back home
<br/>
Depends on a given secret santa, so the page must have a UID parameter.

### Viewing page
From the viewing page I need to be able to
- View the secret santa name
- View secret santa description
- Go home

If the secret santa has started: <br/>
- See the individual I got
- See the individual who I got's wishlist
- See the individual who I got's delivery info
- Notify that I have delivered my gift
- See the delivery status the gift I am to recieve

If the secret santa has not started: <br/>
- Edit my wishlist
- Leave the secret santa

<br/>
Depends on a given secret santa, so the page must have a UID parameter.