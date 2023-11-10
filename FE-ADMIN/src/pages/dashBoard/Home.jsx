import SideBar from "../../component/SideBar";
import homeStyle from "../../css/home.module.css";
import imgProfile from "../../assets/img_avatar.png";
import roomService from "../../services/room.service";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import useUserInfo from "../../hooks/useUserInfo";

const Home = () => {
  const [room, setRoom] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const userInfo = useUserInfo();

  const onEditRoom = (record) => {
    setIsEditing(true);
    setEditingRoom({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRoom(null);
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
      key: "kindOfRoom",
      title: "Kind Of Room",
      dataIndex: "kindOfRoom",
    },
    {
      key: "introduce",
      title: "Introduce",
      dataIndex: "introduce",
    },
    {
      key: "Price",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "image",
      title: "Image",
      dataIndex: "image",
      render: (record) => (
        <>
          <img
            style={{
              width: "300px",
              height: "180px",
            }}
            src={record}
            alt=""
          />
        </>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditRoom(record);
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
  const formik = useFormik({
    initialValues: {
      kindOfRoom: "",
      price: "",
      introduce: "",
      image: "",
    },
    validationSchema: yup.object().shape({
      kindOfRoom: yup.string().required("Please enter name of Clothe!"),
      price: yup.string().required("Required!"),
      introduce: yup.string().required("Required!"),
      image: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        await roomService.create(values);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });
  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        roomService.delete(id);
        window.location.reload();
      },
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await roomService.search({ page: 1, perPage: 50 });

        setRoom(result.data.items);
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
              <Button onClick={showModal}>Add Room</Button>
            </div>
            <Table columns={columns} dataSource={room}></Table>
            <Modal
              title="Add room"
              open={isModalOpen}
              onOk={formik.handleSubmit}
              onCancel={handleCancel}
            >
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <div>
                  <div>
                    <label>Kind Of Room</label>
                  </div>
                  <Input
                    id="kindOfRoom"
                    type="text"
                    name="kindOfRoom"
                    value={formik.values.kindOfRoom}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.kindOfRoom && formik.touched.kindOfRoom && (
                    <p className={"form-error"}>{formik.errors.kindOfRoom}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Introduce</label>
                  </div>
                  <Input
                    id="introduce"
                    type="text"
                    name="introduce"
                    value={formik.values.introduce}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.introduce && formik.touched.introduce && (
                    <p className={"form-error"}>{formik.errors.introduce}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Price</label>
                  </div>
                  <Input
                    id="price"
                    type="text"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.price && formik.touched.price && (
                    <p className={"form-error"}>{formik.errors.price}</p>
                  )}
                </div>
                <div>
                  <div>
                    <label>Image</label>
                  </div>
                  <Input
                    id="image"
                    type="text"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.image && formik.touched.image && (
                    <p className={"form-error"}>{formik.errors.image}</p>
                  )}
                </div>
              </form>
            </Modal>
            <Modal
              title="Edit Clothe"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                roomService
                  .update(editingRoom.id, {
                    kindOfRoom: editingRoom.kindOfRoom,
                    introduce: editingRoom.introduce,
                    price: editingRoom.price,
                    image: editingRoom.image,
                  })
                  .then(() => {
                    (pre) => {
                      return pre.map((Room) => {
                        if (Room.id === editingRoom.id) {
                          return editingRoom;
                        } else {
                          return Room;
                        }
                      });
                    };
                    window.location.reload();
                    resetEditing();
                  });
              }}
            >
              <label>Kind Of Room</label>
              <Input
                value={editingRoom?.kindOfRoom}
                onChange={(e) => {
                  setEditingRoom((pre) => {
                    return { ...pre, kindOfRoom: e.target.value };
                  });
                }}
              />
              <div>
                <label>Introduce</label>
                <div>
                  <Input
                    value={editingRoom?.introduce}
                    onChange={(e) => {
                      setEditingRoom((pre) => {
                        return { ...pre, introduce: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Price</label>
                <div>
                  <Input
                    className="inputNumber"
                    type="number"
                    value={editingRoom?.price}
                    onChange={(e) => {
                      setEditingRoom((pre) => {
                        return { ...pre, price: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Image</label>
                <div>
                  <Input
                    type="text"
                    value={editingRoom?.image}
                    onChange={(e) => {
                      setEditingRoom((pre) => {
                        return { ...pre, image: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
