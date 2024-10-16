import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import Librarian from "../Librarian/Librarian";


import { Form, InputNumber, Popconfirm, Typography } from "antd";
// import Librarian from "../Librarian/Librarian";
const originData = Array.from({
  length: 100,
}).map((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}));
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    class: "2A",
    Parents: "Nicolas",
    library: {
      studentId: "12345",
      bookId: "67890",
      borrowDate: "2023-10-10",
      dueDate: "2023-10-24",
      returnDate: "2023-10-20",
      status: "returned",
      librarian: "Mr. Smith",
      renewalCount: 1,
      fineAmount: 10.0,
      remarks: "Book was slightly damaged upon return.",
    },
    fee_history: {
      studentId: "12345",
      feeType: "Tuition Fee",
      amount: 5000.0,
      dueDate: "2023-11-15",
      paymentDate: "2023-11-10",
      paymentStatus: "Paid",
      invoiceNumber: "INV00123",
      paymentMode: "Online",
      referenceNumber: "TXN123456",
      remarks: "Paid through online banking.",
    },
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
    class: "3B",
    Parents: "Domnic",
    library: {
      studentId: "12345",
      bookId: "67890",
      borrowDate: "2023-10-10",
      dueDate: "2023-10-24",
      returnDate: "2023-10-20",
      status: "returned",
      librarian: "Mr. Smith",
      renewalCount: 1,
      fineAmount: 10.0,
      remarks: "Book was slightly damaged upon return.",
    },
    fee_history: {
      studentId: "12345",
      feeType: "Tuition Fee",
      amount: 5000.0,
      dueDate: "2023-11-15",
      paymentDate: "2023-11-10",
      paymentStatus: "Paid",
      invoiceNumber: "INV00123",
      paymentMode: "Online",
      referenceNumber: "TXN123456",
      remarks: "Paid through online banking.",
    },
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    class: "4A",
    Parents: "Tom philip",
    library: {
      studentId: "12345",
      bookId: "67890",
      borrowDate: "2023-10-10",
      dueDate: "2023-10-24",
      returnDate: "2023-10-20",
      status: "returned",
      librarian: "Mr. Smith",
      renewalCount: 1,
      fineAmount: 10.0,
      remarks: "Book was slightly damaged upon return.",
    },
    fee_history: {
      studentId: "12345",
      feeType: "Tuition Fee",
      amount: 5000.0,
      dueDate: "2023-11-15",
      paymentDate: "2023-11-10",
      paymentStatus: "Paid",
      invoiceNumber: "INV00123",
      paymentMode: "Online",
      referenceNumber: "TXN123456",
      remarks: "Paid through online banking.",
    },
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    class: "5A",
    Parents: "Soulman",
    library: {
      studentId: "12345",
      bookId: "67890",
      borrowDate: "2023-10-10",
      dueDate: "2023-10-24",
      returnDate: "2023-10-20",
      status: "returned",
      librarian: "Mr. Smith",
      renewalCount: 1,
      fineAmount: 10.0,
      remarks: "Book was slightly damaged upon return.",
    },
    fee_history: {
      studentId: "12345",
      feeType: "Tuition Fee",
      amount: 5000.0,
      dueDate: "2023-11-15",
      paymentDate: "2023-11-10",
      paymentStatus: "Paid",
      invoiceNumber: "INV00123",
      paymentMode: "Online",
      referenceNumber: "TXN123456",
      remarks: "Paid through online banking.",
    },
  },
];
const OfficeStaff = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [role, setRole] = useState("office");

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      editable: true,
    },
    {
      title: "class",
      dataIndex: "class",
      key: "class",
      width: "10%",
      ...getColumnSearchProps("class"),
      editable: true,
    }, 
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "10%",
      ...getColumnSearchProps("age"),
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      editable: true,
    },
    {
      title: "Parents",
      dataIndex: "Parents",
      key: "Parents",
      ...getColumnSearchProps("Parents"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      editable: true,
    },
    // {
    //   title: "library",
    //   dataIndex: "library",
    //   key: "library",
    //   ...getColumnSearchProps("library"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    //   render: (text, record) => {
    //     return (
    //       <>
    //         <p>studentId : {record?.library?.studentId}</p>
    //         <p>bookId :{record?.library?.bookId}</p>
    //         <p>borrowDate :{record?.library?.borrowDate}</p>
    //         <p>dueDate :{record?.library?.dueDate}</p>
    //         <p>returnDate :{record?.library?.returnDate}</p>
    //         <p>status :{record?.library?.status}</p>
    //         <p>librarian :{record?.library?.librarian}</p>
    //         <p>returnDate :{record?.library?.returnDate}</p>
    //         <p>renewalCount :{record?.library?.renewalCount}</p>
    //         <p>fineAmount :{record?.library?.fineAmount}</p>
    //         <p>remarks :{record?.library?.remarks}</p>
    //       </>
    //     );
    //   },
    //   editable: true,
    // },
    {
      title: "fee_history",
      dataIndex: "fee_history",
      key: "fee_history",
      ...getColumnSearchProps("fee_history"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <>
            <p> studentId :{record?.fee_history?.studentId}</p>
            <p> feeType :{record?.fee_history?.feeType}</p>
            <p> amount :{record?.fee_history?.amount}</p>
            <p>dueDate : {record?.fee_history?.dueDate}</p>
            <p>remarks : {record?.fee_history?.paymentDate}</p>
            <p> paymentStatus :{record?.fee_history?.paymentStatus}</p>
            <p> referenceNumber :{record?.fee_history?.referenceNumber}</p>
            <p> remarks :{record?.fee_history?.remarks}</p>
          </>
        );
      },
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div>STUDENT DETAILS</div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Form form={form} component={false}>
        {role == "libr" && (
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        )}

        {role == "office" && (
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        )}
      </Form>
      <h2>
        LIBRARY RECORDS OF STUDENT
      </h2>
      
    </>
  );
};

export default OfficeStaff;
