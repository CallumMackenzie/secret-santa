

/**
 * Participant data for a secret santa instance.
 */
export interface Participant {
	userUid: string,
	wishlist: string[],
	deliveryInfo: string,
	giftsToUserUid: string | undefined,
	giftFromUserUid: string | undefined,
	deliveryStatus: DeliveryStatus | undefined,
};

/**
 * Delivery status for a secret santa gift.
 */
export enum DeliveryStatus {
	Undelivered,
	Delivered,
	Received,
};