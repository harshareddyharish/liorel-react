import request from "../utils/request";
import {
  SIGN_IN_API,
  SIGN_OUT_API,
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_TAGS,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  DELETE_USER_TAG,
} from "../routes/api";

export default class Api {
  static signIn = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: SIGN_IN_API,
        method: "post",
      },
      onSuccess,
      onError
    );
  };

  static signOut = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: SIGN_OUT_API(options.id),
      },
      onSuccess,
      onError
    );
  };

  static fetchUsers = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: FETCH_USERS,
      },
      onSuccess,
      onError
    );
  };

  static fetchUser = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: FETCH_USER(options.id),
      },
      onSuccess,
      onError
    );
  };

  static createUser = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: CREATE_USER,
        method: "post",
      },
      onSuccess,
      onError
    );
  };

  static updateUser = (options, onSuccess, onError) => {
    request(
      { ...options, url: UPDATE_USER(options.id), method: "put" },
      onSuccess,
      onError
    );
  };

  static deleteUser = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: DELETE_USER(options.userId),
        method: "delete",
      },
      onSuccess,
      onError
    );
  };

  static fetchTags = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: FETCH_TAGS,
      },
      onSuccess,
      onError
    );
  };

  static createTag = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: CREATE_TAG,
        method: "post",
      },
      onSuccess,
      onError
    );
  };

  static updateTag = (options, onSuccess, onError) => {
    request({ ...options, url: UPDATE_TAG(options.id), method: "put" }, onSuccess, onError);
  };

  static deleteTag = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: DELETE_TAG(options.tagId),
        method: "delete",
      },
      onSuccess,
      onError
    );
  };

  static deleteUserTag = (options, onSuccess, onError) => {
    request(
      {
        ...options,
        url: DELETE_USER_TAG(options.userTagId),
        method: "delete",
      },
      onSuccess,
      onError
    );
  };
}
