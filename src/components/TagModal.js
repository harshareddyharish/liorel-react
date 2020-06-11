import React, { useState } from "react";
import { Modal, Input, Select, message } from "antd";
import Api from "../services/api";

const { Option } = Select;

const TagModal = ({ tag = {}, tags = [], closeModal, onSaveTag }) => {
  const [name, updateName] = useState(tag["name"] || undefined);

  const saveTag = () => {
  	if (tag['id']){
      onEdit()
  	} else {
  		Api.createTag({ data: requestBody() }, onSuccess, onFailure);
  	}
  };

  const onEdit = () => {
    Modal.confirm({
      icon: "",
      title: `This tag is associated with ${tag['associated_users'].length} user(s), are you sure want to update this tag?`,
      onOk: () => {Api.updateTag({ id: tag['id'], data: requestBody() }, onSuccess, onFailure)},
    })
  }

  const onSuccess = (response) => {
    message.success("Tag saved successfully");
    onSaveTag()
  };

  const onFailure = (error) => {
  	if (error.response.data) {
    	message.error(error.response.data['message']);
    } else { 
    	message.error('Failed to save tag')
    }	
  };

  const requestBody = () => {
    let body = {
      name: name
    };
    if (tag["id"]) {
      body["id"] = tag["id"];
    }
    return { tag: body };
  };

  const onChange = (e) => {
    updateName(e.target.value);
  };

  return (
    <Modal
      visible={true}
      title={tag["id"] ? "Update Tag" : "Add Tag"}
      onOk={saveTag}
      onCancel={closeModal}
    >
      <Input
        type="text"
        placeholder="Name"
        style={{ marginBottom: 20, height: 40 }}
        onChange={onChange}
        value={name}
      />
    </Modal>
  );
};

export default TagModal;
