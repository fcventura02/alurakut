import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import { Box } from "../Box";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export function ProfilesideBar(props) {

  return (
    <Box>
      <img src={`https://github.com/${props.gitUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a href={`https://github.com/${props.gitUser}`}
          className="boxLink">@{props.gitUser}</a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}