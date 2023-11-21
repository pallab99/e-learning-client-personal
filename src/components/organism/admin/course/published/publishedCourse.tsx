import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Card, Empty, Image, Input, Space, Table, message } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import CourseApi from "../../../../../api/CourseApi";
import ButtonAtom from "../../../../atoms/button/button.attom";
import HeadingAtom from "../../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../../atoms/paragraph/paragraph.atom";
import { SelectFieldCustom } from "../../../../atoms/select-field-custom/selectFieldCustom";
import TableSkeletonAtom from "../../../../atoms/table-skeleton/tableSkeleton";
import "./publishedCourse.scss";
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
  loading: boolean;
  setSelectValue: any;
  recallApi?: boolean;
  setRecallApi: any;
}

const AllPublishedCourseTableOrganism: React.FC<AllAdminOrganismProps> = ({
  data,
  loading,
  setSelectValue,
  recallApi,
  setRecallApi,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  console.log("table data", data);

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
    setSearchText("");
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
          style={{ marginBottom: 8, display: "block" }}
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const [acceptBtnLoading, setAcceptBtnLoading] = useState(false);
  const [rejectBtnLoading, setRejectBtnLoading] = useState(false);

  const handleAccept = async (courseId: string) => {
    try {
      setAcceptBtnLoading(true);
      const res = await CourseApi.coursePublishRequest(courseId, "accept");
      message.success(res?.data?.message);
      setAcceptBtnLoading(false);
      setRecallApi(!recallApi);
    } catch (error: any) {
      message.error(error?.response?.message);
      setAcceptBtnLoading(false);
    }
  };
  const handleReject = async (courseId: string) => {
    try {
      setRejectBtnLoading(true);

      const res = await CourseApi.coursePublishRequest(courseId, "reject");
      message.success(res?.data?.message);
      setRejectBtnLoading(false);
    } catch (error: any) {
      setRejectBtnLoading(false);

      message.error(error?.response?.message);
    }
  };
  const [renderBtn, setRenderBtn] = useState(false);
  const selectFieldOnchange = (e: any) => {
    console.log("onCancel");

    if (e === "disable") {
      setSelectValue({ type: e });
    } else {
      setSelectValue({ type: "verified", value: String(e) });
      if (e === "true") {
        setRenderBtn(false);
      } else {
        setRenderBtn(true);
      }
    }
  };
  let columns: ColumnsType<DataType> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "10%",
      render: (_: any, record: any) => {
        return (
          <Image
            width={100}
            height={80}
            style={{ objectFit: "cover" }}
            src={record.thumbnail}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
      render: (_: any, record: any) => {
        return <ParagraphAtom text={record.title} ellipsis={true} />;
      },
    },
    // {
    //   title: "Instructors",
    //   dataIndex: "instructors",
    //   key: "instructors",
    //   width: "10%",
    //   ...getColumnSearchProps("instructors"),
    //   sorter: (a, b) => a.instructors.length - b.instructors.length,
    //   sortDirections: ["descend", "ascend"],
    //   render: (_: any, record: any) => {
    //     return <ParagraphAtom text={record.instructors} ellipsis={true} />;
    //   },
    // },
    {
      title: "TotalStudent",
      dataIndex: "totalStudent",
      key: "totalStudent",
      sorter: (a, b) => a.totalStudent - b.totalStudent,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    //   key: 'category',
    //   ...getColumnSearchProps('category'),
    // },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level.length - b.level.length,
      ...getColumnSearchProps("level"),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "TotalHours",
    //   dataIndex: "totalHours",
    //   key: "totalHours",
    //   sorter: (a, b) => a.totalHours - b.totalHours,
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   title: "NumberOfSection",
    //   dataIndex: "numberOfSection",
    //   key: "numberOfSection",
    //   sorter: (a, b) => a.numberOfSection - b.numberOfSection,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];
  if (renderBtn === true) {
    columns = [
      ...columns,
      {
        title: "action",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: any) => {
          return (
            <div className="flex">
              <ButtonAtom
                text="accept"
                type="link"
                loading={acceptBtnLoading}
                handleButtonClick={() => handleAccept(record._id)}
              />
              <ButtonAtom
                text="reject"
                type="link"
                dangerBtn={true}
                loading={rejectBtnLoading}
                handleButtonClick={() => handleReject(record._id)}
              />
            </div>
          );
        },
      },
    ];
  }
  const selectValue = [
    { value: "all", label: "All" },
    { value: "true", label: "Published" },
    { value: "false", label: "pending" },
    { value: "disable", label: "Disabled" },
  ];

  return (
    <div className="course-table-div mt-50">
      <Card>
        <div className="card-header-flex">
          <div className="table-header-div">
            <HeadingAtom text="Course list" level={3} className="mb-30" />
          </div>
          <div className="table-header-select">
            <SelectFieldCustom
              values={selectValue}
              handleOnchange={selectFieldOnchange}
              defaultValue="All"
              placeholder="Select course type"
            ></SelectFieldCustom>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 900 }}
          pagination={{
            pageSize: 5,
            total: data?.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          locale={{
            emptyText: loading ? <TableSkeletonAtom /> : <Empty />,
          }}
        />
      </Card>
    </div>
  );
};

export default AllPublishedCourseTableOrganism;
