import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
// const originData = Array.from({
//   length: 100,
// }).map((_, i) => ({
//   key: i.toString(),
//   studentId: `Edward ${i}`,
//   bookId: 32,
//   borrowDate: `London Park no. ${i}`,
// }));
const originData =[ 
  {
  studentId: '1',
  bookId: '1',
  borrowDate: '12/12/12',
  dueDate:'16/01/13',
  returnDate: '17/02/13',
  status:'fine applicabe',
  librarian:'micael bravo',
  remarks:'',

  fineAmount:'50.rs',
  },
  {
    studentId: '2',
    bookId: '2',
    borrowDate: '12/12/12',
    dueDate:'16/01/13',
    returnDate: '17/02/13',
    status:'fine applicabe',
    librarian:'micael bravo',
    remarks:'',
    fineAmount:'50.rs',
  },
  {
    studentId: '3',
    bookId: '3',
    borrowDate: '12/12/12',
    dueDate:'16/01/13',
    returnDate:'16/02/13',
    status:'fine applicabe',
    librarian:'micael bravo',
    remarks:'',
    fineAmount:'50.rs',
  }


]


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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
const Librarian = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      studentId: '',
      bookId: '',
      borrowDate: '',
      dueDate:'',
      returnDate: '',
      status:'',
      librarian:'',
      fineAmount:'',
      remarks:'',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
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
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'studentId',
      dataIndex: 'studentId',
      width: '15%',
      editable: true,
    },
    {
      title: 'bookId',
      dataIndex: 'bookId',
      width: '15%',
      editable: true,
    },
    {
      title: 'borrowDate',
      dataIndex: 'borrowDate',
      width: '20%',
      editable: true,
    },
    {
      title: 'dueDate',
      dataIndex: 'dueDate',
      width: '10%',
      editable: true,
    },
    {
      title: 'returnDate',
      dataIndex: 'returnDate',
      width: '10%',
      editable: true,
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '25%',
      editable: true,
    },
    {
      title: 'librarian',
      dataIndex: 'librarian',
      width: '40%',
      editable: true,
    },

    {
      title: 'fineAmount',
      dataIndex: 'fineAmount',
      width: '20%',
      editable: true,
    },
    {
      title: 'remarks',
      dataIndex: 'remarks',
      width: '30%',
      editable: true,
    },
 
    {
      title: 'operation',
      dataIndex: 'operation',
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
        inputType: col.dataIndex === 'bookId' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
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
    </Form>
  );
};
export default Librarian;