
export default function FormAddNewCommunit(props) {
	const user = props.githubUser;

	function handleChange(e) {
		e.preventDefault();
		const formDatas = new FormData(e.target);
		const comunidade = {
			title: formDatas.get("title"),
			imageurl: formDatas.get("image"),
			creatorSlug: user
		}
		if (!!comunidade.title && !!comunidade.imageurl)
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
				})
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
				<button>
					Criar comunidade
				</button>
			</form>
		</>
	)
}