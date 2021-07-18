import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
	const router = useRouter();
	const [githubUser, setGithubUser] = React.useState('');
	const [tootgle, setTootgle] = React.useState(true);

	const handleChange = (e) => {
		!!githubUser &&
		e.preventDefault();
			fetch('https://alurakut.vercel.app/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ githubUser: githubUser })
			})
				.then(async (respostaDoServer) => {
					const dadosDaResposta = await respostaDoServer.json()
					const token = dadosDaResposta.token;
					nookies.set(null, 'USER_TOKEN', token, {
						path: '/',
						maxAge: 86400 * 7
					})
					fetch(`https://api.github.com/users/${githubUser}`)
						.then(async (respostaDoServer) => {
							const dadosDaResposta = await respostaDoServer.json()
							if (typeof dadosDaResposta.login === 'undefined')
								throw new Error("Usuário não existe!")
							router.push('/')

						})
						.catch(err => {
							setTootgle(false)
							alert(err.message)
						})
				})
				.catch(err => console.log(err))
	}

	return (
		<main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<div className="loginScreen">
				<section className="logoArea">
					<img src="https://alurakut.vercel.app/logo.svg" />

					<p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
					<p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
					<p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
				</section>

				<section className="formArea">
					<form className="box" onSubmit={(e) => handleChange(e)}>
						<p>
							Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
						</p>
						<input
							className={tootgle ? "" : "inputNotValid"}
							placeholder="Usuário"
							value={githubUser}
							onChange={(e) => {
								setTootgle(true)
								setGithubUser(e.target.value)
								console.log(!!githubUser)
							}}
						/>
						<button type="submit" disabled={githubUser.length === 0 && true}>
							Login
						</button>
					</form>

					<footer className="box">
						<p>
							Ainda não é membro? <br />
							<a href="/login">
								<strong>
									ENTRAR JÁ
								</strong>
							</a>
						</p>
					</footer>
				</section>

				<footer className="footerArea">
					<p>
						© 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
					</p>
				</footer>
			</div>
		</main>
	)
}