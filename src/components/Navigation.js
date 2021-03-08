import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.nav``;
const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.li`
  font-size: 16px;
  &:hover {
    color: #289ae2;
  }
`;
const SLink = styled(Link)`
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
`;
const IconText = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

const Navigation = ({ userObj }) => (
  <Container>
    <List>
      <Item>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </Link>
      </Item>
      <Item>
        <SLink to="/">
          <FontAwesomeIcon icon={faHouseUser} size="2x" />
          <IconText>Home</IconText>
        </SLink>
      </Item>
      <Item>
        <SLink to="/profile">
          <FontAwesomeIcon icon={faUser} size="2x" />
          <IconText>
            {userObj.displayName && userObj.displayName.length > 10
              ? `${userObj.displayName.substring(0, 7)}...`
              : userObj.displayName}
          </IconText>
        </SLink>
      </Item>
    </List>
  </Container>
);
export default Navigation;
