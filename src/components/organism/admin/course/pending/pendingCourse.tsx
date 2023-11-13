import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Card, Image, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import ButtonAtom from '../../../../atoms/button/button.attom';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../../atoms/paragraph/paragraph.atom';
interface DataType {
  _id: number;
  title: string;
  instructors: string;
  totalStudent: number;
  category: string;
  level: string;
  totalHours: number;
  numberOfSection: number;
  thumbnail: string;
}

type DataIndex = keyof DataType;
interface AllAdminOrganismProps {
  data: DataType[];
}

const AllPendingCourseTableOrganism: React.FC<AllAdminOrganismProps> = ({
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
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '10%',
      render: (_: any, record: any) => {
        return <Image width={100} src={record.thumbnail} />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '15%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
      render: (_: any, record: any) => {
        return <ParagraphAtom text={record.title} ellipsis={true} />;
      },
    },
    {
      title: 'Instructors',
      dataIndex: 'instructors',
      key: 'instructors',
      width: '10%',
      ...getColumnSearchProps('instructors'),
      sorter: (a, b) => a.instructors.length - b.instructors.length,
      sortDirections: ['descend', 'ascend'],
      render: (_: any, record: any) => {
        return <ParagraphAtom text={record.instructors} ellipsis={true} />;
      },
    },
    {
      title: 'TotalStudent',
      dataIndex: 'totalStudent',
      key: 'totalStudent',
      sorter: (a, b) => a.totalStudent - b.totalStudent,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => a.level.length - b.level.length,
      ...getColumnSearchProps('level'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'TotalHours',
      dataIndex: 'totalHours',
      key: 'totalHours',
      sorter: (a, b) => a.totalHours - b.totalHours,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'NumberOfSection',
      dataIndex: 'numberOfSection',
      key: 'numberOfSection',
      sorter: (a, b) => a.numberOfSection - b.numberOfSection,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <div className="flex">
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
          </div>
        );
      },
    },
  ];

  return (
    <div className="course-table-div mt-50">
      <Card>
        <HeadingAtom
          text="All pending course list"
          level={1}
          className="mb-30"
        />
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 900 }}
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

export default AllPendingCourseTableOrganism;
