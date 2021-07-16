import { destroyCookie } from 'nookies'

export default function logoutPage(props) {}

export async function getServerSideProps(context) {
	destroyCookie(context, 'USER_TOKEN')
	return {
		redirect: {
			destination: '/login',
			permanent: false,
		}
	}
}