
export default function FormAddNewScrap(props) {
	const user = props.githubUser;

	function handleChange(e) {
		e.preventDefault();
		const formDatas = new FormData(e.target);
		const scraps = {
			creatorslug: user,
			description: formDatas.get("description")
		}
		fetch('/api/scraps', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(scraps)
		})
			.then(async (resp) => {
				const dados = await resp.json();
				console.log(dados)
				props.fn(dados.registroCriado)
			})
	}

	return (
		<>
			<form onSubmit={(e) => handleChange(e)}>
				<div>
					<textarea
						placeholder="Qual vai ser sua menssagem?"
						name="description"
						aria-label="Qual vai ser sua menssagem?"
						type="text"
					/>
				</div>
				<button>
					Criar scrap
				</button>
			</form>
		</>
	)
}