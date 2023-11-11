import { User } from "firebase/auth";
import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * A secret santa instance.
 */
export interface SecretSanta {
	name: string,
	uid: string,
	adminUserUid: string,
	participants: Participant[],
	guidelines: string,
	started: boolean,
};

/**
 * Participant data for a secret santa instance.
 */
export interface Participant {
	userUid: string,
	wishlist: string[],
	deliveryInfo: string,
	giftsToUserUid: string,
	giftFromUserUid: string,
	deliveryStatus: DeliveryStatus,
};

/**
 * Account data for users
 */
export interface Account {
	userUid: string,
	secretSantaUids: string[],
};

/**
 * Delivery status for a secret santa gift.
 */
export enum DeliveryStatus {
	Undelivered,
	Delivered,
	Received,
};


/**
 * 
 * @param firestore Firestore app instance
 * @param path Firestore table path
 * @param key Table indexing key
 * @returns Fetched value, or null if it doesn't exist
 */
const fetchWithKey = async <T,>(firestore: Firestore, path: string, key: string): Promise<T | null> => {
	const docRef = doc(firestore, path, key);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists())
		return docSnap.data() as T;
	return null;
};

/**
 * If the key has a value in the given table in firestore, fetches it.
 * Otherwise, creates one, saves it to firestore at the given key,
 * and returns the newly generated T.
 * 
 * @param firestore Firestore app instance
 * @param path Path to table
 * @param key Table indexing key
 * @param generator Default value generator function for T
 * @returns Fetched or created instance of T.
 */
const fetchOrCreate = async <T,>(firestore: Firestore, path: string, key: string, generator: () => T): Promise<T> => {
	const fetched = await fetchWithKey<T>(firestore, path, key);
	if (fetched)
		return fetched;
	const t = generator();
	await save(firestore, path, key, t);
	return t;
};

/**
 * 
 * @param firestore Firestore app instance
 * @param path Firestore table path
 * @param key Table indexing key
 * @param val Value to save to the given key in the table.
 */
const save = async <T,>(firestore: Firestore, path: string, key: string, val: T) => {
	const docRef = doc(firestore, path, key);
	await setDoc(docRef, JSON.parse(JSON.stringify(val)));
}

/**
 * 
 * @param firestore Firestore app instance
 * @param user Firebase user
 * @returns Account model data saved for the given user, or creates it if not present.
 */
export const fetchAccount = async (firestore: Firestore, user: User): Promise<Account> =>
	await fetchOrCreate(firestore, 'accounts', user.uid, () => ({
		userUid: user.uid,
		secretSantaUids: []
	}));

/**
 * Saves given Account model data to firestore.
 * 
 * @param firestore Firestore app instance
 * @param account Account model data
 */
export const saveAccount = async (firestore: Firestore, account: Account) =>
	await save(firestore, 'accounts', account.userUid, account);


/**
 * 
 * @param firestore Firestore app instance
 * @param uid Uid of the secret santa to fetch data for
 * @returns Secret santa data, or null if not found
 */
export const fetchSecretSanta = async (firestore: Firestore, uid: string): Promise<SecretSanta | null> =>
	await fetchWithKey(firestore, 'secret-santas', uid);


/**
 * Saves the given secret santa instance to firestore.
 * 
 * @param firestore Firestore app instance
 * @param secretSanta The secret santa to save.
 */
export const saveSecretSanta = async (firestore: Firestore, secretSanta: SecretSanta) =>
	await save(firestore, 'secret-santas', secretSanta.uid, secretSanta);