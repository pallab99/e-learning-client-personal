import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Card, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import ButtonAtom from '../../../../atoms/button/button.attom';
import './instructor.scss';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
interface DataType {
  id: string;
  avatar: any;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

type DataIndex = keyof DataType;
interface AllInstructorTableOrganismProps {
  data: DataType[];
}

const AllInstructorTableOrganism: React.FC<AllInstructorTableOrganismProps> = ({
  data,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <ButtonAtom
            type="primary"
            handleButtonClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            text="Search"
          />
          <ButtonAtom
            handleButtonClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            text="Reset"
          ></ButtonAtom>

          <ButtonAtom
            type="link"
            size="small"
            handleButtonClick={() => {
              close();
            }}
            text="close"
          />
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleEdit = (key: string) => {
    console.log(key);
  };
  const handleDelete = (key: string) => {
    console.log(key);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            <ButtonAtom
              text="edit"
              type="default"
              handleButtonClick={() => handleEdit(record.id)}
            />
            <ButtonAtom
              text="delete"
              type="default"
              dangerBtn={true}
              handleButtonClick={() => handleDelete(record.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="all-student-table-div mt-50">
      <Card>
        <HeadingAtom text="All instructor list" level={1} className="mb-30" />
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
          pagination={{
            pageSize: 5,
            total: data.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default AllInstructorTableOrganism;
