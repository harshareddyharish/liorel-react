import React, { useState } from "react";
import { Flex, Box } from "rebass";
import { Link } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import liorelLogo from "../assets/images/liorel-logo.png";
import { logout } from "../Auth";

const Header = ({ ...props }) => {
  const [current, updateCurrent] = useState("1");

  const handleClick = (e) => {
    updateCurrent(e.key);
  };

  return (
    <Box>
      <Flex>
        <Box m="20px" mr="40px">
          <img src={liorelLogo} width="100" height="50" />
        </Box>
        <Box m="20px">
          <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Menu.Item key="1">
              <Link to="/users">
                <Icon type="team" /> Users{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/tags">
                <Icon type="tags" /> Tags{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/account">
                <Icon type="user" /> My Account{" "}
              </Link>
            </Menu.Item>
          </Menu>
        </Box>
        <Box m="20px" mt="25px">
          <Button type="link" onClick={()=>logout()}>
            <Icon type="poweroff" /> Logout
          </Button>
        </Box>
      </Flex>
      <Box px="40px" py="30px">
        {React.createElement(props.child, { ...props })}
      </Box>
    </Box>
  );
};

export default Header;
