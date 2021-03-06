import Link from 'next/link';
import styled from 'styled-components';
import { Box } from '../Box';

export const ProfileRelationsBoxWrapper = styled(Box)`

  h2{
    position:relative;
    cursor: pointer;
    &:before {
          content: ">";
          display: block;
          position: absolute;
          margin: auto;
          top: 0;
					right: 0;
          bottom: 0;
			}
  }

  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`;

export function ProfileRelationsBox(props) {
  const list = props.items;
  return (
    <ProfileRelationsBoxWrapper >
      <Link href="/followers">
        <h2 className="smallTitle">
          {props.title}({props.items.length})
        </h2>
      </Link>
      <ul>
        {
          !!list && list.slice(0, 6).map((item) => {
            return (
              <li key={item.id}>
                <a href={`/users/${item.login}`}>
                  <img src={`https://github.com/${item.login}.png`}
                  />
                  <span>{item.login}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}