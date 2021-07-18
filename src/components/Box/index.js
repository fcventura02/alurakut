import styled from 'styled-components'

export const Box = styled.div`
background: rgba(253, 253, 255, 0.68);;
border-radius: 8px;
padding: 16px;
/* CSS Pré-Pronto */
margin-bottom: 10px;
.containButton{
	margin-bottom: 10px;
	button{
		margin-right: 10px;
		&.isSelect{
			background-color: var(--colorSecondary);
		}
	}
}
.scrapsContainner{
.scrapsContain{
	display: flex;
	padding: 10px;
	background-color: var(--backgroundPrimary);
	div{
		display: flex;
		position:relative;
		flex-direction: column;
		max-width: 120px;
		padding-right: 15px;
		img{
			width: 70px;
			border-radius: 50%;
		}
		span{
			display: block;
			font-size: 0.85rem;
			color: var(--textTertiaryColor)
		}
		&:before {
          content: " ";
          display: block;
          position: absolute;
					width: 1px;
					background-color: var(--textQuarternaryColor);
          margin: auto;
          top: 0;
					right: 10px;
          bottom: 0;
			}
	}
	&:first-child {
    border-radius: 8px 8px 0 0;
	}
	&:nth-child(odd) { 
		background: var(--backgroundQuarternary); 
	}
}
}

.boxMenuPath{
	a {
			font-size: 12px;
        color: var(--textTertiaryColor);
        padding: 10px 15px;
				padding-right: 5px;
        position: relative;
        text-decoration: none;
				
			&:after {
          content: ">";
          display: block;
          position: absolute;
          height: 15px;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
			}
			&:first-child{
				padding-left: 0;
					&:after {
          display: none;
				}
			}
	}
}
.infoCommunit{
	margin-top: 10px;
	p{
		margin-top: 5px;
	}
}

.boxLink {
	font-size: 14px;
	color: #2E7BB4;
	text-decoration: none;
	font-weight: 800;
}
.title {
	font-size: 32px;
	font-weight: 400;
	margin-bottom: 20px;
}
.subTitle {
	font-size: 18px;
	font-weight: 400;
	margin-bottom: 20px;
}
.smallTitle {
	margin-bottom: 20px;
	font-size: 16px;
	font-weight: 700;
	color: #333333;
	margin-bottom: 20px;
}
hr {
	margin-top: 12px;
	margin-bottom: 8px;
	border-color: transparent;
	border-bottom-color: #ECF2FA;
}
input, textarea {
	width: 100%;
	background-color: #F4F4F4;
	color: #333333;
	border: 0;
	padding: 14px 16px;
	margin-bottom: 14px;
	border-radius: 10000px;
	::placeholder {
		color: #333333;
		opacity: 1;
	}
}
textarea{
	max-width: 500px;
	min-height: 50px;
	border-radius: 10px;
}
button {
	border: 0;
	padding: 8px 12px;
	color: #FFFFFF;
	border-radius: 10000px;
	background-color: #6F92BB;
}
`;