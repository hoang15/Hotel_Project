import SideBar from "../../component/SideBar";
import homeStyle from "../../css/home.module.css";
import imgProfile from "../../assets/img_avatar.png";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import useUserInfo from "../../hooks/useUserInfo";
import galleryService from "../../services/gallery.service";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const userInfo = useUserInfo();

  const onEditGallery = (record) => {
    setIsEditing(true);
    setEditingGallery({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingGallery(null);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: yup.object().shape({
      image: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        await galleryService.create(values);
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
        galleryService.delete(id);
        window.location.reload();
      },
    });
  };
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([
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
                onEditGallery(record);
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
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await galleryService.search({ page: 1, perPage: 50 });

        setGallery(result.data.items);
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
              <Button onClick={showModal}>Add Gallery</Button>
            </div>
            <Table columns={columns} dataSource={gallery}></Table>
            <Modal
              title="Add room"
              open={isModalOpen}
              onOk={formik.handleSubmit}
              onCancel={handleCancel}
            >
              <form onSubmit={formik.handleSubmit}>
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
                galleryService
                  .update(editingGallery.id, {
                    image: editingGallery.image,
                  })
                  .then(() => {
                    (pre) => {
                      return pre.map((Gallery) => {
                        if (Gallery.id === editingGallery.id) {
                          return editingGallery;
                        } else {
                          return Gallery;
                        }
                      });
                    };
                    window.location.reload();
                    resetEditing();
                  });
              }}
            >
              <div>
                <label>Image</label>
                <div>
                  <Input
                    type="text"
                    value={editingGallery?.image}
                    onChange={(e) => {
                      setEditingGallery((pre) => {
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

export default Gallery;
