import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequeste(req, resp) {

	if (req.method === 'POST') {
		const TOKEN = '784f3ea9b2bd46e8fef4a895045559'
		const client = new SiteClient(TOKEN);
		const registroCriado = await client.items.create({
			itemType: "967648",
			...req.body,
		})
		
		return resp.json({ registroCriado: registroCriado });
	}

	resp.status(404).json({
		message: "Não foi possivel criar uma nova comunidade."
	})
}