import { useEffect, useState } from "react";
import bookingService from "../../services/booking.service";
import SideBar from "../../component/SideBar";
import homeStyle from "../../css/home.module.css";
import imgProfile from "../../assets/img_avatar.png";
import useUserInfo from "../../hooks/useUserInfo";
import { Button, Table } from "antd";

const Booking = () => {
  const [booking, setBooking] = useState([]);

  const userInfo = useUserInfo();

  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([
    {
      key: "RoomName",
      title: "Kind Of Room",
      dataIndex: "RoomName",
    },
    {
      key: "Username",
      title: "Username",
      dataIndex: "Username",
    },
    {
      key: "checkInTime",
      title: "Check In Time",
      dataIndex: "checkInTime",
    },
    {
      key: "checkOutTime",
      title: "Check Out Time",
      dataIndex: "checkOutTime",
    },
    {
      key: "isAgree",
      title: "Agree",
      dataIndex: "isAgree",
      render: (value, record) => {
        if (value === false) {
          return (
            <Button type="primary" block onClick={() => handleAgree(record.id)}>
              Agree
            </Button>
          );
        } else {
          return (
            <Button disabled block>
              Agreed
            </Button>
          );
        }
      },
    },
  ]);
  const handleAgree = async (bookingId) => {
    try {
      await bookingService.update(bookingId, { isAgree: true });
      setBooking((prevBookings) =>
        prevBookings.map((bookingItem) =>
          bookingItem.id === bookingId
            ? { ...bookingItem, isAgree: true }
            : bookingItem
        )
      );
    } catch (error) {
      console.error("Error updating database:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await bookingService.list({ page: 1, perPage: 50 });

        setBooking(result.data.items);
        result.data.items.forEach((item) => {
          item.RoomName = item.expand.rooms.kindOfRoom;
          item.Username = item.expand.users.email;
        });
        console.log(result.data.items);
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
            <Table columns={columns} dataSource={booking}></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
