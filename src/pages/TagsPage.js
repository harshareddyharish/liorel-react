import React, { useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import { Table, message, Button, Tag, Modal, Icon } from "antd";
import Api from "../services/api";
import TagModal from "../../src/components/TagModal";

const TagsPage = () => {
  const [tags, updateTags] = useState(undefined);
  const [openTagModal, toggleTagModal] = useState(false);
  const [tag, updateTag] = useState(undefined);
  const [sortedInfo, updateSortInfo] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

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
    toggleTagModal(false);
    updateTag(undefined);
  };

  const onSaveTag = () => {
    fetchTags();
    closeModal();
  };

  const editTag = (record) => {
    updateTag(record);
    toggleTagModal(true);
  };

  const deleteTag = (record) => {
    Modal.confirm({
      icon: "",
      title: "Are you sure want to delete this tag?",
      content: Content(record),
      onOk: () => onDeleteTag(record),
    });
  };

  const Content = (record) => {
    if (record["associated_users"].length > 0) {
      return (
        <Box ml="-35px">
          This tag is associated with {record["associated_users"].length} users
        </Box>
      );
    }
    return null;
  };

  const onDeleteTag = (record) => {
    Api.deleteTag({ tagId: record["id"] }, onDeleteSuccess, onDeleteFailure);
  };

  const onDeleteSuccess = () => {
    message.success("Successfully tag deleted");
    fetchTags();
  };

  const onDeleteFailure = (error) => {
    if (error.response.data) {
      message.error(error.response.data["message"]);
    } else {
      message.error("Failed to delete tag");
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    updateSortInfo(sorter);
  };

  const columns = () => {
    let list = [];
    let sortInfo = sortedInfo || { columnKey: 'name', order: 'ascend' };
    list.push({
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
      sortOrder: sortInfo.columnKey === "name" && sortInfo.order,
    });
    list.push({
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(b.created_at) - new Date(a.created_at),
      sortOrder: sortInfo.columnKey === "created_at" && sortInfo.order,
      render: (created_at) => {
        let d = new Date(created_at);
        return (
          <p>
            {d.getFullYear()}-{d.getMonth()}-{d.getDate()} {d.getHours()}:
            {d.getMinutes()}
          </p>
        );
      },
    });
    list.push({
      title: "Updated at",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      sortOrder: sortInfo.columnKey === "updated_at" && sortInfo.order,
      render: (updated_at) => {
        let d = new Date(updated_at);
        return (
          <p>
            {d.getFullYear()}-{d.getMonth()}-{d.getDate()} {d.getHours()}:
            {d.getMinutes()}
          </p>
        );
      },
    });
    list.push({
      title: "Actions",
      render: (record) => {
        return (
          <Flex>
            <Button type="link" onClick={() => editTag(record)}>
              <Icon type="edit" style={{color: 'blue'}}/>
            </Button>
            <Button type="link" onClick={() => deleteTag(record)}>
              <Icon type="delete" style={{color: 'red'}} />
            </Button>
          </Flex>
        );
      },
    });
    return list;
  };

  if (!tags) {
    return null;
  }

  return (
    <Box>
      <Flex mb="20px" justifyContent="flex-end">
        <Button type="primary" onClick={() => toggleTagModal(true)}>
          Add Tag
        </Button>
      </Flex>
      {tags && (
        <Table
          columns={columns()}
          dataSource={tags}
          pagination={false}
          onChange={handleChange}
        />
      )}
      {openTagModal && (
        <TagModal
          tag={tag}
          tags={tags}
          closeModal={closeModal}
          onSaveTag={onSaveTag}
        />
      )}
    </Box>
  );
};

export default TagsPage;
