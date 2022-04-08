import React, { useEffect, useState } from "react";
import "./App.css";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import toast,{Toaster} from 'react-hot-toast';

function App() {
  const [data, setData] = useState([]);
  // ======== LOADING ========
  const [loadings,setLoadings] = useState(false);
  // ======== DATA ID ========
  const [dataId, setDataId] = useState([]);
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  // ======== END ========

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDetail = (index) => {
    setIsModalVisible(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${index.id}`)
      .then((res) => {
        console.log(res.data, "<<APIIII");
        setDataId(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    console.log(id);
    setLoadings(true)
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        console.log(res)
          setLoadings(false)
        toast.success('Delete Success')
        setIsModalVisible(false);
        GetData();
      })
      .catch((err) => console.log(err));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const GetData = async () => {
    try{
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setData(res.data)
    }
    catch(err) {
      console.log(err)
    }
  };

  // ============ CALL API ============
  useEffect(() => {
    GetData();
  }, []);
  // ============ END ============

  const handleCetak = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("berhasil");
        console.log(res.data);
        // getData()
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (item, index) => (
        <>
          <Button
            onClick={(e) => handleDetail(index)}
            key={index}
            type="primary"
          >
            Detail
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="container">
      <Toaster/>
      <Table columns={columns} dataSource={data}/>
      <Modal
        title="Detail"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              className="btn btn-success"
              onClick={handleCetak}
              style={{ display: "flex", alignItems: "center" }}
            >
              Cetak
            </Button>
            <Button
              className="btn btn-danger"
              loading={loadings}
              onClick={handleDelete}
              style={{ display: "flex", alignItems: "center" }}
            >
              Hapus
            </Button>
            <Button
              className="btn btn-success"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#8315DC",
              }}
            >
              Edit
            </Button>
          </div>,
        ]}
      >
        <p>Title</p>
        <input value={dataId.title} placeholder="Enter your Title" className="m-2 form-control" />
        <p>Description</p>
        <textarea
        value={dataId.body}
          placeholder="Enter your Description"
          className="form-control"
        />
      </Modal>
    </div>
  );
}

export default App;
