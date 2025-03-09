import { useEffect, useMemo, useRef, useState } from "react";
import { getModels } from "@/apis/wikipedia";
import { Select as AntdSelect, Flex, SelectProps } from "antd";
import { debounce } from "lodash";
import { LoadingOutlined } from "@ant-design/icons";

const Select = ({
  model,
  setModel,
  thinking,
}: {
  model: string;
  setModel: (model: string) => void;
  thinking: boolean;
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [fetching, setFetching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState<string>("");
  const fetchRef = useRef(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getModels().then((res) => {
      setOptions(
        Object.entries(res.data).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      );
      setModel(res.data[thinking ? "reasoner" : "chat"]);
    });
  }, [thinking]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setSearch(value);
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      getModels(value.length > 0 ? value : null).then((res) => {
        if (fetchId !== fetchRef.current) return;
        setOptions(
          Object.entries(res.data).map(([key, value]) => ({
            label: value,
            value: key,
          })),
        );
        setFetching(false);
      });
    };
    return debounce(loadOptions, 800);
  }, []);

  // 处理滚动事件
  const handleScroll = (event: React.SyntheticEvent) => {
    const target = event.nativeEvent.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom) {
      setScrolled(true);
      getModels(search.length > 0 ? search : null, page + 1).then((res) => {
        setOptions((prev) => {
          if (!prev) return [];
          return [
            ...prev,
            ...Object.entries(res.data).map(
              ([key, value]: [string, string]) => ({
                label: value,
                value: key,
              }),
            ),
          ];
        });
        setScrolled(false);
        setPage(page + 1);
      });
    }
  };

  return (
    <AntdSelect
      disabled={true}
      loading={scrolled}
      style={{ minWidth: "200px", height: "36px", maxWidth: "300px" }}
      filterOption={false}
      dropdownRender={(menu) => {
        return (
          <>
            {menu}
            {scrolled && (
              <Flex justify="center" align="center" style={{ height: "36px" }}>
                <LoadingOutlined style={{ fontSize: "20px" }} />
              </Flex>
            )}
          </>
        );
      }}
      notFoundContent={
        fetching ? (
          <Flex justify="center" align="center" style={{ height: "36px" }}>
            <LoadingOutlined style={{ fontSize: "20px" }} />
          </Flex>
        ) : null
      }
      showSearch
      options={options}
      value={model}
      onChange={(value) => {
        setModel(value);
      }}
      onSearch={debounceFetcher}
      onPopupScroll={handleScroll}
    />
  );
};

export default Select;
