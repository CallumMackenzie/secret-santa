import { Firestore, collection, getCountFromServer } from "firebase/firestore";
import { fetchWithKey, save } from "./FirebaseUtils";
import { Participant } from "./Participant";
import { fetchAccount, fetchAccountWithUid, saveAccount, saveAccountAsAdmin } from "./Account";


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
	save(firestore, 'secret-santas', secretSanta.uid, secretSanta);


/**
 * @param firestore Firestore app instance
 * @returns Whether the maximum number of secret santas has been exceeded.
 */
export const maxSecretSantaCountExceeded = async (firestore: Firestore): Promise<boolean> => {
	// Ensure number of secret santas does not exceed capacity (32^4).
	const count = await getCountFromServer(collection(firestore, "secret-santas"));
	return count.data().count >= Math.pow(32, 4);
}

/**
 * Checkes whether a given secret santa UID code is being used.
 * 
 * @param firestore Firestore app instance
 * @param code Secret santa UID code
 * @returns Whether the given code is being used currently.
 */
const isSecretSantaUIDUsed = async (firestore: Firestore, code: string): Promise<boolean> => {
	// Get entry in table path for given code
	const codeEntry = await fetchWithKey<string>(firestore, "secret-santas", code);
	// If not null, it is in use.
	return codeEntry != null;
}

/**
 * 
 * @returns A 4-digit base 36 code string.
 */
const generate4DigitBase36Code = (): string => {
	// Generate random number in [0, 36^4) to create a 4-digit base-36 number
	let code = Math.floor(Math.random() * Math.pow(36, 4)).toString(36);
	// Append 0s for prefixes
	code = "0".repeat(4 - code.length) + code;
	return code;
};

/**
 * Gets the next secret santa UID.
 * 
 * @requires maxSecretSantaCountExceeded has returned false.
 * @param firestore Firestore app instance
 * @returns Next secret santa UID.
 */
export const getNextSecretSantaUid = async (firestore: Firestore): Promise<string> => {
	let code: string;
	// Generate codes until one is unused.
	do code = generate4DigitBase36Code();
	while (await isSecretSantaUIDUsed(firestore, code));
	// Secret santa UID code is currently not being used.
	return code;
};


/**
 * Adds participant to secret santa and saves all info for secret santa
 * and participant to firestore.
 * 
 * @param firestore Firestore app instance
 * @param secretSanta Secret santa to add participant to
 * @param participant Participant to add
 */
export const addParticipantToSecretSanta = async (firestore: Firestore,
	secretSanta: SecretSanta,
	participant: Participant) => {
	// Check if user is already in secret santa
	for (let ssParticipant of secretSanta.participants)
		if (participant.userUid === ssParticipant.userUid)
			return;
	// User is not in secret santa
	// Start fetching account
	const accountPromise = fetchAccountWithUid(firestore, participant.userUid);
	// Add participant to secret santa
	secretSanta.participants.push(participant);
	// Save secret santa
	const ssSaved = saveSecretSanta(firestore, secretSanta);
	// Add secret santa uid to account
	const account = await accountPromise;
	account.secretSantaUids.push(secretSanta.uid);
	// Save account
	const accSaved = saveAccount(firestore, account);

	// Make sure both saved before returning
	await ssSaved;
	await accSaved;
}

/**
 * Creates and saves a new secret santa to database.
 * Updates user admin data to include new secret santa.
 * 
 * @param firestore Firestore app instance
 * @param name Secret santa name
 * @param adminUserUid Secret santa admin user ID
 * @param guidelines Secret santa guidelines
 * @returns New secret santa instance which is saved to database.
 */
export const createSecretSanta = async (firestore: Firestore,
	name: string,
	adminUserUid: string,
	guidelines: string
): Promise<SecretSanta> => {
	// Generate UID
	const ssUid = getNextSecretSantaUid(firestore);
	// Create secret santa
	const ss: SecretSanta = {
		adminUserUid,
		name,
		guidelines,
		participants: [],
		uid: await ssUid,
		started: false
	};
	// Save secret santa to firestore
	const saveSecretSantaPromise = saveSecretSanta(firestore, ss);
	// Update account secret santas
	const account = fetchAccountWithUid(firestore, adminUserUid);
	const saveAccountPromise = saveAccountAsAdmin(firestore, await account, ss);
	// Ensure everything is saved before returning
	await Promise.all([saveSecretSantaPromise, saveAccountPromise]);
	return ss;
}