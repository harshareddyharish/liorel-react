import React, { useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import { Table, message, Button, Tag, Modal, Popover, Icon } from "antd";
import Api from "../services/api";
import UserModal from "../../src/components/UserModal";

const UsersPage = () => {
  const [users, updateUsers] = useState(undefined);
  const [openUserModal, toggleUserModal] = useState(false);
  const [user, updateUser] = useState(undefined);
  const [tags, updateTags] = useState(undefined);
  const [sortedInfo,  updateSortInfo] = useState(null)

  useEffect(() => {
    fetchUsers();
    fetchTags();
  }, []);

  const fetchUsers = () => {
    Api.fetchUsers({}, onSuccess, onFailure);
  };

  const onSuccess = (response) => {
    updateUsers(response.data["users"]);
  };

  const onFailure = (error) => {
    message.error("Failed to fetch users");
  };

  const fetchTags = () => {
    Api.fetchTags({}, onTagsSuccess, onTagsFailure);
  };

  const onTagsSuccess = (response) => {
    updateTags(response.data["tags"]);
  };

  const onTagsFailure = (error) => {
    message.error("Failed to fetch tags");
  };

  const closeModal = () => {
    toggleUserModal(false);
    updateUser(undefined);
  };

  const onSaveUser = () => {
    fetchUsers();
    closeModal();
  };

  const editUser = (record) => {
    updateUser(record);
    toggleUserModal(true);
  };

  const deleteUser = (record) => {
    Modal.confirm({
      icon: "",
      title: "Are you sure want to delete this user?",
      onOk: () => onDeleteUser(record),
    });
  };

  const onDeleteUser = (record) => {
    Api.deleteUser({ userId: record["id"] }, onDeleteSuccess, onDeleteFailure);
  };

  const onDeleteSuccess = () => {
    message.success("Successfully user deleted");
    fetchUsers();
  };

  const onDeleteFailure = (error) => {
    if (error.response.data) {
      message.error(error.response.data["message"]);
    } else {
      message.error("Failed to delete user");
    }
  };

  const activateorDeactivateUser = (record) => {
    Api.updateUser(
      {
        id: record["id"],
        data: { user: { active: record.active ? false : true } },
      },
      onStatuChangeSuccess,
      onStatuChangeFailure
    );
  };

  const onStatuChangeSuccess = () => {
    message.success("Successfully update the status");
    fetchUsers();
  };

  const onStatuChangeFailure = (error) => {
    if (error.response.data) {
      message.error(error.response.data["message"]);
    } else {
      message.error("Failed to change the status");
    }
  };

  const tagName = (tagId) => {
    if (tags) {
      let tag = tags.find((tag) => tag["id"] === tagId);
      if (tag) {
        return tag["name"];
      }
      return tagId;
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    updateSortInfo(sorter)
  };

  const columns = () => {
    let list = [];
    let sortInfo = sortedInfo || { columnKey: 'first_name', order: 'ascend' };
    list.push({
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => String(a.first_name).localeCompare(String(b.first_name)),
      sortOrder: sortInfo.columnKey === 'first_name' && sortInfo.order,
    });
    list.push({
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => String(a.last_name).localeCompare(String(b.last_name)),
      sortOrder: sortInfo.columnKey === 'last_name' && sortInfo.order,
    });
    list.push({
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => String(a.email).localeCompare(String(b.email)),
      sortOrder: sortInfo.columnKey === 'email' && sortInfo.order,
    });
    list.push({
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => {
        if (!address) { return null }
        return(
          <Popover content={address}>
            <Box>{address.substring(0,9)}...</Box>
          </Popover>
        )
      }
    });
    list.push({
      title: "City",
      dataIndex: "city",
      key: "city",
    });
    list.push({
      title: "State",
      dataIndex: "state",
      key: "state",
    });
    list.push({
      title: "Zip",
      dataIndex: "zip",
      key: "zip",
    });
    list.push({
      title: "Updated at",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      sortOrder: sortInfo.columnKey === 'updated_at' && sortInfo.order,
      render: (updated_at) => {
        let d = new Date(updated_at)
        return(
          <p>{d.getFullYear()}-{d.getMonth()}-{d.getDate()} {d.getHours()}:{d.getMinutes()}</p>
        )
      }
    });
    list.push({
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags, record) => {
        return (
          <>
            {tags.map((tag) => (
              <Tag color="green" style={{ marginBottom: 5 }}>
                {tagName(tag)}
              </Tag>
            ))}
          </>
        );
      },
    });
    list.push({
      title: "Actions",
      render: (record) => {
        return (
          <Flex justifyContent='space-between'>
            <Button type="link" onClick={() => editUser(record)}>
              <Icon type="edit" style={{color: 'blue'}}/>
            </Button>
            <Button type="link" onClick={() => deleteUser(record)}>
              <Icon type="delete" style={{color: 'red'}} />
            </Button>
            <Button
              type="link"
              onClick={() => activateorDeactivateUser(record)}
            >
              {record.active ? "Deactivate" : "Activate"}
            </Button>
          </Flex>
        );
      },
    });
    return list;
  };

  if (!users) {
    return null;
  }

  return (
    <Box>
      <Flex mb="20px" justifyContent="flex-end">
        <Button type="primary" onClick={() => toggleUserModal(true)}>
          Add User
        </Button>
      </Flex>
      {users && (
        <Table columns={columns()} dataSource={users} pagination={false} onChange={handleChange}/>
      )}
      {openUserModal && (
        <UserModal
          user={user}
          tags={tags}
          closeModal={closeModal}
          onSaveUser={onSaveUser}
        />
      )}
    </Box>
  );
};

export default UsersPage;
