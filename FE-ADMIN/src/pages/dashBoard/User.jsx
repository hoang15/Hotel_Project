import SideBar from "../../component/SideBar";
import homeStyle from "../../css/home.module.css";
import imgProfile from "../../assets/img_avatar.png";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Modal, Table, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as yup from "yup";
import userService from "./../../services/user.service";
import useUserInfo from "./../../hooks/useUserInfo";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const userInfo = useUserInfo();

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "phone",
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
    },

    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />

            <DeleteOutlined
              onClick={() => {
                onDelete(record.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const onChange = (pagination, filters, sorter, extra) => {};
  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        userService.delete(id);

        window.location.reload();
      },
    });
  };

  const [user, setUser] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      emailVisibility: "true",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please enter email!")
        .email("Invalid email format"),
      password: yup
        .string()
        .required("Please enter password!")
        .min(8, "Minimum 8 characters"),
      passwordConfirm: yup
        .string()
        .required("Please enter password!")
        .oneOf([yup.ref("password")], "Password's not match"),
    }),
    onSubmit: async (values) => {
      try {
        await userService.create(values);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await userService.search({ page: 1, perPage: 20 });
        setUser(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className={homeStyle.container}>
        <SideBar />
        <div className={homeStyle["home-section"]}>
          <nav>
            <div className={homeStyle["sidebar-button"]}>
              <span className={homeStyle.dashboard}>Dashboard</span>
            </div>
            <div className={homeStyle["search-box"]}>
              <input type="text" placeholder="Search..." />
              <i
                className={`${homeStyle["bx-search"]} fa-solid fa-magnifying-glass`}
              ></i>
            </div>
            <div className={homeStyle["profile-details"]}>
              <img src={imgProfile} alt="" />
              <span className={homeStyle["admin_name"]}>{userInfo?.email}</span>
            </div>
          </nav>
          <div className={homeStyle["home-content"]}>
            <div className={homeStyle["button-add"]}>
              <Button onClick={showModal}>Add User</Button>
            </div>
            <Table
              // eslint-disable-next-line no-unused-vars
              onRow={(record, rowIndex) => {
                return {
                  // eslint-disable-next-line no-unused-vars
                  onClick: (event) => {
                    record.id;
                  },
                };
              }}
              columns={columns}
              dataSource={user}
              onChange={onChange}
            ></Table>
            <Modal
              title="Add user"
              open={isModalOpen}
              onOk={formik.handleSubmit}
              onCancel={handleCancel}
            >
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div>
                    <label>Email</label>
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className={"form-error"}>{formik.errors.email}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Password</label>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className={"form-error"}>{formik.errors.password}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Confirm Password</label>
                  </div>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm && (
                      <p className={"form-error"}>
                        {formik.errors.passwordConfirm}
                      </p>
                    )}
                </div>
              </form>
            </Modal>
            <Modal
              title="Edit User"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                userService
                  .update(editingUser.id, {
                    email: editingUser.email,
                    name: editingUser.name,
                    phone: editingUser.phone,
                    address: editingUser.address,
                  })
                  .then(() => {
                    (pre) => {
                      return pre.map((user) => {
                        if (user.id === editingUser.id) {
                          return editingUser;
                        } else {
                          return user;
                        }
                      });
                    };
                    resetEditing();
                  });
                location.reload();
              }}
            >
              <label>Email</label>
              <div>
                <Input
                  value={editingUser?.email}
                  onChange={(e) => {
                    setEditingUser((pre) => {
                      return { ...pre, email: e.target.value };
                    });
                  }}
                />
              </div>
              <label>Name</label>
              <div>
                <Input
                  value={editingUser?.name}
                  onChange={(e) => {
                    setEditingUser((pre) => {
                      return { ...pre, name: e.target.value };
                    });
                  }}
                />
              </div>
              <label>Phone number</label>
              <div>
                <Input
                  value={editingUser?.phone}
                  onChange={(e) => {
                    setEditingUser((pre) => {
                      return { ...pre, phone: e.target.value };
                    });
                  }}
                />
              </div>
              <label>Address</label>
              <div>
                <Input
                  value={editingUser?.address}
                  onChange={(e) => {
                    setEditingUser((pre) => {
                      return { ...pre, address: e.target.value };
                    });
                  }}
                />
              </div>
              <div></div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
