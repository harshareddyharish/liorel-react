import React, { useState } from "react";
import { Modal, Input, Select, message } from "antd";
import Api from "../services/api";

const { Option } = Select;

const UserModal = ({ user = {}, tags = [], closeModal, onSaveUser }) => {
  const [first_name, updateFname] = useState(user["first_name"] || undefined);
  const [last_name, updateLname] = useState(user["last_name"] || undefined);
  const [email, updateEmail] = useState(user["email"] || undefined);
  const [address, updateAddress] = useState(user["address"] || undefined);
  const [city, updateCity] = useState(user["city"] || undefined);
  const [state, updateState] = useState(user["state"] || undefined);
  const [zip, updateZip] = useState(user["zip"] || undefined);
  const [user_tags, updateTags] = useState(user['tags'] || []);

  const handleValidations = () => {
  	if (!first_name) {
  		message.error('First name is mandatory')
  		return false
  	}
  	if (!email) {
  		message.error('Email is mandatory')
  		return false
  	}
  	if (!is_valid_email(email)) {
  		message.error('Enter valid email')
  		return false
  	}
  	return true
  }

  const is_valid_email = (email) => { 
    return /^.+@.+\..+$/.test(email); 
  }

  const saveUser = () => {
  	if (handleValidations()){
  		if (user['id']){
  			Api.updateUser({ id: user['id'], data: requestBody() }, onSuccess, onFailure);
	  	} else {
	  		Api.createUser({ data: requestBody() }, onSuccess, onFailure);
	  	}
  	}
  };

  const onSuccess = (response) => {
    message.success("User saved successfully");
    onSaveUser()
  };

  const onFailure = (error) => {
  	if (error.response.data) {
    	message.error(error.response.data['message']);
    } else { 
    	message.error('Failed to save user')
    }	
  };

  const requestBody = () => {
    let body = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      city: city,
      state: state,
      zip: zip,
      tags: user_tags,
    };
    if (user["id"]) {
      body["id"] = user["id"];
    }
    return { user: body };
  };

  const onChange = (key, e) => {
    if (key === "fname") {
      updateFname(e.target.value);
    } else if (key === "lname") {
      updateLname(e.target.value);
    } else if (key === "email") {
      updateEmail(e.target.value);
    } else if (key === "address") {
      updateAddress(e.target.value);
    } else if (key === "city") {
      updateCity(e.target.value);
    } else if (key === "state") {
      updateState(e.target.value);
    } else if (key === "zip") {
      updateZip(e.target.value);
    }
  };

  const onTagsChange = (tags) => {
  	let uniqueSet = [...new Set(tags)];
  	updateTags(uniqueSet)
  };

  return (
    <Modal
      visible={true}
      title={user["id"] ? "Update User" : "Add User"}
      onOk={saveUser}
      onCancel={closeModal}
    >
      <Input
        type="text"
        placeholder="First Name*"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("fname", e)}
        value={first_name}
      />
      <Input
        type="text"
        placeholder="Last Name"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("lname", e)}
        value={last_name}
      />
      <Input
        type="text"
        placeholder="Email*"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("email", e)}
        value={email}
        disabled={user["id"] ? true : false}
      />
      <Input
        type="text"
        placeholder="Address"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("address", e)}
        value={address}
      />
      <Input
        type="text"
        placeholder="City"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("city", e)}
        value={city}
      />
      <Input
        type="text"
        placeholder="State"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("state", e)}
        value={state}
      />
      <Input
        type="text"
        placeholder="Zip"
        style={{ marginBottom: 20, height: 40 }}
        onChange={(e) => onChange("zip", e)}
        value={zip}
      />
      <Select
        mode="multiple"
        placeholder="Tags"
        defaultValue={user_tags}
        style={{ width: "100%", height: 40 }}
        onChange={onTagsChange}
      >
        {tags.map((tag) => (
          <Option value={tag.id}>{tag.name}</Option>
        ))}
      </Select>
    </Modal>
  );
};

export default UserModal;
