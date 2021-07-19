
export default function FormAddNewCommunit(props) {
	const user = props.githubUser;

	function handleChange(e) {
		e.preventDefault();
		const formDatas = new FormData(e.target);
		const comunidade = {
			title: formDatas.get("title"),
			imageurl: formDatas.get("image"),
			description: formDatas.get("description"),
			creatorSlug: user
		}
		if (!!comunidade.title && !!comunidade.imageurl)
			if (validURL(comunidade.imageurl))
				fetch('/api/comunidades', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(comunidade)
				})
					.then(async (resp) => {
						const dados = await resp.json();
						props.fn(dados.registroCriado)
					}).catch(err => console.log(err))
			else {
				console.log("url inválida")
			}
	}

	function validURL(str) {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}

	return (
		<>
			<form onSubmit={(e) => handleChange(e)}>
				<div>
					<input
						placeholder="Qual vai ser o nome da sua comunidade?"
						name="title"
						aria-label="Qual vai ser o nome da sua comunidade?"
						type="text"
					/>
				</div>
				<div>
					<input
						placeholder="Coloque uma URL para usarmos de capa."
						name="image"
						aria-label="Coloque uma URL para usarmos de capa."
						type="text"
					/>
				</div>
				<div>
					<input
						placeholder="Coloque uma descrição para sua comunidade."
						name="description"
						aria-label="Coloque uma descrição para sua comunidade."
						type="text"
					/>
				</div>
				<button>
					Criar comunidade
				</button>
			</form>
		</>
	)
}