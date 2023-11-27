import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Empty, Image, Input, Space, Table, message } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import subscriptionApi from "../../../../api/subscriptionApi";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import TableSkeletonAtom from "../../../atoms/table-skeleton/tableSkeleton";
import SubscriptRequestCourseModal from "../../../molecules/subscription-request-course/subscriptionRequestCourseModal";
interface DataType {
  _id: number;
  dp: string;
  userName: string;
  pendingCourses: number;
  courses: Array<any>;
}

type DataIndex = keyof DataType;
interface AllAdminOrganismProps {
  data: DataType[];
  loading: boolean;
  setSelectValue: any;
  setRecallApi?: any;
  recallApi?: boolean;
}

const AllSubscriptionTableOrganism: React.FC<AllAdminOrganismProps> = ({
  data,
  loading,
  setSelectValue,
  setRecallApi,
  recallApi,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [btnLoading1, setBtnLoading1] = useState(false);
  const [btnLoading2, setBtnLoading2] = useState(false);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState<any[]>([]);
  const showModal = (record: any) => {
    setCourseData(record);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "20%",
      render: (_: any, record: any) => {
        return (
          <Image
            width={100}
            height={80}
            style={{ objectFit: "cover" }}
            src={record.dp}
          />
        );
      },
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      width: "25%",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ["descend", "ascend"],
      render: (_: any, record: any) => {
        return <ParagraphAtom text={record.userName} ellipsis={true} />;
      },
    },
    {
      title: "PendingCourses",
      dataIndex: "pendingCourses",
      key: "pendingCourses",
      width: "10%",
      ...getColumnSearchProps("pendingCourses"),
      sorter: (a, b) => a.pendingCourses - b.pendingCourses,
      sortDirections: ["descend", "ascend"],
      render: (_: any, record: any) => {
        return <ParagraphAtom text={record.pendingCourses} ellipsis={true} />;
      },
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      // width: "10%",

      render: (_: any, record: any) => {
        return (
          <div className="flex">
            <ButtonAtom
              text="Details"
              type="default"
              handleButtonClick={() => showModal(record)}
            />
          </div>
        );
      },
    },
  ];

  const acceptRequest = async (subscriptionId: string, courseId: string) => {
    try {
      setBtnLoading1(true);
      const res = await subscriptionApi.acceptSubscription(
        subscriptionId,
        courseId
      );
      message.success(res?.data?.message);
      setBtnLoading1(false);
      closeModal();
      setRecallApi(Math.random());
    } catch (error: any) {
      message.error(error?.response?.message);
      setBtnLoading1(false);
    }
  };
  const rejectRequest = async (subscriptionId: string, courseId: string) => {
    try {
      setBtnLoading2(true);
      const res = await subscriptionApi.rejectSubscription(
        subscriptionId,
        courseId
      );
      message.success(res?.data?.message);
      closeModal();
      setBtnLoading2(false);
    } catch (error: any) {
      setBtnLoading2(false);

      message.error(error?.response?.message);
    }
  };
  return (
    <div className="course-table-div mt-50">
      <div className="card-header-flex">
        <div className="table-header-div">
          <HeadingAtom
            text="All subscription request list"
            level={3}
            className="mb-30"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1200 }}
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
      <SubscriptRequestCourseModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        courseData={courseData}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
        btnLoading1={btnLoading1}
        btnLoading2={btnLoading2}
      ></SubscriptRequestCourseModal>
    </div>
  );
};

export default AllSubscriptionTableOrganism;
