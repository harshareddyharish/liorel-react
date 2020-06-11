import React, { useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import { Input, Select, message, Button } from 'antd';
import Api from '../services/api';

const { Option } = Select;

const userId = localStorage.getItem('USER_ID')

const AccountPage = () => {
  const [user, updateUser] = useState(undefined);
  const [tags, updateTags] = useState(undefined);

  useEffect(() => {
    fetchUser()
    fetchTags()
  }, []);

  const fetchUser = () => {
  	Api.fetchUser({ id: userId }, onSuccess, onFailure)
  };

  const onSuccess = (response) => {
  	updateUser(response.data['user'])
  }

  const onFailure = (error) => {
  	message.error('Failed to fetch user details')
  }

  const fetchTags = () => {
    Api.fetchTags({}, onTagsSuccess, onTagsFailure);
  };

  const onTagsSuccess = (response) => {
    updateTags(response.data["tags"]);
  };

  const onTagsFailure = (error) => {
    message.error("Failed to fetch tags");
  };

  const handleValidations = () => {
  	if (!user['first_name']) {
  		message.error('First name is mandatory')
  		return false
  	}
  	return true
  }

  const saveUser = () => {
  	if (handleValidations()) {
  		Api.updateUser({ id: userId, data: user }, onSaveSuccess, onSaveFailure);
  	}
  }

  const onSaveSuccess = () => {
  	message.success('Successfully updated')
  }

  const onSaveFailure = (error) => {
  	if (error.response.data) {
  		message.error(error.response.data['message'])
  	} else {
  		message.error('Failed to updated')
  	}
  }

  const onChange = (key, e) => {
  	let data = user
    if (key === "fname") {
      updateUser({...user, first_name: e.target.value})
    } else if (key === "lname") {
    	updateUser({...user, last_name: e.target.value})
    } else if (key === "email") {
    	updateUser({...user, email: e.target.value})
    } else if (key === "password") {
    	updateUser({...user, password: e.target.value})
    } else if (key === "address") {
    	updateUser({...user, address: e.target.value})
    } else if (key === "city") {
    	updateUser({...user, city: e.target.value})
    } else if (key === "state") {
    	updateUser({...user, state: e.target.value})
    } else if (key === "zip") {
    	updateUser({...user, zip: e.target.value})
    }
  };

  const onTagsChange = (tags) => {
  	let data = user
  	let uniqueSet = [...new Set(tags)];
  	updateUser({...data, tags: uniqueSet })
  };

  if (!user) { return null }

  return (
  	<Flex>
  	<Box width='30%' />
    <Box width='40%'>
      <Input
        type="text"
        placeholder="First Name*"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("fname", e)}
        value={user['first_name']}
      />
      <Input
        type="text"
        placeholder="Last Name"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("lname", e)}
        value={user['last_name']}
      />
      <Input
        type="text"
        placeholder="Email*"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("email", e)}
        value={user['email']}
        disabled={user["id"] ? true : false}
      />
      <Input
        type="password"
        placeholder="Password"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("password", e)}
        value={user['password']}
      />
      <Input
        type="text"
        placeholder="Address"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("address", e)}
        value={user['address']}
      />
      <Input
        type="text"
        placeholder="City"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("city", e)}
        value={user['city']}
      />
      <Input
        type="text"
        placeholder="State"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("state", e)}
        value={user['state']}
      />
      <Input
        type="text"
        placeholder="Zip"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("zip", e)}
        value={user['zip']}
      />
      <Select
        mode="multiple"
        placeholder="Tags"
        defaultValue={user['tags']}
        style={{ width: "100%", height: 40 }}
        onChange={onTagsChange}
      >
        {tags && tags.map((tag) => (
          <Option value={tag.id}>{tag.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Button type='primary' block onClick={saveUser}>Save</Button>
    </Box>
    <Box width='30%' />
    </Flex>
  );
};

export default AccountPage;
