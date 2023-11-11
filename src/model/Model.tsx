
interface SecretSanta {
	name: string,
	uid: string,
	adminUserIdToken: string,
	participantUserIds: [string],
	guidelines: string,
	started: boolean,
};

interface Participant {
	userIdToken: string,
	wishlist: [string],
	deliveryInfo: string,
	giftsToUserIdToken: string,
	giftFromUserIdToken: string,
	deliveryStatus: DeliveryStatus,
};

interface Account {
	userIdToken: string,
	secretSantaUids: [string],
};

enum DeliveryStatus {
	Undelivered,
	Delivered,
	Received,
};
