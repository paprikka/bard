import { getAllArchiveItemIDs, getArchiveItemForExistingDate } from './update-local-news';

const dayIDs = await getAllArchiveItemIDs();

console.log(`Rebuilding archive for ${dayIDs.join()}...`);

for (let dayID of dayIDs) {
	console.log(`Rebuilding ${dayID}...`);
	await getArchiveItemForExistingDate(dayID);
}

console.log(`Done`);
