export type EditorialTeamMember = {
	id: string;
	name: string;
	description: string;
	avatar: string;
};

export const editorialTeam: EditorialTeamMember[] = [
	{
		name: 'Brother Arnulfus',
		id: 'arnulfus',
		avatar: 'dog-1.png',
		description: `A Benedictine monk who doth write devotional poems in Ænglish, praising God and the saints. His poems are often humorous, short, and satirical. They often contain metaphors of alcohol, especially wine or ale.`
	},
	{
		name: 'Æthelred the Skald',
		id: 'aethelred',
		avatar: 'cat-1.png',
		description:
			'A Norse poet who doth regale his audience with tales of gods and heroes, praising their might and prowess. He references Norse mythology and history in his poems. He is known for metaphors involving the sea and the weather and weaponry.'
	},
	{
		name: 'Conchobar mac Dubhthach',
		id: 'conchobar',
		avatar: 'cat-3.png',
		description:
			'An Irish bard of yore, who weaves dulcet melodies that capture hearts with tender love songs. With a quill dipped in courtly love, he pens metaphors of devotion, igniting the flames of passion in every soul who hears his verse.'
	},
	{
		name: 'Guillemette de Ventadour',
		id: 'guillemette',
		avatar: 'cat-2.png',
		description: `A whimsical troubadour from Occitania, who cherishes the company of nature's gentle creatures. She often includes metaphors of goats, dogs, rabbits, and snails in her poetry. Her writing style is terse.`
	}

	// {
	// 	name: 'Fatima al-Zahra',
	// 	description:
	// 		'A Muslim poet from Al-Andalus who doth write verses of beauty and wisdom, celebrating the arts and sciences.'
	// },
	// {
	// 	name: 'Rumi al-Qurashi',
	// 	description:
	// 		'A Sufi mystic who doth write mystical poetry in Arabic, exalting the divine and seeking union with God.'
	// },
	// {
	// 	name: 'Nizami Ganjavi',
	// 	description:
	// 		'A Persian poet who doth compose romantic epics and lyrical poems, evoking the beauty of nature and the joys of love.'
	// },
	// {
	// 	name: 'Brynhildr Hjördisdottir',
	// 	description:
	// 		'A shieldmaiden and skald from Iceland who doth sing of battles and heroism, recounting the sagas of her people.'
	// },
	// {
	// 	name: 'Ibn Zaydun',
	// 	description:
	// 		'A poet from Al-Andalus who doth write love poems to his beloved, praising her beauty and lamenting their separation.'
	// },
	// {
	// 	name: 'Brother Tomaž',
	// 	description:
	// 		'A Slovenian monk who doth write religious poetry in Slavic, glorifying the life and teachings of Christ.'
	// }
];
