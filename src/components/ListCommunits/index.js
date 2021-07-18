import styled from 'styled-components';
import { Box } from '../Box';

export const ListCommunits = styled(Box)`
	h2{
		font-weight: 400;
		margin-bottom: 8px;
	}
	span {
		font-size: 14px;
		color: var(--textTertiaryColor);
		a{
			color: var(--colorPrimary);
		}
	}

	.btn-novaComunidade{
		margin: 24px 0;
		border-radius: "8px";
	}
	.container_page{
		display:flex;
		justify-content: space-between;
		button{
			margin:0;
			background: none;
			color: var(--textPrimaryColor);
		}
		.contador {
			font-size: 14px;
			span{
				font-weight: 700;
			}
			@media(max-width: 860px){
				max-width: 80px;
			}
		}
	}
  ul {
    display: contents;
		margin-top: 16px;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 80px;
    height: 80px;
		border-radius: 50%
  }
	li { 
    display: flex;
		background: var(--backgroundPrimary); 
		height: 102px;
		align-items: center;
		&:first-child {
    border-radius: 8px 8px 0 0;
		}
		&:nth-child(odd) { 
			background: var(--backgroundQuarternary); 
		}
	}
	
  ul li a {
    display: flex;
		align-items: center;
    padding-left: 15px;
		div{
			margin-left: 8px;
			p{
				color: var(--colorPrimary);
			}
    	span {
     	 	color: var(--textTertiaryColor);
     	 	font-size: 0.85rem;
     	 	width: 100%;
    	}
		}
  }
`;