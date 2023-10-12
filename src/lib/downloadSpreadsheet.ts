import { utils, writeFile } from 'xlsx';
export const MAX_COL_WIDTH_SPREADSHEET = 10;
interface Props {
	points: { x: number; y: number }[];
	m: number;
	v: number;
	alfa: number;
	dt: number;
}

interface Row {
	t: number | string;
	x: number | string;
	y: number | string;
	m: number | string;
	y0: number | string;
	v: number | string;
	alfa: number | string;
	dt: number | string;
}

const createSheet = ({ points, m, v, alfa, dt }: Props) => {
	let rows: Row[] = [
		{
			t: 0,
			x: 0,
			y: points[0].y,
			m,
			y0: points[0].y,
			v,
			alfa,
			dt
		}
	];

	rows = [
		...rows,
		...points.slice(1).map(({ x, y }, i) => ({
			t: i + 1 * dt,
			x,
			y,
			m: '',
			y0: '',
			v: '',
			alfa: '',
			dt: ''
		}))
	];

	const worksheet = utils.json_to_sheet(rows);

	utils.sheet_add_aoa(
		worksheet,
		[
			[
				't (s)',
				'X (m)',
				'Y (m)',
				'Masa (kg)',
				'Altura inicial (m)',
				'Velocidad inicial (m/s)',
				'Angulo de lanzamiento (°)',
				'dt (s)'
			]
		],
		{ origin: 'A1' }
	);

	const colsConfig = {
		wch: MAX_COL_WIDTH_SPREADSHEET
	};

	worksheet['!cols'] = Array(Object.keys(rows[0]).length).fill(colsConfig);
	return worksheet;
};

export const downloadSpreadsheet = (sheets: Props[]) => {
	const workbook = utils.book_new();

	const worksheets = sheets.map(createSheet);

	utils.book_append_sheet(workbook, worksheets[0], 'Disparo Con R.Aire');
	utils.book_append_sheet(workbook, worksheets[1], 'Disparo Sin R.Aire');

	return writeFile(workbook, 'Tanque - Disparo Parabolico.xlsx', { compression: true });
};
