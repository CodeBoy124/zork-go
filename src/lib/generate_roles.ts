const ROLE_SCHEMA = {
	opening: 1,
	gebedsintenties: 1,
	mysteries: 10,
	afsluitingsgebeden: 3,
	salveregina: 1
};

function findNamesPerGroup(txt: string) {
	let role_groups: { [name: string]: string[] } & { trash: string[] } = {
		trash: []
	};
	let active_group_name = 'trash';

	const lines = txt
		.replace(/\r/g, '')
		.split('\n')
		.map((v) => v.trim())
		.filter((v) => v != '');

	for (const line of lines) {
		const is_name_entry_line = line.startsWith('.');

		if (is_name_entry_line) {
			role_groups[active_group_name].push(line.slice(1).trim());
			continue;
		}

		active_group_name = line;
		if (!(active_group_name in role_groups)) {
			role_groups[active_group_name] = [];
		}
	}

	if (role_groups.trash.length > 0) {
		alert(`Waarschuwing: ${role_groups.trash.length} ongebruikte namen`);
	}
	return role_groups;
}

function linearToLowFractal(linear_fractal: number) {
	return Math.pow(linear_fractal, 4);
}

function pickASingleName(
	name_occurences: { [name: string]: number },
	people_in_role: string[],
	last_name: string
): string {
	const sorted_names_based_on_occurences = Object.keys(name_occurences).sort(
		(a, b) => name_occurences[a] - name_occurences[b]
	);

	let possible_names_sorted = sorted_names_based_on_occurences.filter((n) =>
		people_in_role.includes(n)
	);
	if (possible_names_sorted.length > 1)
		possible_names_sorted = possible_names_sorted.filter((n) => n != last_name);

	return possible_names_sorted[
		Math.floor(linearToLowFractal(Math.random()) * possible_names_sorted.length)
	];
}

function pickNamesUsingSchema(
	role_groups: { [name: string]: string[] },
	schema: { [name: string]: number }
) {
	let name_occurences: { [name: string]: number } = {};
	let people_per_role: { [name: string]: string[] } = {};
	let last_name = '';

	for (let names of Object.values(role_groups)) {
		for (let name of names) {
			if (!(name in name_occurences)) name_occurences[name] = 0;
		}
	}

	for (let key of Object.keys(schema)) {
		for (let i = 0; i < schema[key]; i++) {
			if (!(key in people_per_role)) people_per_role[key] = [];
			const name = pickASingleName(name_occurences, role_groups[key], last_name);

			last_name = name;
			people_per_role[key].push(name);

			if (!(name in name_occurences)) name_occurences[name] = 0;
			name_occurences[name]++;
		}
	}
	return people_per_role;
}

function insertPickedNamesIntoText(
	picked_names: { [name: string]: string[] },
	gebedsintenties: string
) {
	// TODO: validate input

	let parts: { title: string; mystery?: string; name: string; prayer: string }[] = [
		{
			title: 'Opening',
			name: picked_names.opening[0],
			prayer: `In de naam van de Vader, en de Zoon en de Heilige Geest. Amen.
Ik geloof in God... (De twaalf artikelen van het geloof (geloofsbelijdenis))
Onze Vader...
Wij groeten U, Dochter van God de Vader; Wees gegroet Maria...
Wij groeten U, Moeder van God de Zoon; Wees gegroet Maria...
Wij groeten U, Bruid van God de Heilige Geest; Wees gegroet Maria...
Eer aan de Vader...`
		},
		{
			title: 'Intenties',
			name: picked_names.gebedsintenties[0],
			prayer: gebedsintenties == '' ? `<Gebedsintenties>` : gebedsintenties
		}
	];

	const mysterie_titles = [
		'Jezus verrijst uit de doden',
		'Jezus stijgt op ten hemel',
		'De Heilige Geest daalt neer over de apostelen',
		'Maria wordt met ziel en lichaam in de hemel opgenomen',
		'Maria wordt gekroond tot Koningin van hemel en aarde'
	];
	for (let i = 0; i < 5; i++) {
		parts.push({
			title: `${i + 1}e mysterie`,
			mystery: mysterie_titles[i],
			name: `${picked_names.mysteries[i * 2]} + ${picked_names.mysteries[i * 2 + 1]}`,
			prayer: `(${mysterie_titles[i]})
- Persoon 1 kondigt het mysterie aan
- Persoon 1 (start) en persoon 2 (maakt af) het Onze Vader
- Persoon 1 (start telkens) en persoon 2 (maakt telkens af) de Weesgegroetjes
- Persoon 1 doet het Eer aan de Vader...
- Persoon 2 doet het O mijn Jezus... gebed`
		});
	}

	parts.push(
		{
			title: 'Toewijdingsgebed',
			name: picked_names.afsluitingsgebeden[0],
			prayer: `Mijn koningin, mijn Moeder,
Ik geef mezelf volledig aan U en toon U mijn aanhankelijkheid.
Ik offer U deze dag mijn ogen, mijn oren, mijn mond, mijn hart, geheel mijzelf, zonder voorbehoud.
Daarom goede Moeder, omdat ik de Uwe ben, neem mij en bewaar mij als Uw eigendom en bezit. Amen.`
		},
		{
			title: 'Gebed tot de Heilige Geest',
			name: picked_names.afsluitingsgebeden[1],
			prayer: `Kom Heilig Geest, verlicht mijn hart om de dingen te zien die van God zijn.
Kom H. Geest, verlicht mijn verstand, om de dingen te kennen die van God zijn.
Kom H. Geest, in mijn ziel, dat ik alleen God toebehoor.
Heilig al wat ik denk, zeg en doe, opdat alles moge zijn voor de Glorie van God.
Amen.`
		},
		{
			title: 'Gebed tot de Aartsengel Michaël',
			name: picked_names.afsluitingsgebeden[2],
			prayer: `Heilige Aartsengel Michaël, verdedig ons in de strijd, wees onze bescherming tegen de boosheid en de listen van de duivel.
Wij smeken ootmoedig dat God hem zijn macht doe gevoelen.
En Gij, vorst der hemelse legerscharen, drijf Satan en de andere boze geesten, die tot verderf van de zielen over de wereld rondgaan, door de goddelijke kracht in de hel terug.
(optioneel: Heilige aartsengel Michaël, wij stellen onszelf, onze familie en alles wat ons toebehoort onder uw machtige bescherming.
Wil de goddelijke liefde steeds in onze harten doen toenemen.
Gedenk, o engel Gods, dat wij van heden af helemaal onder uw bescherming staan.
Verkrijg voor ons een altijd vuriger liefde tot God, onze Vader, tot Jezus, onze Verlosser, tot de heilige Geest, onze heiligmaker, tot Maria, onze hemelse moeder en tot Jozef, onze beschermer.
Heilige aartsengel Michaël, bid voor ons.
Heilige aartsengel Michaël, red ons land.
Heilige aartsengel Michaël, red de wereld.)
Amen.`
		},
		{
			title: 'Salve Regina',
			name: picked_names.salveregina[0],
			prayer: `Salve, Regina, Mater misericordiae, vita, dulcedo, et spes nostra, salve.
Ad te clamamus, exsules filii Evae.
Ad te suspiramus, gementes et flentes in hac lacrimarum valle.
Eia, ergo, advocata nostra, illos tuos misericordes oculos ad nos converte; et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende.
O clemens, O pia, O dulcis Virgo Maria.`
		}
	);

	return parts;
}

export function generateRoles(txt: string, gebedsintenties: string) {
	const role_groups = findNamesPerGroup(txt);
	const picked_names = pickNamesUsingSchema(role_groups, ROLE_SCHEMA);
	return insertPickedNamesIntoText(picked_names, gebedsintenties);
}

export function rolesToCopyMessage(
	parts: { title: string; mystery?: string; name: string; prayer: string }[]
) {
	return parts.map((v) => `${v.title}${v.mystery ? ` (${v.mystery})` : ''}: ${v.name}`).join('\n');
}
