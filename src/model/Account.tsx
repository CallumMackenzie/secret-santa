import { Firestore } from "firebase/firestore";
import { fetchOrCreate, save } from "./FirebaseUtils";
import { User } from "firebase/auth";

/**
 * Account data for users
 */
export interface Account {
	userUid: string,
	secretSantaUids: string[],
	adminOfSecretSantas: string[]
};

/**
 * 
 * @param firestore Firestore app instance
 * @param uid User UID
 * @returns Account model data saved for the given user, or creates it if not present.
 */
export const fetchAccountWithUid = async (firestore: Firestore, uid: string): Promise<Account> =>
	await fetchOrCreate(firestore, 'accounts', uid, () => ({
		userUid: uid,
		adminOfSecretSantas: [],
		secretSantaUids: []
	}));

/**
 * 
 * @param firestore Firestore app instance
 * @param user Firebase user
 * @returns Account model data saved for the given user, or creates it if not present.
 */
export const fetchAccount = async (firestore: Firestore, user: User): Promise<Account> =>
	fetchAccountWithUid(firestore, user.uid);
/**
 * Saves given Account model data to firestore.
 * 
 * @param firestore Firestore app instance
 * @param account Account model data
 */
export const saveAccount = async (firestore: Firestore, account: Account) =>
	await save(firestore, 'accounts', account.userUid, account);
